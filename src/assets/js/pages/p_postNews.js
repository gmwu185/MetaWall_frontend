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
    errorMessage: {
      updatePassword: '',
    },
    post: {
      content: '',
      image: '',
      preview_img: {
        file: null,
        url: '',
      },
    },
  },
  methods: {
    getCookieToken: API_behavior.getCookieToken,
    checkLogIn: API_behavior.checkLogIn,
    signout: API_behavior.signout,
    getProfile: API_behavior.getProfile,
    upload_img: fileUpload.upload_img,
    choosePostImage(data) {
      const { imgUrl, imageType, file } = data;
      this.post.preview_img.url = imgUrl;
      this.post.preview_img.file = file;
    },
    createdPost: async function () {
      try {
        Loading.custom('讀取中 ...')
        if (this.post.preview_img.file) {
          const get_upload_img = await this.upload_img({
            file: this.post.preview_img.file, // 選取的檔案，做為 formData
          });
          if (get_upload_img.data) {
            this.post.image = get_upload_img.data;
          } else {
            const msgStr = '中斷操作？圖片上傳未回傳圖片路徑或過程產生問題，請將重新處理圖片後再發文。'
            Notify.failure(msgStr);
            Loading.remove();
            fileUpload.fileThrowError({
              msgStr: msgStr,
            });
          }
        } else {
          Notify.warning('沒有選圖片建立貼文！');
        }

        const createdPostObj = {
          content: this.post.content,
          image: this.post.image,
        };
        const createdPostApi = `${this.apiUrl}/post/`;
        const createdPostData = () => {
          return new Promise((resolve, reject) => {
            axios
              .post(createdPostApi, createdPostObj, {
                Authorization: `Bearer ${this.cookieToken}`,
              })
              .then((res) => {
                Notify.success(`新增貼文成功！`);
                resolve(res.data.data);
              })
              .catch((err) => {
                reject(err.response.data);
              });
          });
        };
        const await_createdPostData = await createdPostData();
        if (await_createdPostData) {
          this.post.content = '';
          this.post.image = '';
          this.post.preview_img.url = '';
          this.post.preview_img.file = '';
          document.location.href = 'allDynamicWall.html';
        }
        Loading.remove();
      } catch (error) {
        Notify.failure(`建立貼文發生問題，原因：${error.message}，請重新操作。`);
        Loading.remove();
      }
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
      Loading.remove();
    }
  },
});
