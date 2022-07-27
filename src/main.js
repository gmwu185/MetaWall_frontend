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
  set_Loading,
  set_veeValidate,
} from 'assets/js/vue_vendors';
set_Vue();
set_VueAxios();
set_Loading();
set_veeValidate();

// vue 自定義全域元件
import userAvatar from 'assets/js/vue_components/userAvatar';
import navMain from 'assets/js/vue_components/navMain';
import navSub from 'assets/js/vue_components/navSub';
import btnFile from 'assets/js/vue_components/btnFile';
import searchBar from 'assets/js/vue_components/searchBar';

import 'scss/main.scss';
