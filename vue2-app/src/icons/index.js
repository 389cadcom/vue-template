import Vue from 'vue'
import Icon from './icon.vue'
Vue.component('svg-icon', Icon)

/**
 * require.context加载的文件合并到app.js文件中
 * files
 * keys(), resolve(), id
 * FIXME: 使用import(/ webpackChunkName: "chunk"/ ) 无法分离
 */
const files = require.context('./svg', false, /\.svg$/)
files.keys().forEach(key => {
  files(key)
})
