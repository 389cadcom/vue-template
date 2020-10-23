import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'

console.log(process.env)
export default createRouter({
  history: createWebHistory('/start-vue3/'),
  routes,
})
