import wx from 'weixin-js-sdk'
import $api from '@/api/api-all'

const wxsdk = {
  appId: 'wxccfa2e27ba1951ce',
  jsApiList: [
    'onMenuShareTimeLine',
    'onMenuShareAppMessage',
    'updateTimelineShareData',
    'updateAppMessageShareData',
    'getLocation',
    'openLocation',
    // 'scanQRCode', 'chooseWXPay',
    // 'startRecord', 'stopRecord', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoiceRecordEnd', 'onVoicePlayEnd'
  ],
}

/**
 * 初始化配置信息
 * @param {*} params  wx.config(opts)
 */
wxsdk.setConfig = async function(url = location.origin) {
  //签名配置信息
  var config = await $api.getWxConfig({ url: url })
  // console.log(config)

  var params = {
    jsApiList: wxsdk.jsApiList,
    ...config.data,
  }
  return new Promise((resolve, reject) => {
    wx.config({
      debug: false, //是否调试
      ...params,
    })
    wx.ready(resolve)
    wx.error(res => {
      reject(res)
    })
  })
}

/**
 * 微信统一处理--通用参数(success, cancel, fail)
 * @param {*} params
 * @param {*} wxHandler
 *
 * @return Promise
 */
const paramsHandler = function(params, wxHandler) {
  if (arguments.length == 1) {
    wxHandler = params
    params = {}
  }

  return new Promise((resolve, reject) => {
    //调用成功：errMsg-->"xxx:ok"
    params.success = function(res) {
      res.result = 'success'
      resolve(res)
    }
    //点击取消：errMsg-->"xxx:cancel"
    params.cancel = function(res) {
      res.result = 'cancel'
      resolve(res)
    }
    //调用失败:
    params.fail = function(res) {
      res.result = 'fail'
      reject(res)
    }
    // params.complete = resolve

    wxHandler && wxHandler(params)
  })
}
/**
 * 分享朋友   客户端6.7.2及JSSDK 1.4.0以上版本updateApp
 * @param {*} params ={title, desc, link, imgUrl, type, dataUrl}
 */
wxsdk.onMenuShareAppMessage = params => {
  return paramsHandler(params, wx.updateAppMessageShareData || wx.onMenuShareAppMessage)
}

/**
 * 分享朋友圈
 * @param {*} params = {title, link, imgUrl}
 */
wxsdk.onMenuShareTimeLine = params => {
  return paramsHandler(params, wx.updateTimelineShareData || wx.onMenuShareTimeline)
}

/**
 * 地理位置
 * 默认为wgs84的gps坐标, 若传给openLocation用, 需用gcj02
 * @param {*} params
 */
wxsdk.getLocation = (params = { type: 'gcj02' }) => {
  return paramsHandler(params, wx.getLocation)
}

/**
 * 在微信中打开位置
 * @param {*} params ={latitude, longitude, name, address, scale, infoUrl}
 */
wxsdk.openLocation = params => {
  wx.openLocation(params)
}

/**
 * 调用扫码
 * needResult: 0
 * scanType: ["qrCode","barCode"]
 */
wxsdk.scanQRCode = params => {
  return paramsHandler(params, wx.scanQRCode)
}

/**
 * 录音
 * @param {*} params
 */
wxsdk.startRecord = params => {
  return wx.startRecord({
    cancel() {
      console.log('用户拒绝授权录音')
    },
  })
}
wxsdk.stopRecord = () => {
  return paramsHandler(wx.stopRecord)
}
/**
 * 上传录音, 结果再保存到服务器
 * @param  {*} localId
 * @return res.serverId
 */
wxsdk.uploadVoice = localId => {
  return paramsHandler({ localId: localId, isShowProgressTips: 1 }, wx.uploadVoice)
}

export default wxsdk
