import EXIF from './exif'

/**
 * canvas图片压缩
 * @param {文件}} file
 * @param {质量} quality
 */
export default function(file, quality = 0.8) {
  if (file.size / 1024 < 1025) {
    return Promise.resolve(file)
  }
  return new Promise(function(resolve, reject) {
    var mimeType = file.type || 'image/jpeg'
    var Orientation
    EXIF.getData(file, function() {
      Orientation = EXIF.getTag(this, 'Orientation')
      console.log('方向:' + Orientation)
    })
    var reader = new FileReader()
    reader.onload = function() {
      var dataURL = reader.result
      var image = new Image()
      image.onload = canvasImage
      image.onerror = function() {
        var err = new Error('加载图片文件失败')
        reject(err)
        throw err
      }
      image.src = dataURL
    }
    reader.onerror = function() {
      var err = new Error('读取图片文件失败')
      reject(err)
      throw err
    }
    reader.readAsDataURL(file)

    //canvas
    function canvasImage() {
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')

      var originWidth = this.naturalWidth
      var originHeight = this.naturalHeight
      var maxWidth = 1280,
        maxHeight = 1280
      var targetWidth = originWidth
      var targetHeight = originHeight
      var imgRatio = originWidth / originHeight,
        ratio = maxWidth / maxHeight

      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (imgRatio > ratio) {
          //更宽，按照宽度限定尺寸
          targetWidth = maxWidth
          targetHeight = maxWidth / imgRatio
        } else {
          targetHeight = maxHeight
          targetWidth = maxHeight * imgRatio
        }
      }

      canvas.width = targetWidth
      canvas.height = targetHeight
      if (Orientation && Orientation != 1) {
        switch (Orientation) {
          case 6: //旋转90度
            canvas.width = targetHeight
            canvas.height = targetWidth
            ctx.rotate(Math.PI / 2)
            ctx.drawImage(this, 0, -targetHeight, targetWidth, targetHeight)
            break
          case 8: //旋转270度
            canvas.width = targetHeight
            canvas.height = targetWidth
            ctx.rotate((3 * Math.PI) / 2)
            ctx.drawImage(this, -targetWidth, -0, targetWidth, targetHeight)
            break
          case 3: //旋转180度
            ctx.rotate(Math.PI)
            ctx.drawImage(this, -targetWidth, -targetHeight, targetWidth, targetHeight)
            break
          default:
            ctx.drawImage(this, 0, 0, targetWidth, targetHeight)
            break
        }
      } else {
        ctx.drawImage(this, 0, 0, targetWidth, targetHeight)
      }
      var dataURI = canvas.toDataURL(mimeType, quality)
      var result = dataURIToBlob(dataURI)

      resolve(result)
    }

    //toBlob
    function dataURIToBlob(dataURI) {
      var type = dataURI.match(/data:([^;]+)/)[1]
      var base64 = dataURI.replace(/^[^,]+,/, '')
      var byteString = atob(base64)

      var ia = new Uint8Array(byteString.length)
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }

      return new Blob([ia], { type: type })
    }
  })
}
