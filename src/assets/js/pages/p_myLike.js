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
      this.isLoading = false;
    }
  },
});
