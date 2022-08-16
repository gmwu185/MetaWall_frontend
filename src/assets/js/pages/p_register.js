import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { LoadingInit, NotifyInit } from '../init_notiflix';
LoadingInit(Loading), NotifyInit(Notify);

import API_behavior from '../vue_controllers/API_behavior';

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: API_behavior.apiUrl,
    cookieToken: '',
    userData: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    errorMessage: '',
  },
  methods: {
    sign_up() {
      const profileApi = `${this.apiUrl}/user/sign-up`;
      Loading.custom('讀取中 ...');
      const { confirmPassword, email, password, userName } = this.userData;
      // API 有開 password 與 confirmPassword 欄位要相等，這裡為配合畫面直接使用賦值方式處理。
      axios
        .post(profileApi, {
          password,
          confirmPassword: password,
          email,
          userName,
        })
        .then((response) => {
          const token = response.data.data.token;
          if (response.data.status == 'success') {
            let theDay = new Date(); // 建立時間物件
            let changeDay = 1; // 設定要往前或往後幾天
            let expiredTimeStamp = theDay.setDate(theDay.getDate() + changeDay);
            document.cookie = `token=${token}; expires=${new Date(
              expiredTimeStamp * 1000
            )}; path=/`;
            Notify.success('註冊成功，將導向內容頁面');
            setTimeout(() => {
              const gotoFirstPath = 'allDynamicWall.html';
              if (document.location.pathname !== `/${gotoFirstPath}`) {
                document.location.href = 'allDynamicWall.html';
              }
              Loading.remove();
            }, 3000);
          }
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          Notify.failure(this.errorMessage);
          Loading.remove();
        });
    },
  },
  created() {
    Loading.custom('讀取中 ...');
    setTimeout(() => {
      Loading.remove();
    }, 1500);
  },
});
