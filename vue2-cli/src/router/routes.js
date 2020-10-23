import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

let routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import(/* webpackChunkName: "demo" */ '../views/demo/demo.vue'),
    meta: {
      requireAuth: true
    }
  },
]

export default routes