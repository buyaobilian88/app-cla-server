(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-795e3106"],{"0418":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"header"},[a("el-col",{attrs:{span:8}},[a("div",{staticStyle:{display:"flex"}},[a("img",{staticClass:"pointer",staticStyle:{width:"2rem"},attrs:{src:this.$store.state.user.userImg,alt:""},on:{click:function(t){return e.newWindow()}}}),a("div",{staticStyle:{display:"flex","flex-direction":"column","justify-content":"center","margin-left":".5rem"}},[a("span",[e._v("Hi, "),a("span",{staticClass:"pointer",staticStyle:{"font-weight":"bold"}},[e._v(e._s(this.$store.state.user.userName)+"!")])])])])]),a("el-col",{attrs:{span:8}},[a("div",[a("svg-icon",{staticClass:"pointer",staticStyle:{height:"100%",width:"3rem"},attrs:{id:"svg_logo","icon-class":"CLA_SYSTEM_BLACK"},on:{click:function(t){return e.toHome()}}})],1)]),a("el-col",{attrs:{span:8}},[a("div",[a("el-tooltip",{attrs:{effect:"dark",content:"Login out",placement:"left"}},[a("svg-icon",{staticClass:"pointer",attrs:{id:"svg_loginOut","icon-class":"loginOut"},on:{click:function(t){return e.loginOut()}}})],1)],1)])],1)},i=[],s={name:"Header",computed:{},data:function(){return{}},created:function(){},methods:{toHome:function(){this.$router.push("/home")},loginOut:function(){sessionStorage.clear(),this.$router.push("/")},newWindow:function(){window.open("https://github.com/ouchengle")}}},r=s,o=(a("0454"),a("2877")),c=Object(o["a"])(r,n,i,!1,null,"b41ab18a",null);t["a"]=c.exports},"0454":function(e,t,a){"use strict";var n=a("3414"),i=a.n(n);i.a},"1da1":function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));a("d3b7"),a("e6cf");function n(e,t,a,n,i,s,r){try{var o=e[s](r),c=o.value}catch(l){return void a(l)}o.done?t(c):Promise.resolve(c).then(n,i)}function i(e){return function(){var t=this,a=arguments;return new Promise((function(i,s){var r=e.apply(t,a);function o(e){n(r,i,s,o,c,"next",e)}function c(e){n(r,i,s,o,c,"throw",e)}o(void 0)}))}}},3414:function(e,t,a){},"35a7":function(e,t,a){},"498a":function(e,t,a){"use strict";var n=a("23e7"),i=a("58a8").trim,s=a("c8d2");n({target:"String",proto:!0,forced:s("trim")},{trim:function(){return i(this)}})},5319:function(e,t,a){"use strict";var n=a("d784"),i=a("825a"),s=a("7b0b"),r=a("50c4"),o=a("a691"),c=a("1d80"),l=a("8aa5"),u=a("14c3"),d=Math.max,f=Math.min,h=Math.floor,m=/\$([$&'`]|\d\d?|<[^>]*>)/g,g=/\$([$&'`]|\d\d?)/g,p=function(e){return void 0===e?e:String(e)};n("replace",2,(function(e,t,a,n){var v=n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,x=n.REPLACE_KEEPS_$0,w=v?"$":"$0";return[function(a,n){var i=c(this),s=void 0==a?void 0:a[e];return void 0!==s?s.call(a,i,n):t.call(String(i),a,n)},function(e,n){if(!v&&x||"string"===typeof n&&-1===n.indexOf(w)){var s=a(t,e,this,n);if(s.done)return s.value}var c=i(e),h=String(this),m="function"===typeof n;m||(n=String(n));var g=c.global;if(g){var y=c.unicode;c.lastIndex=0}var C=[];while(1){var _=u(c,h);if(null===_)break;if(C.push(_),!g)break;var M=String(_[0]);""===M&&(c.lastIndex=l(h,r(c.lastIndex),y))}for(var k="",A=0,E=0;E<C.length;E++){_=C[E];for(var S=String(_[0]),N=d(f(o(_.index),h.length),0),$=[],O=1;O<_.length;O++)$.push(p(_[O]));var T=_.groups;if(m){var L=[S].concat($,N,h);void 0!==T&&L.push(T);var I=String(n.apply(void 0,L))}else I=b(S,h,N,$,T,n);N>=A&&(k+=h.slice(A,N)+I,A=N+S.length)}return k+h.slice(A)}];function b(e,a,n,i,r,o){var c=n+e.length,l=i.length,u=g;return void 0!==r&&(r=s(r),u=m),t.call(o,u,(function(t,s){var o;switch(s.charAt(0)){case"$":return"$";case"&":return e;case"`":return a.slice(0,n);case"'":return a.slice(c);case"<":o=r[s.slice(1,-1)];break;default:var u=+s;if(0===u)return t;if(u>l){var d=h(u/10);return 0===d?t:d<=l?void 0===i[d-1]?s.charAt(1):i[d-1]+s.charAt(1):t}o=i[u-1]}return void 0===o?"":o}))}}))},"615a":function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n=function(){return window.innerHeight}},a434:function(e,t,a){"use strict";var n=a("23e7"),i=a("23cb"),s=a("a691"),r=a("50c4"),o=a("7b0b"),c=a("65f0"),l=a("8418"),u=a("1dde"),d=a("ae40"),f=u("splice"),h=d("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,g=Math.min,p=9007199254740991,v="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!f||!h},{splice:function(e,t){var a,n,u,d,f,h,x=o(this),w=r(x.length),b=i(e,w),y=arguments.length;if(0===y?a=n=0:1===y?(a=0,n=w-b):(a=y-2,n=g(m(s(t),0),w-b)),w+a-n>p)throw TypeError(v);for(u=c(x,n),d=0;d<n;d++)f=b+d,f in x&&l(u,d,x[f]);if(u.length=n,a<n){for(d=b;d<w-n;d++)f=d+n,h=d+a,f in x?x[h]=x[f]:delete x[h];for(d=w;d>w-n+a;d--)delete x[d-1]}else if(a>n)for(d=w-n;d>b;d--)f=d+n-1,h=d+a-1,f in x?x[h]=x[f]:delete x[h];for(d=0;d<a;d++)x[d+b]=arguments[d+2];return x.length=w-n+a,u}})},b6dd:function(e,t,a){"use strict";var n=a("35a7"),i=a.n(n);i.a},c8d2:function(e,t,a){var n=a("d039"),i=a("5899"),s="​᠎";e.exports=function(e){return n((function(){return!!i[e]()||s[e]()!=s||i[e].name!==e}))}},c975:function(e,t,a){"use strict";var n=a("23e7"),i=a("4d64").indexOf,s=a("a640"),r=a("ae40"),o=[].indexOf,c=!!o&&1/[1].indexOf(1,-0)<0,l=s("indexOf"),u=r("indexOf",{ACCESSORS:!0,1:0});n({target:"Array",proto:!0,forced:c||!l||!u},{indexOf:function(e){return c?o.apply(this,arguments)||0:i(this,e,arguments.length>1?arguments[1]:void 0)}})},d32f:function(e,t,a){"use strict";var n=a("e35a"),i=a.n(n);i.a},d630:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{style:e.createCLAClass,attrs:{id:"createCLA"}},[a("v-header"),a("div",{attrs:{id:"section"}},[a("el-col",{attrs:{offset:6,span:12}},[a("p",[e._v("Edit your metaData")]),a("div",e._l(e.metaTags,(function(t,n){return a("el-tag",{key:t,staticClass:"pointer",attrs:{closable:"","disable-transitions":!1},on:{click:function(t){return e.chooseMeta(n)},close:function(a){return e.closeMetaTag(t,n)}}},[e._v(" "+e._s(t)+" ")])})),1),e.isAddNewMetaFile?a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[a("el-col",{staticStyle:{"padding-right":"2rem"},attrs:{span:20}},[a("el-input",{staticStyle:{"margin-bottom":"0.5rem"},attrs:{size:"small",placeholder:"please input file name"},model:{value:e.newMetaFileName,callback:function(t){e.newMetaFileName=t},expression:"newMetaFileName"}})],1),a("el-select",{staticStyle:{width:"8rem"},attrs:{size:"small",value:""},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.languageOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1):a("div",[a("el-button",{staticClass:"pointer",attrs:{size:"mini"},on:{click:function(t){return e.clickAddNewMetaFile()}}},[e._v("+ add new file")])],1),a("el-input",{staticClass:"textAreaClass",attrs:{readonly:!e.isEditMeta,rows:"15",type:"textarea"},model:{value:e.metaData,callback:function(t){e.metaData=t},expression:"metaData"}}),a("div",{staticStyle:{"margin-top":"1rem",display:"flex","justify-content":"space-between"}},[a("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],attrs:{size:"medium",disabled:!e.verifyNotNull(),type:"primary"},on:{click:function(t){return e.uploadMeta()}}},[e._v("create Metadata ")])],1)],1)],1),a("v-footer")],1)},i=[],s=(a("99af"),a("4160"),a("c975"),a("a434"),a("b0c0"),a("ac1f"),a("5319"),a("498a"),a("159b"),a("96cf"),a("1da1")),r=a("0418"),o=a("fd2d"),c=a("615a"),l=a("221d"),u={name:"CreateCLA",components:{"v-header":r["a"],"v-footer":o["a"]},data:function(){return{currentIndex:"",access_token:this.$store.state.access_token,refresh_token:this.$store.state.refresh_token,isAddNewMetaFile:!1,isEditMeta:!1,metaText:"",newMetaFileName:"",metaTags:[],addNewFile:!1,isEdit:!1,metaOptions:[{value:0,text:"{userName:{type:string,require:true},email:{type:string,require:true},}"}],fullscreenLoading:!1,metaName:"",value:0,languageOptions:[{value:0,label:"english"},{value:1,label:"chinese"}],metaData:"",createCLAClass:{height:""},platform:this.$store.state.platform,user:{userName:this.$store.state.user.userName,userId:this.$store.state.user.userId}}},methods:{clickAddNewMetaFile:function(){this.isAddNewMetaFile=!0,this.metaData="",this.isEditMeta=!0},chooseMeta:function(e){console.log("chooseMeta",e),this.metaData=this.metaOptions[e].text,this.isEditMeta=!1,this.isAddNewMetaFile=!1,this.newMetaFileName="",this.currentIndex=e},closeMetaTag:function(e,t){var a=this;this.$axios({url:"/api".concat(l["delMeta"],"/").concat(this.metaOptions[t].id),method:"delete",headers:{"Access-Token":this.access_token,"Refresh-Token":this.refresh_token,User:"".concat(this.platform,"/").concat(this.user.userName)}}).then((function(n){console.log(n),a.metaTags.splice(a.metaTags.indexOf(e),1),a.getMeta(),a.currentIndex===t&&(a.metaData="",a.currentIndex="")})).catch((function(e){console.log(e),a.$message.error("已有绑定关系，无法删除")}))},getMeta:function(){var e=this;console.log("getMeta"),this.$axios({url:"/api"+l["getMeta"],headers:{"Access-Token":this.access_token,"Refresh-Token":this.refresh_token,User:"".concat(this.platform,"/").concat(this.user.userName)}}).then((function(t){console.log(t),t.data.length&&(e.metaOptions=[],e.metaTags=[],t.data.forEach((function(t,a){e.metaTags.push(t.name),e.metaOptions.push({value:a,label:t.name,id:t.id,text:t.text,language:t.language})})))})).catch((function(e){console.log(e)}))},metaTextChange:function(e){console.log(e)},verifyNotNull:function(){return this.isAddNewMetaFile?""!==this.newMetaFileName.trim()&&""!==this.metaData.trim():""!==this.metaData.trim()},uploadMeta:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.fullscreenLoading=!0,a={name:e.newMetaFileName,text:e.metaData,language:e.languageOptions[e.value].label,submitter:"".concat(e.platform,"/").concat(e.user.userName)},console.log(a),e.$axios({url:"/api"+l["uploadMeta"],method:"post",data:a,headers:{"Access-Token":e.access_token,"Refresh-Token":e.refresh_token,User:"".concat(e.platform,"/").concat(e.user.userName)}}).then((function(t){console.log(t),e.fullscreenLoading=!1,e.$message.success("succeed"),setTimeout((function(){e.$router.replace("/home")}),2e3)})).catch((function(t){console.log(t),e.fullscreenLoading=!1,e.$message.error("failed")}));case 4:case"end":return t.stop()}}),t)})))()},setClientHeight:function(){var e=this;this.$nextTick((function(){console.log(c["a"]()),console.log(document.getElementById("createCLA").offsetHeight),c["a"]()>document.getElementById("createCLA").offsetHeight?e.createCLAClass.height=c["a"]()+"px":e.createCLAClass.height=document.getElementById("createCLA").offsetHeight}))},copy:function(){console.log(this.claText),this.init()},init:function(){var e=this.claText.replace(/\r\n/g,"<br/>").replace(/\n/g,"<br/>").replace(/\s/g," ");console.log(e),this.metaData=e}},created:function(){this.getMeta()},mounted:function(){this.setClientHeight()}};window.onresize=function(){c["a"]()>document.getElementById("createCLA").offsetHeight&&(document.getElementById("createCLA").style.height=c["a"]()+"px")};var d=u,f=(a("b6dd"),a("2877")),h=Object(f["a"])(d,n,i,!1,null,"230a6923",null);t["default"]=h.exports},e35a:function(e,t,a){},fd2d:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-row",{staticClass:"footer"},[a("el-col",{staticClass:"left",attrs:{span:8}},[a("span",[e._v("© 2020 HUAWEI SE")])]),a("el-col",{staticClass:"center",attrs:{span:8}},[a("span",[e._v("Made with "),a("svg-icon",{attrs:{"icon-class":"heart"}}),e._v(" from the GitHub team at HUAWEI ")],1)]),a("el-col",{staticClass:"right",attrs:{span:8}},[a("div",[a("span",{staticClass:"pointer"},[e._v("Terms of Service & Privacy Policy")]),a("span",{staticClass:"pointer"},[a("svg-icon",{attrs:{id:"github_logo","icon-class":"github"}}),e._v("Open an issue")],1)])])],1)},i=[],s={name:"Footer"},r=s,o=(a("d32f"),a("2877")),c=Object(o["a"])(r,n,i,!1,null,"023530e2",null);t["a"]=c.exports}}]);
//# sourceMappingURL=chunk-795e3106.de574910.js.map