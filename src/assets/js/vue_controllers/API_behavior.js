const apiUrl = '//damp-shore-91853.herokuapp.com';
// const apiUrl = '//localhost:3000';
const noTokenKickPatch = 'login.html';

const pg_urlParaObj = () => {
  // 取網址參數 user_id
  const url = location;
  console.log('url', url)
  const urlSearch = location.search; // 網址含 ? 後段
  console.log('urlSearch', urlSearch)
  const urlParasObj = {};
  if (urlSearch !== "") {
    console.log('urlSearch', urlSearch)
    const urlParas = urlSearch.split('?')[1]; // 取 ? 後面的參數字符串
    const urlParamArr = urlParas.split('&'); // 所有參數都分割
    urlParamArr.forEach((item) => {
      // 網址中多參數，會賦予物件中 { key1:value1, key2:value2, ...}
      urlParasObj[item.split('=')[0]] = item.split('=')[1];
    })
  }
  return urlParasObj
}

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
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization = `Bearer ${this.cookieToken}`; // 將 Token 加入到 Headers 內
    axios
      .get(profileApi)
      .then((res) => {
        resolve(res.data);
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

export default {
  apiUrl,
  pg_urlParaObj,
  noTokenKickPatch,
  getCookieToken,
  checkLogIn,
  signout,
  getProfile,
};
