/*
  网络icon地址:      https://img.yzcdn.cn/vant/vant-icon-6ae417.ttf
  引用本地vant icon  import 'vant/es/icon/local.css'
  vant/es/tag/style/less.js
*/
/* eslint-disable prettier/prettier */
import {
  Button, CellGroup, Cell, Field,  Image, Icon, NavBar, NoticeBar,
  Grid, GridItem,
  RadioGroup, Radio, Tag, CheckboxGroup, Checkbox, Search, Empty,
  Switch, Tabs, Tab, Tabbar, TabbarItem, Steps, Step, Uploader,
  List, PullRefresh, Popup, Skeleton, IndexBar, IndexAnchor,
  Collapse, CollapseItem, Picker, DatetimePicker, Dialog, ImagePreview
} from 'vant'
const components = [
  Button, CellGroup, Cell, Field,  Image, Icon, NavBar, NoticeBar,
  Grid, GridItem,
  RadioGroup, Radio, Tag, CheckboxGroup, Checkbox, Search, Empty,
  Switch, Tabs, Tab, Tabbar, TabbarItem, Steps, Step, Uploader,
  List, PullRefresh, Popup, Skeleton, IndexBar, IndexAnchor,
  Collapse, CollapseItem, Picker, DatetimePicker, Dialog, ImagePreview
]

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
