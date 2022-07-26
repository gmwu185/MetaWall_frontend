import API_behavior from '../vue_controllers/API_behavior';
import fileUpload from '../vue_controllers/fileUpload';

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: API_behavior.apiUrl,
    isLoading: false,
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
        this.isLoading = true;
        if (this.post.preview_img.file) {
          const get_upload_img = await this.upload_img({
            file: this.post.preview_img.file, // 選取的檔案，做為 formData
          });
          console.log('get_upload_img', get_upload_img);
          if (get_upload_img.data) {
            this.post.image = get_upload_img.data;
          } else {
            const msgStr = '中斷操作？圖片上傳未回傳圖片路徑或過程產生問題，請將重新處理圖片後再發文。'
            alert(msgStr);
            this.isLoading = false;
            fileUpload.fileThrowError({
              msgStr: msgStr,
            });
          }
        } else {
          console.log('沒有選圖片');
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
                alert(`新增貼文成功！`);
                console.log(
                  'createdPostData axios ajax res.data.data',
                  res.data.data
                );
                resolve(res.data.data);
              })
              .catch((err) => {
                reject(err.response.data);
              });
          });
        };
        const await_createdPostData = await createdPostData();
        console.log('await_createdPostData', await_createdPostData);

        if (await_createdPostData) {
          this.post.content = '';
          this.post.image = '';
          this.post.preview_img.url = '';
          this.post.preview_img.file = '';
          document.location.href = 'allDynamicWall.html';
        }

        this.isLoading = false;
      } catch (error) {
        console.log('error', error);
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
      this.isLoading = false;
    }
  },
});
