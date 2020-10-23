import qs from 'querystring'
import axios from 'axios'
import { reject } from 'core-js/fn/promise'

function getLocalToken(){
  const token = localStorage.getItem('token')
  return token
}

const instance = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-Token': getLocalToken() 
  }
})

//给实例添加一个setToken方法，用于登录后将最新token动态添加到header
instance.setToken = function(token){
  instance.defaults.headers['X-Token'] = token
  localStorage.setItem('token', token)
}

let requests = []
let isReRreshing = false
instance.interceptors.response.use(undefined, error => {
  if (!error.response) {
    return Promise.reject(error)
  }
  if (error.response.status === 401) {          //token过期了,需刷新token
    const { config } = error
    if(!isReRreshing){
      isReRreshing = true
      return refreshToken().then( ret => {
        var token = ret.token
        instance.setToken(token)
        //获取当前失败的请求, 重新发起
        const config = res.config
        config.headers['X-Token'] = token       // 旧token需更新
        config.baseURL = ''                     // url已经带上了/api，避免出现/api/api的情况

        requests.forEach( callback =>{          // FIXME: token 刷新后将数组的方法重新执行
          callback(token)
        })
        requests = []                           //重新请求完清空
  
        return instance(config)                 //重新发起请求
      }).catch( error => {
        console.log('抱歉，您的登录状态已失效，请重新登录！')
        //刷新token失败, 跳转到首页重新登录
        window.location.href = '/'
        return Promise.reject(err)
      }).finally(()=>{
        isReRreshing = false
      })
    }else{
      //返回未执行的Promise, 以函数形式将resolve存入, 等待刷新再执行
      return new Promise((resolve, reject)=>{
        requests.push(token => {
          config.headers.Authorization = token
          resolve(instance(config))
        })
      })
    }
  }
})

function refreshToken(){
  return instance.get('/token').then( res => res.data)
}

let token='', tokenLock=false, tokenTime=0
function checkToken(){
  return new Promise((resolve, reject)=>{
    token = sessionStorage.getItem('token')
    if(token){
      resolve()
      return
    }
    //正在请求token
    if(tokenLock && tokenTime < 20){
      console.log('wait...')
      tokenTime++
      setTimeout(() => {
        checkToken().then(resolve)
      }, 1000)
    }else{
      tokenLock = true
      instance.get('/token').then( res =>{
        token = res.data.token
        sessionStorage.token = token
        resolve()
      }).catch(error => {       //刷新token失败
        reject(error)
      }).finally(()=>{
        tokenLock = false
        tokenTime = 0
      })
    }

  })
}


//多个请求暂存到队列待刷新token再发起
let isRefreshing = false, requests = []
instance.interceptors.request.use(async config=>{
  //排除刷新和登录token
  if(config.url.includes('/login') || config.url.includes('/refreshToken')){
    return config
  }
  var token = sessionStorage.getItem('token')
  if(token){
    return config;
  }
  if(!isRefreshing){
    isRefreshing = true
    axios.get('/token').then(res=>{
      var token = res.data.token
      config.headers['X-Token'] = token
      sessionStorage.setItem('token', token)
      return token;
    }).then(token => {
      requests.forEach( callback => callback(token))
      requests = []                 //清空队列
    }).catch(error => {
  
    }).finally(()=>{
      isRefreshing = false
    })
  }

  //多个请求时存到队列中等刷新token后再发起, 当发现有请求是过期的就存进requests数组
  return new Promise((resolve)=>{
    requests.push( token => {
      // 因为config中的token是旧的，所以刷新token后要将新token传进来
      config.headers['X-Token'] = token
      resolve(config)
    })
  })

}, err => {
  return Promise.reject(err)
})