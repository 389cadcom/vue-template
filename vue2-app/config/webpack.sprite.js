const SpritesmithPlugin = require('webpack-spritesmith')

/**
 * @param {雪碧数据} data
 * @param {class类名} icon
 */
var templateFunction = function(data, icon) {
  var shared = `.${icon} { background-image: url(I); background-size:Wpx Hpx; display:inline-block; }`
    .replace('I', data.sprites[0].image)
    .replace('W', data.sprites[0].total_width)
    .replace('H', data.sprites[0].total_height)

  var perSprite = data.sprites
    .map(function(sprite) {
      return `.${icon}-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }`
        .replace('N', sprite.name)
        .replace('W', sprite.width)
        .replace('H', sprite.height)
        .replace('X', sprite.offset_x)
        .replace('Y', sprite.offset_y)
    })
    .join('\n')

  return shared + '\n' + perSprite
}

//2倍图
templateFunction = function(data, icon) {
  var shared = `.${icon} { background-image: url(I); background-size:Wpx Hpx; display:inline-block; }`
    .replace('I', data.sprites[0].image)
    .replace('W', data.sprites[0].total_width / 2)
    .replace('H', data.sprites[0].total_height / 2)

  var perSprite = data.sprites
    .map(function(sprite) {
      return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
        .replace('N', sprite.name)
        .replace('W', sprite.width / 2)
        .replace('H', sprite.height / 2)
        .replace('X', sprite.offset_x / 2)
        .replace('Y', sprite.offset_y / 2)
    })
    .join('\n')

  return shared + '\n' + perSprite
}

/**
 * 雪碧图插件
 * @param {基础路径} baseUrl
 * @param {雪碧图命名} name
 */
exports.SpritesMith = function(name = 'sprite') {
  //多个雪碧模板
  const templates = {},
    formatname = 'function_based_' + name
  templates[formatname] = data => templateFunction(data, name)

  return new SpritesmithPlugin({
    src: {
      cwd: 'src/assets/' + name, //图标根目录路径
      glob: '**/*.png',
    },
    target: {
      image: 'public/static/images/' + name + '.png', //生成图片路径
      css: [
        [
          'src/styles/sprite/_' + name + '.scss', //生成样式路径
          { format: formatname },
        ],
      ],
    },
    apiOptions: {
      //样式引用图片路径
      cssImageRef: '/static/images/' + name + '.png',
    },
    spritesmithOptions: {
      padding: 4,
    },
    customTemplates: templates,
  })
}
