import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { LoadingInit, ReportInit } from '../init_notiflix';
LoadingInit(Loading), ReportInit(Report);

import API_behavior from '../vue_controllers/API_behavior';

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: API_behavior.apiUrl,
    cookieToken: '',
    userData: {
      userName: 'Member',
    },
    likeList: [],
    errorMessage: {
      updatePassword: '',
    },
  },
  methods: {
    getCookieToken: API_behavior.getCookieToken,
    checkLogIn: API_behavior.checkLogIn,
    signout: API_behavior.signout,
    getProfile: API_behavior.getProfile,
    getLikeList: function () {
      const likeListApi = `${this.apiUrl}/user/like-list`;
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common.Authorization = `Bearer ${this.cookieToken}`; // 將 Token 加入到 Headers 內
        axios
          .get(likeListApi)
          .then((res) => {
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
            Report.failure(
              '發生錯誤',
              `<p class="mb-0 text-center">讀取個人資料發生錯誤，原因：${error.response.data.message}</p>`,
              '確定'
            );
          });
      });
    },
    renderLikeList: async function () {
      Loading.custom('讀取中 ...');
      const likes = await this.getLikeList();
      this.likeList = likes.data;
      Loading.remove();
    },
  },
  created: async function () {
    Loading.custom('讀取中 ...');
    this.getCookieToken();
    this.checkLogIn();
    const getProfileData = await this.getProfile();
    if (getProfileData) {
      const { _id, avatarUrl, email, gender, userName } = getProfileData.data;
      const getUserData = { _id, avatarUrl, email, gender, userName };
      this.userData = getUserData;
    }
    await this.renderLikeList();
  },
});
