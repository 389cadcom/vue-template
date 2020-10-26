const { ChainConfig, SpritesMith } = require('./config')
const isDev = process.env.NODE_ENV == 'development' ? true : false

module.exports = {
  lintOnSave: false,
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: isDev,
  devServer: {
    proxy: {
      '/apiPath': {
        target: 'http://httpbin.org',
        changeOrigin: true,
        pathRewrite: {
          '^/apiPath': ''
        }
      }
    }
  },
  configureWebpack: {
    resolve:{
      alias: {
        '@views': 'src/views'
      },
      extensions: ['.scss', '.css', '.less']
    },
    plugins:[
      SpritesMith(),
      SpritesMith('sprite1')
    ]
  },
  chainWebpack: ChainConfig,
  css: {
    loaderOptions: {
      scss: {
        prependData: ` @import "~@/styles/mixin/_utils.scss"; @import "~@/styles/mixin/theme.scss"; `
      },
      less:{
        modifyVars: {
          hack: `true; @import "~@/styles/vant.less";`,
        }
      }
    }
  }
}
