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
  axios.defaults.headers.common.Authorization = `Bearer ${this.cookieToken}`; // 將 Token 加入到 Headers 內
  axios
    .get(profileApi)
    .then((response) => {
      this.userData = response.data.data;
      this.isLoading = false;
    })
    .catch((error) => {
      console.log('error.request', error.request);
      const errorObj = JSON.parse(error.request.response);
      console.log('profileApi error.request.response', errorObj);
      alert(`讀取個人資料發生錯誤，原因：${error.response.data.message}`);
      document.location.href = noTokenKickPatch;
    });
}

export default { apiUrl, getCookieToken, checkLogIn, signout, getProfile };
