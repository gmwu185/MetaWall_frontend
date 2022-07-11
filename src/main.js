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

import 'scss/main.scss';
