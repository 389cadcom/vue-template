import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}
//base 根目录文件夹

module.exports = {
  base: '/start-vue3/',
  assetsDir: 'res',
  alias: {
    '/@/': pathResolve('src'),
  },
  optimizeDeps: {
    // include: ['@ant-design/icons-vue'],
  },
  cssPreprocessOptions: {
    less: {
      modifyVars: {},
    },
    scss: {
      additionalData: "@import './src/styles/_var.scss';",
    },
  },
}
