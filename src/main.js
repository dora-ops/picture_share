// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './route'
import store from './store';
import './assets/scss/index.scss';
import MiUI from './packages/index';
import VueLazyload from 'vue-lazyload';
//import 'element-ui/lib/theme-chalk/index.css';
import { Carousel, CarouselItem, Upload, Dialog} from 'element-ui';

Vue.config.productionTip = false
Vue.use(MiUI);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Upload);
Vue.use(VueLazyload);
Vue.use(Dialog);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
