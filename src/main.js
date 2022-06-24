import '@babel/polyfill';

import Vue from 'vue';
import $ from 'jquery';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';

// const bootstrapInputSpinner = import bootstrapInputSpinner from 'bootstrap-input-spinner/src/bootstrap-input-spinner.js';
// import bootstrapInputSpinner from 'bootstrap-input-spinner/src/bootstrap-input-spinner.js';
// console.log('bootstrapInputSpinner', bootstrapInputSpinner);

const initVendors = () => {
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

// import 'images/logo.png'; // webpack 注入圖片
import 'scss/main.scss';
