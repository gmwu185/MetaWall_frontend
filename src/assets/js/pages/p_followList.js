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
          .catch((err) => {
            reject(err);
            console.log('err.request', err.request);
            const errObj = JSON.parse(err.request.response);
            console.log('followingApi err.request.response', errObj);
            alert(
              `取得個人追蹤名單資料發生錯誤，原因：${err.response.data.message}`
            );
          });
      });
    },
  },
  created: async function () {
    this.isLoading = true;
    this.getCookieToken();
    this.checkLogIn();
    
    const getProfileData = await this.getProfile();
    if (getProfileData) {
      const { _id, avatarUrl, email, gender, userName } = getProfileData.data;
      const getUserData = { _id, avatarUrl, email, gender, userName };
      this.userData = getUserData;
    }
    const followingList = await this.getFollowing();
    // console.log('followingList', followingList)
    this.followList = followingList.data;

    this.isLoading = false;
  },
});
