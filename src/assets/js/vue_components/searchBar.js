import Vue from 'vue';

export default Vue.component('search-bar', {
  methods: {
    sortMode() {
      this.$emit('send-search-emit', {
        timeSortStr: this.timeSortStr,
        queryStr: this.queryStr,
      });
    },
    sendSearch() {
      // 以上錯誤條件判斷都通過，才將 JS 產生的圖片的 src 值傳向 DOM 產生在畫面
      this.$emit('send-search-emit', {
        timeSortStr: this.timeSortStr,
        queryStr: this.queryStr,
      });
    },
  },
  data() {
    return {
      timeSortStr: '', // asc 新->舊 / desc 反序
      queryStr: '',
    };
  },
  // props: [''],
  template: `
    <!-- components__postSearchBar-->
    <div class="row g-3 mb-4">
      <div class="w-lg-30">
        <select class="form-select form-select"
          v-model="timeSortStr"
          @change="sortMode"
        >
          <option value="" disabled>請選擇</option>
          <option value="desc">最新貼文</option>
          <option value="asc">最舊貼文</option>
        </select>
      </div>
      <div class="col">
        <div class="input-group">
          <input class="form-control"
            placeholder="搜尋貼文"
            v-model="queryStr"
          >
          <button class="btn btn-primary px-3 py-2"
            type="button"
            @click="sendSearch"
          >
            <span class="h5 lh-sm mb-0">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
    <!-- /components__postSearchBar-->
  `,
});
