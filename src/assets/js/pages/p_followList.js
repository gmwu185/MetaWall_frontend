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
    userData: {
      userName: 'Member',
    },
    followList: [],
    errorMessage: {
      updatePassword: '',
    },
  },
  methods: {
    getCookieToken: API_behavior.getCookieToken,
    checkLogIn: API_behavior.checkLogIn,
    signout: API_behavior.signout,
    getProfile: API_behavior.getProfile,
    getFollowing() {
      const followingApi = `${this.apiUrl}/user/following`;
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common.Authorization = `Bearer ${this.cookieToken}`; // 將 Token 加入到 Headers 內
        axios
          .get(followingApi)
          .then((res) => {
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
            Report.failure(
              '發生錯誤',
              `<p class="mb-0 text-center">${error.response.data.message}</p>`,
              '確定'
            );
          });
      });
    },
  },
  created() {
    Loading.custom('讀取中 ...');
    this.getCookieToken();
    this.checkLogIn();
    this.getProfile().then((res) => {
      const { _id, avatarUrl, email, gender, userName } = res.data;
      const getUserData = { _id, avatarUrl, email, gender, userName };
      this.userData = getUserData;
    });
    this.getFollowing().then((res) => {
      this.followList = res.data;
      Loading.remove();
    });
  },
});
