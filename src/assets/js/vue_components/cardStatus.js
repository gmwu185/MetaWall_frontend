import Vue from 'vue';

export default Vue.component('card-status', {
  props: ['interTag'],
  template: `
  <div class="card bg-white u-solidShadow-b">
    <div class="card-header bg-white p-4">
      <span class="d-inline-block p-1 rounded-circle border border-pasteltTrbidity bg-danger"></span>
      <span class="d-inline-block p-1 rounded-circle border border-pasteltTrbidity bg-warning ms-2"></span>
      <span class="d-inline-block p-1 rounded-circle border border-pasteltTrbidity bg-success ms-2"></span></div>
    <div class="card-body py-8">
      <p class="text-center text-pastel mb-0">
        <span v-html="interTag"></span>
      </p>
    </div>
  </div>
  `,
});
