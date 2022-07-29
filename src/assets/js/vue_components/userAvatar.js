import Vue from 'vue';

export default Vue.component('user-avatar', {
  props: {
    'imgUrl': {
      type: String,
    },
    'incomClass': Array,
  },
  template: `
    <div
      class="c-pseudoOneToOne c-pseudoOneToOne--round c-pseudoOneToOne--user"
      :class='incomClass'
      :style='{ backgroundImage: (this.imgUrl) ? ("url(" + this.imgUrl + ")") : "" }'
    ></div>
  `,
});
