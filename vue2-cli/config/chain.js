const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const resolve = dir => path.resolve(__dirname, '..', dir)

//--mode analyze
const isProd = process.env.NODE_ENV === 'production'
const isAnalyze = process.env.ANALYZE === 'true'
const isCompress = process.env.COMPRESS === 'true'
const {COMPRESS, ANALYZE} = process.env



exports.ChainConfig = (config) => {
  config.plugins.delete('preload')          //预加载
  config.plugins.delete('prefetch')

  //base64图片
  config.module.rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => ({...options, limit: 1024 }) )

  //svg处理
  config.module.rule('svg')
      .exclude.add(resolve('./src/assets/icons'))
  config.module.rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(resolve('./src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

  //js分组
  config.optimization.splitChunks({
    chunks: 'initial',
    cacheGroups: {
      libs: {
        test: /[\\/]node_modules[\\]/,
        name: 'chunk_libs',
        priority: 10,
      },
      vant: {
        test: /[\\/]node_modules[\\]vant[\\/]/,
        name: 'chunk_vant',
        priority: 20,
      },
      commons:{
        name: 'chunk_commons',
        test: resolve('src/components'),
        minChunks: 3,
        priority: 5,
        reuseExistingChunk: true
      }
    }
  })
  config.optimization.minimizer('css')
      .use(OptimizeCSSAssetsPlugin, [{ cssProcessorOptions: { safe: true } }])


  //生产环境
  if(!isProd) return;
  config.optimization.minimizer('terser')
    .tap(()=> [{
      // sourceMap: !isProd,
      terserOptions: {warnings: false, compress: {drop_console: true, drop_debugger: true}}
    }])

  config.plugin('html').tap(args =>{
    // args[0].cdn = cdnMap
    // args[0].minify.minifyCSS = true
    return args
  })

  //解析
  if(isAnalyze){
    config.plugin('analyzer').use(BundleAnalyzerPlugin)
  }

  //开启gzip  webpack3.x需1.x版本
  if(isCompress){
    config.plugin('compression').use(CompressionPlugin)
      .tap(()=>[ {
        test: /\.js$|\.css$/,
        filename: '[path].gz[query]',
        threshold: 10240,
        minRatio: 0.8
      }])
  }
}
