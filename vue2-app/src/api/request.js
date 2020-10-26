import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
import { trimParmas } from './tools'

axios.defaults = {
  baseURL: process.env.BASE_API,
  timeout: 30000,
}
const instance = axios.create({})

//请求拦截
instance.interceptors.request.use(
  async config => {
    //await awaitToken(config.url)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
//响应拦截
instance.interceptors.response.use(
  res => {
    switch (res.data.code) {
      case 500:
        Toast.fail(res.data.msg)
        break
    }
    return JSON.parse(res.data)
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
    }
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

const get = (url, params = {}, opts = {}) => {
  return request(url, 'get', params, opts)
}
const post = (url, data = {}, opts = {}) => {
  console.log(data)
  return request(url, 'post', qs.stringify(data), opts)
}

//挂载取消请求
;[get, post, instance].forEach(item => {
  item.getCancelToken = axios.CancelToken
})

export default {
  get,
  post,
  instance,
}
