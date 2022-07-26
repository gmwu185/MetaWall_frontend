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

export default {
  upload_img,
};
