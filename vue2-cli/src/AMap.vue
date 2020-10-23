<template>
  <div class="home">
    <div @click="goMap">唤起App</div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  mounted () {
    this.getLocation()

    // Toast('正在打开App')
  },
  methods: {
    getLocation() {
      var map = window.AMap;
      new map.Map("").plugin("AMap.Geolocation", function() {
        var geo = new i.Geolocation({
          "enableHighAccuracy": !0,
          "timeout"           : 1e4,
          "maximumAge"        : 0,
          "convert"           : !0
        });
        geo.getCurrentPosition(),
        map.event.addListener(geo, "complete", function(data) {
          var {location_type, position} = data
          console.log('类别:', location_type)
          console.log('结果:', position)
        }),
        map.event.addListener(geo, "error", function() {
          console.log('error:', '定位获取失败，请检查是否开启定位')
        })
      })
    },
    goMap(){
      var defaultLocation = { lng:119.39854, lat: 26.02161, cityName: '福州' }, t = { lng:119.39654, lat: 26.02661, name: '美宜' };
      var i = "bdapp://map/direction?origin=latlng:" + defaultLocation.lat + "," + defaultLocation.lng + "|name:我的位置&destination=latlng:" + t.lat + "," + t.lng + "|name:" + t.name + "&mode=walking&region=" + defaultLocation.cityName + "&output=html&src=webapp.baidu.openAPIdemo"
        , s = "baidumap://map/direction?origin=latlng:" + defaultLocation.lat + "," + defaultLocation.lng + "|name:我的位置&destination=latlng:" + t.lat + "," + t.lng + "|name:" + t.name + "&mode=walking&region=" + defaultLocation.cityName + "&output=html&src=webapp.baidu.openAPIdemo"
        , n = "amapuri://route/plan/?sid=BGVIS1&slat=" + defaultLocation.lat + "&slon=" + defaultLocation.lng + "&sname=我的位置&did=BGVIS2&dlat=" + t.lat + "&dlon=" + t.lng + "&dname=" + t.name + "&dev=0&t=2"
        , r = "iosamap://path?sourceApplication=applicationName&sid=BGVIS1&slat=" + defaultLocation.lat + "&slon=" + defaultLocation.lng + "&sname=我的位置&did=BGVIS2&dlat=" + t.lat + "&dlon=" + t.lng + "&dname=" + t.name + "&dev=0&t=2"
        , o = "http://api.map.baidu.com/direction?origin=latlng:" + defaultLocation.lat + "," + defaultLocation.lng + "|name:我的位置&destination=latlng:" + t.lat + "," + t.lng + "|name:" + t.name + "&mode=walking&region=" + defaultLocation.cityName + "&output=html&src=webapp.baidu.openAPIdemo"
        , l = "https://uri.amap.com/navigation?from=" + defaultLocation.lng + "," + defaultLocation.lat + ",我的位置&to=" + t.lng + "," + t.lat + "," + t.name + "&mode=walk"
      
      this.$toast.loading({
        message: '正在打开App',
        duration: 1500
      })

      var iframe = document.createElement('iframe')
      iframe.src = r
      iframe.style.display = 'none'
      document.body.appendChild(iframe)
      console.log(iframe)

      var flag = true
      var start = Date.now()
      // setTimeout(function() {
      //   var end = Date.now();
      //   (start || end - start < 1100) && (flag = false)
      // }, 1000)

      setTimeout(() => {
        if(flag){
          window.location.href = o
        }else{
          console.log('您尚未安装高德地图哦')
        }
        document.body.removeChild(iframe)
      }, 2000)
    }
  },
}
</script>
