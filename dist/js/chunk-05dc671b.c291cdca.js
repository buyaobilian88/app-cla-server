(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05dc671b"],{"3c52":function(e,t,o){},"3c55":function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{style:e.section,attrs:{id:"section"}},[o("CorporationHeader",{attrs:{user:e.user},on:{clickItem:e.clickItem}}),o("el-row",{staticStyle:{"margin-top":"2rem"}},[o("el-col",{attrs:{offset:4,span:16}},[o("router-view")],1)],1),o("div",{staticClass:"paginationClass"},[o("el-pagination",{attrs:{background:"","page-size":5,"pager-count":5,"hide-on-single-page":!0,"current-page":e.currentPage,layout:"prev, pager, next",total:e.tableTotal},on:{"current-change":e.changePage}})],1),o("el-dialog",{attrs:{width:"20%",title:"",align:"center",visible:e.deleteUserVisible},on:{"update:visible":function(t){e.deleteUserVisible=t}}},[o("el-row",{attrs:{align:"center"}},[e._v(" 确定删除？ ")]),o("el-row",{staticClass:"marginTop1rem contentTitle",attrs:{align:"center"}},[o("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.deleteContributor()}}},[e._v("确定")]),o("el-button",{attrs:{size:"medium"},on:{click:function(t){e.deleteUserVisible=!1}}},[e._v("取消")])],1)],1),o("Footer")],1)},s=[],i=(o("99af"),o("221d")),a=o("615a"),r=o("4dfc"),c=o("fd2d");window.onresize=function(){a["a"]()>document.getElementById("section").offsetHeight&&(document.getElementById("section").style.height=a["a"]()+"px")};var l={name:"SignedRepo",components:{CorporationHeader:r["a"],Footer:c["a"]},data:function(){return{user:this.$store.state.loginInfo,active:"first",section:{height:""},deleteId:"",deleteUserVisible:!1,listDialogVisible:!1,tableDataOther:[{repository:"ooo",cla:"test",sharedGist:"Yes",contributors:"0"}],tableTotal:0,currentPage:1,inactiveData:[{id:0,name:"jack",email:"10577507@qq.com",tel:"15632486433",isUsed:!1},{id:1,name:"Rose",email:"105507@163.com",tel:"18832486437",isUsed:!1}],activeData:[{id:0,name:"tom",email:"10577507@qq.com",tel:"15632486433",isUsed:!0},{id:1,name:"helen",email:"105507@163.com",tel:"18832486437",isUsed:!0}]}},methods:{checkPdf:function(){console.log("checkPdf")},changeActive:function(e,t){var o=this;console.log("changeActive",e,t);var n={id:e,active:t};this.$axios({url:"/api".concat(i["changeActive"]),method:"post",data:n}).then((function(e){console.log(e)})).catch((function(e){console.log(e),o.$message.closeAll(),o.$message.error(e.response.data)}))},clickDelete:function(e){this.deleteUserVisible=!0,this.deleteId=e},deleteContributor:function(){var e=this;console.log("deleteContributor"),this.$axios({url:"/api".concat(i["deleteCon"],"/").concat(this.deleteId),method:"delete"}).then((function(e){console.log(e)})).catch((function(t){console.log(t),e.$message.closeAll(),e.$message.error(t.response.data)}))},changePage:function(e){console.log(e)},setClientHeight:function(){var e=this;this.$nextTick((function(){a["a"]()>document.getElementById("section").offsetHeight?e.section.height=a["a"]()+"px":e.section.height=document.getElementById("section").offsetHeight}))},clickItem:function(e){switch(console.log(e),e){case"a":"/employeeList"!==this.$route.path&&this.$router.push("/employeeList");break;case"b":"/createUser"!==this.$route.path&&this.$router.push("/createUser");break;case"c":"/resetPassword"!==this.$route.path&&this.$router.push("/resetPassword");break;case"e":this.loginOut();break}},loginOut:function(){sessionStorage.clear(),this.$router.push("/")}},created:function(){},mounted:function(){this.setClientHeight()}},u=l,d=(o("564e"),o("2877")),m=Object(d["a"])(u,n,s,!1,null,null,null);t["default"]=m.exports},"4dfc":function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"header"},[o("el-col",{attrs:{span:8}},[o("div",{staticStyle:{display:"flex"}})]),o("el-col",{attrs:{span:8}},[o("div",[o("svg-icon",{staticClass:"pointer",attrs:{id:"svg_logo","icon-class":"CLA_SYSTEM_BLACK"},on:{click:function(t){return e.toHome()}}})],1)]),o("el-col",{attrs:{span:8}},[o("div",[o("el-dropdown",{on:{command:e.handleCommand}},[o("span",{staticClass:"el-dropdown-link"},[e._v(" "+e._s(e.userName)),o("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),o("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},["admin"===e.userInfo[e.orgValue].role?o("el-dropdown-item",{attrs:{command:"a"}},[e._v("user")]):o("el-dropdown-item",{attrs:{command:"a"}},[e._v("employee")]),"admin"===e.userInfo[e.orgValue].role?o("el-dropdown-item",{attrs:{command:"b"}},[e._v("create user ")]):e._e(),o("el-dropdown-item",{attrs:{command:"c"}},[e._v("reset password")]),"admin"===e.userInfo[e.orgValue].role?o("el-dropdown-item",{attrs:{command:"d"}},[e._v("my cla")]):e._e(),o("el-dropdown-item",{attrs:{command:"e"}},[e._v("login out")])],1)],1)],1)])],1)},s=[],i={name:"CorporationHeader",props:["user"],computed:{userInfo:function(){return console.log(this.user.userInfo),this.user.userInfo},orgValue:function(){return console.log(this.user.orgValue),this.user.orgValue}},data:function(){return{userName:this.user.userName}},created:function(){console.log(this.user)},methods:{handleCommand:function(e){this.$emit("clickItem",e)},toHome:function(){this.$router.push("/home")},loginOut:function(){this.$router.push("/")},newWindow:function(){window.open("https://github.com/ouchengle")}}},a=i,r=(o("6af4"),o("2877")),c=Object(r["a"])(a,n,s,!1,null,null,null);t["a"]=c.exports},"564e":function(e,t,o){"use strict";var n=o("3c52"),s=o.n(n);s.a},"615a":function(e,t,o){"use strict";o.d(t,"a",(function(){return n}));var n=function(){return window.innerHeight}},"6af4":function(e,t,o){"use strict";var n=o("9162"),s=o.n(n);s.a},9162:function(e,t,o){},d32f:function(e,t,o){"use strict";var n=o("e35a"),s=o.n(n);s.a},e35a:function(e,t,o){},fd2d:function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-row",{staticClass:"footer"},[o("el-col",{staticClass:"left",attrs:{span:8}},[o("span",[e._v("© 2020 HUAWEI SE")])]),o("el-col",{staticClass:"center",attrs:{span:8}},[o("span",[e._v("Made with "),o("svg-icon",{attrs:{"icon-class":"heart"}}),e._v(" from the GitHub team at HUAWEI ")],1)]),o("el-col",{staticClass:"right",attrs:{span:8}},[o("div",[o("span",{staticClass:"pointer"},[e._v("Terms of Service & Privacy Policy")]),o("span",{staticClass:"pointer"},[o("svg-icon",{attrs:{id:"github_logo","icon-class":"github"}}),e._v("Open an issue")],1)])])],1)},s=[],i={name:"Footer"},a=i,r=(o("d32f"),o("2877")),c=Object(r["a"])(a,n,s,!1,null,"023530e2",null);t["a"]=c.exports}}]);
//# sourceMappingURL=chunk-05dc671b.c291cdca.js.map