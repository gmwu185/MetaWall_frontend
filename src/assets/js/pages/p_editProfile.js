import vue_public_funs from '../vue_public_funs.js';

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: vue_public_funs.apiUrl,
    isLoading: false,
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
    getCookieToken: vue_public_funs.getCookieToken,
    checkLogIn: vue_public_funs.checkLogIn,
    signout: vue_public_funs.signout,
    getProfile: vue_public_funs.getProfile,
    upload_img: vue_public_funs.upload_img,
    patchProfile: async function () {
      try {
        const profileApi = `${this.apiUrl}/user/profile`;
        let vm = this;
        vm.isLoading = true;
        const ref_btn_selectImg = this.$refs.btn_selectImg.files[0];

        const { avatarUrl, gender, userName } = this.updataUserData;
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
            imageType: 'avatar',
            ref_file: ref_btn_selectImg,
          });
          console.log('有使用 imgUrl 服務取得結果的 avatar_upload_img', avatar_upload_img)
          profileDataObj.avatarUrl = avatar_upload_img.data;
          console.log('有使用 imgUrl 服務取得結果的 profileDataObj ->', profileDataObj);
        } else {
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
              .catch(err => {
                reject(err.response.data);
              });
          });
        const await_patchUserData = await patchUserData();
        console.log('await_patchUserData', await_patchUserData);

        const getProfileData = await vm.getProfile();
        if (getProfileData) {
          const { _id, avatarUrl, email, gender, userName } = getProfileData.data;
          const getUserData = { _id, avatarUrl, email, gender, userName };
          vm.userData = getUserData;
          vm.isLoading = false;
        }
      } catch (error) {
        console.log('patchProfile error', error);
      }
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
    selectPreviewImageFile(e) {
      const element = e.originalTarget; // 觸發事件的元素對象
      const files = e.target.files;
      const file = files[0]; // 取 files 所傳入多筆中取 input 單檔
      const vm = this;

      const validFileType = (fileType) => {
        /** 前端圖片檔案驗証規則 - 檔案類型
         * 僅限上傳 jpg、jpeg 與 png 格式。 (validFileType)
         */
        const acceptFileTypes = ['image/jpeg', 'image/png'];
        const isValidFileType = acceptFileTypes.includes(fileType);
        console.log('isValidFileType', isValidFileType);

        return isValidFileType;
      };
      const imageFileError = ({ errorMsgStr = '', isThrow = true }) => {
        /** pjchender - [JS] 談談 JavaScript 中的錯誤處理 Error Handling
         * https://pjchender.blogspot.com/2017/12/js-error-handling.html
         * 錯誤建構物件 new Error() 前加 throw，中斷 JS 運作給 catch 取得錯誤訊息
         * rangeError 與 newError 錯誤建構物件使用上差不多
         */
        let newError = new Error('發生錯誤：');
        // console.dir('newError', newError);
        // console.log('newError.fileName', newError.fileName);
        newError.message += `${errorMsgStr} / fileName: ${newError.fileName}`;
        if (isThrow) throw newError;
      };
      const createSingleFileReader = (file, element) => {
        /* 顯示預覽圖 fileReader
         * 在 onload 中的 callback，可以透過 e.target.result 取得該檔案。
         */
        const reader = new FileReader();
        reader.onload = function (e) {
          if (e.target.result) {
            // console.log('reader.onload -> e.target.result', e.target.result);
            // console.log('reader.onload -> this', this);

            const newImg = new Image();
            newImg.src = e.target.result;
            newImg.onload = function () {
              let errorMsgStr = '';
              if (this.width > 1024) {
                errorMsgStr = `圖片寬度 ${this.width} px，超過 1024 px`;
                alert(errorMsgStr);
                // bsLiveToastRender({
                //   msgStr: errorMsgStr,
                //   title: '發生錯誤',
                //   statusColor: 'danger',
                // });
                imageFileError({ errorMsgStr });
              }
              if (this.height > 1024) {
                errorMsgStr = `圖片高度 ${this.height} px，超過 1024 px`;
                alert(errorMsgStr);
                // bsLiveToastRender({
                //   msgStr: errorMsgStr,
                //   title: '發生錯誤',
                //   statusColor: 'danger',
                // });
                imageFileError({ errorMsgStr });
              }
              if (this.width !== this.height) {
                errorMsgStr = '圖片高寬比例不是一比一';
                alert(errorMsgStr);
                // bsLiveToastRender({
                //   msgStr: errorMsgStr,
                //   title: '發生錯誤',
                //   statusColor: 'danger',
                // });
                imageFileError({ errorMsgStr });
              }

              // 取得圖檔資訊，以賦值方式指給 DOM 元素
              // element.src = e.target.result;
              // console.log('reader.onload -> element', element);
              vm.updataUserData.avatarUrl = newImg.src;
            };
          }
        };
        reader.readAsDataURL(file);
        console.log('reader', reader);
      };

      try {
        /** 圖片判斷修件
         * 不得大於：1024 * 1024 px
         * 僅限上傳格式：jpg、jpeg、png
         * 比例：高寬一比一
         */
        if (validFileType(file.type)) {
          console.log(`isValidFileType is ${file.type}`);
          // bsLiveToastRender({
          //   msgStr: '圖檔選取符合格式，先在此頁面呈現預覽，待送出後傳向主機建立。',
          //   title: '圖檔選取',
          //   statusColor: 'success',
          // });
          createSingleFileReader(file, element);
        } else {
          const fileName = file.type.split('/').pop();
          let errorMsgStr = `${fileName} 格式檔，這不是圖片檔，中斷操作請重選檔案`;
          alert(errorMsgStr);

          // bsLiveToastRender({
          //   msgStr: errorMsgStr,
          //   title: '發生錯誤',
          //   statusColor: 'danger',
          // });
          // imageFileError(errorMsgStr);
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        // inputFileBtn.value = ''
      }
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
      const updataUserData = { avatarUrl, gender, userName }; // 由 API 取得使用者資訊，分別用不同物件包裝處理物件傳參考特性
      this.updataUserData = updataUserData;
      this.isLoading = false;
    }
  },
});
