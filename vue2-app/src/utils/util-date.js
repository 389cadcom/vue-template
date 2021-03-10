/* eslint-disable prettier/prettier */

// import dayjs from 'dayjs'
const DATE_FMT = 'YYYY-MM-DD'
const DATE_TIME_FMT = 'YYYY-MM-DD HH:mm:ss'
const DATE_MINUTE_FMT = 'YYYY-MM-DD HH:mm'

const isNumber = num => typeof num === 'number'

/**
 * 自定义格式脂
 * @param {*} datetime 
 * @param {*} format 
 */
export const dateFormat = (datetime, format = DATE_MINUTE_FMT) => {
  var date = new Date(datetime)
  var map = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    S: date.getMilliseconds(),
    // 'q+': Math.floor((date.getMonth()+3)/3),
  }
  if (/(y+)/i.test(format)) {
    var year = date.getFullYear() + ''
    format = format.replace(RegExp.$1, year.substr(4 - RegExp.$1.length))
  }
  if (/(w+)/i.test(format)) {
    var week = '星期' + '日一二三四五六'.charAt(date.getDay())
    format = format.replace(RegExp.$1, week)
  }
  for (var k in map) {
    var reg = new RegExp('(' + k + ')', 'i')
    if (reg.test(format)) {
      var temp = (map[k] + '').padStart(2, 0)
      format = format.replace(RegExp.$1, temp)
    }
  }
  return format
}

/**
 * 将时间转化为几天前,几小时前，几分钟前
 *
 * @param {number} ms
 * @returns {*}
 *
 * formatTimeAgo(1505232000000);
 * => 1天前
 */
export function formatTimeAgo(ms) {
  ms = parseInt(ms);

  var timeNow = Date.now();
  var diff = (timeNow - ms) / 1000;
  var date = new Date();
  var days = Math.round(diff / (24 * 60 * 60));
  var hours = Math.round(diff / (60 * 60));
  var minutes = Math.round(diff / 60);
  var second = Math.round(diff);

  if (days > 0 && days < 2) {
    return days + '天前';
  } else if (days <= 0 && hours > 0) {
    return hours + '小时前';
  } else if (hours <= 0 && minutes > 0) {
    return minutes + '分钟前';
  } else if (minutes <= 0 && second >= 0) {
    return '刚刚';
  } else {
    date.setTime(ms);

    return (date.getFullYear() + '-' + f(date.getMonth() + 1) + '-' + f(date.getDate()) + ' ' + f(date.getHours()) + ':' + f(date.getMinutes()));
  }

  function f(n) {
    return (n < 10) ? '0' + n : n;
  }
}


const getDate = date => {
  if (isNumber(date)) {
    return dayjs(date)
  }
  return dayjs(date, DATE_TIME_FMT)
}

/**
 * 格式化日期
 * @param {string, number} date
 * @param {*} fmt
 */
export const format = (date, fmt = DATE_FMT) => {
  return getDate(date).format(fmt)
}

/**
 * 用于表格格式化单元格
 * @param {*} row
 * @param {*} column
 * @param {*} cellValue
 */
export const formatCell = (fmt = DATE_FMT) => {
  return (row, column, cellValue) => {
    return format(cellValue, fmt)
  }
}
