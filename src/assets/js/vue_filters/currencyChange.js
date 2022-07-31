import Vue from 'vue';

export default Vue.filter('currencyChange', 
  (num) => {
    var parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
);
