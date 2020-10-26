/**
 * 空值参数处理
 * @param {*} params
 */
export const trimParmas = params => {
  var keys = Object.keys(params).filter(key => {
    return params[key] || params[key] === 0
  })
  var datas = keys.reduce((prev, curr) => {
    return { ...prev, [curr]: params[curr] }
  }, {})
  return datas
}

/**
 * 参数加密验证处理, 请求头部参数
 * @param {*} config
 */
function paramsHandler(config) {
  return config
}
