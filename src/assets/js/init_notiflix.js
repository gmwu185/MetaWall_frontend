/** notiflix 套件：
 * Loading 讀取畫面元件 / Report 元件 (暫停通知) / Notify 元件 (單純通知)
 * npmjs：https://www.npmjs.com/package/notiflix
 * 文件：https://notiflix.github.io/
 * github：https://github.com/notiflix/Notiflix
 * codepen：https://codepen.io/notiflix/pens/showcase
 */

const statusColor = {
  primary: {
    hex: "#03438D",
    overlay: 'rgba(3, 67, 141, 0.9)',
  },
  success: {
    hex: '#83C51D',
    overlay: 'rgba(131,197,29,0.2)',
  },
  failure: {
    hex: '#F57375',
    overlay: 'rgba(245,115,117,0.2)',
  },
  warning: {
    hex: '#EEC32A',
    overlay: 'rgba(238, 195, 42,0.2)',
  },
};

const LoadingInit = (Loading) =>
  Loading.init({
    svgSize: '150px', // 預設 80px / 正方形
    backgroundColor: statusColor.primary.overlay,
    messageFontSize: '14px',
    customSvgUrl: 'assets/static-images/MetaWall_logo.png',
  });
const ConfirmInit = (Confirm) =>
  Confirm.init({
    titleColor: statusColor.primary.hex,
    okButtonBackground: statusColor.primary.hex,
    borderRadius: '8px',
    plainText: false,
  });
const ReportInit = (Report) =>
  Report.init({
    borderRadius: '8px',
    svgSize: '40px',
    plainText: false,
    success: {
      buttonBackground: statusColor.success.hex,
      buttonColor: '#000',
      backOverlayColor: statusColor.success.overlayColor,
    },
    failure: {
      buttonBackground: statusColor.failure.hex,
      buttonColor: '#fff',
      backOverlayColor: statusColor.failure.overlayColor,
    },
    warning: {
      buttonBackground: statusColor.warning.hex,
      buttonColor: '#fff',
      backOverlayColor: statusColor.warning.overlayColor,
    },
  });
const NotifyInit = (Notify) =>
  Notify.init({
    borderRadius: '8px',
    timeout: 4000,
    messageMaxLength: 110,
    backOverlay: false,
    backOverlayColor: statusColor.primary.overlay,
    plainText: true,
    clickToClose: false,
    pauseOnHover: true,
    zindex: 4001,
    fontSize: '15px',
    success: {
      notiflixIconColor: 'rgba(0, 0, 0, .7)',
      background: statusColor.success.hex,
      textColor: '#000',
      backOverlayColor: statusColor.success.overlayColor,
    },
    failure: {
      notiflixIconColor: 'rgba(255, 255, 255, .7)',
      background: statusColor.failure.hex,
      textColor: '#fff',
      backOverlayColor: statusColor.failure.overlayColor,
    },
    warning: {
      notiflixIconColor: 'rgba(0, 0, 0, .7)',
      background: statusColor.warning.hex,
      textColor: '#000',
      backOverlayColor: statusColor.warning.overlayColor,
    },
  });

export { LoadingInit, ConfirmInit, ReportInit, NotifyInit };
