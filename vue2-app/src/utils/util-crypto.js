import MD5 from 'crypto-js/md5'

/**
 * 加密算法排序
 * @param 返回拼接字符
 */
export const paramsSorts = params => {
  var keys = Object.keys(params).sort()
  var arr = []

  arr = keys.map(key => {
    return key + '=' + params[key]
  })
  return arr.join('&')
}

export const toMD5 = val => {
  return MD5(val)
    .toString()
    .toUpperCase()
}

//获取随机盐值
export const getNum = () => {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  var nums = ''
  for (var i = 0; i < 32; i++) {
    var id = parseInt(Math.random() * 61)
    nums += chars.charAt[id]
  }
  return nums
}

export default {
  setCookie: function(name, value, days = 1) {
    var d = new Date()
    d.setTime(d.getTime() + 60 * 60 * 1000 * 24 * days)

    console.log(d)
    document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
  },
  getCookie: function(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    return v ? v[2] : null
  },
  removeCookie: function(name) {
    this.setCookie(name, '', -1)
  },
}
