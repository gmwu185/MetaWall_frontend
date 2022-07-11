// console.log('bootstrap-Obj', bootstrap);
// console.log('jQuery-Obj', jQuery, 'jQuery -> $', $);

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: '//damp-shore-91853.herokuapp.com/',
    isLoading: false,
    cookieToken: '',
    longInData: {
      email: '',
      // email: 'aa@mail.com',
      password: '',
      // password: 'a12345678',
    },
    userData: {},
    errorMessage: ''
  },
  methods: {
    sign_in() {
      const sign_inApi = `${this.apiUrl}user/sign-in`;

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
            
            document.cookie = `token=${token}; expires=${new Date(expiredTimeStamp * 1000)}; path=/`;
            this.longInData.password = ''; // 確任項目點按後清空密碼輸入框
            if (this.cookieToken) {
              alert('先前已登入過')
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
          let jsonParseResponseStr = JSON.parse(error.response.request.response);
          console.log(jsonParseResponseStr.message);
          this.errorMessage = jsonParseResponseStr.message;
          this.isLoading = false;
        });
    },
    getCookieToken() {
      this.cookieToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    },
    getData() {
      const profileApi = `${this.apiUrl}user/profile`;
      if (this.cookieToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${this.cookieToken}`; // 將 Token 加入到 Headers 內
        axios.get(profileApi)
          .then((response) => {
            this.userData = response.data.data;
            console.log('profileApi -> response', this.userData);
          })
          .catch((error) => {
            console.log('error.request', error.request)
            const errorObj = JSON.parse(error.request.response)
            console.log('profileApi error.request.response', errorObj)
          })
      } else {
        alert('沒登入過會登入不成功');
      }
    },
    signout() {
      document.cookie = `token=; expires=; path=/`;
      this.cookieToken = '';
      alert('完成登出');
      this.checkLogIn();
    },
    checkLogIn() {
      const noTokenKickPatch = 'login.html';
      const isHaveCokieToken = this.cookieToken;
      const isKick = document.location.pathname == `/${noTokenKickPatch}`;
      const isLayoutList = document.location.pathname == `/index.html`;
      const isRegister = document.location.pathname == `/register.html`;
      if (isKick || isLayoutList || isRegister) {
        return
      } else {
        if (isHaveCokieToken == '') {
          document.location.href = noTokenKickPatch;
        }
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
// window.VueAPP = VueAPP;
// console.log('vue VueAPP', VueAPP);
