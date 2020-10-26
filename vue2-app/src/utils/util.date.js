/* eslint-disable prettier/prettier */

// import dayjs from 'dayjs'
const DATE_FMT = 'YYYY-MM-DD'
const DATE_TIME_FMT = 'YYYY-MM-DD HH:mm:ss'
const DATE_MINUTE_FMT = 'YYYY-MM-DD HH:mm'

const isNumber = num => typeof num === 'number'

export const dataFormat = (datetime, format = DATE_FMT) => {
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
