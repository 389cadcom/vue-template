import Vue from 'vue'

/**
 * 参数说明：
 * 1. 其组件目录的相对路径
 * 2. 是否查询其子目录
 * 3. 匹配基础组件文件名的正则表达式
 *
 * const name = file.replace(/^\.\/(.*)\.\w+$/, '$1')
 **/

const files = require.context('./', true, /\.(vue)$/)
const components = files.keys().map(file => {
  var component = files(file).default || files(file)

  if (!component.name) {
    component.name = file.replace(/^\.\/|\.vue$/g, '').replace(/\//, '-')
  }
  return component
})

// console.log(components)
components.forEach(component => {
  Vue.component(component.name, component)
})
export default {
  install(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  },
}
