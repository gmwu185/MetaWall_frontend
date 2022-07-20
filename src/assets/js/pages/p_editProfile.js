import vue_public_funs from '../vue_public_funs.js';

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: vue_public_funs.apiUrl,
    isLoading: false,
    cookieToken: '',
    userData: {},
    errorMessage: '',
  },
  methods: {
    getCookieToken: vue_public_funs.getCookieToken,
    checkLogIn: vue_public_funs.checkLogIn,
    signout: vue_public_funs.signout,
    getProfile() {
      const profileApi = `${this.apiUrl}/user/profile`;
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
    patchProfile() {
      const profileApi = `${this.apiUrl}/user/profile`;
      console.log('patchProfile this.userData', this.userData);
      axios.patch(profileApi, this.userData, {
        Authorization: `Bearer ${this.cookieToken}`,
      })
        .then(function (res) {
          console.log('axios ajax res.data', res.data);
        })
        .catch(function (error) {
          console.log(
            'axios ajax error.response.data',
            error.response.data
          );
        });
    },
  },
  created() {
    this.isLoading = true;
    this.getCookieToken();
    this.checkLogIn();
    this.getProfile();
  },
});
