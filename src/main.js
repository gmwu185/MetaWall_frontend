import '@babel/polyfill';

import Vue from 'vue';
import jQuery from 'jquery';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';

const initVendors = () => {
  window.Vue = Vue; // 將 Vue 物件掛到全域 window 下
  window.jQuery = window.$ = jQuery;  // 將 jQuery 物件透過連續賦值到全域 window 下
  window.bootstrap = bootstrap; // 將 bootstrap 指向全域
  /** bootstrap 在任何地方啟用彈出提示框
   * https://bootstrap5.hexschool.com/docs/5.0/components/popovers/
   */
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  /** bootstrap 在任何地方啟用工具提示
   * https://bootstrap5.hexschool.com/docs/5.0/components/tooltips/#example-enable-tooltips-everywhere
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
};
initVendors()

// import 'images/logo.png'; // webpack 注入圖片
import 'scss/main.scss';
