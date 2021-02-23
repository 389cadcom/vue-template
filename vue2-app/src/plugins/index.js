/* eslint-disable prettier/prettier */
import VueMeta from 'vue-meta'

import * as $utils from '@/utils'
import $api from '@/api/api-list'

import VantUI from './vant-ui'            //统一注册vant ui
import '@/icons'                          //引入svg-icon
import '@/styles/index.scss'              //引入全局样式


//ios12 光标点击定位bug
document.body.addEventListener('focusout', () => {
  setTimeout(() => {
    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
    window.scrollTo(0, Math.max(scrollHeight - 1, 0))
  }, 100)
})

// H5--input 输入完成后页面底部空白
if (/Android/gi.test(navigator.userAgent)) {
  window.addEventListener('resize', () => {
    if (document.activeElement.tagName == 'TEXTAREA' || document.activeElement.tagName == 'INPUT') {
      setTimeout(() => {
        document.activeElement.scrollIntoViewIfNeeded(true)
      }, 0)
    }
  })
}

export default Vue => {
  Vue.use(VueMeta)
  Vue.use(VantUI)
  Object.defineProperty(Vue.prototype, '$api', { value: $api })
  Object.defineProperty(Vue.prototype, '$utils', { value: $utils })
}