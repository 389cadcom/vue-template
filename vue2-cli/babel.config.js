module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'import', 
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: name => {
          return `${name}/style/less`   
        }
      },
      'vant'
    ]
  ]
}

//vant/es/tag/style/less.js