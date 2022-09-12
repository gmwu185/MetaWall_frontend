const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
  /* 字體與 iconFont ---------------------------------------------------- */
  /**
   * 分別指向對應的 src (源碼) 與 dist (打包編譯檔)，Scss 處理時二邊都需要相同。
   * Scss 在處理編譯時，取用到 woff, woff2, ttf, eot 檔會透上 lile-loader 進行 src (源碼) 讀取
   * lile-loader 讀取後會輸出字型檔在 dist (打包編譯檔)，產生檔案讓瀏覽器取用字型
   */

  // fortawesome
  new CopyWebpackPlugin([
    {
      from: '../node_modules/@fortawesome/fontawesome-free/webfonts',
      to: 'assets/fonts/fontawesome-free',
    },
  ]),
  /* /字體與 iconFont ---------------------------------------------------- */

  /* 不處理直接搬圖片 ----------------------------------------------------------------- */
  /**
   * webpack 的 url-loader 以 image-webpack-loader 處理小於 8192 尺寸大小，將小圖直接使用 base64 方式包入 main.css 中。
   * 如果直接使用 main.js 注入圖片，透過 image-webpack-loader 也無法用於 .html 檔中。.html 等相關站台內取用圖片，使用此設定直接將圖片不以 lorader 方式處理。
   */
  new CopyWebpackPlugin([
    {
      from: 'assets/static-images/',
      to: 'assets/static-images/',
    },
  ]),
  /* 不處理直接搬圖片 ----------------------------------------------------------------- */
];
