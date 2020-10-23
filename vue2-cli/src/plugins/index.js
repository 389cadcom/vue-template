import Vue from 'vue'
import VueMata from 'vue-meta'

import $utils from '@/utils/utils'
import $api from '@/api/api-list'
import '@/styles/index.scss'                          //引入样式
import '@/assets/icons/index'                         //引入svg-icon

import './vant-ui'                                    //注册vant ui

//第三方插件
Vue.use(VueMata)

export default (Vue) => {
  Object.defineProperty(Vue.prototype, '$api', { value: $api })
  Object.defineProperty(Vue.prototype, '$utils', { value: $utils })
}


//ios12 光标点击定位bug
document.body.addEventListener("focusout", () => {
  setTimeout(() => {
    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
  }, 100);
})

// H5--input 输入完成后页面底部空白
if((/Android/gi).test(navigator.userAgent)){
  window.addEventListener('resize', () =>{
    if(document.activeElement.tagName == 'TEXTAREA' || document.activeElement.tagName == 'INPUT'){
      setTimeout(() => {
        document.activeElement.scrollIntoViewIfNeeded(true)
      }, 0)
    }
  })
}