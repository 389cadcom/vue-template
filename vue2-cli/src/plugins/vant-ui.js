/**
 * 全局注册vant ui
 * 
 * 网络地址: https://img.yzcdn.cn/vant/vant-icon-6ae417.ttf
 */
import Vue from 'vue'

//引用本地vant icon
// import 'vant/es/icon/local.css';           

import {
  Button, Tag,
  Dialog, Toast,
} from 'vant'

const components = [
  Button, Tag,
  Dialog, Toast
]
components.forEach( component => {
  Vue.use(component)
})


//全局插件
export default (Vue) => {
  Object.defineProperty(Vue.prototype, '$confirm', { value: Dialog.confirm })
  Object.defineProperty(Vue.prototype, '$alert', { value: Dialog.alert })
}
