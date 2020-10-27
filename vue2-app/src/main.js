import Vue from 'vue'
import $api from '@/api/api-list'
import plugin from '@/plugins'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/components'

Vue.prototype.$api = $api
Vue.config.productionTip = false
Vue.use(plugin)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
