import Index from '@/view/index.vue'
import Login from '@/view/login.vue'
import Register from '@/view/register.vue'

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