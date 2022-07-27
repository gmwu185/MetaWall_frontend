import API_behavior from '../vue_controllers/API_behavior';

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: API_behavior.apiUrl,
    isLoading: false,
    cookieToken: '',
    userData: {
      userName: 'Member',
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
      console.log('getPosts()');
      // const postsApi = `${this.apiUrl}/posts`;
      const postsApi = `${this.apiUrl}/posts?timeSort=${timeSortStr}&q=${queryStr}`;
      return new Promise((resolve, reject) => {
        axios
          .get(postsApi)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);

            console.log('err.request', err.request);
            const errObj = JSON.parse(err.request.response);
            console.log('profileApi err.request.response', errObj);
            alert(`讀取個人資料發生錯誤，原因：${err.response.data.message}`);
            console.log(
              'API_behavior.noTokenKickPatch',
              API_behavior.noTokenKickPatch
            );

            document.location.href = API_behavior.noTokenKickPatch;
          });
      });
    },
    sendSearch: async function (getData) {
      console.log('sendSearch', getData);
      const { timeSortStr, queryStr } = getData;
      const newPosts = await this.getPosts({
        timeSortStr: timeSortStr,
        queryStr: queryStr,
      });
      console.log('newPosts', newPosts);
    },
  },
  created() {
    try {
      this.isLoading = true;
      this.getCookieToken();
      this.checkLogIn();
      this.getProfile().then(async (res) => {
        const { _id, avatarUrl, email, gender, userName } = res.data;
        const getUserData = { _id, avatarUrl, email, gender, userName };
        this.userData = getUserData;

        await this.getPosts({}).then((res) => {
          console.log('created this.getPosts() res', res);
        });

        this.isLoading = false;
      });
    } catch (error) {
      console.log('p_allDynamicWall.js try catch error', error);
    }
  },
});
