import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
import { trimParmas } from './tools'

// console.log(axios.defaults.headers)
const baseURL = ''
const instance = axios.create({
  baseURL,
  timeout: 16000,
})

//请求拦截
instance.interceptors.request.use(
  async config => {
    //await awaitToken(config.url)
    //get缓存处理
    if (config.method === 'get') {
      config.params['v'] = Date.now()
    }
    if (config.method === 'post' && !config.upload) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
//响应拦截
instance.interceptors.response.use(
  res => {
    // console.log(res)
    switch (res.data.code) {
      case 500:
        Toast.fail(res.data.msg)
        break
    }
    return res.data
  },
  error => {
    let msg = '',
      res = error.response
    switch (res.status) {
      case 401:
        msg = '用户登陆过期, 请重新登录'
        break
      case 403:
        msg = '登陆失效'
        break
      case 404:
        msg = '请求接口不存在'
        break
    }
    console.error(res.status, msg || error.message)
    return Promise.reject(error.message)
  }
)

//请求统一处理
const request = (url, method, data, opts = {}) => {
  let config = {
    url,
    method,
    ...opts,
  }
  var type = method == 'get' ? 'params' : 'data'
  config[type] = data
  return instance(config)
}

//导出方法接口
const get = (url, params = {}, opts = {}) => {
  return request(url, 'get', params, opts)
}
const post = (url, data = {}, opts = {}) => {
  return request(url, 'post', data, opts)
}
const upload = (url, data = {}, opts = { upload: true }) => {
  return request(url, 'post', data, opts)
}

//挂载取消请求
;[get, post, instance].forEach(item => {
  item.getCancelToken = axios.CancelToken
})

export default {
  get,
  post,
  upload,
  instance,
}
