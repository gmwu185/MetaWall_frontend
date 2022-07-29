import Vue from 'vue';

export default Vue.component('card-post', {
  props: ['postData'],
  data() {
    return {
      post: this.postData
    }
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
    </div>
  </div>
  `,
});
