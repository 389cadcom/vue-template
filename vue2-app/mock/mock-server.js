const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const Mock = require('mockjs')
const { mockArray } = require('./utils')

const mockDir = path.join(process.cwd(), 'mock')

function registerRoutes(app) {
  //注册所有路由请求,修改文件重新加载
  let mocks = mockArray()
  let mockLastIndex

  const mocksForServer = mocks.map(route => {
    //console.log(route.url)
    return responseFake(route.url, route.type, route.response)
  })
  //挂载所有路由
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  }
}

//请求缓存处理
function unregisterRoutes() {
  Object.keys(require.cache).forEach(cache => {
    if (cache.includes(mockDir)) {
      console.log(cache)
      delete require.cache[require.resolve(cache)]
    }
  })
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    },
  }
}

//https://expressjs.com/en/4x/api.html#req.body
//Express服务
module.exports = app => {
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

  //注册路由
  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  //监听服务热启动 watch files, hot reload mock server
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true,
    })
    .on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        try {
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength)

          // clear routes cache
          unregisterRoutes()

          //重新注册路由
          const mockRoutes = registerRoutes(app)
          mockRoutesLength = mockRoutes.mockRoutesLength
          mockStartIndex = mockRoutes.mockStartIndex

          console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
        } catch (error) {
          console.log(chalk.redBright(error))
        }
      }
    })
}
