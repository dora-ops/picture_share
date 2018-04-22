import axios from 'axios';
import { deleteTokenFromLocalStroage } from '../util/auth';
import store from '../store/index';
import router from '../route/index';

const config = {
  baseURL: 'http://localhost:1234',
  timeout: 5000,
  responseType: 'json',
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
            path: '/',
            query: {redirect: router.currentRoute.fullPath}
          })
          break;  
        default:
          
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
                 .replace(/(\$)([a-z]+)/g, '?$2=')
                 .toLocaleLowerCase();
    return function(data = {}){
      if(method === 'get'){
        const params = data;
        return instance({method, url, params});
      }else if(method === 'post'){
        return instance({method, url, data});
      }
    } 
  }
})

export default api;