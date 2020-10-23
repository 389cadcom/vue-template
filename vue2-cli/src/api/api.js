import axios from 'axios'
import axiosRetry from 'axios-retry'
import {Toast} from 'vant'
import utils from '../utils/utils'
import store from '../store'
import router from '../router'


// axiosRetry(axios, {
//   retries: 1
// })

//默认配置
axios.defaults.baseURL = '/apiPath'
axios.defaults.timeout = 30000

let instance = axios.create()


//请求拦截处理参数、头部信息
instance.interceptors.request.use( async config => {
  await checkToken(config.url)
  
  return config
}, error => {
  return Promise.reject(error)
})


var token, tokenLock = false, tokenTime = 0
function checkToken(url){
  let promise = new Promise((resolve, reject)=>{
    token = utils.getCookie('token')
    console.log(token, url)
    if(token){
      resolve()
      return;
    }

    //其他请求等待, 20s没有响应就直接跳登录页
    if(tokenLock && tokenTime < 20){
      console.log('wait....', tokenTime);
      setTimeout(() => {
        tokenTime++
        checkToken().then(resolve)          //TODO 其他请求
      }, 1000)
    }
    else if(tokenTime >= 20){ 
      console.log('token响应超时-' + tokenTime)
    } 
    else{
      tokenLock = true
      axios.get('http://172.16.60.116:3000/').then(res => {
        token = res.data.token
        utils.setCookie('token', token)
        resolve()
      }).catch(err => {
        reject(err)
      }).finally(()=>{
        tokenLock = false
        tokenTime = 0
      })
    }
  })

  return promise;
}

//处理参数值
function paramsHandler(config){
  var opts = { accessToken: token, nonce: utils.getNum(), timestamp : Date.now() },
      headers = {
        ...opts,
        ...config.data,
        ...config.params
      }

  let sign = Object.keys(headers).sort().map( key => key + '=' + headers[key]).join('&')
  sign += '&key=' + client_secret
  // console.log('sign:' + sign)
  opts.sign = utils.MD5(sign);

  config.headers = { ...config.headers, ...opts}
  if(config.method === 'post' && !config.upload){
    config.data = qs.stringify(config.data)
  }
  return config
}


//响应拦截处理各种code状态码
instance.interceptors.response.use( res => {
  switch (res.data.code) {
    case 500:
      Toast.fail(res.data.msg + 'code:' + res.data.code)
      break;
  }
  return res.data
}, error => {
  if(!error) return;
  let res = error.response
  switch (res.status) {
    case 500:
      Toast.fail(error.message)
      break;
    case 401:                                
      console.log('用户登陆过期, 清除登录信息, 请重新登录')     
      store.commit('remove_token')
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      break;
  }
  console.group('接口异常')
  console.log(error.response)
  console.log(error.config)
  console.groupEnd()
  return Promise.reject(error.message)
})

/**
 * 清除空参数字段
 * @param {*} params 
 */
function trimParmas(params){
  var keys = Object.keys(params).filter( key => {
    return params[key] || params[key] === 0
  })
  var datas = keys.reduce((prev, curr)=>{
    return { ...prev, [curr]:params[curr] }
  }, {})
  return datas
}

//统一处理请求参数
function getAxios(url, method, data, opts={}){
  var config = {
    url   : url,
    method: method,
    ...opts,
  }
  var args = method=='get' ? 'params':'data'
  config[args] = trimParmas(data)
  return instance(config)
}

export default {
  get: function(url, params = {}, config={}){
    return getAxios(url, 'get', params, config)
  },
  post: function(url, data = {}, config={}){
    return getAxios(url, 'post', data, config)
  },
  upload: function(url, data){

  },
}