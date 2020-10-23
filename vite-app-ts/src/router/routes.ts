import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('/@/views/Home.vue'),
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('/@/views/Setting.vue'),
  },
  {
    path: '/about',
    component: () => import('/@/views/About.vue'),
  },
]

export default routes
