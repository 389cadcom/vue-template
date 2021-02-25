const Mock = require('mockjs')
const { param2Obj } = require('./utils')

/**
 * 生产环境Mock数据
 * 重新定义XMLHttpRequest，
 */
function mockXHR() {
  var mocks = []
  const files = require.context('./controller', false, /\.js$/)
  files.keys().forEach(key => {
    const obj = files(key)
    mocks.push(...obj)
  })

  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options

        result = respond({
          method: type,
          body: body,
          query: param2Obj(url),
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const route of mocks) {
    Mock.mock(new RegExp(route.url), route.type || 'get', XHR2ExpressReqWrap(route.response))
  }
}

module.exports = {
  mockXHR,
}
