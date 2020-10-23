import Vue from 'vue'
import '@/plugins/index'            

import App from './App.vue'
import router from './router'
import store from './store'

//微信SDK
import wxsdk from './utils/wx-sdk'
window.wxsdk = wxsdk

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
