export function dateFormat(datetime:number, format='yyyy-MM-dd hh:mm:ss'){
  const date = new Date(datetime);
  const map:any = {
    'M+': date.getMonth()+1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'S' : date.getMilliseconds(),
    // 'q+': Math.floor((date.getMonth()+3)/3),
  }
  if(/(y+)/i.test(format)){
    const year = date.getFullYear() + ''
    format = format.replace(RegExp.$1, year.substr(4 - RegExp.$1.length))
  }
  if(/(w+)/i.test(format)){
    const week = '星期' + '日一二三四五六'.charAt(date.getDay())
    format = format.replace(RegExp.$1, week)
  }
  for(const k in map){
    const reg = new RegExp('(' + k + ')', 'i')
    if(reg.test(format)){
      const temp = (map[k]+'').padStart(2, '0');
      format = format.replace(RegExp.$1, temp)
    }
  }
  return format;
}