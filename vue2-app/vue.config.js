// import { title } from './config/setting'
const { SpritesMith } = require('./config/webpack.sprite')
const { BASE_URL, NODE_ENV, VUE_APP_BASE_API } = process.env
const isDev = NODE_ENV ? true : false

const mockServer = () => {
  if (NODE_ENV === 'development') {
    return require('./mock/mockServer.js')
  } else {
    return ''
  }
}

module.exports = {
  lintOnSave: false,
  publicPath: BASE_URL,
  assetsDir: 'static',
  productionSourceMap: !isDev,
  devServer: {
    proxy: {
      [VUE_APP_BASE_API]: {
        target: 'http://httpbin.org',
        changeOrigin: true,
        pathRewrite: {
          ['^' + VUE_APP_BASE_API]: '',
        },
      },
      '/api': {
        target: 'http://httpbin.org',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    // after: mockServer()
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@views': 'src/views',
      },
      extensions: ['.scss', '.css', '.less'],
    },
    //雪碧图
    plugins: [SpritesMith(), SpritesMith('sprite1')],
  },
  chainWebpack: config => {
    require('./config/china')(config)
  },
  css: {
    loaderOptions: {
      scss: {
        // prependData: ` @import "~@/styles/mixin/_utils.scss"; @import "~@/styles/mixin/theme.scss"; `,
      },
      less: {
        modifyVars: {
          hack: `true; @import "~@/styles/vant.less";`,
        },
      },
    },
  },
}
