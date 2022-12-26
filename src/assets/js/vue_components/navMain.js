import Vue from 'vue';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { LoadingInit, ConfirmInit } from '../init_notiflix';
LoadingInit(Loading), ConfirmInit(Confirm);

import API_behavior from '../vue_controllers/API_behavior';

export default Vue.component('nav-main', {
  methods: {
    componentSignout() {
      Confirm.show(
        '登出確認',
        '請確任是否登出',
        '是的',
        '取消',
        () => {
          this.$emit('push-signout');
          Loading.custom('讀取中 ...');
        },
        () => {
          return;
        }
      );
    },
    memberPay() {
      const payApiPath = `${API_behavior.apiUrl}/pay/ecpay`;
      const token = JSON.parse(localStorage.getItem('token'));
      axios
        .get(payApiPath)
        .then((res) => {
          if (res.status === 200) {
            // 插入新的元素準對 AJAX 回來的 JSON Form 表單，動能插入內容
            let EL_Body = document.querySelector('body');
            let formNode = document.createElement('DIV');
            formNode.id = '_form_aio_checkout_outSide';
            formNode.style.display = 'none';
            // console.log('formNode.id', formNode.id);
            EL_Body.appendChild(formNode);
            formNode.innerHTML = res.data.resHTML;
            // 以 form #_form_aio_checkout 對象，使用 Array 原型以 .from 方法將相關名稱加入類陣列中
            const elements = Array.from(
              document.querySelectorAll('#_form_aio_checkout')
            );
            console.log('elements', elements);
            // 比對 form 元素名稱一樣的為 _form_aio_checkout
            const match = elements.find((el) =>
              el.id.includes('_form_aio_checkout')
            );
            // 比對出來的元素加入屬性在觸發 submit() 時於同視窗導向第三方支付
            match.setAttribute('target', '_self');
            match.submit();
          }
        })
        .catch((err) => console.log(err));
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
            <a class="c-logo" href="allDynamicWall.html" title="MetaWall logo">
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
                    @click='memberPay'
                  >
                    會員儲值
                  </button>
                </li>
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
