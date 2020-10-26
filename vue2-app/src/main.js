import Vue from 'vue'
import $api from '@/api/api-list'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)
import '@/components'

Vue.prototype.$api = $api
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
