// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './theme/index.css'
import router from './router'
import api from './api/article'
import Loadings from './components/loading/load'
import 'lib-flexible'
import ElementUI from 'element-ui'
import "babel-polyfill"
import './vendor/drag'
Vue.use(ElementUI)
require('es6-promise').polyfill();
require('es6-promise/auto');

Vue.prototype.$api=api;
Vue.use(Loadings);
Vue.config.productionTip = false

// document.title = tt.stName;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
