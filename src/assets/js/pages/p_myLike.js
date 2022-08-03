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
    getLikeList: function() {
      console.log('getLikeList')
      const likeListApi = `${this.apiUrl}/user/like-list`;
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common.Authorization = `Bearer ${this.cookieToken}`; // 將 Token 加入到 Headers 內
        axios
          .get(likeListApi)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
    
            console.log('err.request', err.request);
            const errObj = JSON.parse(err.request.response);
            console.log('myLikeApi err.request.response', errObj);
            alert(`讀取個人資料發生錯誤，原因：${err.response.data.message}`);
    
            document.location.href = noTokenKickPatch;
          });
      });
    },
    renderLikeList: async function () {
      this.isLoading = true;
      const likes = await this.getLikeList();
      this.likeList = likes.data;
      this.isLoading = false;
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

    await this.renderLikeList();
  },
});
