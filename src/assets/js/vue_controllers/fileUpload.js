const upload_img = async function ({
  ref_file,
  imageType = '',
  formData = new FormData(),
}) {
  const uploadAvatarImgApi = `${this.apiUrl}/upload/image`;
  let ApiReturnImgUrl = '';

  /**
   * (KEY): image 欄位名稱 為後端定義需正確帶上
   * (VALUE): 通過 append 向 form 物件新增資料
   */
  if (ref_file) {
    formData.append('image', ref_file, ref_file.name);
    for (const value of formData.values()) {
      /** 印出所有 formData 所加入的值
       * https://developer.mozilla.org/en-US/docs/Web/API/FormData/values
       */
      console.log('formData value -> ', value);
    }
  } else {
    console.log('ref_file', ref_file);
  }

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: uploadAvatarImgApi + `?type=${imageType}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this.cookieToken}`,
      },
      data: formData,
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

const selectPreviewImageFile = function (e) {
  console.log('selectPreviewImageFile -> e', e);
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
};

export default {
  upload_img,
  selectPreviewImageFile,
};
