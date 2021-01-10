package controllers

import (
	"fmt"
	"strings"

	platformAuth "github.com/opensourceways/app-cla-server/code-platform-auth"
	"github.com/opensourceways/app-cla-server/code-platform-auth/platforms"
	"github.com/opensourceways/app-cla-server/models"
)

type AuthController struct {
	baseController
}

func (this *AuthController) Prepare() {
	if this.routerPattern() == "/v1/auth/authcodeurl/:platform/:purpose" {
		this.apiPrepare("")
	}
}

// @Title Auth
// @Description authorized by gitee/github
// @Param	:platform	path 	string				true		"gitee/github"
// @Param	:purpose	path 	string				true		"purpose: login, sign"
// @Success 200
// @router /:platform/:purpose [get]
func (this *AuthController) Auth() {
	purpose := this.GetString(":purpose")
	platform := this.GetString(":platform")
	authHelper, ok := platformAuth.Auth[purpose]
	if !ok {
		return
	}

	rs := func(errCode string, reason error) {
		this.setCookies(map[string]string{"error_code": errCode, "error_msg": reason.Error()})
		this.redirect(authHelper.WebRedirectDir(false))
	}

	if this.GetString("state") != authURLState {
		rs(errSystemError, fmt.Errorf("unkown state"))
		return
	}

	if err := this.GetString("error"); err != "" {
		rs(errAuthFailed, fmt.Errorf("%s, %s", err, this.GetString("error_description")))
		return
	}

	cp, err := authHelper.GetAuthInstance(platform)
	if err != nil {
		rs(errUnsupportedCodePlatform, err)
		return
	}

	// gitee don't pass the scope paramter
	token, err := cp.GetToken(this.GetString("code"), this.GetString("scope"))
	if err != nil {
		rs(errSystemError, err)
		return
	}

	permission := ""
	switch purpose {
	case platformAuth.AuthApplyToLogin:
		permission = PermissionOwnerOfOrg
	case platformAuth.AuthApplyToSign:
		permission = PermissionIndividualSigner
	}

	pl, ec, err := this.genACPayload(platform, permission, token)
	if err != nil {
		rs(ec, err)
		return
	}

	at, err := this.newApiToken(permission, pl)
	if err != nil {
		rs(errSystemError, err)
		return
	}

	cookies := map[string]string{"access_token": at, "platform_token": token}
	if permission == PermissionIndividualSigner {
		cookies["sign_user"] = pl.User
		cookies["sign_email"] = pl.Email
	}
	this.setCookies(cookies)
	this.redirect(authHelper.WebRedirectDir(true))
}

func (this *AuthController) genACPayload(platform, permission, platformToken string) (*acForCodePlatformPayload, string, error) {
	pt, err := platforms.NewPlatform(platformToken, "", platform)
	if err != nil {
		return nil, errSystemError, err
	}

	orgm := map[string]bool{}
	links := map[string]models.OrgInfo{}
	if permission == PermissionOwnerOfOrg {
		orgs, err := pt.ListOrg()
		if err == nil {
			for _, item := range orgs {
				orgm[item] = true
			}

			if r, err := models.ListLinks(platform, orgs); err == nil {
				for i := range r {
					links[r[i].LinkID] = r[i].OrgInfo
				}
			}
		}
	}

	email := ""
	if permission == PermissionIndividualSigner {
		if email, err = pt.GetAuthorizedEmail(); err != nil {
			if strings.Index(err.Error(), "401") >= 0 {
				return nil, errEmailIsUnauthorized, err
			}
			return nil, errSystemError, err
		}
	}

	user, err := pt.GetUser()
	if err != nil {
		return nil, errSystemError, err
	}

	return &acForCodePlatformPayload{
		User:          user,
		Email:         email,
		Platform:      platform,
		PlatformToken: platformToken,
		Orgs:          orgm,
		Links:         links,
	}, "", nil
}

// @Title Get
// @Description get auth code url
// @Param	:platform	path 	string				true		"gitee/github"
// @Param	:purpose	path 	string				true		"purpose: login, sign"
// @Success 200 {object}
// @Failure util.ErrNotSupportedPlatform
// @router /authcodeurl/:platform/:purpose [get]
func (this *AuthController) Get() {
	action := "fetch auth code url of gitee/github"

	authHelper, ok := platformAuth.Auth[this.GetString(":purpose")]
	if !ok {
		this.sendFailedResponse(400, errUnkownPurposeForAuth, fmt.Errorf("unkonw purpose"), action)
		return
	}

	cp, err := authHelper.GetAuthInstance(this.GetString(":platform"))
	if err != nil {
		this.sendFailedResponse(400, errUnsupportedCodePlatform, err, action)
		return
	}

	this.sendSuccessResp(map[string]string{
		"url": cp.GetAuthCodeURL(authURLState),
	})
}

type acForCodePlatformPayload struct {
	User          string `json:"user"`
	Email         string `json:"email"`
	Platform      string `json:"platform"`
	PlatformToken string `json:"platform_token"`

	Orgs  map[string]bool           `json:"orgs"`
	Links map[string]models.OrgInfo `json:"links"`
}

func (this *acForCodePlatformPayload) hasOrg(org string) bool {
	if this.Orgs == nil {
		return false
	}

	_, ok := this.Orgs[org]
	return ok
}

func (this *acForCodePlatformPayload) addOrg(org string) {
	if this.Orgs == nil {
		this.Orgs = map[string]bool{}
	}

	this.Orgs[org] = true
}

func (this *acForCodePlatformPayload) orgInfo(linkID string) *models.OrgInfo {
	if this.Links == nil {
		return nil
	}

	if v, ok := this.Links[linkID]; ok {
		return &v
	}
	return nil
}

func (this *acForCodePlatformPayload) isOwnerOfLink(link string) *failedApiResult {
	if this.Links == nil {
		this.Links = map[string]models.OrgInfo{}
	}

	if _, ok := this.Links[link]; ok {
		return nil
	}

	orgInfo, err := models.GetOrgOfLink(link)
	if err != nil {
		if err.IsErrorOf(models.ErrNoLink) {
			return newFailedApiResult(400, errUnknownLink, err)
		}
		return parseModelError(err)
	}

	if err := this.isOwnerOfOrg(orgInfo.OrgID); err != nil {
		return err
	}

	this.Links[link] = *orgInfo
	return nil
}

func (this *acForCodePlatformPayload) isOwnerOfOrg(org string) *failedApiResult {
	if this.Orgs == nil {
		this.Orgs = map[string]bool{}
	}

	if this.Orgs[org] {
		return nil
	}

	p, err := platforms.NewPlatform(this.PlatformToken, "", this.Platform)
	if err != nil {
		return newFailedApiResult(400, errSystemError, err)
	}

	if b, err := p.IsOrgExist(org); err != nil {
		// TODO token expiry
		return newFailedApiResult(500, errSystemError, err)
	} else if !b {
		return newFailedApiResult(400, errNotYoursOrg, fmt.Errorf("not the org of owner"))
	}

	this.Orgs[org] = true
	return nil
}
