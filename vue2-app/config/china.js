/* eslint-disable prettier/prettier */
const path = require('path')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const resolve = dir => path.resolve(__dirname, '..', dir)

//--mode analyze
const { NODE_ENV } = process.env
const isProd = NODE_ENV === 'production'

module.exports = config => {
  config.plugins.delete('preload') //预加载
  config.plugins.delete('prefetch')

  //base64图片
  config.module
    .rule('images')
    .use('url-loader')
    .loader('url-loader')
    .tap(options => ({ ...options, limit: 1024 }))

  //svg处理
  config.module.rule('svg').exclude.add(resolve('./src/icons'))
  config.module
    .rule('svg-sprite')
    .test(/\.svg$/)
    .include.add(resolve('./src/icons'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    })

  //js分组
  config.optimization.splitChunks({
    chunks: 'all',
    cacheGroups: {
      libs: {
        test: /[\\/]node_modules[\\]/,
        name: 'chunk-libs',
        priority: 10,
        chunks: 'initial'
      },
      vant: {
        test: /[\\/]node_modules[\\]vant[\\/]/,
        name: 'chunk-vant',
        priority: 20
      },
      commons: {
        name: 'chunk-commons',
        test: resolve('src/components'),
        minChunks: 3,
        priority: 5,
        reuseExistingChunk: true
      }
    }
  })
  config.optimization
    .minimizer('css')
    .use(OptimizeCSSAssetsPlugin, [{ cssProcessorOptions: { safe: true } }])

  //生产环境
  if (!isProd) return
  require('./china.prod')(config)
}
