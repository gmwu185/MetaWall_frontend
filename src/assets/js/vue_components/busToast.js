import Vue from 'vue';

export default Vue.component('tosast', {
  data() {
    return {
      toasts: [
        // {
        //   message: 'toast 元件內，訊息內容',
        //   status: 'danger',
        //   timestamp: 5555,
        // },
      ],
    };
  },
  methods: {
    updateToast(message, status, textColor, delay) {
      const timestamp = Math.floor(new Date());
      this.toasts.push({
        message,
        status,
        textColor,
        timestamp,
        delay,
      });
      this.removeToastWithTiming(timestamp, delay);
    },
    removeToast(num) {
      this.toasts.splice(num, 1);
    },
    removeToastWithTiming(timestamp, delay) {
      setTimeout(() => {
        this.toasts.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            this.toasts.splice(i, 1);
          }
        });
      }, delay);
    },
  },
  created() {
    /** 自定義名稱 'bus-toasts:push'
     * message: 傳入參數
     * status: 樣式，預設值為 primary
     */
    this.$bus.$on(
      'bus-toasts:push',
      ({ message, status = 'primary', textColor = 'white', delay = '5000'}) => {
        this.updateToast(message, status, textColor, delay);
      }
    );

    /** toast 元件用法
      * this.$bus.$emit() 方法參數二個
      * 第一個參數一定是 "bus-toasts:push"
      * 第二個參數一定使用空物件，可不帶入屬性會使用函式所設定的預設值。
      *! 使用時注意程式碼正確，當透過 $bus 呼叫元件使用，如產生程式錯誤會無法得知訊息。
      * class 與 JS 規劃，參考資料：bootstrap bus-toasts (https://getbootstrap.com/docs/5.0/components/toasts/)
     */
    // this.$bus.$emit(
    //   "bus-toasts:push",
    //   {
    //     message: "tosast 元件內事件觸發",
    //     status: "warning",
    //     textColor: "dark",
    //     delay: '3000',
    //   },
    // )
  },
  template: `
    <div class="position-fixed bottom-0 top-0 end-0 p-1"
      style="z-index: 2000; height: 1px; height: max-content;"
      v-if="toasts.length > 0"
    >
      <div class="toast show align-items-center text-white border-0 mb-2"
        v-for="(toast, i) in toasts"
        :class="toast.status ? 'bg-' + toast.status : ''"
        :key="toast.timestamp"
        :ref="'toast-' + toast.timestamp"
      >
        <div class="d-flex">
          <div class="toast-body"
            :class="toast.textColor ? 'text-' + toast.textColor : ''"
          >
            {{ toast.message }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
          ></button>
        </div>
      </div>
    </div>
  `,
});
