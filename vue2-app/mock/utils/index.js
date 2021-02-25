const { Random } = require('mockjs')
const { join } = require('path')
const fs = require('fs')

/**
 * 获取目录下所有文件
 * @param {*} dirPath
 */
function readAllFiels(dirPath) {
  let arr = []
  function findFiles() {
    const jsonFiles = []
    const findAllFile = dirs => {
      const files = fs.readdirSync(dirs)
      files.forEach(item => {
        const fPath = join(dirs, item) //完整路径
        const stat = fs.statSync(fPath)
        if (stat.isDirectory() === true) findAllFile(item)
        if (stat.isFile() === true) jsonFiles.push(item)
      })
    }
    findAllFile(dirPath)
    jsonFiles.forEach(item => arr.push(`../controller/${item}`))
  }
  findFiles()
  return arr
}

/**
 * 处理所有mock/controller模块
 * @param {*} dirs
 */
function mockArray(dirs = 'mock/controller') {
  let mocks = []
  const files = readAllFiels(dirs)

  files.forEach(item => {
    const ary = require(item)
    mocks.push(...ary)
  })
  return mocks
}

/**
 * 随机图片
 * @param {*} width
 * @param {*} height
 */
function imgRandom(width = 50, height = 50) {
  return `https://picsum.photos/${width}/${height}?random=${Random.guid()}`
}

/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

module.exports = {
  imgRandom,
  param2Obj,
  mockArray,
}
