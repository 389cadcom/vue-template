import Home from '@/views/demo/Home'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/demo/About.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "about" */ '@/views/demo/Cart.vue'),
  },
  {
    path: '/list',
    name: 'list',
    component: () => import(/* webpackChunkName: "about" */ '@/views/demo/List.vue'),
  },
  {
    path: '/drag',
    name: 'drag',
    component: () => import(/* webpackChunkName: "about" */ '@/views/demo/Drag.vue'),
  },
]

export default routes
