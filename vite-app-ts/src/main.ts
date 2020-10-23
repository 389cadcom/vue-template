import { createApp } from 'vue'
import router from '/@/router'
import store from '/@/store'
import plugins from '/@/plugins'

// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import 'vant/lib/index.css'

import App from '/@/App1.vue'
import '/@/styles/index.scss'

const app = createApp(App)
app.use(plugins)
app.use(router)
app.use(store)
// app.use(Antd)
app.mount('#app')
