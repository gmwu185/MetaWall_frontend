!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=366)}({1:function(e,t,o){"use strict";t.a={apiUrl:"//damp-shore-91853.herokuapp.com",getCookieToken:function(){this.cookieToken=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,"$1")},checkLogIn:function(){var e=this.cookieToken,t=location.pathname.split("/"),o=t[t.length-1]=="".concat("login.html"),n="index.html"==t[t.length-1],r="register.html"==t[t.length-1];o||n||r||""==e&&(alert("Token 過期或登出，點按確定按鈕後導回登入頁，請重新登入！"),document.location.href="login.html")},signout:function(){document.cookie="token=; expires=; path=/",this.cookieToken="",alert("完成登出"),this.checkLogIn()},getProfile:function(){var e=this,t="".concat(this.apiUrl,"/user/profile");return new Promise((function(o,n){axios.defaults.headers.common.Authorization="Bearer ".concat(e.cookieToken),axios.get(t).then((function(e){o(e.data)})).catch((function(e){n(e),console.log("err.request",e.request);var t=JSON.parse(e.request.response);console.log("profileApi err.request.response",t),alert("讀取個人資料發生錯誤，原因：".concat(e.response.data.message)),document.location.href="login.html"}))}))}}},366:function(e,t,o){"use strict";o.r(t);var n=o(1);function r(e,t,o,n,r,i,a){try{var c=e[i](a),u=c.value}catch(e){return void o(e)}c.done?t(u):Promise.resolve(u).then(n,r)}var i,a;new Vue({el:"#app",data:{apiUrl:n.a.apiUrl,isLoading:!1,cookieToken:"",userData:{userName:"Member"},errorMessage:{updatePassword:""}},methods:{getCookieToken:n.a.getCookieToken,checkLogIn:n.a.checkLogIn,signout:n.a.signout,getProfile:n.a.getProfile},created:(i=regeneratorRuntime.mark((function e(){var t,o,n,r,i,a,c,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.isLoading=!0,this.getCookieToken(),this.checkLogIn(),e.next=5,this.getProfile();case 5:(t=e.sent)&&(o=t.data,n=o._id,r=o.avatarUrl,i=o.email,a=o.gender,c=o.userName,u={_id:n,avatarUrl:r,email:i,gender:a,userName:c},this.userData=u,this.isLoading=!1);case 7:case"end":return e.stop()}}),e,this)})),a=function(){var e=this,t=arguments;return new Promise((function(o,n){var a=i.apply(e,t);function c(e){r(a,o,n,c,u,"next",e)}function u(e){r(a,o,n,c,u,"throw",e)}c(void 0)}))},function(){return a.apply(this,arguments)})})}});