import Home from '../views/Home'
const files = require.context('./modules', false, /\.js$/)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

files.keys().forEach(key => {
  let file = files(key).default
  if (Array.isArray(file)) {
    routes.push(...file)
  } else {
    routes.push(file)
  }
})

export default routes
