import '@babel/polyfill';

import {
  set_axios,
  set_bootstrap,
  set_jQ_vendors,
} from 'assets/js/initVendors';
set_axios();
set_bootstrap();
set_jQ_vendors();

import {
  set_Vue,
  set_VueAxios,
  // set_Loading,
  set_veeValidate,
} from 'assets/js/vue_vendors';
set_Vue();
set_VueAxios();
// set_Loading();
set_veeValidate();

// vue 自定義全域元件
// Vue.prototype.$bus = new Vue();
// import busToast from 'assets/js/vue_components/busToast';
import userAvatar from 'assets/js/vue_components/userAvatar';
import navMain from 'assets/js/vue_components/navMain';
import navSub from 'assets/js/vue_components/navSub';
import btnFile from 'assets/js/vue_components/btnFile';
import searchBar from 'assets/js/vue_components/searchBar';
import cardStatus from 'assets/js/vue_components/cardStatus';
import cardPost from 'assets/js/vue_components/cardPost';
import cardFollow from 'assets/js/vue_components/cardFollow';
import cardLike from 'assets/js/vue_components/cardLike';

// vue 自定義全域 filter
import databaseTimeConvert from 'assets/js/vue_filters/databaseTimeConvert';
import getDistanceSpecifiedDay from 'assets/js/vue_filters/getDistanceSpecifiedDay';
import currencyChange from 'assets/js/vue_filters/currencyChange';

import 'scss/main.scss';
