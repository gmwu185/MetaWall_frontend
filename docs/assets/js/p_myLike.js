!function(e){function r(r){for(var o,i,c=r[0],u=r[1],s=r[2],f=0,p=[];f<c.length;f++)i=c[f],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&p.push(n[i][0]),n[i]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);for(l&&l(r);p.length;)p.shift()();return a.push.apply(a,s||[]),t()}function t(){for(var e,r=0;r<a.length;r++){for(var t=a[r],o=!0,c=1;c<t.length;c++){var u=t[c];0!==n[u]&&(o=!1)}o&&(a.splice(r--,1),e=i(i.s=t[0]))}return e}var o={},n={6:0},a=[];function i(r){if(o[r])return o[r].exports;var t=o[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=o,i.d=function(e,r,t){i.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,r){if(1&r&&(e=i(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)i.d(t,o,function(r){return e[r]}.bind(null,o));return t},i.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(r,"a",r),r},i.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},i.p="";var c=window.webpackJsonp=window.webpackJsonp||[],u=c.push.bind(c);c.push=r,c=c.slice();for(var s=0;s<c.length;s++)r(c[s]);var l=u;a.push([370,0]),t()}({2:function(e,r,t){"use strict";var o=t(1),n="//".concat("gmwu.hopto.org");r.a={apiUrl:n,pg_urlParaObj:function(){location;var e=location.search,r={};""!==e&&e.split("?")[1].split("&").forEach((function(e){r[e.split("=")[0]]=e.split("=")[1]}));return r},noTokenKickPatch:"index.html",getCookieToken:function(){this.cookieToken=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,"$1")},checkLogIn:function(){var e=this.cookieToken,r=location.pathname.split("/"),t=r[r.length-1]=="".concat("index.html"),n="index.html"==r[r.length-1],a="register.html"==r[r.length-1];t||n||a||""==e&&(o.Notify.warning("Token 過期或登出，五秒後導回登入頁，請重新登入！"),setTimeout((function(){document.location.href="index.html"}),5e3))},signout:function(){document.cookie="token=; expires=; path=/",this.cookieToken="",o.Notify.success("完成登出"),this.checkLogIn()},getProfile:function(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t="".concat(this.apiUrl,"/user/profile?queryUser=").concat(r);return new Promise((function(r,n){axios.defaults.headers.common.Authorization="Bearer ".concat(e.cookieToken),axios.get(t).then((function(e){r(e.data)})).catch((function(e){n(e),console.log("err.request",e.request);var r=JSON.parse(e.request.response);console.log("profileApi err.request.response",r),o.Notify.failure("讀取個人資料發生錯誤，".concat(e.response.data.message,"，將在五秒後導向登入頁面！")),setTimeout((function(){document.location.href="index.html"}),5e3)}))}))}}},370:function(e,r,t){"use strict";t.r(r);var o=t(3),n=t(5),a=t(4),i=t(2);function c(e,r,t,o,n,a,i){try{var c=e[a](i),u=c.value}catch(e){return void t(e)}c.done?r(u):Promise.resolve(u).then(o,n)}function u(e){return function(){var r=this,t=arguments;return new Promise((function(o,n){var a=e.apply(r,t);function i(e){c(a,o,n,i,u,"next",e)}function u(e){c(a,o,n,i,u,"throw",e)}i(void 0)}))}}Object(a.b)(o.Loading),Object(a.d)(n.Report);var s,l;new Vue({el:"#app",data:{apiUrl:i.a.apiUrl,cookieToken:"",userData:{userName:"Member"},likeList:[],errorMessage:{updatePassword:""}},methods:{getCookieToken:i.a.getCookieToken,checkLogIn:i.a.checkLogIn,signout:i.a.signout,getProfile:i.a.getProfile,getLikeList:function(){var e=this,r="".concat(this.apiUrl,"/user/like-list");return new Promise((function(t,o){axios.defaults.headers.common.Authorization="Bearer ".concat(e.cookieToken),axios.get(r).then((function(e){t(e.data)})).catch((function(e){o(e),n.Report.failure("發生錯誤",'<p class="mb-0 text-center">讀取個人資料發生錯誤，原因：'.concat(e.response.data.message,"</p>"),"確定")}))}))},renderLikeList:(l=u(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getLikeList();case 2:r=e.sent,this.likeList=r.data;case 4:case"end":return e.stop()}}),e,this)}))),function(){return l.apply(this,arguments)})},created:(s=u(regeneratorRuntime.mark((function e(){var r,t,n,a,i,c,u,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o.Loading.custom("讀取中 ..."),this.getCookieToken(),this.checkLogIn(),e.next=5,this.getProfile();case 5:return(r=e.sent)&&(t=r.data,n=t._id,a=t.avatarUrl,i=t.email,c=t.gender,u=t.userName,s={_id:n,avatarUrl:a,email:i,gender:c,userName:u},this.userData=s),e.next=9,this.renderLikeList();case 9:o.Loading.remove();case 10:case"end":return e.stop()}}),e,this)}))),function(){return s.apply(this,arguments)})})},4:function(e,r,t){"use strict";t.d(r,"b",(function(){return n})),t.d(r,"a",(function(){return a})),t.d(r,"d",(function(){return i})),t.d(r,"c",(function(){return c}));var o={primary:{hex:"#03438D",overlay:"rgba(3, 67, 141, 0.9)"},success:{hex:"#83C51D",overlay:"rgba(131,197,29,0.2)"},failure:{hex:"#F57375",overlay:"rgba(245,115,117,0.2)"},warning:{hex:"#EEC32A",overlay:"rgba(238, 195, 42,0.2)"}},n=function(e){return e.init({svgSize:"150px",backgroundColor:o.primary.overlay,messageFontSize:"14px",customSvgUrl:"assets/static-images/MetaWall_logo.png"})},a=function(e){return e.init({titleColor:o.primary.hex,okButtonBackground:o.primary.hex,borderRadius:"8px",plainText:!1})},i=function(e){return e.init({borderRadius:"8px",svgSize:"40px",plainText:!1,success:{buttonBackground:o.success.hex,buttonColor:"#000",backOverlayColor:o.success.overlayColor},failure:{buttonBackground:o.failure.hex,buttonColor:"#fff",backOverlayColor:o.failure.overlayColor},warning:{buttonBackground:o.warning.hex,buttonColor:"#fff",backOverlayColor:o.warning.overlayColor}})},c=function(e){return e.init({borderRadius:"8px",timeout:4e3,messageMaxLength:110,backOverlay:!1,backOverlayColor:o.primary.overlay,plainText:!0,clickToClose:!1,pauseOnHover:!0,zindex:4001,fontSize:"15px",success:{notiflixIconColor:"rgba(0, 0, 0, .7)",background:o.success.hex,textColor:"#000",backOverlayColor:o.success.overlayColor},failure:{notiflixIconColor:"rgba(255, 255, 255, .7)",background:o.failure.hex,textColor:"#fff",backOverlayColor:o.failure.overlayColor},warning:{notiflixIconColor:"rgba(0, 0, 0, .7)",background:o.warning.hex,textColor:"#000",backOverlayColor:o.warning.overlayColor}})}}});