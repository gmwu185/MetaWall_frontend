import vue_public_funs from '../vue_public_funs.js';

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: '//damp-shore-91853.herokuapp.com/',
    // apiUrl: 'http://127.0.0.1:3000/',
    isLoading: false,
    cookieToken: '',
    userData: {},
    errorMessage: '',
  },
  methods: {
    getCookieToken: vue_public_funs.getCookieToken,
    checkLogIn: vue_public_funs.checkLogIn,
    signout: vue_public_funs.signout,
    getProfileApiData() {
      const profileApi = `${this.apiUrl}user/profile`;
      axios.defaults.headers.common.Authorization = `Bearer ${this.cookieToken}`; // 將 Token 加入到 Headers 內
      axios
        .get(profileApi)
        .then((response) => {
          this.userData = response.data.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log('error.request', error.request);
          const errorObj = JSON.parse(error.request.response);
          console.log('profileApi error.request.response', errorObj);
        });
    },
  },
  created() {
    this.isLoading = true;
    this.getCookieToken();
    this.checkLogIn();
    this.getProfileApiData();
  },
});
