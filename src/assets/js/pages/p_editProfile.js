import vue_public_funs from '../vue_public_funs.js';

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: vue_public_funs.apiUrl,
    isLoading: false,
    cookieToken: '',
    userData: {},
    updatePassword: {
      newPassword: '',
      confirmNewPassword: '',
    },
    errorMessage: {
      updatePassword: '',
    },
  },
  methods: {
    getCookieToken: vue_public_funs.getCookieToken,
    checkLogIn: vue_public_funs.checkLogIn,
    signout: vue_public_funs.signout,
    getProfile: vue_public_funs.getProfile,
    patchProfile() {
      const profileApi = `${this.apiUrl}/user/profile`;
      console.log('this.userData', this.userData);
      const { avatarUrl, email, gender, userName } = this.userData;
      let vm = this;
      vm.isLoading = true;
      axios
        .patch(
          profileApi,
          {
            avatarUrl,
            email,
            gender,
            userName,
          },
          {
            Authorization: `Bearer ${this.cookieToken}`,
          }
        )
        .then((res) => {
          console.log('axios ajax res.data.data', res.data.data);
          this.isLoading = false;
          alert(`修改個人資料更新成功！`);
        })
        .catch((error) => {
          console.log('axios ajax error.response.data', error.response.data);
          alert(`發生錯誤，原因：${error.response.data.message}`);
          this.isLoading = false;
        });
    },
    update_password() {
      console.log('update_password');
      const update_passwordApi = `${this.apiUrl}/user/update-password`;
      let vm = this;
      vm.isLoading = true;
      const { newPassword, confirmNewPassword } = this.updatePassword;
      axios
        .patch(
          update_passwordApi,
          {
            newPassword,
            confirmNewPassword,
          },
          {
            Authorization: `Bearer ${this.cookieToken}`,
          }
        )
        .then(function (res) {
          console.log('axios ajax res.data', res.data);
          alert('重設密碼更新成功！');
          vm.updatePassword.newPassword = '';
          vm.updatePassword.confirmNewPassword = '';
          vm.isLoading = false;
          document.location.href = 'editProfile.html';
        })
        .catch(function (error) {
          const errorObj = error.response.data;
          console.log('errorObj', errorObj);
          vm.errorMessage.updatePassword = errorObj.message;
          vm.isLoading = false;
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
