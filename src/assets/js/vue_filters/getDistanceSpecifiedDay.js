import Vue from 'vue';

export default Vue.filter('getDistanceSpecifiedDay', function (time) {
  if (!time) return '';
  const nowTime = new Date();
  const endTime = new Date(time);
  const t = endTime.getTime() - nowTime.getTime();
  const d = Math.floor(t / 1000 / 60 / 60 / 24);
  return -(d+1);
});

/**
  * 時間格式轉換流程
    1. DB 時間格式：2022-07-26T12:01:53.466Z 
    2. 轉換後 2022/8/1 00:00:00 or 2022/1/10 12:00
    3. 得到的天數會是 '-n' 天數，當會加入會計算 1，負數以 +1 計算啟始計算 (0 開始)
    4. 透過負值轉換為正的天數

  * 參考資料：
    national-language-code-table-zh-tw-zh-cn-en-us-json-format/)
    - [JS] Date Time Method 日期時間 (https://pjchender.dev/javascript/js-date-time/)
    - JavaScript實現距離指定時間還有多少天 (https://blog.csdn.net/dengmengxin/article/details/84625047)
  */
