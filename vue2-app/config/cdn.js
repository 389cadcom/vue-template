/**
 * CDN处理 vue.global.js
 */
const url = 'https://cdn.bootcdn.net/ajax/libs/'
const CDNS = {
  enable: true,
  js: {
    vue: {
      url: `${url}vue/2.6.12/vue.min.js`,
      exportName: 'Vue',
    },
    vuex: {
      url: `${url}vuex/3.2.0/vuex.js`,
      exportName: 'Vuex',
    },
    'vue-router': {
      url: `${url}vue-router/3.0.3/vue-router.min.js`,
      exportName: 'VueRouter',
    },
    axios: `${url}axios/0.20.0/axios.min.js`,
  },
  css: [],
}

module.exports = config => {
  if (!CDNS.enable) return
  config.plugin('html').tap(args => {
    args.forEach(arg => {
      arg.cdns = {
        js: Object.values(CDNS.js).map(item => {
          return typeof item === 'string' ? item : item.url
        }),
        css: CDNS.css,
      }
    })
    return args
  })

  let externals = Object.entries(CDNS.js).reduce((result, [key, value]) => {
    result[key] = typeof value === 'string' ? key : value.exportName
    return result
  }, {})
  config.externals(externals)
}
