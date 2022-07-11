const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].css');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// console.log('__dirname', __dirname);
// console.log('resolve:', path.resolve(__dirname, './src'));
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === 'development') {
  console.log(`browser webServer => http://${process.env.HOST}:${process.env.PORT}`);
}

const HtmlWebpackPluginMinifySets = {
  collapseWhitespace: false, // true HTML 壓成單行
  removeComments: false, // 刪除註解
  removeRedundantAttributes: true, // 刪除多餘的屬性
  removeScriptTypeAttributes: true, // 刪除腳本類型屬性
  removeStyleLinkTypeAttributes: true, // 刪除樣式鏈接類型屬性
  useShortDoctype: true, // 使用簡短的文檔類型
};

module.exports = {
  mode: NODE_ENV,
  context: path.resolve(__dirname, './src'),
  entry: {
    main: 'main',
    p_index: 'assets/js/pages/p_index',
    p_login: 'assets/js/pages/p_login',
    p_editProfile: 'assets/js/pages/p_editProfile',
  },
  devtool: NODE_ENV === 'development' ? 'cheap-module-source-map' : 'false',
  output: {
    path: path.resolve(__dirname, NODE_ENV === 'development' ? 'dist' : 'docs'),
    filename: './assets/js/[name].js?[hash:8]',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('src/js'),
      path.resolve('src/scss'),
      path.resolve('src/assets'),
      path.resolve('node_modules'),
    ],
    alias: {
      vue$: 'vue/dist/vue.esm.js', // vue 指定別名找 node_module/vue/dist/vue.esm.js 文件進行編譯
    },
    extensions: ['.js'],
  },
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT,
    stats: {
      assets: true, // 加入資源訊息
      cached: false, // 加入暫存（但未建構）模塊的信息
      chunkModules: false, // 將建構模塊信息加入到 chunk 信息
      chunkOrigins: false,
      chunks: false, // 加入 chunk 訊息（設置為 `false` 能允許較少的冗长輸出）
      colors: true, // 等同 `webpack --colors`
      hash: false, // 加入 compilation 的hash
      modules: false, // 加入建構模塊訊息
      reasons: false, // 加入模塊被引入的原因
      source: false,
      version: false, // 加入 webpack 版本信息
      warnings: false, // 加入警告
    },
    /**
     * Reloading [WDS] Disconnected! Fix
     * 官方文件：https://webpack.docschina.org/configuration/dev-server/
     * https://github.com/webpack/webpack-dev-server/issues/2199#issuecomment-522800528
     * https://www.jianshu.com/p/85c0eb8f3b0f
     * https://andyyou.github.io/2015/07/23/webpack/
     */
    open: false,
    // {
    //   app: [
    //     // 指定開啟瀏覽器 only one
    //     // 'Google Chrome',
    //     // 'Firefox',
    //     'Firefox Developer Edition',
    //     // '--incognito', // 無痕模式
    //     '--other-flag',
    //   ],
    // },
    overlay: {
      warnings: true,
      errors: true,
    }, // 編譯器錯誤或警告時全屏覆蓋
    hot: false, // webpack 模块熱替換
    inline: true, // false 瀏覽器路徑多 /webpack-dev-server/ 與狀態列 App ready.
    noInfo: true, //  --no-info option
    // liveReload: false,
    writeToDisk: true, // 檔案形式輸出 dev-server 程式碼，設定 false 內容只會在記憶體中不會有實體檔案
    compress: true, // 啟用 gzip 壓縮，預設 false
  },
  module: {
    rules: [
      {
        test: /\.(pug|jade)$/,
        // use: ['html-loader', 'pug-html-loader'], // 預設壓單行
        use: [
          {
            loader: 'html-loader',
            options: {
              // minimize: false, // 不壓縮 HTML
            },
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true, // 美化 HTML 的編排 (不壓縮 HTML 的一種)
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: extractCSS.extract([
          {
            loader: 'css-loader',
            options: {
              sourceMap: true, // 開啟 sourcemap 支持
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true, // 開啟 sourcemap 支持
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // 開啟 sourcemap 支持
            },
          },
        ]),
        include: path.resolve('src/scss'),
        exclude: path.resolve('./node_modules'),
      },
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        include: path.resolve('.'),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[path][name].[ext]?[hash:8]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: NODE_ENV === 'production' ? false : true,
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
        include: path.resolve('src/assets/images'),
        exclude: path.resolve('./node_modules'),
      },
      {
        // 自定義安裝字型檔
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]?[hash:8]',
        },
        include: path.resolve('src/assets'),
        exclude: path.resolve('./node_modules'),
      },
    ],
  },

  plugins: [
    extractCSS,

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
        to: '../src/assets/fonts/fontawesome-free',
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

    /* HTML 樣版 ------------------------------------------------------------------ */
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'jand/index.jade',
      chunks: ['vendor', 'main', 'p_index'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 1.登入 / login
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: 'jand/login.jade',
      chunks: ['vendor', 'main', 'p_login'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 1.登入 – 1
    new HtmlWebpackPlugin({
      filename: 'login-1.html',
      template: 'jand/login-1.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 1-2.登入（錯誤訊息）
    new HtmlWebpackPlugin({
      filename: 'login-error.html',
      template: 'jand/login-error.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 2.註冊
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: 'jand/register.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 2-2.註冊（錯誤訊息）
    new HtmlWebpackPlugin({
      filename: 'register-error.html',
      template: 'jand/register-error.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 3.全體動態牆 / allDynamicWall
    new HtmlWebpackPlugin({
      filename: 'allDynamicWall.html',
      template: 'jand/allDynamicWall.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 3-2.全體動態牆-有留言 / allDynamicWall-message
    new HtmlWebpackPlugin({
      filename: 'allDynamicWall-message.html',
      template: 'jand/allDynamicWall-message.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 3-3.全體動態牆-沒有動態 / allDynamicWall-empty
    new HtmlWebpackPlugin({
      filename: 'allDynamicWall-empty.html',
      template: 'jand/allDynamicWall-empty.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 4.追蹤名單 / followList
    new HtmlWebpackPlugin({
      filename: 'followList.html',
      template: 'jand/followList.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 5.修改個人資料 / editProfile
    new HtmlWebpackPlugin({
      filename: 'editProfile.html',
      template: 'jand/editProfile.jade',
      chunks: ['vendor', 'main', 'p_editProfile'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 5.修改個人資料-暱稱修改 / editProfile-name
    new HtmlWebpackPlugin({
      filename: 'editProfile-name.html',
      template: 'jand/editProfile-name.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 5-2.修改個人資料-暱稱修改（錯誤訊息） / editProfile-name-error
    new HtmlWebpackPlugin({
      filename: 'editProfile-name-error.html',
      template: 'jand/editProfile-name-error.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 6.修改個人資料-重設密碼 / changePassword
    new HtmlWebpackPlugin({
      filename: 'changePassword.html',
      template: 'jand/changePassword.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 7.張貼動態 / postNews
    new HtmlWebpackPlugin({
      filename: 'postNews.html',
      template: 'jand/postNews.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 7-2.張貼動態（錯誤訊息） / postNews-error
    new HtmlWebpackPlugin({
      filename: 'postNews-error.html',
      template: 'jand/postNews-error.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 8.我按讚的貼文 / myLike
    new HtmlWebpackPlugin({
      filename: 'myLike.html',
      template: 'jand/myLike.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 9.個人牆 / personalPosts
    new HtmlWebpackPlugin({
      filename: 'personalPosts.html',
      template: 'jand/personalPosts.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    // 9-2.個人牆-取消追蹤 / personalPosts-cancelFollow
    new HtmlWebpackPlugin({
      filename: 'personalPosts-cancelFollow.html',
      template: 'jand/personalPosts-cancelFollow.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    new HtmlWebpackPlugin({
      filename: 'doc-guide.html',
      template: 'jand/doc-guide.jade',
      chunks: ['vendor', 'main'],
      minify: HtmlWebpackPluginMinifySets,
    }),
    /* /HTML 樣版 ------------------------------------------------------------------ */
  ],
};
