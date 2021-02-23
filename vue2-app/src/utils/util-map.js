/**
 *  地图相关方法
 */
var adcodes = ['350102', '350103', '350104', '350105', '350111']
export default {
  getDistrict: ['鼓楼区', '台江区', '仓山区', '晋安区', '马尾区'],
  Map: new AMap.Map(''),
  //渲染地图
  createAMap(opts = {}) {
    var defaults = { zoom: 12, city: '福州', mapStyle: 'amap://styles/25ba6c9d9ed5ff46236765858dd3d3b4', ...opts }
    var map = new AMap.Map('map', defaults)
    AMap.event.addListener(map, 'click', () => {
      map.clearInfoWindow()
    })
    return map
  },
  createMarker(lnglat) {
    return new Promise((resolve, reject) => {
      AMap.service('AMap.Geocoder', function() {
        var geocoder = new AMap.Geocoder()
        geocoder.getAddress(lnglat, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            console.log(result.regeocode)
            resolve(result.regeocode)
          } else {
            reject()
            console.log('地址获取失败')
          }
        })
      })
    })
  },
  //定位地址解析
  getAddress(lng, lat) {
    return new Promise((resolve, reject) => {
      this.Map.plugin('AMap.Geocoder', () => {
        var geo = new AMap.Geocoder()
        geo.getAddress([lng, lat], (status, result) => {
          if (result.info === 'OK') {
            var {
              addressComponent: { city, district },
            } = result.regeocode
            resolve({ city, district })
            console.log(city, district)
          } else {
            console.log('定位地址解析失败!')
          }
        })
      })
    })
  },
  //AMap定位
  getLocation() {
    return new Promise((resolve, reject) => {
      this.Map.plugin('AMap.Geolocation', () => {
        var geo = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        })
        geo.getCurrentPosition()

        geo.on('complete', function(data) {
          var {
            location_type,
            position: { lng, lat },
          } = data
          console.log('类别:', location_type, '结果:', lng, lat)
          resolve({ lng, lat })
        })
        AMap.event.addListener(geo, 'error', function() {
          console.log('error:', '定位获取失败，请检查是否开启定位')
          reject()
        })
      })
    })
  },
  //遮罩--行政区域
  getPolygon() {
    return new Promise((resolve, reject) => {
      AMap.plugin('AMap.DistrictSearch', async function() {
        var district = new AMap.DistrictSearch({
          extensions: 'all',
          showbiz: false,
          level: 'district',
        })
        var polylines = []
        //行政区域--编码
        for (const code of adcodes) {
          var promise = new Promise((resolve, reject) => {
            district.search(code, (status, result) => {
              //var dist = result.districtList.find( item => item.citycode == '0591')  //筛选行政区域(鼓楼)--福州0591
              var { boundaries, districtList } = result.districtList[0]
              resolve(boundaries)
            })
          })
          var arys = await promise
          polylines = polylines.concat(arys)
        }
        resolve(polylines)
      })
    })
  },
  /**
   * 微信、E福州-amap获取定位
   */
  async getPoint() {
    var local = ''
    if (UA.versions.wechat) {
      try {
        await $wxsdk.setConfig()
        var { latitude, longitude } = await $wxsdk.getLocation()
        local = { lng: longitude, lat: latitude }
      } catch (error) {
        console.log('获取定位失败!')
      }
    } else {
      try {
        local = await this.getLocation()
      } catch (error) {
        console.log('FIXME:--E福州环境定位')
      }
    }
    return local
  },
}
/*
根据边界数据:polyline绘制多边形
$mapTool.getPolygon().then( results => {
  var polygon = new AMap.Polygon({
    path: results,
    strokeColor  : 'rgb(20,164,173)',
    strokeWeight : 2,
    strokeOpacity: 0.5,
    fillColor    : '#f00',
    fillOpacity  : .1,
  });
  this.map.add(polygon);

  //polygon.setMap(null)
  //polygon.getPath()
  //polygon.contains(point)
})
 */
