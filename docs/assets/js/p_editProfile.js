!function(e){var o={};function t(a){if(o[a])return o[a].exports;var r=o[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=o,t.d=function(e,o,a){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:a})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(t.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)t.d(a,r,function(o){return e[o]}.bind(null,r));return a},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="",t(t.s=359)}({12:function(e,o,t){"use strict";o.a={apiUrl:"//damp-shore-91853.herokuapp.com",getCookieToken:function(){this.cookieToken=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,"$1")},checkLogIn:function(){var e=this.cookieToken,o=location.pathname.split("/"),t=o[o.length-1]=="".concat("login.html"),a="index.html"==o[o.length-1],r="register.html"==o[o.length-1];t||a||r||""==e&&(alert("未正常登入或 Token 過期，點按確定按鈕後導回登入頁，請重新登入！"),document.location.href="login.html")},signout:function(){document.cookie="token=; expires=; path=/",this.cookieToken="",alert("完成登出"),this.checkLogIn()}}},359:function(e,o,t){"use strict";t.r(o);var a=t(12);new Vue({el:"#app",data:{apiUrl:a.a.apiUrl,isLoading:!1,cookieToken:"",userData:{},updatePassword:{newPassword:"",confirmNewPassword:""},errorMessage:{updatePassword:""}},methods:{getCookieToken:a.a.getCookieToken,checkLogIn:a.a.checkLogIn,signout:a.a.signout,getProfile:function(){var e=this,o="".concat(this.apiUrl,"/user/profile");axios.defaults.headers.common.Authorization="Bearer ".concat(this.cookieToken),axios.get(o).then((function(o){e.userData=o.data.data,e.isLoading=!1})).catch((function(e){console.log("error.request",e.request);var o=JSON.parse(e.request.response);console.log("profileApi error.request.response",o),alert("讀取個人資料發生錯誤，原因：".concat(e.response.data.message))}))},patchProfile:function(){var e=this,o="".concat(this.apiUrl,"/user/profile");console.log("this.userData",this.userData);var t=this.userData,a=t.avatarUrl,r=t.email,n=t.gender,s=t.userName;this.isLoading=!0,axios.patch(o,{avatarUrl:a,email:r,gender:n,userName:s},{Authorization:"Bearer ".concat(this.cookieToken)}).then((function(o){console.log("axios ajax res.data.data",o.data.data),e.isLoading=!1,alert("修改個人資料更新成功！")})).catch((function(o){console.log("axios ajax error.response.data",o.response.data),alert("發生錯誤，原因：".concat(o.response.data.message)),e.isLoading=!1}))},update_password:function(){console.log("update_password");var e="".concat(this.apiUrl,"/user/update-password"),o=this;o.isLoading=!0;var t=this.updatePassword,a=t.newPassword,r=t.confirmNewPassword;axios.patch(e,{newPassword:a,confirmNewPassword:r},{Authorization:"Bearer ".concat(this.cookieToken)}).then((function(e){console.log("axios ajax res.data",e.data),alert("重設密碼更新成功！"),o.isLoading=!1})).catch((function(e){var t=e.response.data;console.log("errorObj",t),o.errorMessage.updatePassword=t.message,o.isLoading=!1}))}},created:function(){this.isLoading=!0,this.getCookieToken(),this.checkLogIn(),this.getProfile()}})}});