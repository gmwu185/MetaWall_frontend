import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { LoadingInit, ReportInit, NotifyInit } from '../init_notiflix';
LoadingInit(Loading), ReportInit(Report), NotifyInit(Notify);

import API_behavior from '../vue_controllers/API_behavior';

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: API_behavior.apiUrl,
    cookieToken: '',
    longInData: {
      email: '',
      password: '',
    },
    userData: {},
    errorMessage: '',
  },
  methods: {
    getCookieToken: API_behavior.getCookieToken,
    checkLogIn: API_behavior.checkLogIn,
    signout: API_behavior.signout,
    sign_in() {
      const sign_inApi = `${this.apiUrl}/user/sign-in`;
      Loading.custom('讀取中 ...');
      axios
        .post(sign_inApi, this.longInData)
        .then((response) => {
          const token = response.data.data.token;
          if (response.data.status == 'success') {
            let theDay = new Date(); // 建立時間物件
            let changeDay = 1; // 設定要往前或往後幾天
            let expiredTimeStamp = theDay.setDate(theDay.getDate() + changeDay);
            document.cookie = `token=${token}; expires=${new Date(
              expiredTimeStamp * 1000
            )}; path=/`;
            this.longInData.password = ''; // 確任項目點按後清空密碼輸入框
            Loading.remove();
            const gotoFirstPath = 'allDynamicWall.html';
            if (document.location.pathname !== `/${gotoFirstPath}`) {
              document.location.href = 'allDynamicWall.html';
            }
          }
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message.errorMessage;
          Notify.failure(this.errorMessage);
          Loading.remove();
        });
    },
  },
  created() {
    this.getCookieToken();
    Loading.custom('讀取中 ...');
    setTimeout(() => {
      Loading.remove();
    }, 1500);
    this.checkLogIn();
  },
  // mounted() {
  //   $("input[type='number']").inputSpinner();
  // }
});
