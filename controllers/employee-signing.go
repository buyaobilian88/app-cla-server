package controllers

import (
	"fmt"
	"net/http"

	"github.com/astaxie/beego"

	"github.com/opensourceways/app-cla-server/dbmodels"
	"github.com/opensourceways/app-cla-server/email"
	"github.com/opensourceways/app-cla-server/models"
	"github.com/opensourceways/app-cla-server/worker"
)

type EmployeeSigningController struct {
	beego.Controller
}

func (this *EmployeeSigningController) Prepare() {
	if this.Ctx.Request.Method == http.MethodPost {
		apiPrepare(&this.Controller, []string{PermissionIndividualSigner}, nil)
	} else {
		apiPrepare(&this.Controller, []string{PermissionEmployeeManager}, nil)
	}
}

// @Title Post
// @Description sign as employee
// @Param	:cla_org_id	path 	string				true		"cla org id"
// @Param	body		body 	models.IndividualSigning	true		"body for employee signing"
// @Success 201 {int} map
// @router /:cla_org_id [post]
func (this *EmployeeSigningController) Post() {
	var statusCode = 201
	var errCode = 0
	var reason error
	var body interface{}

	defer func() {
		sendResponse(&this.Controller, statusCode, errCode, reason, body)
	}()

	claOrgID, err := fetchStringParameter(&this.Controller, ":cla_org_id")
	if err != nil {
		reason = err
		errCode = ErrInvalidParameter
		statusCode = 400
		return
	}

	var info models.IndividualSigning
	if err := fetchInputPayload(&this.Controller, &info); err != nil {
		reason = err
		errCode = ErrInvalidParameter
		statusCode = 400
		return
	}

	claOrg, emailCfg, err := getEmailConfig(claOrgID)
	if err != nil {
		reason = fmt.Errorf("Failed to sign as employee, err:%s", err.Error())
		statusCode, errCode = convertDBError(err)
		return
	}

	corpSign, err := models.GetCorporationSigningDetail(
		claOrg.Platform, claOrg.OrgID, claOrg.RepoID, info.Email)
	if err != nil {
		reason = fmt.Errorf("Failed to sign as employee, err:%s", err.Error())
		statusCode, errCode = convertDBError(err)
		return
	}

	if !corpSign.AdminAdded {
		reason = fmt.Errorf("Failed to sign as employee, err: the corp signing is not completed")
		errCode = ErrSigningUncompleted
		statusCode = 400
		return
	}

	opt := models.CorporationManagerListOption{
		CLAOrgID: corpSign.CLAOrgID,
		Role:     dbmodels.RoleManager,
		Email:    info.Email,
	}
	managers, err := opt.List()
	if err != nil {
		reason = fmt.Errorf("Failed to sign as employee, err:%s", err.Error())
		statusCode, errCode = convertDBError(err)
		return
	}

	if err := (&info).Create(claOrgID, false); err != nil {
		reason = fmt.Errorf("Failed to sign as employee, err:%s", err.Error())
		statusCode, errCode = convertDBError(err)
		return
	}
	body = "sign successfully"

	if len(managers) > 0 {
		msg := email.EmailMessage{
			To:      []string{},
			Subject: "Notification",
			Content: "somebody has signed",
		}
		for _, item := range managers {
			if item.Role == dbmodels.RoleManager {
				msg.To = append(msg.To, item.Email)
			}
		}
		worker.GetEmailWorker().SendSimpleMessage(emailCfg, &msg)
	}
}

// @Title GetAll
// @Description get all the employees
// @router / [get]
func (this *EmployeeSigningController) GetAll() {
	var statusCode = 200
	var errCode = 0
	var reason error
	var body interface{}

	defer func() {
		sendResponse(&this.Controller, statusCode, errCode, reason, body)
	}()

	opt := models.EmployeeSigningListOption{
		Platform:         this.GetString("platform"),
		OrgID:            this.GetString("org_id"),
		RepoID:           this.GetString("repo_id"),
		CLALanguage:      this.GetString("cla_language"),
		CorporationEmail: this.GetString("corporation_email"),
	}

	r, err := opt.List()
	if err != nil {
		reason = fmt.Errorf("Failed to list employees, err:%s", err.Error())
		statusCode, errCode = convertDBError(err)
		return
	}

	body = r
}

// @Title Update
// @Description enable/unable employee signing
// @Param	:cla_org_id	path 	string	true		"cla org id"
// @Param	:email		path 	string	true		"email"
// @Success 202 {int} map
// @router /:cla_org_id/:email [put]
func (this *EmployeeSigningController) Update() {
	var statusCode = 202
	var errCode = 0
	var reason error
	var body interface{}

	defer func() {
		sendResponse(&this.Controller, statusCode, errCode, reason, body)
	}()

	if err := checkAPIStringParameter(&this.Controller, []string{":cla_org_id", ":email"}); err != nil {
		reason = err
		errCode = ErrInvalidParameter
		statusCode = 400
		return

	}

	var info models.EmployeeSigningUdateInfo
	if err := fetchInputPayload(&this.Controller, &info); err != nil {
		reason = err
		errCode = ErrInvalidParameter
		statusCode = 400
		return
	}

	err := (&info).Update(this.GetString(":cla_org_id"), this.GetString(":email"))
	if err != nil {
		reason = fmt.Errorf("Failed to update employee signing, err:%s", err.Error())
		statusCode, errCode = convertDBError(err)
		return
	}

	body = "enabled employee successfully"
}

// @Title Delete
// @Description delete employee signing
// @Param	:cla_org_id	path 	string	true		"cla org id"
// @Param	:email		path 	string	true		"email"
// @Success 204 {string} delete success!
// @router /:cla_org_id/:email [delete]
func (this *EmployeeSigningController) Delete() {
	var statusCode = 204
	var errCode = 0
	var reason error
	var body string

	defer func() {
		sendResponse(&this.Controller, statusCode, errCode, reason, body)
	}()

	if err := checkAPIStringParameter(&this.Controller, []string{":cla_org_id", ":email"}); err != nil {
		reason = err
		errCode = ErrInvalidParameter
		statusCode = 400
		return

	}

	err := models.DeleteEmployeeSigning(this.GetString(":cla_org_id"), this.GetString(":email"))
	if err != nil {
		reason = fmt.Errorf("Failed to delete employee signing, err:%s", err.Error())
		statusCode, errCode = convertDBError(err)
		return
	}

	body = "delete employee successfully"
}
