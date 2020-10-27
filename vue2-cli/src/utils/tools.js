/**
 * 格式化银行卡
 * 
 * 还原 str.relace(/\s/g, '')
 * @param {*} card 
 */
export const formatBankCard = (card) => {
  let reg = /(\d{4})(?=\d)/g;

  return card.relace(reg, '$1 ')
}

/**
 * 加密算法排序
 * @param 返回拼接字符
 */
export const encrypt = (params) =>{
  var keys = Object.keys(params).sort();
  var arr = [];

  arr = keys.map(key => {
    return key + '=' + params[key]
  })
  return arr.join('&');
}

/**
 * 日期格式化
 * @param {*} datetime 
 * @param {*} format 
 */
export const dateFormat = (datetime, format='yyyy-MM-dd hh:mm:ss') =>{
  var date = new Date(datetime);
  var map = {
    'M+': date.getMonth()+1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'S' : date.getMilliseconds(),
    // 'q+': Math.floor((date.getMonth()+3)/3),
  }
  if(/(y+)/i.test(format)){
    var year = date.getFullYear() + ''
    format = format.replace(RegExp.$1, year.substr(4 - RegExp.$1.length))
  }
  if(/(w+)/i.test(format)){
    var week = '星期' + '日一二三四五六'.charAt(date.getDay())
    format = format.replace(RegExp.$1, week)
  }
  for(var k in map){
    var reg = new RegExp('(' + k + ')', 'i')
    if(reg.test(format)){
      var temp = (map[k]+'').padStart(2, 0);
      format = format.replace(RegExp.$1, temp)
    }
  }
  return format;
}


/**
 * 得到两个时间的时间差（返回天数）
 *
 * @param {number} startDay 开始时间戳
 * @param {number} endDay   结束时间戳
 * @returns {number}
 *
 * getDiffDay(1501516800000, 1504195200000);
 */
export function getDiffDay(startDay, endDay) {
  startDay = Number(startDay);
  endDay = Number(endDay);
  return Math.abs(endDay - startDay) / (24 * 1000 * 3600);
}


/**
 * 手机号码中间部分替换成指定符号
 * 
 * @param {*} phone 
 * @param {*} str 
 */
export function formatPhone(phone, str='****'){
  let reg = /(\d{3})\d{4}(\d{4})/

  return phone.replace(reg, '$1' + str + '$2')
}

/**
 * 获取href参数
 * @param {url}
 */
export function getURLParams(url){
  var params = {}, reg = /([^?=&]+)=([^&]*)/gi
  url.replace(reg, function(str, a, b){ params[a] = b; })
  return params;
}

/**
 * 获取max与min之间的随机数
 * @param {*} min 
 * @param {*} max 
 */
export function getRandom(max, min = 0){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * 是否为有效的身份证号
 *
 * @param {string} val
 * @returns {boolean}
 */
export function isCardId(val) {
  var reg = /^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)?$/;

  return reg.test(val);
}


/**
 * 是否为有效的手机号
 *
 * @param {string} val
 * @returns {boolean}
 */
export function isMobile(val) {
  var reg = /^[1][345789]\d{9}$/;

  return reg.test(val);
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
  var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8, 16}$/;
  // var reg = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$/;

  return reg.test(val);
}

/**
 * base64转为Blob
 * 
 * @param dataURL
 * @returns blob
 * 
 * dataURLToBlob('data:image/png;base64,QQ=')
 */
export function dataURLToBlob(dataURL) {
  var type   = dataURL.match(/data:([^;]+)/)[1];
  var base64 = dataURL.replace(/^[^,]+,/, '');
  var str    = window.atob(base64)

  var ia = new Uint8Array(str.length);
  for(var i=0; i<str.length; i++){
    ia[i] = str.charCodeAt(i)
  }

  return new Blob([ia], {type: type})
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
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


/**
 * 斐波那契数组生成器
 * 创建一个特定长度的空数组，初始化前两个值（0和1）。
 * 使用Array.reduce（）向数组中添加值，后面的一个数等于前面两个数相加之和（前两个除外）。
 *
 * @param num
 * @returns {*}
 *
 * fibonacci(5);
 * // => [0,1,1,2,3]
 */
export function fibonacci(num) {
  return Array(num).fill(0).reduce(function (acc, val, i) {
    return acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i);
  }, []);
}

/**
 * 滚动到顶部
 * 使用document.documentElement.scrollTop或document.body.scrollTop获取到顶部的距离。从顶部滚动一小部分距离。
 * 使用window.requestAnimationFrame（）来滚动。
 *
 * scrollToTop();
 */
export function scrollToTop(elem) {
  if(!elem){
    elem = document.documentElement || document.body;
  }
  var top = elem.scrollTop
  if (top > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, top - top / 8);
  }
}

