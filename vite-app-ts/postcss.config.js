module.exports = res => {
  return {
    plugins: {
      autoprefixer: {
        // browsers: ["ios > 10", "Android > 4"]
      },
      'postcss-plugin-px2rem': {
        rootValue: 20,
        minPixelValue: 14,
        exclude: /(node_module)/,
        selectorBlackList: [],
      },
    },
  }
}
