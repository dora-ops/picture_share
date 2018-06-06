import axios from 'axios';
import { deleteTokenFromLocalStroage } from '../util/auth';
import store from '../store/index';
import router from '../route/index';

const config = {
  baseURL: process.env.API_ROOT,
  timeout: 5000,
}

const instance = axios.create(config);

// 请求拦截
instance.interceptors.request.use(
  req => {
    const { user: { userToken } } = store.state;
    if(store.getters.isAuth){
      req.headers.Authorization = `Bearer ${userToken}`;
    }
    return req;
  },
  error => {
    return Promise.reject(error);
  }
)

instance.interceptors.response.use(
  res => {
    return Promise.resolve(res);
  },
  error => {
    if(error.response){
      switch (error.response.status) {
        case 401:
          store.commit('LOGIN_OUT');
          deleteTokenFromLocalStroage();
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          break;
        case 404:
          router.replace({
            path: '/error',
            query: { reirect: router.currentRoute.fullPath }
          })
        break;  
        default:
          router.replace({
            path: '/error',
            query: { redirect: router.currentRoute.fullPath }
          })
          break;
      }
    }
  }
)

const api = new Proxy({}, {
  get(target, value){
    const method = value.match(/^[a-z]+/g)[0];
    const url = value
                 .substr(method.length)
                 .replace(/([A-Z])/g, '/$1')
                 .toLocaleLowerCase();
    return function(option = {}){
      if(method === 'get'){
        const { params } = option;
        return instance({method, url, params});
      }else if(method === 'post'){
        const { params, data } = option;
        return instance({method, url, data, params});
      }
    } 
  }
})

export default api;