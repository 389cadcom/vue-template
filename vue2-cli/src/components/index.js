import Vue from 'vue'

/**
 * 自动注册全局组件
 * 1.replace(/^\.\/(*)\.\w+$/, '$1')            剥离./与后缀名
 * 2.replace(/^\.\//,'').replace(/\.\w+$/,'')
 */
const files = require.context('./', true, /\.vue$/)
files.keys().forEach( file => {
  var name = file.replace(/^\.\/|\.vue$/g, '').replace(/\//, '-')
  var component = files(key)

  Vue.component(name, component.default || component)
})