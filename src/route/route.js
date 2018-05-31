import Index from '@/view/index.vue'
import Login from '@/view/login.vue'
import Register from '@/view/register.vue'
import error from '@/layout/error.vue'
import User from '@/view/user.vue'
import Profile from '@/view/profile.vue';
import Home from '@/view/home.vue';
import ImageView from '@/view/imageView.vue';

const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      isAuth: true
    },
    component: Index,
    children: [
      {
        path: '/',
        meta: {
          isAuth: true
        },
        component: Home
      },
      {
        path: 'user/:id',
        name: 'user',
        meta: {
          isAuth: true
        },
        component: User,
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
      }
    ]
  },
  {
    path: '/error',
    name: 'error',
    component: error 
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