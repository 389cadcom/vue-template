
export default {
  logout: () => {
    return request({
      url: '/user/logout',
      method: 'POST'
    })
  },
  resetToken: () => {
    return request({
      url: '/user/resetToken',
      method: 'GET'
    })
  },
  path: '',
  getTest(){
    return $axios.get('/')
  },
  getWxConfig(params){
    return $axios.post('/v1/wx/getJSAPIConfig', params)
  },
  getWxOpenId(params) {
    return $axios.get('/v1/wx/getOpenId', params)
  },
  getWxUser(params) {
    return $axios.get('/v1/wx/userInfo', params)
  },

  getArticleCode(params) {
    return $axios.ajax('/cms/v1/cms/sysCode', params, 'post');
  },
}
