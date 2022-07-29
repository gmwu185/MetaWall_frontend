import Vue from 'vue';

export default Vue.component('nav-sub', {
  methods: {
    // componentSignout() {
    //   if (confirm('請確任是否登出')) {
    //     this.$emit('push-signout');
    //   }
    // },
  },
  props: ['userData'],
  template: `
  <aside class="col-lg-auto w-lg-35 ms-lg-7 p-stickyNavSub">
    <nav class="card p-stickyNavSub__inner">
      <div class="card-body py-2 py-lg-8">
        <button
          class="w-100 btn btn-primary btn-lg d-none d-lg-block mb-6"
          type="button"
          onclick='document.location.href = "postNews.html"'
        >
          張貼動態
        </button>
        <ul class="p-stickyNavSubMenu list-unstyled ps-lg-2 mb-0">
          <li class="p-stickyNavSubMenu__item d-lg-none order-1">
            <a class="w-100 p-stickyNavSubBtns" href="postNews.html">
              <div
                class="c-pseudoOneToOne c-pseudoOneToOne--round c-pseudoOneToOne--m p-stickyNavSubBtns__icon p-stickyNavSubBtns__icon--primary me-lg-4"
              >
                <i class="fas fa-plus"></i>
              </div>
              <p class="fw-bold p-stickyNavSubBtns__title mb-0">張貼動態</p>
            </a>
          </li>
          <li class="p-stickyNavSubMenu__item d-none d-lg-block">
            <a class="w-100 p-stickyNavSubBtns"
            :href="('personalPosts.html?user_id=' + userData['_id'])"
            >
              <user-avatar class="me-lg-4"
                :incom-class="'c-pseudoOneToOne--m'"
                :img-url='userData.avatarUrl'
              ></user-avatar>
              <p class="fw-bold p-stickyNavSubBtns__title mb-0">
                {{ userData.userName }}
              </p>
            </a>
          </li>
          <li class="p-stickyNavSubMenu__item d-block d-lg-none">
            <a class="w-100 p-stickyNavSubBtns" href="allDynamicWall.html">
              <div
                class="c-pseudoOneToOne c-pseudoOneToOne--round c-pseudoOneToOne--m c-pseudoOneToOne--user p-stickyNavSubBtns__icon p-stickyNavSubBtns__icon--home fas me-lg-4"
              >
                <i class="fas fa-home"></i>
              </div>
              <p class="fw-bold p-stickyNavSubBtns__title mb-0">回首頁</p>
            </a>
          </li>
          <li class="p-stickyNavSubMenu__item">
            <a class="w-100 p-stickyNavSubBtns" href="followList.html">
              <div
                class="c-pseudoOneToOne c-pseudoOneToOne--round c-pseudoOneToOne--m p-stickyNavSubBtns__icon me-lg-4"
              >
                <i class="far fa-bell"></i>
              </div>
              <p class="fw-bold p-stickyNavSubBtns__title mb-0">追蹤名單</p>
            </a>
          </li>
          <li class="p-stickyNavSubMenu__item">
            <a class="w-100 p-stickyNavSubBtns" href="myLike.html">
              <div
                class="c-pseudoOneToOne c-pseudoOneToOne--round c-pseudoOneToOne--m p-stickyNavSubBtns__icon me-lg-4"
              >
                <i class="far fa-thumbs-up"></i>
              </div>
              <p class="fw-bold p-stickyNavSubBtns__title mb-0">我按讚的文章</p>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </aside>  
  `,
});
