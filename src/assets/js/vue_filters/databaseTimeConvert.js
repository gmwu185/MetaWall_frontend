import Vue from 'vue';

export default Vue.filter('databaseTimeConvert', function (time) {
  if (!time) return '';
  return new Date(time).toLocaleString('zh-TW', {
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
});
/**
  * DB 時間格式：2022-07-26T12:01:53.466Z -> 轉換後 2022/1/10 12:00
  * 參考資料：
    - 各國語言(語系)代碼表(zh-tw, zh-cn,en-us...) json 格式 [繁中/簡中/英文格式] (https://hoohoo.top/blog/national-language-code-table-zh-tw-zh-cn-en-us-json-format/)
    - [JS] Date Time Method 日期時間 (https://pjchender.dev/javascript/js-date-time/)
    - MDN - Date.prototype.toLocaleString() (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)
  */
