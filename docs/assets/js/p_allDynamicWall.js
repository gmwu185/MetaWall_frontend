!function(e){function o(o){for(var r,i,c=o[0],s=o[1],u=o[2],f=0,p=[];f<c.length;f++)i=c[f],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&p.push(n[i][0]),n[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(l&&l(o);p.length;)p.shift()();return a.push.apply(a,u||[]),t()}function t(){for(var e,o=0;o<a.length;o++){for(var t=a[o],r=!0,c=1;c<t.length;c++){var s=t[c];0!==n[s]&&(r=!1)}r&&(a.splice(o--,1),e=i(i.s=t[0]))}return e}var r={},n={2:0},a=[];function i(o){if(r[o])return r[o].exports;var t=r[o]={i:o,l:!1,exports:{}};return e[o].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=r,i.d=function(e,o,t){i.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,o){if(1&o&&(e=i(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)i.d(t,r,function(o){return e[o]}.bind(null,r));return t},i.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(o,"a",o),o},i.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},i.p="";var c=window.webpackJsonp=window.webpackJsonp||[],s=c.push.bind(c);c.push=o,c=c.slice();for(var u=0;u<c.length;u++)o(c[u]);var l=s;a.push([367,0]),t()}({2:function(e,o,t){"use strict";var r=t(1),n="//".concat("gmwu.hopto.org");o.a={apiUrl:n,pg_urlParaObj:function(){location;var e=location.search,o={};""!==e&&e.split("?")[1].split("&").forEach((function(e){o[e.split("=")[0]]=e.split("=")[1]}));return o},noTokenKickPatch:"index.html",getCookieToken:function(){this.cookieToken=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,"$1")},checkLogIn:function(){var e=this.cookieToken,o=location.pathname.split("/"),t=o[o.length-1]=="".concat("index.html"),n="index.html"==o[o.length-1],a="register.html"==o[o.length-1];t||n||a||""==e&&(r.Notify.warning("Token 過期或登出，五秒後導回登入頁，請重新登入！"),setTimeout((function(){document.location.href="index.html"}),5e3))},signout:function(){document.cookie="token=; expires=; path=/",this.cookieToken="",r.Notify.success("完成登出"),this.checkLogIn()},getProfile:function(){var e=this,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t="".concat(this.apiUrl,"/user/profile?queryUser=").concat(o);return new Promise((function(o,n){axios.defaults.headers.common.Authorization="Bearer ".concat(e.cookieToken),axios.get(t).then((function(e){o(e.data)})).catch((function(e){n(e),console.log("err.request",e.request);var o=JSON.parse(e.request.response);console.log("profileApi err.request.response",o),r.Notify.failure("讀取個人資料發生錯誤，".concat(e.response.data.message,"，將在五秒後導向登入頁面！")),setTimeout((function(){document.location.href="index.html"}),5e3)}))}))}}},367:function(e,o,t){"use strict";t.r(o);var r=t(2),n=t(3),a=t(5),i=t(1),c=t(4);function s(e,o,t,r,n,a,i){try{var c=e[a](i),s=c.value}catch(e){return void t(e)}c.done?o(s):Promise.resolve(s).then(r,n)}Object(c.b)(n.Loading),Object(c.d)(a.Report),Object(c.c)(i.Notify);new Vue({el:"#app",data:{apiUrl:r.a.apiUrl,cookieToken:"",userData:{userName:"Member"},posts:{data:[],isLoad:!0},errorMessage:{updatePassword:""}},methods:{getCookieToken:r.a.getCookieToken,checkLogIn:r.a.checkLogIn,signout:r.a.signout,getProfile:r.a.getProfile,getPosts:function(e){var o=e.timeSortStr,t=void 0===o?"":o,n=e.queryStr,i=void 0===n?"":n,c="".concat(this.apiUrl,"/posts?timeSort=").concat(t,"&q=").concat(i);return new Promise((function(e,o){axios.get(c).then((function(o){e(o.data)})).catch((function(e){o(e),a.Report.failure("讀取個人資料發生錯誤","原因：".concat(e.response.data.message,"，將自動導向登入頁請重新登入。"),"確定"),setTimeout((function(){document.location.href=r.a.noTokenKickPatch}),5e3)}))}))},sendPostsSearch:function(e){var o=this,t=e.timeSortStr,r=e.queryStr;this.posts.isLoad=!0,this.getPosts({timeSortStr:t,queryStr:r}).then((function(e){o.posts.data=e.data,o.posts.isLoad=!1}))}},created:function(){var e=this;try{n.Loading.custom("讀取中 ..."),this.getCookieToken(),this.checkLogIn(),this.getProfile().then(function(){var o,t=(o=regeneratorRuntime.mark((function o(t){var r,a,i,c,s,u,l;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return r=t.data,a=r._id,i=r.avatarUrl,c=r.email,s=r.gender,u=r.userName,l={_id:a,avatarUrl:i,email:c,gender:s,userName:u},e.userData=l,e.posts.isLoad=!0,o.next=6,e.getPosts({}).then((function(o){e.posts.data=o.data,e.posts.isLoad=!1}));case 6:n.Loading.remove();case 7:case"end":return o.stop()}}),o)})),function(){var e=this,t=arguments;return new Promise((function(r,n){var a=o.apply(e,t);function i(e){s(a,r,n,i,c,"next",e)}function c(e){s(a,r,n,i,c,"throw",e)}i(void 0)}))});return function(e){return t.apply(this,arguments)}}())}catch(e){a.Report.failure("產生錯誤","原因：".concat(e.response.data.message),"確定")}}})},4:function(e,o,t){"use strict";t.d(o,"b",(function(){return n})),t.d(o,"a",(function(){return a})),t.d(o,"d",(function(){return i})),t.d(o,"c",(function(){return c}));var r={primary:{hex:"#03438D",overlay:"rgba(3, 67, 141, 0.9)"},success:{hex:"#83C51D",overlay:"rgba(131,197,29,0.2)"},failure:{hex:"#F57375",overlay:"rgba(245,115,117,0.2)"},warning:{hex:"#EEC32A",overlay:"rgba(238, 195, 42,0.2)"}},n=function(e){return e.init({svgSize:"150px",backgroundColor:r.primary.overlay,messageFontSize:"14px",customSvgUrl:"assets/static-images/MetaWall_logo.png"})},a=function(e){return e.init({titleColor:r.primary.hex,okButtonBackground:r.primary.hex,borderRadius:"8px",plainText:!1})},i=function(e){return e.init({borderRadius:"8px",svgSize:"40px",plainText:!1,success:{buttonBackground:r.success.hex,buttonColor:"#000",backOverlayColor:r.success.overlayColor},failure:{buttonBackground:r.failure.hex,buttonColor:"#fff",backOverlayColor:r.failure.overlayColor},warning:{buttonBackground:r.warning.hex,buttonColor:"#fff",backOverlayColor:r.warning.overlayColor}})},c=function(e){return e.init({borderRadius:"8px",timeout:4e3,messageMaxLength:110,backOverlay:!1,backOverlayColor:r.primary.overlay,plainText:!0,clickToClose:!1,pauseOnHover:!0,zindex:4001,fontSize:"15px",success:{notiflixIconColor:"rgba(0, 0, 0, .7)",background:r.success.hex,textColor:"#000",backOverlayColor:r.success.overlayColor},failure:{notiflixIconColor:"rgba(255, 255, 255, .7)",background:r.failure.hex,textColor:"#fff",backOverlayColor:r.failure.overlayColor},warning:{notiflixIconColor:"rgba(0, 0, 0, .7)",background:r.warning.hex,textColor:"#000",backOverlayColor:r.warning.overlayColor}})}}});