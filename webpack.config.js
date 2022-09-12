const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].css');

const copyFileTaks = require('./webpackPluginSets/CopyWebpackPluginSet');
const pageTemplasts = require('./webpackPluginSets/HtmlWebpackPluginSet');

const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === 'development') {
  console.log(
    `browser webServer => http://${process.env.HOST}:${process.env.PORT}`
  );
}

module.exports = {
  mode: NODE_ENV,
  context: path.resolve(__dirname, './src'),
  entry: {
    main: 'main',
    p_pageLists: 'assets/js/pages/p_pageLists',
    p_index: 'assets/js/pages/p_index',
    p_editProfile: 'assets/js/pages/p_editProfile',
    p_register: 'assets/js/pages/p_register',
    p_allDynamicWall: 'assets/js/pages/p_allDynamicWall',
    p_followList: 'assets/js/pages/p_followList',
    p_postNews: 'assets/js/pages/p_postNews',
    p_myLike: 'assets/js/pages/p_myLike',
    p_personalPosts: 'assets/js/pages/p_personalPosts',
    p_thirdLogin: 'assets/js/pages/p_thirdLogin',
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

  plugins: [extractCSS, ...copyFileTaks, ...pageTemplasts],
};
