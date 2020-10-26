const CompressionPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

//--mode analyze
const { COMPRESS, ANALYZE, VUE_APP_TITLE } = process.env
const isAnalyze = ANALYZE === 'true'
const isCompress = COMPRESS === 'true'

/**
 * 生产环境
 * @param {*} config
 */
module.exports = config => {
  config.optimization.minimizer('terser').tap(() => [
    {
      terserOptions: {
        warnings: false,
        compress: { drop_console: true, drop_debugger: true },
      },
    },
  ])

  config.plugin('html').tap(args => {
    args[0].title = VUE_APP_TITLE
    // args[0].cdn = cdnMap
    // args[0].minify.minifyCSS = true
    return args
  })

  //解析
  if (isAnalyze) {
    config.plugin('analyzer').use(BundleAnalyzerPlugin)
  }

  //开启gzip  webpack3.x需1.x版本
  if (isCompress) {
    config
      .plugin('compression')
      .use(CompressionPlugin)
      .tap(() => [
        {
          test: /\.js$|\.css$/,
          filename: '[path].gz[query]',
          threshold: 10240,
          minRatio: 0.8,
        },
      ])
  }
}
