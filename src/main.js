import '@babel/polyfill';

import axios from 'axios';
import Vue from 'vue';
import $ from 'jquery';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';
import Loading from 'vue-loading-overlay';
import VueAxios from 'vue-axios';
import { ValidationProvider, ValidationObserver, extend, configure, localize } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules'; // 匯入全部的規則
import zh_TW from 'vee-validate/dist/locale/zh_TW.json';

// const bootstrapInputSpinner = import bootstrapInputSpinner from 'bootstrap-input-spinner/src/bootstrap-input-spinner.js';
// import bootstrapInputSpinner from 'bootstrap-input-spinner/src/bootstrap-input-spinner.js';
// console.log('bootstrapInputSpinner', bootstrapInputSpinner);

const initVendors = () => {
  window.axios = axios;
  window.Vue = Vue; // 將 Vue 物件掛到全域 window 下
  window.jQuery = window.$ = $; // 將 jQuery 物件透過連續賦值到全域 window 下
  window.bootstrap = bootstrap; // 將 bootstrap 指向全域
  /** bootstrap 在任何地方啟用彈出提示框
   * https://bootstrap5.hexschool.com/docs/5.0/components/popovers/
   */
  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  /** bootstrap 在任何地方啟用工具提示
   * https://bootstrap5.hexschool.com/docs/5.0/components/tooltips/#example-enable-tooltips-everywhere
   */
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // 確定有 jQuery 時引入 (IIEF) 套件
  if ($) {
    require('./assets/js/module/bootstrap-input-spinner.js');
    $("input[type='number']").inputSpinner();
  }
};
initVendors();

Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);

// 遍歷、註冊全部的規則
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
});

/** VeeValidate 3 與 語系設定資料
* ! 竹白記事本 - Vue筆記 - 表單驗證套件 VeeValidate (https://chupai.github.io/posts/200328_vee-validate/)
  * [Vue] 跟著 Vue 闖蕩前端世界 - 12 使用 vee-validate 進行多語系表單資料驗證 (https://dotblogs.com.tw/wasichris/2018/08/30/003238)
*/
localize('zh_TW', zh_TW);

/*----------  註冊於全域元件  ----------*/
// 將 VeeValidate 驗證工具載入 input 驗證作為全域註冊
Vue.component('ValidationProvider', ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', ValidationObserver);
// 與 Bootstrp 一樣的驗証 Class 設定檔案
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
/*----------  /註冊於全域元件  ----------*/

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: '//damp-shore-91853.herokuapp.com/',
    isLoading: false,
    cookieToken: '',
    longInData: {
      email: '',
      // email: 'aa@mail.com',
      password: '',
      // password: 'a12345678',
    },
    userData: {},
    errorMessage: ''
  },
  methods: {
    sign_in() {
      const sign_inApi = `${this.apiUrl}user/sign-in`;

      this.isLoading = true;
      axios
        .post(sign_inApi, this.longInData)
        .then((response) => {
          console.log('response', response);
          const token = response.data.data.token;
          alert(`sign-in ${response.data.status}`);
          if (response.data.status == 'success') {
            let theDay = new Date(); // 建立時間物件
            let changeDay = 1; // 設定要往前或往後幾天
            let expiredTimeStamp = theDay.setDate(theDay.getDate() + changeDay);
            
            document.cookie = `token=${token}; expires=${new Date(expiredTimeStamp * 1000)}; path=/`;
            this.longInData.password = ''; // 確任項目點按後清空密碼輸入框
            if (this.cookieToken) {
              alert('先前已登入過')
            }
            this.isLoading = false;
            const gotoFirstPath = 'allDynamicWall.html';
            if (document.location.pathname !== `/${gotoFirstPath}`) {
              document.location.href = 'allDynamicWall.html';
            }
          }
        })
        .catch((error) => {
          // console.log('error', error);
          let jsonParseResponseStr = JSON.parse(error.response.request.response);
          console.log(jsonParseResponseStr.message);
          this.errorMessage = jsonParseResponseStr.message;
          this.isLoading = false;
        });
    },
    getCookieToken() {
      this.cookieToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    },
    getData() {
      const profileApi = `${this.apiUrl}user/profile`;
      if (this.cookieToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${this.cookieToken}`; // 將 Token 加入到 Headers 內
        axios.get(profileApi)
          .then((response) => {
            this.userData = response.data.data;
            console.log('profileApi -> response', this.userData);
          })
          .catch((error) => {
            console.log('error.request', error.request)
            const errorObj = JSON.parse(error.request.response)
            console.log('profileApi error.request.response', errorObj)
          })
      } else {
        alert('沒登入過會登入不成功');
      }
    },
    signout() {
      document.cookie = `token=; expires=; path=/`;
      this.cookieToken = '';
      alert('完成登出');
      this.checkLogIn();
    },
    checkLogIn() {
      const noTokenKickPatch = 'login.html';
      const isHaveCokieToken = this.cookieToken;
      const isKick = document.location.pathname == `/${noTokenKickPatch}`;
      const isLayoutList = document.location.pathname == `/index.html`;
      const isRegister = document.location.pathname == `/register.html`;
      if (isKick || isLayoutList || isRegister) {
        return
      } else {
        if (isHaveCokieToken == '') {
          document.location.href = noTokenKickPatch;
        }
      }
    },
  },
  created() {
    this.getCookieToken();
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
    this.checkLogIn();
  },
});
window.VueAPP = VueAPP;
console.log('vue VueAPP', VueAPP);

import 'scss/main.scss';
