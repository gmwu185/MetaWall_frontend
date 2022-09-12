const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginMinifySets = {
  collapseWhitespace: false, // true HTML 壓成單行
  removeComments: false, // 刪除註解
  removeRedundantAttributes: true, // 刪除多餘的屬性
  removeScriptTypeAttributes: true, // 刪除腳本類型屬性
  removeStyleLinkTypeAttributes: true, // 刪除樣式鏈接類型屬性
  useShortDoctype: true, // 使用簡短的文檔類型
};

module.exports = [
  new HtmlWebpackPlugin({
    filename: 'pageLists.html',
    template: 'jand/pageLists.jade',
    chunks: ['vendor', 'main', 'p_pageLists'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 1.登入 / login (vue -> index)
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'jand/index.jade',
    chunks: ['vendor', 'main', 'p_index'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 1.登入 / login
  new HtmlWebpackPlugin({
    filename: 'login-layout.html',
    template: 'jand/login-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 1.登入 – 1
  new HtmlWebpackPlugin({
    filename: 'login-1-layout.html',
    template: 'jand/login-1-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 1-2.登入（錯誤訊息）
  new HtmlWebpackPlugin({
    filename: 'login-error-layout.html',
    template: 'jand/login-error-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 2.註冊 (Vue)
  new HtmlWebpackPlugin({
    filename: 'register.html',
    template: 'jand/register.jade',
    chunks: ['vendor', 'main', 'p_register'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 2.註冊
  new HtmlWebpackPlugin({
    filename: 'register-layout.html',
    template: 'jand/register-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 2-2.註冊（錯誤訊息）
  new HtmlWebpackPlugin({
    filename: 'register-error-layout.html',
    template: 'jand/register-error-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 3.全體動態牆 / allDynamicWall (vue)
  new HtmlWebpackPlugin({
    filename: 'allDynamicWall.html',
    template: 'jand/allDynamicWall.jade',
    chunks: ['vendor', 'main', 'p_allDynamicWall'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 3.全體動態牆 / allDynamicWall
  new HtmlWebpackPlugin({
    filename: 'allDynamicWall-layout.html',
    template: 'jand/allDynamicWall-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 3-2.全體動態牆-有留言 / allDynamicWall-message
  new HtmlWebpackPlugin({
    filename: 'allDynamicWall-message-layout.html',
    template: 'jand/allDynamicWall-message-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 3-3.全體動態牆-沒有動態 / allDynamicWall-empty
  new HtmlWebpackPlugin({
    filename: 'allDynamicWall-empty-layout.html',
    template: 'jand/allDynamicWall-empty-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 4.追蹤名單 / followList (vue)
  new HtmlWebpackPlugin({
    filename: 'followList.html',
    template: 'jand/followList.jade',
    chunks: ['vendor', 'main', 'p_followList'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 4.追蹤名單 / followList
  new HtmlWebpackPlugin({
    filename: 'followList-layout.html',
    template: 'jand/followList-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 5.修改個人資料 / editProfile (vue)
  new HtmlWebpackPlugin({
    filename: 'editProfile.html',
    template: 'jand/editProfile.jade',
    chunks: ['vendor', 'main', 'p_editProfile'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 5.修改個人資料 / editProfile
  new HtmlWebpackPlugin({
    filename: 'editProfile-layout.html',
    template: 'jand/editProfile-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 5.修改個人資料-暱稱修改 / editProfile-name
  new HtmlWebpackPlugin({
    filename: 'editProfile-name-layout.html',
    template: 'jand/editProfile-name-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 5-2.修改個人資料-暱稱修改（錯誤訊息） / editProfile-name-error
  new HtmlWebpackPlugin({
    filename: 'editProfile-name-error-layout.html',
    template: 'jand/editProfile-name-error-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 6.修改個人資料-重設密碼 / changePassword
  new HtmlWebpackPlugin({
    filename: 'changePassword-layout.html',
    template: 'jand/changePassword-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 7.張貼動態 / postNews (vue)
  new HtmlWebpackPlugin({
    filename: 'postNews.html',
    template: 'jand/postNews.jade',
    chunks: ['vendor', 'main', 'p_postNews'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 7.張貼動態 / postNews
  new HtmlWebpackPlugin({
    filename: 'postNews-layout.html',
    template: 'jand/postNews-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 7-2.張貼動態（錯誤訊息） / postNews-error
  new HtmlWebpackPlugin({
    filename: 'postNews-error-layout.html',
    template: 'jand/postNews-error-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 8.我按讚的貼文 / myLike (vue)
  new HtmlWebpackPlugin({
    filename: 'myLike.html',
    template: 'jand/myLike.jade',
    chunks: ['vendor', 'main', 'p_myLike'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 8.我按讚的貼文 / myLike
  new HtmlWebpackPlugin({
    filename: 'myLike-layout.html',
    template: 'jand/myLike-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 9.個人牆 / personalPosts (vue)
  new HtmlWebpackPlugin({
    filename: 'personalPosts.html',
    template: 'jand/personalPosts.jade',
    chunks: ['vendor', 'main', 'p_personalPosts'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 9.個人牆 / personalPosts
  new HtmlWebpackPlugin({
    filename: 'personalPosts-layout.html',
    template: 'jand/personalPosts-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 9-2.個人牆-取消追蹤 / personalPosts-cancelFollow
  new HtmlWebpackPlugin({
    filename: 'personalPosts-cancelFollow-layout.html',
    template: 'jand/personalPosts-cancelFollow-layout.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  // 第三方登入轉跳頁
  new HtmlWebpackPlugin({
    filename: 'thirdLogin.html',
    template: 'jand/thirdLogin.jade',
    chunks: ['vendor', 'main', 'p_thirdLogin'],
    minify: HtmlWebpackPluginMinifySets,
  }),
  new HtmlWebpackPlugin({
    filename: 'doc-guide.html',
    template: 'jand/doc-guide.jade',
    chunks: ['vendor', 'main'],
    minify: HtmlWebpackPluginMinifySets,
  }),
];
