/*
  网络icon地址:      https://img.yzcdn.cn/vant/vant-icon-6ae417.ttf
  引用本地vant icon  import 'vant/es/icon/local.css'
  vant/es/tag/style/less.js
*/
/* eslint-disable prettier/prettier */
import { Button, Tag, Dialog, Toast, Icon } from 'vant'
const components = [Button, Tag, Dialog, Toast, Icon]

//全局插件
export default Vue => {
  components.forEach(item => {
    if (item.name == 'Dialog') {
      Vue.prototype.$confirm = Dialog.confirm
      Vue.prototype.$alert = Dialog.alert
    } 
    else if (item.install) {
      Vue.use(item)
    } 
    else {
      Vue.component(item.name, item)
    }
  })
}
