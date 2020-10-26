module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    // '@babel/plugin-proposal-optional-chaining',
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: name => {
          return `${name}/style/less`
        },
      },
    ],
  ],
}

//vant/es/tag/style/less.js
