import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)


const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
})

//页面刷新时, 重新赋值token
var token = sessionStorage.getItem('token')
if(token){
  store.commit('set_token', token)
}

router.beforeEach((to, from, next)=>{
  var token = store.state.token
  //授权登录页
  if(to.meta.requireAuth && !token){
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
  next()
})

export default router
