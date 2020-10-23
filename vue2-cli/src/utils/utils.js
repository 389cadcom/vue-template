import MD5 from 'crypto-js/md5'
import compressImage from './compress'


export default {
    /**
   * @param {时间戳}   datetime
   * @param {时间格式} format
   */
  dataFormat(datetime, format='yyyy-MM-dd'){
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
  },
  //横线格式转为驼峰
  camelize(str){
    var camelizeReg = /-(\w)/g;
    return str.replace(camelizeReg, (_, c)=>{
      return c.toUpperCase()
    })
  },
  MD5(val) {
		return MD5(val).toString().toUpperCase()
  },
  //盐值
  getNum() {
		var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		var nums = "";
		for (var i = 0; i < 32; i++) {
			var id = parseInt(Math.random() * 61);
			nums += chars[id];
		}
		return nums;
	},

  /**
   * @param {默认保存7天} days 
   */
  setCookie: function (name, value, days = 1) {
    var d = new Date;
    d.setTime(d.getTime() + 60 * 60 * 1000 * 24 * days);

    console.log(d)
		document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
	},
	getCookie: function (name) {
		var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		return v ? v[2] : null;
	},
	removeCookie: function (name) {
		this.setCookie(name, '', -1);
  },
  /**
   * 图片压缩
   */
  compressImage: compressImage
}
