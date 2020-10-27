/**
 * 横线格式转为驼峰
 *
 * @param {*} val
 */
export const camelize = val => {
  var reg = /-(\w)/g
  var result = val.replace(reg, (str, key) => {
    return key.toUpperCase()
  })
  return result
}

/**
 * 手机号码中间部分替换成指定符号
 *
 * @param {*} phone
 * @param {*} str
 */
export function formatPhone(phone, str = '****') {
  let reg = /(\d{3})\d{4}(\d{4})/

  return phone.replace(reg, '$1' + str + '$2')
}

/**
 * 获取href参数
 * @param {url}
 */
export function getURLParams(url) {
  var params = {},
    reg = /([^?=&]+)=([^&]*)/gi
  url.replace(reg, function(str, a, b) {
    params[a] = b
  })
  return params
}

/**
 * 获取max与min之间的随机数
 * @param {*} min
 * @param {*} max
 */
export function getRandom(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 是否为有效的身份证号
 *
 * @param {string} val
 * @returns {boolean}
 */
export function isCardId(val) {
  var reg = /^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)?$/

  return reg.test(val)
}

/**
 * 是否为有效的手机号
 *
 * @param {string} val
 * @returns {boolean}
 */
export function isMobile(val) {
  var reg = /^[1][345789]\d{9}$/

  return reg.test(val)
}

/**
 * 是否为有效的密码(8-16位大小字母加数字组合，不能包含空格)
 *
 * @param {string} val
 * @returns {boolean}
 *
 * isValidPwd('Aa123456')
 */
export function isValidPwd(val) {
  var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8, 16}$/
  // var reg = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$/;

  return reg.test(val)
}

/**
 * 滚动到顶部
 * 使用document.documentElement.scrollTop或document.body.scrollTop获取到顶部的距离。从顶部滚动一小部分距离。
 * 使用window.requestAnimationFrame（）来滚动。
 *
 * scrollToTop();
 */
export function scrollToTop(elem) {
  if (!elem) {
    elem = document.documentElement || document.body
  }
  var top = elem.scrollTop
  if (top > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, top - top / 8)
  }
}

/**
 * RGB 转换为 Hex
 *
 * @param r r值
 * @param g g值
 * @param b b值
 * @returns {string} Hex值
 *
 */
export function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
