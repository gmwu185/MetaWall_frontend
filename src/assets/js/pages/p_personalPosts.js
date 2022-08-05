import API_behavior from '../vue_controllers/API_behavior';

const VueAPP = new Vue({
  el: '#app',
  data: {
    apiUrl: API_behavior.apiUrl,
    isLoading: false,
    cookieToken: '',
    userData: {
      userName: 'Member',
    },
    personalUser: {
      userData: {
        userName: 'Member',
        followers: [],
      },
      //- following：登入使用者 -> 加入追踨對象列表
      //- followers：追踨對象 -> 被多少使用者加入追踨
      isFollow: Boolean,
      isLoad: false,
    },
    urlParaObj: {},
    posts: {
      data: [],
      isLoad: Boolean,
    },
    errorMessage: {
      updatePassword: '',
    },
  },
  methods: {
    pg_urlParaObj: API_behavior.pg_urlParaObj,
    getCookieToken: API_behavior.getCookieToken,
    checkLogIn: API_behavior.checkLogIn,
    signout: API_behavior.signout,
    getProfile: API_behavior.getProfile,
    clickFollow: async function () {
      this.personalUser.isLoad = true;
      const userID = this.personalUser.userData._id;
      console.log('userID', userID);
      const followApi = `${this.apiUrl}/user/${userID}/follow`;
      axios.defaults.headers.common.Authorization = `Bearer ${this.cookieToken}`;
      const httpMethod = this.personalUser.isFollow ? 'delete' : 'post';
      console.log('httpMethod', httpMethod);
      const changeFollow = await axios[httpMethod](followApi);
      console.log('changeFollow', changeFollow);
      const changeFollowData = changeFollow.data.data;

      await this.getPersonalPosts({ userID }).then((res) => {
        console.log('clickFollow getPersonalPosts res', res);
        return (this.personalUser.userData = res.data[0].userData);
      });
      alert(changeFollowData.message);
      this.personalUser.isLoad = false;
      this.personalUser.isFollow = !this.personalUser.isFollow;
    },
    sendPersonalPostsSearch(param) {
      console.log('sendPersonalPostsSearch()', param);
      const pg_urlPara_userID = this.urlParaObj?.user_id; // 有無網址使用者 id
      const userID = pg_urlPara_userID || this.userData._id; // 不是網址傳參數使用者就是登入者本人
      const { timeSortStr, queryStr } = param;
      this.posts.isLoad = true;
      this.getPersonalPosts({
        userID: userID,
        timeSortStr: timeSortStr,
        queryStr: queryStr,
      }).then((res) => {
        this.posts.data = res.data;
        this.posts.isLoad = false;
      });
    },
    getPersonalPosts({ userID, timeSortStr = '', queryStr = '', postID = '' }) {
      // API controller 函式 getMyPostList
      const myPostListApi = `${this.apiUrl}/posts/user/${userID}?timeSort=${timeSortStr}&q=${queryStr}&post_id=${postID}`;
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common.Authorization = `Bearer ${this.cookieToken}`; // 將 Token 加入到 Headers 內
        axios
          .get(myPostListApi)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
            console.log('err.request', err.request);
            const errObj = JSON.parse(err.request.response);
            console.log('myPostListApi err.request.response', errObj);
            alert(
              `取得個人所有貼文列表資料發生錯誤，原因：${err.response.data.message}`
            );
          });
      });
    },
  },
  created: function () {
    this.isLoading = true;
    this.getCookieToken();
    this.checkLogIn();
    this.getProfile()
      .then(async (res) => {
        const { _id, avatarUrl, email, gender, userName } = res.data;
        const getUserData = { _id, avatarUrl, email, gender, userName };
        console.log('getUserData', getUserData);
        this.userData = getUserData;
        this.urlParaObj = this.pg_urlParaObj(); // 網址參數物件賦予實體變數上
        const pg_urlPara_userID = this.urlParaObj?.user_id
          ? this.urlParaObj.user_id
          : ''; // 有無網址使用者 id
        const userID = pg_urlPara_userID || this.userData._id; // 不是網址傳參數使用者就是登入者本人

        await this.getPersonalPosts({
          userID,
          postID: this.urlParaObj?.post_id || '',
        })
          .then(async (res) => {
            console.log('getPersonalPosts res.data', res.data);
            this.posts.data = res.data;

            /** 判斷個人 post 取得筆數
             * 有資料取得的陣列資料中，每筆的 userData 下的 id 都是相同
             * 沒 post 取得空陣列，裡面沒有 userData 與 id。
             */
            if (this.posts.data.length == 0) {
              const theUserProfile = await this.getProfile(userID);
              console.log('theUserProfile.data', theUserProfile.data);
              this.personalUser.userData = theUserProfile.data;
            } else {
              // 回傳陣列資料，每筆 userData 下的 id 都是相同，取其第一筆
              this.personalUser.userData =
                this.posts.data[0]?.userData || this.userData;
            }

            // 判斷取得 user 對象追蹤的 followers
            if (this.personalUser.userData.followers) {
              /** 目前查使用者有無在追踨列表中 (followers)
               * followers 下的物件，資料庫沒處理關聯，取使用者 id 是對 userData 屬性
               * 列表 id 中沒對象 -1、有回 0
               */
              const personalFollowers = this.personalUser.userData.followers;
              const isFollower = personalFollowers.findIndex((personal) => {
                console.log('getUserData._id', getUserData._id);
                console.log('personal.userData', personal.userData);
                return personal.userData == getUserData._id;
              });
              console.log('isFollower', isFollower);
              this.personalUser.isFollow = !isFollower;
              // (!isFollower) 處理列表回應結果轉義：!-1 = false / !0 = true
              console.log(
                'this.personalUser.isFollow | -1 = false',
                this.personalUser.isFollow
              );
            } else {
              this.personalUser.userData.followers = [];
              this.personalUser.isFollow = false;
            }

            this.posts.isLoad = false;
            this.isLoading = false;
            this.$bus.$emit(
              "bus-toasts:push",
              {
                message: "personalPosts 頁面觸發 tost",
                // status: "danger",
                delay: '3000',
              },
            );
          })
          .catch((err) => {
            console.log(
              'p_personalPosts getProfile() getPersonalPosts() err',
              err
            );
            alert('發生錯誤');
          });
      })
      .catch((err) => {
        console.log('p_personalPosts getProfile() err', err);
      });
  },
});
