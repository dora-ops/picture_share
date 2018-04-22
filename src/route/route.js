import Index from '@/view/index.vue'
import Login from '@/view/login.vue'
import Register from '@/view/register.vue'
import error from '@/layout/error.vue'
import User from '@/view/user.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      isAuth: true
    },
    component: Index,
  },
  {
    path: '/user/:id',
    name: 'user',
    meta: {
      isAuth: true
    },
    component: User
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