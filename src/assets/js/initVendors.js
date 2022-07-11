import axios from 'axios';
import $ from 'jquery';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';

const set_axios = () => (window.axios = axios);
const set_bootstrap = () => {
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
};
const set_jQ_vendors = () => {
  window.jQuery = window.$ = $; // 將 jQuery 物件透過連續賦值到全域 window 下

  /** bootstrap-input-spinner
   * DEOM (https://shaack.com/projekte/bootstrap-input-spinner/)
   * NPM (https://www.npmjs.com/package/bootstrap-input-spinner)
   * 確定有 jQuery 時引入套件 (IIEF)，無法使用 ES 6 模組引入方式，但在 node 環境下可用 require() 方法引入模組
   * Vue 於 mounted 生命週期時引入，才能不受 Vue 操作 value 時畫面渲染影響
   * 以下註解啟用後直接以全域的方式掛載 bootstrapInputSpinners 插件，與 Vue 整合不需啟用，只需引入至 webpack 打包的模組中待啟用
   */
  if ($) {
    require('./vendor_modules/bootstrap-input-spinner.js');
    // const bootstrapInputSpinners = $("input[type='number'].js-bootstrapInputSpinners").inputSpinner();
    // window.bootstrapInputSpinners = bootstrapInputSpinners;
    // console.log('bootstrapInputSpinners', bootstrapInputSpinners)
  }
};

export { set_axios, set_bootstrap, set_jQ_vendors };
