// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './route'
import store from './store';
import './assets/scss/index.scss';
import MiUI from './packages/index';

Vue.config.productionTip = false
Vue.use(MiUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
