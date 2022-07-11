const getCookieToken = function () {
  this.cookieToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
};

const checkLogIn = function () {
  const noTokenKickPatch = 'login.html';
  const isHaveCokieToken = this.cookieToken;
  const isKick = document.location.pathname == `/${noTokenKickPatch}`;
  const isLayoutList = document.location.pathname == `/index.html`;
  const isRegister = document.location.pathname == `/register.html`;
  if (isKick || isLayoutList || isRegister) {
    return;
  } else {
    if (isHaveCokieToken == '') {
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

export default { getCookieToken, checkLogIn, signout };
