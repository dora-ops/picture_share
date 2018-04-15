import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import routes from './route'
import { getUserFromLocalStroage } from '../util/auth';

Vue.use(Router)

const router = new Router({routes});

router.beforeEach((to, from, next) => {
  if(to.meta.isAuth){
    const { user: { userToken } } = store.state
    const user = getUserFromLocalStroage();
    if(userToken){
      next();
    }else if(user){
      store.commit('LOGIN_IN', user);
      next();
    }else{
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }else{
    next();
  }
})
export default router;
