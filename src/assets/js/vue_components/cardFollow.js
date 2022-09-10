import Vue from 'vue';

export default Vue.component('card-follow', {
  props: ['follow-item'],
  data() {
    return {
      follower: this.followItem
    }
  },
  template: `
  <div class="card bg-white u-solidShadow-b">
    <div class="card-body p-4">
      <div class="row gx-4">
        <div class="col-auto d-md-flex align-items-md-center">
          <a :href="'personalPosts.html?user_id=' + follower.userData._id">
            <user-avatar
              :incom-class="['c-pseudoOneToOne--s']"
              :img-url='follower.userData.avatarUrl'
            ></user-avatar>
          </a>
        </div>
        <div class="col">
          <p class="fw-bold mb-0">
            <a :href="'personalPosts.html?user_id=' + follower.userData._id">
              <span class="d-inline-block">{{ follower.userData.userName }}</span>
            </a>
          </p>
          <ul
            class="list-unstyled d-md-flex justify-content-between h6 mb-0"
          >
            <li class="d-inline-block text-pastel lh-17 mb-0">
              <span class="d-inline-block">追蹤時間：</span><span class="d-inline-block u-fontFamily--Lato">
                {{ follower.createdAt | databaseTimeConvert }}
              </span>
            </li>
            <li class="d-inline-block lh-20 mb-0">
              <span>您已追蹤 </span>
              <span>{{ follower.createdAt | getDistanceSpecifiedDay }}</span>
              <span> 天！</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  `,
});
