/**
 * vant-ui统一注
 */
import { Cell, Tabbar, TabbarItem, Tabs, Tab, Button, Toast } from 'vant'
import { App } from 'vue'
import { dateFormat } from '../utils/date'

const components = [Cell, Tabbar, TabbarItem, Tabs, Tab, Button, Toast]

console.log(process.env.NODE_ENV)

export default {
  install(app: App<Element>): void {
    app.config.globalProperties.$formater = dateFormat

    components.forEach(item => {
      console.log(item.name)
      if (typeof item === 'function') {
        app.use(item)
      } else {
        app.component((item as any).name, item)
      }
    })
  },
}
