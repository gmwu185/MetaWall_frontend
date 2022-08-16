import Vue from 'vue';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { NotifyInit } from '../init_notiflix';
NotifyInit(Notify);

export default Vue.component('card-like', {
  props: ['like-item', 'user-data', 'incom-api-info'],
  data() {
    return {
      apiInfo: this.incomApiInfo,
      likePost: this.likeItem,
      logInUser: this.userData,
      theLikePost: {
        follower: {},
        isLogInUser: Boolean,
      },
      isLikeCancelLoad: false,
    };
  },
  methods: {
    emitUpdataLikeList() {
      this.$emit('emit-updata-like-list');
    },
    cancelLike(likeID) {
      const toggleLikeApi = `${this.incomApiInfo.apiUrl}/post/${likeID}/likes`;
      axios.defaults.headers.common.Authorization = `Bearer ${this.incomApiInfo.cookieToken}`;

      this.isLikeCancelLoad = true;
      axios
        .patch(toggleLikeApi)
        .then((res) => {
          Notify.success('取消按讚成功！');
          this.isLikeCancelLoad = false;
          this.emitUpdataLikeList();
        })
        .catch((error) => {
          Report.failure(
            '發生錯誤',
            `<p class="mb-0 text-center">${error.message}</p>`,
            '確定'
          );
        });
    },
  },
  created() {
    /** 卡片組件
     * this.likePost.userData.followers 陣列資料，比對此文章所有的追蹤 user
     * this.userData._id 此文章的 user 取 id
     * 有被追蹤回傳出來到 this.theLikePost.follower 變數上
     */
    this.theLikePost.follower = this.likePost.userData.followers.find(
      (follower) => follower.userData == this.userData._id
    );
    // 比對登入 user 本人
    this.theLikePost.isLogInUser =
      this.likePost.userData._id === this.logInUser._id;
  },
  template: `
  <div class="card bg-white u-solidShadow-b">
    <div class="card-body p-4">
      <div class="row gx-4">
        <div class="col-auto d-flex align-items-center">
          <a :href="'personalPosts.html?user_id=' + likePost.userData._id">
            <user-avatar
              :incomClass="['c-pseudoOneToOne--s']"
              :imgUrl="likePost.userData.avatarUrl"
            ></user-avatar>
          </a>
        </div>
        <div class="col d-flex align-items-center">
          <p class="w-100 fw-bold mb-0">
            <a :href="'personalPosts.html?user_id=' + likePost.userData._id">
              <span class="d-inline-block">{{ likePost.userData.userName }}</span>
            </a>
            <small class="d-block h6 text-pastel lh-17 mb-0"
              v-if='theLikePost.follower'
            >
              <span class="d-inline-block">追蹤時間：</span>
              <span class="d-inline-block u-fontFamily--Lato">
                {{ theLikePost.follower.createdAt | databaseTimeConvert }}
              </span>
            </small>
            <small class="d-block h6 text-pastel lh-17 mb-0"
              v-else-if='theLikePost.isLogInUser'
            >
              <span class="d-inline-block">登入者本人無法追蹤</span>
            </small>
            <small class="d-block h6 text-pastel lh-17 mb-0"
              v-else
            >
              <span class="d-inline-block">對象未被追蹤</span>
            </small>
          </p>
        </div>
        <div class="col-auto d-flex align-items-center">
          <div class="me-2 me-md-5">
            <a
              class="d-inline-block text-center me-6 me-md-9"
              href="#"
              @click.prevent="cancelLike(likePost._id)"
            >
              <i
                class="far fa-thumbs-up text-primary h5 mb-1"
              ></i>
              <span class="d-block h6 lh-20 mb-0" v-if="isLikeCancelLoad">讀取中 ...</span>
              <span class="d-block h6 lh-20 mb-0" v-else>取消</span>
            </a>
            <a class="d-inline-block text-center"
              :href="'personalPosts.html?user_id=' + likePost.userData._id + '&post_id=' + likePost._id"
            >
              <i
                class="far fa-arrow-alt-circle-right text-primary h5 mb-1"
              ></i>
              <span class="d-block h6 lh-20 mb-0">查看</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
});
