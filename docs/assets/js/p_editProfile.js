!function(e){var o={};function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)t.d(n,r,function(o){return e[o]}.bind(null,r));return n},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="",t(t.s=359)}({12:function(e,o,t){"use strict";o.a={apiUrl:"//damp-shore-91853.herokuapp.com",getCookieToken:function(){this.cookieToken=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,"$1")},checkLogIn:function(){var e=this.cookieToken,o=location.pathname.split("/"),t=o[o.length-1]=="".concat("login.html"),n="index.html"==o[o.length-1],r="register.html"==o[o.length-1];t||n||r||""==e&&(document.location.href="login.html")},signout:function(){document.cookie="token=; expires=; path=/",this.cookieToken="",alert("完成登出"),this.checkLogIn()}}},359:function(e,o,t){"use strict";t.r(o);var n=t(12);new Vue({el:"#app",data:{apiUrl:n.a.apiUrl,isLoading:!1,cookieToken:"",userData:{},errorMessage:""},methods:{getCookieToken:n.a.getCookieToken,checkLogIn:n.a.checkLogIn,signout:n.a.signout,getProfileApiData:function(){var e=this,o="".concat(this.apiUrl,"/user/profile");axios.defaults.headers.common.Authorization="Bearer ".concat(this.cookieToken),axios.get(o).then((function(o){e.userData=o.data.data,e.isLoading=!1})).catch((function(e){console.log("error.request",e.request);var o=JSON.parse(e.request.response);console.log("profileApi error.request.response",o)}))}},created:function(){this.isLoading=!0,this.getCookieToken(),this.checkLogIn(),this.getProfileApiData()}})}});