import Vue from 'vue';
import fileUpload from '../vue_controllers/fileUpload';

export default Vue.component('btn-file-preview-img', {
  methods: {
    isValid_img_type: (fileType) =>
      ['image/jpeg', 'image/png'].includes(fileType),
    readFile: (file) => {
      return new Promise((resolve, reject) => {
        /** FileReader 取得檔案說明
         * 由 FileReader.onload 處理成 base64 格式後，將結果賦予於 FileReader.result 屬性上。
         * 都操作正確最後由 Promise.resolve 方法送出正確流程
         */
        const freader = new FileReader();
        freader.readAsDataURL(file);
        freader.onload = (e) => resolve(freader);
        freader.onerror = reject;
        // console.log('freader', freader);
      });
    },
    fileThrowError: fileUpload.fileThrowError,
    createImg: (base64_or_path) => {
      return new Promise((resolve, reject) => {
        const newImg = new Image();
        newImg.addEventListener('load', () => resolve(newImg));
        newImg.addEventListener('error', (err) => reject(err));
        newImg.src = base64_or_path;
      });
    },
    returnFileSize: (fileSize) => Number((fileSize / 1048576).toFixed(2)), // 換算圖檔 mb
    previewFile: async function (e) {
      // console.log('this.imgType', this.imgType);
      try {
        const input = e.target;
        const file = input.files[0];
        // console.log('file', file)

        /* 以下驗証自定錯誤 */
        if (!this.isValid_img_type(file.type)) {
          const fileName = file.type.split('/').pop();
          let errorMsgStr = `${fileName} 格式檔，圖片格式錯誤，僅限 JPG、PNG 圖片`;
          alert(errorMsgStr);
          this.fileThrowError({ msgStr: errorMsgStr });
        }
        if (this.returnFileSize(file.size) > 1) {
          let errorMsgStr = `圖片檔案過大，僅限 1 mb 以下檔案`;
          alert(errorMsgStr);
          this.fileThrowError({ msgStr: errorMsgStr });
        }
        /* /以下驗証自定錯誤 */

        const imgFileReadFile = await this.readFile(file);
        const imgFileToBase64 = imgFileReadFile.result;
        // console.log('imgFileToBase64', imgFileToBase64);

        const previewImg = await this.createImg(imgFileToBase64);
        // 刻意使用錯誤圖片路徑取不到圖片檔，錯誤在最外層 catch 補捉
        // const previewImg = await this.createImg("example.com/house.jpg");
        // console.log('previewImg', previewImg);

        /* 以下驗証自定錯誤 */
        let errMsgStr = '';
        if (previewImg.width > 1024) {
          errMsgStr = `圖片寬度 ${previewImg.width} px，超過 1024 px`;
          alert(errMsgStr);
          fileThrowError({ msgStr: errMsgStr });
        }
        if (previewImg.height > 1024) {
          errMsgStr = `圖片高度 ${previewImg.width} px，超過 1024 px`;
          alert(errMsgStr);
          fileThrowError({ msgStr: errMsgStr });
        }
        if (this.imgType == 'avatar') {
          if (previewImg.width !== previewImg.height) {
            errMsgStr = `圖片高度 ${previewImg.width} 寬度 ${previewImg.width}，比例不是一比一`;
            alert(errMsgStr);
            fileThrowError({ msgStr: errMsgStr });
          }
        }
        /* /以下驗証自定錯誤 */

        // 以上錯誤條件判斷都通過，才將 JS 產生的圖片的 src 值傳向 DOM 產生在畫面
        this.$emit('change-preview-emit', {
          imgUrl: previewImg.src,
          imageType: this.imgType,
          file: file,
        });
      } catch (error) {
        console.log('error', error);
      }
    },
  },
  data() {
    return {
      btnStr: this.incomBtnStr || '按鈕文字',
      imgType: this.incomImgType,
      componentClass: this.incomClass,
    };
  },
  // props: ['btnIncom'],
  props: {
    'incom-img-type': {
      type: String,
    },
    incomBtnStr: {
      type: String,
    },
    incomClass: Array,
  },
  template: `
    <div
      class="btn btn-dark c-btnFile shadow-none"
      :class="componentClass"
    >
      <span>{{ btnStr }}</span>
      <input class="c-btnFile__input" type="file"
        @change="previewFile"
      >
    </div>
  `,
});
