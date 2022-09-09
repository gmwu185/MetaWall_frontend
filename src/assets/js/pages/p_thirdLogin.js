const VueAPP = new Vue({
  el: '#app',
  data: {},
  methods: {},
  created() {
    setTimeout(() => {
      const urlParaToken = location.search.split('?')[1].split('token=')[1];
      console.log('thirdLogin setTimeout urlParaToken', urlParaToken);
      let theDay = new Date(); // 建立時間物件
      let changeDay = 1; // 設定要往前或往後幾天
      let expiredTimeStamp = theDay.setDate(theDay.getDate() + changeDay);
      document.cookie = `token=${urlParaToken}; expires=${new Date(
        expiredTimeStamp * 1000
      )}; path=/`;
      const gotoFirstPath = 'allDynamicWall.html';
      if (document.location.pathname !== `/${gotoFirstPath}`) {
        document.location.href = 'allDynamicWall.html';
      }
    }, 1500);
  },
});
