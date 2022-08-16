import Vue from 'vue';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ReportInit, NotifyInit } from '../init_notiflix';
ReportInit(Report), NotifyInit(Notify);

import { isThrowError } from '../helpers/errors';

export default Vue.component('card-post', {
  props: ['postData', 'incomApiInfo', 'login-user-data'],
  data() {
    return {
      loginUser: {
        userData: this.loginUserData,
        comment: {
          isLoad: false,
          msg: '',
        },
      },
      post: this.postData,
      comments: JSON.parse(JSON.stringify(this.postData.comments.reverse())),
      apiInfo: this.incomApiInfo,
      likeIsLoad: false,
    };
  },
  methods: {
    toggleLike(postID) {
      const toggleLikeApi = `${this.apiInfo.apiUrl}/post/${postID}/likes`;

      this.likeIsLoad = true;
      axios
        .patch(toggleLikeApi)
        .then((res) => {
          const { likes } = res.data.data;
          this.post.likes = likes;
          this.likeIsLoad = false;
          Notify.success('按讚或取消按讚已操作成功！');
        })
        .catch((error) => {
          Report.failure(
            '錯誤',
            `<p class="mb-0 text-center">${error.response.data.message}</p>`,
            '確定'
          );
        });
    },
    sendLoginUserComment() {
      const commentApi = `${this.apiInfo.apiUrl}/post/${this.post._id}/comment`;

      if (!this.loginUser.comment.msg) {
        const errorObj = {
          title: '發生錯誤',
          message: '內容需填入',
        };
        Report.failure(
          errorObj.title,
          `<p class="mb-0 text-center">${errorObj.message}</p>`,
          '確定'
        );
        isThrowError({ msgStr: errorObj.message });
      }

      this.loginUser.comment.isLoad = true;
      const newCommentObj = {
        comment: this.loginUser.comment.msg,
      };
      axios
        .post(commentApi, newCommentObj, {
          Authorization: `Bearer ${this.apiInfo.cookieToken}`,
        })
        .then((res) => {
          if (res.data.data.commentUser._id == this.loginUser.userData._id) {
            const newComment = res.data.data;
            this.comments = [newComment, ...this.comments];
            this.loginUser.comment.msg = '';
            Notify.success('已留言成功！');
          } else {
            Report.failure(
              '發生錯誤',
              `<p class="mb-0 text-center">更新對象無法查明，請重讀頁面！</p>`,
              '確定'
            );
          }
          this.loginUser.comment.isLoad = false;
        })
        .catch((err) => {
          Report.failure(
            '發生錯誤',
            `<p class="mb-0 text-center">${err.response.data.message}</p>`,
            '確定'
          );
          this.loginUser.comment.isLoad = false;
        });
    },
  },
  template: `
  <div class="card bg-white u-solidShadow-b">
    <div class="card-header pb-0 border-bottom-0 bg-white">
      <div class="row g-4">
        <div class="col-auto">
          <a class="d-block"
            :href="('personalPosts.html?user_id=' + post.userData['_id'])"
          >
            <user-avatar
              :incomClass="['c-pseudoOneToOne--m']"
              :imgUrl="post.userData.avatarUrl"
            ></user-avatar>
          </a>
        </div>
        <div class="col d-flex align-items-center">
          <p class="mb-0">
            <a class="fw-bold"
              :href="('personalPosts.html?user_id=' + post.userData['_id'])"
            >
              {{ post.userData.userName }}
            </a>
            <small
              class="d-block text-pastel lh-lg u-fontFamily--BalooDa2 fw-light"
            >
              {{ post.createAt | databaseTimeConvert }}
            </small>
          </p>
        </div>
      </div>
    </div>
    <div class="card-body pt-4 pb-2">
      <p class="text-preLine">{{ post.content }}</p>
      <div class="c-minHightPhoto" v-if="post.image">
        <img class="c-minHightPhoto__img" :src="post.image" />
      </div>
      <div
        class="c-like position-relative"
        @click="toggleLike(post.id)"
      >
        <i
          aria-hidden="true"
          class="c-like__icon far fa-thumbs-up stretched-link"
          :class="{ 'text-primary': post.likes.length > 0 , 'text-pastel': (!likeIsLoad && post.likes.length == 0) }"
        ></i>
        <span
          class="c-like__content u-fontFamily--BalooDa2"
          v-if="!likeIsLoad && post.likes.length == 0"
          :class="{ 'text-pastel': post.likes.length == 0 }"
        >
          成為第一個按讚的朋友
        </span>
        <span
          class="c-like__content u-fontFamily--BalooDa2"
          v-if="!likeIsLoad && post.likes.length > 0"
        >
          {{ post.likes.length }}
        </span>
        <span
          class="c-like__content u-fontFamily--BalooDa2"
          v-if="likeIsLoad"
        >
          讀取中 ...
        </span>
      </div>
      <div class="w-100 d-flex align-items-center mb-4">
        <user-avatar
          :incomClass="['c-pseudoOneToOne--s', 'me-2']"
          :imgUrl="loginUser.userData.avatarUrl"
        ></user-avatar>
        <div class="input-group input-group-sm">
          <input
            class="form-control"
            v-model="loginUser.comment.msg"
            placeholder="留言..."
          />
          <button class="btn py-2 px-4 px-md-12"
            :class="{'btn-warning': loginUser.comment.isLoad, 'btn-primary': !loginUser.comment.isLoad}"
            @click.pervent="sendLoginUserComment"
          >
            <span class="position-relative">
              <span>留言</span>
              <span
                class="position-md-absolute start-md-100 top-md-50 translate-middle-md-y ms-md-1"
                v-if="loginUser.comment.isLoad"
              >
                <i
                  class="fas fa-spinner c-spinner--radiation"
                ></i>
              </span>
            </span>
          </button>
        </div>
      </div>
      <ul class="list-unstyled">
        <li class="card bg-light bg-opacity-30 border-0 mb-4"
          v-for="(comment, index) in comments" :key="comment._id"
        >
          <div class="card-body p-4">
            <div class="w-100 d-flex align-items-center mb-1">
              <a :href="'personalPosts.html?user_id=' + comment.commentUser._id">
                <user-avatar
                  :incomClass="['c-pseudoOneToOne--s', 'me-3']"
                  :imgUrl="comment.commentUser.avatarUrl"
                ></user-avatar>
              </a>
              <p class="mb-0">
                <a class="fw-bold" :href="'personalPosts.html?user_id=' + comment.commentUser._id">
                  {{ comment.commentUser.userName }}
                </a>
                <small
                  class="d-block text-pastel u-fontFamily--BalooDa2 lh-19 fw-light"
                >
                  {{ comment.createAt | databaseTimeConvert }}
                </small>
              </p>
            </div>
            <p class="ps-md-13 mb-0">
              {{ comment.comment }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
  `,
});
