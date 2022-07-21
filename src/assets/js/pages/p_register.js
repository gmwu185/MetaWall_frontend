import vue_public_funs from '../vue_public_funs.js';

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: vue_public_funs.apiUrl,
    isLoading: false,
    cookieToken: '',
    userData: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    errorMessage: '',
  },
  methods: {
    // getCookieToken: vue_public_funs.getCookieToken,
    // checkLogIn: vue_public_funs.checkLogIn,
    sign_up() {
      const profileApi = `${this.apiUrl}/user/sign-up`;
      this.isLoading = true;
      const { confirmPassword, email, password, userName } = this.userData
      // console.log('this.userData', this.userData);
      // API 有開 password 與 confirmPassword 欄位要相等，這裡為配合畫面直接使用賦值方式處理。
      axios
        .post(
          profileApi,
          {
            password,
            confirmPassword: password,
            email,
            userName,
          }
        )
        .then((response) => {
          console.log('sign_up response', response);
          const token = response.data.data.token;
          console.log(`sign_up ${response.data.status}`);
          if (response.data.status == 'success') {
            let theDay = new Date(); // 建立時間物件
            let changeDay = 1; // 設定要往前或往後幾天
            let expiredTimeStamp = theDay.setDate(theDay.getDate() + changeDay);

            document.cookie = `token=${token}; expires=${new Date(
              expiredTimeStamp * 1000
            )}; path=/`;
            
            if (this.cookieToken) {
              console.log('先前已登入過');
            }

            alert(`註冊成功，點按裡入站台`);
            this.isLoading = false;
            
            const gotoFirstPath = 'allDynamicWall.html';
            if (document.location.pathname !== `/${gotoFirstPath}`) {
              document.location.href = 'allDynamicWall.html';
            }
          }
        })
        .catch((error) => {
          console.log('error.request', error.request);
          let jsonParseResponseStr = JSON.parse(
            error.response.request.response
          );
          console.log(jsonParseResponseStr.message);
          this.errorMessage = jsonParseResponseStr.message;
          this.isLoading = false;
        });
    },
  },
  created() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
    // this.signUp();
    // this.getCookieToken();
    // this.checkLogIn();
    // this.getProfileApiData();
  },
});
