import Vue from 'vue';

export default Vue.component('nav-main', {
  methods: {
    componentSignout() {
      if (confirm('請確任是否登出')) {
        this.$emit('push-signout');
      }
    },
  },
  props: ['userData'],
  template: `
    <nav
      class="p-stickyNavMain border border-3 border-top-0 border-start-0 border-end-0 border-dark bg-white"
    >
      <div class="container">
        <div class="row">
          <div
            class="navbar navbar-expand-lg navbar-light justify-content-between py-3"
          >
            <a class="c-logo" href="index.html" title="MetaWall logo">
              MetaWall
            </a>
            <div class="btn-group">
              <a
                class="text-decoration-none d-flex align-items-center"
                href="#"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                <user-avatar
                  class="mx-auto me-2"
                  :img-url="userData.avatarUrl"
                  :incom-class="['c-pseudoOneToOne--xs']"
                ></user-avatar>
                <span
                  class="u-fontFamily--AzeretMono fw-bold text-dark lh-19 px-1 pb-1 border-dark border-bottom"
                >
                  {{ userData.userName }}
                </span>

              </a>
              <ul
                class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start text-center u-solidDoubShadow-rb"
              >
                <li
                  class="border border-dark border-2 border-top-0 border-start-0 border-end-0"
                >
                  <button
                    class="dropdown-item py-2"
                    type="button"
                    @click='this.location = "personalPosts.html?user_id=" + userData["_id"]'
                  >
                    我的貼文牆
                  </button>
                </li>
                <li
                  class="border border-dark border-2 border-top-0 border-start-0 border-end-0"
                >
                  <button
                    class="dropdown-item py-2"
                    type="button"
                    @click='this.location.href = "editProfile.html"'
                  >
                    修改個人資料
                  </button>
                </li>
                <li class="border border-dark border-0">
                  <button
                    class="dropdown-item py-2"
                    type="button"
                    @click="componentSignout"
                  >
                    登出
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
});
