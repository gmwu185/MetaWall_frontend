!function(e){var o={};function t(n){if(o[n])return o[n].exports;var a=o[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var a in e)t.d(n,a,function(o){return e[o]}.bind(null,a));return n},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="",t(t.s=359)}({1:function(e,o,t){"use strict";o.a={apiUrl:"//damp-shore-91853.herokuapp.com",getCookieToken:function(){this.cookieToken=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,"$1")},checkLogIn:function(){var e=this.cookieToken,o=location.pathname.split("/"),t=o[o.length-1]=="".concat("login.html"),n="index.html"==o[o.length-1],a="register.html"==o[o.length-1];t||n||a||""==e&&(alert("Token 過期或登出，點按確定按鈕後導回登入頁，請重新登入！"),document.location.href="login.html")},signout:function(){document.cookie="token=; expires=; path=/",this.cookieToken="",alert("完成登出"),this.checkLogIn()},getProfile:function(){var e=this,o="".concat(this.apiUrl,"/user/profile");return new Promise((function(t,n){axios.defaults.headers.common.Authorization="Bearer ".concat(e.cookieToken),axios.get(o).then((function(e){t(e.data)})).catch((function(e){n(e),console.log("err.request",e.request);var o=JSON.parse(e.request.response);console.log("profileApi err.request.response",o),alert("讀取個人資料發生錯誤，原因：".concat(e.response.data.message)),document.location.href="login.html"}))}))}}},359:function(e,o,t){"use strict";t.r(o);var n=t(1);new Vue({el:"#app",data:{apiUrl:n.a.apiUrl,isLoading:!1,cookieToken:"",longInData:{email:"",password:""},userData:{},errorMessage:""},methods:{getCookieToken:n.a.getCookieToken,checkLogIn:n.a.checkLogIn,signout:n.a.signout,sign_in:function(){var e=this,o="".concat(this.apiUrl,"/user/sign-in");this.isLoading=!0,axios.post(o,this.longInData).then((function(o){console.log("response",o);var t=o.data.data.token;if(console.log("sign-in ".concat(o.data.status)),"success"==o.data.status){var n=new Date,a=n.setDate(n.getDate()+1);document.cookie="token=".concat(t,"; expires=").concat(new Date(1e3*a),"; path=/"),e.longInData.password="",e.cookieToken&&console.log("先前已登入過"),e.isLoading=!1;document.location.pathname!=="/".concat("allDynamicWall.html")&&(document.location.href="allDynamicWall.html")}})).catch((function(o){var t=JSON.parse(o.response.request.response);console.log(t.message),e.errorMessage=t.message,e.isLoading=!1}))},getProfileApiData:function(){var e=this,o="".concat(this.apiUrl,"user/profile");this.cookieToken?(axios.defaults.headers.common.Authorization="Bearer ".concat(this.cookieToken),axios.get(o).then((function(o){e.userData=o.data.data,console.log("profileApi -> response",e.userData)})).catch((function(e){console.log("error.request",e.request);var o=JSON.parse(e.request.response);console.log("profileApi error.request.response",o)}))):alert("沒登入過會登入不成功")}},created:function(){var e=this;this.getCookieToken(),this.isLoading=!0,setTimeout((function(){e.isLoading=!1}),1500),this.checkLogIn()}})}});