import Vue from 'vue'
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
