import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { LoadingInit, ReportInit, NotifyInit } from '../init_notiflix';
LoadingInit(Loading), ReportInit(Report), NotifyInit(Notify);

import API_behavior from '../vue_controllers/API_behavior';
import fileUpload from '../vue_controllers/fileUpload';

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: API_behavior.apiUrl,
    cookieToken: '',
    userData: {
      userName: 'Member',
    },
    updataUserData: {},
    updatePassword: {
      newPassword: '',
      confirmNewPassword: '',
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
    upload_img: fileUpload.upload_img,
    change_avatar(new_data) {
      const { imgUrl, imageType, file } = new_data;
      this.updataUserData.avatarUrl = imgUrl;
      this.updataUserData.imageType = imageType;
      this.updataUserData.file = file;
    },
    patchProfile: async function () {
      try {
        const profileApi = `${this.apiUrl}/user/profile`;
        let vm = this;
        Loading.custom('讀取中 ...');
        const { avatarUrl, gender, userName, imageType, file } =
          this.updataUserData;
        
        let profileDataObj = {};
        profileDataObj = {
          gender,
          userName,
        };

        let avatar_upload_img = null;
        if (avatarUrl !== vm.userData.avatarUrl) {
          /** 比對 updataUserData 的預覽大頭照圖片
           * 與原本 API 取得大頭照圖片 是否一樣
           * 不同透過 imgUrl 圖床建立圖片連結回傳
           */
          avatar_upload_img = await this.upload_img({
            imageType: imageType,
            file: file, // 選取的檔案，做為 formData
          });
          console.log(
            '有使用 imgUrl 服務取得結果的 avatar_upload_img',
            avatar_upload_img
          );
          profileDataObj.avatarUrl = avatar_upload_img.data;
          console.log(
            '有使用 imgUrl 服務取得結果的 profileDataObj ->',
            profileDataObj
          );
        } else {
          alert('選取新的圖片與原先的圖片一樣，不上傳圖片');
          profileDataObj.avatarUrl = avatarUrl;
        }

        const patchUserData = () =>
          new Promise((resolve, reject) => {
            axios
              .patch(profileApi, profileDataObj, {
                Authorization: `Bearer ${this.cookieToken}`,
              })
              .then((res) => {
                alert(`修改個人資料更新成功！`);
                console.log(
                  'patchUserData axios ajax res.data.data',
                  res.data.data
                );
                resolve(res.data.data);
              })
              .catch((err) => {
                reject(err.response.data);
              });
          });
        const await_patchUserData = await patchUserData();
        console.log('await_patchUserData', await_patchUserData);

        const getProfileData = await vm.getProfile();
        if (getProfileData) {
          const { _id, avatarUrl, email, gender, userName } =
            getProfileData.data;
          const getUserData = { _id, avatarUrl, email, gender, userName };
          vm.userData = getUserData;
          Loading.remove();
        }
      } catch (error) {
        console.log('patchProfile error', error);
      }
    },
    update_password() {
      console.log('update_password');
      const update_passwordApi = `${this.apiUrl}/user/update-password`;
      let vm = this;
      Loading.custom('讀取中 ...')
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
          console.log('res', res)
          vm.updatePassword.newPassword = '';
          vm.updatePassword.confirmNewPassword = '';
          Loading.remove();
          Report.success(
            '設定成功',
            `<p class="mb-0 text-center mt-n2">
              重設密碼設定成功！
            </p>`,
            '確定'
          );
          // document.location.href = 'editProfile.html';
        })
        .catch(function (error) {
          const errorObj = error.response.data;
          vm.errorMessage.updatePassword = errorObj.message;
          Notify.failure(vm.errorMessage.updatePassword);
          Loading.remove();
        });
    },
  },
  created: async function () {
    Loading.custom('讀取中 ...')
    this.getCookieToken();
    this.checkLogIn();
    const getProfileData = await this.getProfile();
    if (getProfileData) {
      const { _id, avatarUrl, email, gender, userName } = getProfileData.data;
      const getUserData = { _id, avatarUrl, email, gender, userName };
      this.userData = getUserData;
      const updataUserData = { avatarUrl, gender, userName }; // 由 API 取得使用者資訊，分別用不同物件包裝處理物件傳參考特性
      this.updataUserData = updataUserData;
      Loading.remove();
    }
  },
});
