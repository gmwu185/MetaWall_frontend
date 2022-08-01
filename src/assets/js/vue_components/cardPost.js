import Vue from 'vue';

export default Vue.component('card-post', {
  props: ['postData', 'incomApiInfo'],
  data() {
    return {
      post: this.postData,
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
        })
        .catch(err => {
          console.log('toggleLike catch error', error);
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
        <span
          class="c-pseudoOneToOne c-pseudoOneToOne--round c-pseudoOneToOne--s c-pseudoOneToOne--user me-2"
          style="
            background-image: url(assets/static-images/user--邊緣小杰.png);
          "
        ></span>
        <div class="input-group input-group-sm">
          <input
            class="form-control"
            value=""
            placeholder="留言..."
          />
          <button class="btn btn-primary py-2 px-4 px-md-12">
            <span class="position-relative">
              <span>留言</span>
            </span>
          </button>
        </div>
      </div>
      <div class="w-100 d-flex align-items-center mb-4">
        <span
          class="c-pseudoOneToOne c-pseudoOneToOne--round c-pseudoOneToOne--s c-pseudoOneToOne--user me-2"
          style="
            background-image: url(assets/static-images/user--邊緣小杰.png);
          "
        ></span>
        <div class="input-group input-group-sm">
          <input
            class="form-control"
            value="好羨慕ㄛ！！"
            placeholder="留言..."
          />
          <button class="btn btn-warning py-2 px-4 px-md-12">
            <span class="position-relative">
              <span>留言</span>
              <span
                class="position-md-absolute start-md-100 top-md-50 translate-middle-md-y ms-md-1"
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
        <li class="card bg-light bg-opacity-30 border-0 mb-4">
          <div class="card-body p-4">
            <div class="w-100 d-flex align-items-center mb-1">
              <div
                class="c-pseudoOneToOne c-pseudoOneToOne--round c-pseudoOneToOne--s c-pseudoOneToOne--user me-3"
                style="
                  background-image: url(assets/static-images/post--01__user--希琳.png);
                "
              ></div>
              <p class="mb-0">
                <a class="fw-bold" href="#">希琳</a>
                <small
                  class="d-block text-pastel u-fontFamily--BalooDa2 lh-19 fw-light"
                >
                  2022/1/10 12:00
                </small>
              </p>
            </div>
            <p class="ps-md-13 mb-0">真的～我已經準備冬眠了</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
  `,
});
