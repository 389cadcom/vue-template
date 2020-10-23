/*
  postcss-px2rem
  postcss-pxtorem
  postcss-px-to-viewport
*/
module.exports = {
  plugins: {
    autoprefixer: {
      // browsers: ["ios > 10", "Android > 4"]
    },
    "postcss-plugin-px2rem": {
      rootValue: 20,
      minPixelValue: 16,
      exclude: /(node_module)/
    }
  }
};
