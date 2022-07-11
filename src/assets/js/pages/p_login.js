import vue_public_funs from '../vue_public_funs.js';

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: vue_public_funs.apiUrl,
    isLoading: false,
    cookieToken: '',
    longInData: {
      email: '',
      password: '',
    },
    userData: {},
    errorMessage: '',
  },
  methods: {
    getCookieToken: vue_public_funs.getCookieToken,
    checkLogIn: vue_public_funs.checkLogIn,
    signout: vue_public_funs. signout,
    sign_in() {
      const sign_inApi = `${this.apiUrl}/user/sign-in`;

      this.isLoading = true;
      axios
        .post(sign_inApi, this.longInData)
        .then((response) => {
          console.log('response', response);
          const token = response.data.data.token;
          alert(`sign-in ${response.data.status}`);
          if (response.data.status == 'success') {
            let theDay = new Date(); // 建立時間物件
            let changeDay = 1; // 設定要往前或往後幾天
            let expiredTimeStamp = theDay.setDate(theDay.getDate() + changeDay);

            document.cookie = `token=${token}; expires=${new Date(
              expiredTimeStamp * 1000
            )}; path=/`;
            this.longInData.password = ''; // 確任項目點按後清空密碼輸入框
            if (this.cookieToken) {
              alert('先前已登入過');
            }
            this.isLoading = false;
            const gotoFirstPath = 'allDynamicWall.html';
            if (document.location.pathname !== `/${gotoFirstPath}`) {
              document.location.href = 'allDynamicWall.html';
            }
          }
        })
        .catch((error) => {
          // console.log('error', error);
          let jsonParseResponseStr = JSON.parse(
            error.response.request.response
          );
          console.log(jsonParseResponseStr.message);
          this.errorMessage = jsonParseResponseStr.message;
          this.isLoading = false;
        });
    },
    getProfileApiData() {
      const profileApi = `${this.apiUrl}user/profile`;
      if (this.cookieToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${this.cookieToken}`; // 將 Token 加入到 Headers 內
        axios
          .get(profileApi)
          .then((response) => {
            this.userData = response.data.data;
            console.log('profileApi -> response', this.userData);
          })
          .catch((error) => {
            console.log('error.request', error.request);
            const errorObj = JSON.parse(error.request.response);
            console.log('profileApi error.request.response', errorObj);
          });
      } else {
        alert('沒登入過會登入不成功');
      }
    },
  },
  created() {
    this.getCookieToken();
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
    this.checkLogIn();
  },
  // mounted() {
  //   $("input[type='number']").inputSpinner();
  // }
});
