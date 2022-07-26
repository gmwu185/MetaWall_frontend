const upload_img = async function ({
  file,
  imageType = '',
  formData = new FormData(),
}) {
  const uploadAvatarImgApi = `${this.apiUrl}/upload/image`;
  let ApiReturnImgUrl = '';

  /**
   * (KEY): image 欄位名稱 為後端定義需正確帶上
   * (VALUE): 通過 append 向 form 物件新增資料
   */
  if (file) {
    formData.append('image', file, file.name);
    for (const value of formData.values()) {
      /** 印出所有 formData 所加入的值
       * https://developer.mozilla.org/en-US/docs/Web/API/FormData/values
       */
      console.log('formData value -> ', value);
    }
  } else {
    console.log('file', file);
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

const fileThrowError = ({ msgStr = '', isThrow = true }) => {
  /** 自定錯誤與中斷 JS 操作
   * 函式傳入物件做為預設值。
   * isThrow false 不中斷，可做為判斷條件錯誤，但 JS 可不中斷，做為提示使用
   * fileThrowError 函式 throw 中斷 JS 運作，錯誤統一傳到 try catch error 中
   */
  let error = new Error('發生錯誤：');
  // console.dir('error', error);
  // console.log('error.fileName', error.fileName);
  error.message += `${msgStr} / fileName: ${error.fileName}`;
  if (isThrow) throw error;
}

export default {
  upload_img,
  fileThrowError,
};
