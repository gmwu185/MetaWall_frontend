const apiUrl = '//damp-shore-91853.herokuapp.com';
const noTokenKickPatch = 'login.html';

const getCookieToken = function () {
  this.cookieToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
};

const checkLogIn = function () {
  const isHaveCokieToken = this.cookieToken;
  const locationPathnameSplit = location.pathname.split('/');
  const isKick =
    locationPathnameSplit[locationPathnameSplit.length - 1] ==
    `${noTokenKickPatch}`;
  const isLayoutList =
    locationPathnameSplit[locationPathnameSplit.length - 1] == `index.html`;
  const isRegister =
    locationPathnameSplit[locationPathnameSplit.length - 1] == `register.html`;
  if (isKick || isLayoutList || isRegister) {
    return;
  } else {
    if (isHaveCokieToken == '') {
      alert('Token 過期或登出，點按確定按鈕後導回登入頁，請重新登入！');
      document.location.href = noTokenKickPatch;
    }
  }
};

const signout = function () {
  document.cookie = `token=; expires=; path=/`;
  this.cookieToken = '';
  alert('完成登出');
  this.checkLogIn();
};

const getProfile = function () {
  const profileApi = `${this.apiUrl}/user/profile`;
  let getApiData;

  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization = `Bearer ${this.cookieToken}`; // 將 Token 加入到 Headers 內
    axios
      .get(profileApi)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err);

        console.log('err.request', err.request);
        const errObj = JSON.parse(err.request.response);
        console.log('profileApi err.request.response', errObj);
        alert(`讀取個人資料發生錯誤，原因：${err.response.data.message}`);

        document.location.href = noTokenKickPatch;
      });
  });
};

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
      .catch((err) => reject(err))
  });
};

export default {
  apiUrl,
  getCookieToken,
  checkLogIn,
  signout,
  getProfile,
  upload_img,
};
