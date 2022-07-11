import axios from 'axios';
import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import VueAxios from 'vue-axios';
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
  localize,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules'; // 匯入全部的規則
import zh_TW from 'vee-validate/dist/locale/zh_TW.json';

const set_Vue = () => {
  window.Vue = Vue; // 將 Vue 物件掛到全域 window 下
};
const set_VueAxios = () => Vue.use(VueAxios, axios);
const set_Loading = () => Vue.component('Loading', Loading);
const set_veeValidate = () => {
  /** VeeValidate 3 與 語系設定資料
   * ! 竹白記事本 - Vue筆記 - 表單驗證套件 VeeValidate
    (https://chupai.github.io/posts/200328_vee-validate/)
   * [Vue] 跟著 Vue 闖蕩前端世界 - 12 使用 vee-validate 進行多語系表單資料驗證
    (https://dotblogs.com.tw/wasichris/2018/08/30/003238)
   */

  Object.keys(rules).forEach((rule) => {
    extend(rule, rules[rule]);
  }); // 遍歷、註冊全部的規則

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
};

export { set_Vue, set_VueAxios, set_Loading, set_veeValidate };
