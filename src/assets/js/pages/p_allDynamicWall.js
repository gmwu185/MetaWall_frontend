import API_behavior from '../vue_controllers/API_behavior';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { LoadingInit, ReportInit, NotifyInit } from '../init_notiflix';
LoadingInit(Loading), ReportInit(Report), NotifyInit(Notify);

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: API_behavior.apiUrl,
    cookieToken: '',
    userData: {
      userName: 'Member',
    },
    posts: {
      data: [],
      isLoad: true,
    },
    errorMessage: {
      updatePassword: '',
    },
  },
  methods: {
    getCookieToken: API_behavior.getCookieToken,
    checkLogIn: API_behavior.checkLogIn,
    signout: API_behavior.signout,
    getProfile: API_behavior.getProfile,
    getPosts({ timeSortStr = '', queryStr = '' }) {
      const postsApi = `${this.apiUrl}/posts?timeSort=${timeSortStr}&q=${queryStr}`;
      return new Promise((resolve, reject) => {
        axios
          .get(postsApi)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
            Report.failure(
              '讀取個人資料發生錯誤',
              `原因：${err.response.data.message}，將自動導向登入頁請重新登入。`,
              '確定'
            );
            setTimeout(() => {
              document.location.href = API_behavior.noTokenKickPatch;
            }, 5000);
          });
      });
    },
    sendPostsSearch: function (param) {
      const { timeSortStr, queryStr } = param;
      this.posts.isLoad = true;
      this.getPosts({
        timeSortStr: timeSortStr,
        queryStr: queryStr,
      }).then((res) => {
        this.posts.data = res.data;
        this.posts.isLoad = false;
      });
    },
  },
  created() {
    try {
      Loading.custom('讀取中 ...');
      this.getCookieToken();
      this.checkLogIn();
      this.getProfile().then(async (res) => {
        const { _id, avatarUrl, email, gender, userName } = res.data;
        const getUserData = { _id, avatarUrl, email, gender, userName };
        this.userData = getUserData;
        this.posts.isLoad = true;
        await this.getPosts({}).then((res) => {
          this.posts.data = res.data;
          this.posts.isLoad = false;
        });
        Loading.remove();
      });
    } catch (error) {
      Report.failure(
        '產生錯誤',
        `原因：${error.response.data.message}`,
        '確定'
      );
    }
  },
});
