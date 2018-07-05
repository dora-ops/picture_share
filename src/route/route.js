import { findList } from '../config/config';

const Login = r => require.ensure([], () => r(require('@/view/login/login')), 'login');
const Register = r => require.ensure([], () => r(require('@/view/register/register')), 'register');
const Index = r => require.ensure([], () => r(require('@/view/index/index')), 'index'); 
const Home = r => require.ensure([], () => r(require('@/view/home/home')), 'home');
const Find = r => require.ensure([], () => r(require('@/view/find/find')), 'find');
const FindList = r => require.ensure([], () => r(require('@/view/find/children/findList')), 'findList');
const ImageView = r => require.ensure([], () => r(require('@/view/imageView/imageView')), 'imageView');
const Error404 = r => require.ensure([], () => r(require('@/view/error/404')), 'error');
const Profile = r => require.ensure([], () => r(require('@/view/profile/profile')), 'profile');
const User = r => require.ensure([], () => r(require('@/view/user/user')), 'user');
const Concern =  r => require.ensure([], () => r(require('@/view/concern/concern')), 'concern');
const Message = r => require.ensure([], () => r(require('@/view/message/message')), 'message');
const MessageList = r => require.ensure([], () => r(require('@/view/message/children/messagelist')), 'messagelist'); 
const PhotoType = r =>  require.ensure([], () => r(require('@/view/user/children/photoType')), 'photoType');

const routes = [
  {
    path: '/',
    meta: {
      isAuth: true
    },
    component: Index,
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          isAuth: true
        },
        component: Home
      },
      {
        path: 'find',
        name: 'find',
        meta: {
          isAuth: true
        },
        component: Find,
        children: [
          {
            path: ':type',
            name: 'findList',
            meta: {
              isAuth: true
            },
            component: FindList
          }
        ]
      },
      {
        path: 'user/:id',
        name: 'user',
        meta: {
          isAuth: true
        },
        component: User,
        children: [
          {
            path: ':type',
            name: 'photoType',
            meta: {
              isAuth: true
            },
            component: PhotoType
          }
        ]
      },
      {
        path: 'profile',
        name: 'profile',
        meta: {
          isAuth: true
        },
        component: Profile
      },
      {
        path: 'imageView/:id',
        name: 'imageView',
        meta: {
          isAuth: true
        },
        component: ImageView
      },
      {
        path: 'concern',
        name: 'concern',
        meta: {
          isAuth: true
        },
        component: Concern,
      },
      {
        path: 'message',
        name: 'message',
        meta: {
          isAuth: true
        },
        component: Message,
        children: [
          {
            path: ':type',
            name: 'messagelist',
            meta: {
              isAuth: true
            },
            component: MessageList,
          }
        ]
      }
    ]
  },
  {
    path: '/error',
    name: 'error',
    component: Error404 
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

export default routes;