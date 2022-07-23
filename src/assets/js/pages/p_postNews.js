import vue_public_funs from '../vue_public_funs.js';

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: vue_public_funs.apiUrl,
    isLoading: false,
    cookieToken: '',
    userData: {},
    errorMessage: {
      updatePassword: '',
    },
  },
  methods: {
    getCookieToken: vue_public_funs.getCookieToken,
    checkLogIn: vue_public_funs.checkLogIn,
    signout: vue_public_funs.signout,
    getProfile: vue_public_funs.getProfile,
  },
  created() {
    this.isLoading = true;
    this.getCookieToken();
    this.checkLogIn();
    this.getProfile();
  },
});
