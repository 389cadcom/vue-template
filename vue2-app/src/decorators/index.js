import { throttle as _throttle, debounce as _debounce } from 'lodash'
import { Toast, Dialog } from 'vant'

/**
 * 高阶函数compose, decorators
 *
 * debounce
 * throttle
 * @babel/plugin-proposal-decorators legacy:true
 */

/**
 * 节流装饰器
 * @param {*} wait
 * @param {*} options
 */
export const throggle = (wait, options = {}) => {
  return (target, name, descriptor) => {
    descriptor.value = _throttle(descriptor.value, wait, options)
  }
}

/**
 * 防抖装饰器
 * @param {*} wait
 * @param {*} options
 */
export const debounce = function(wait, options = {}) {
  return function(target, name, descriptor) {
    descriptor.value = _debounce(descriptor.value, wait, options)
  }
}

/**
 *
 * @param {提示信息} message
 * @param {异常函数处理} errFn
 */
export const loading = (message = '加载中...', errFn) => {
  return (target, name, descriptor) => {
    let fn = descriptor.value
    descriptor.value = async (...rest) => {
      let loading = Toast.loading({
        message,
        forbidClick: true,
      })
      try {
        return await fn.apply(this, rest)
      } catch (error) {
        errFn & errFn.apply(this, error)
      } finally {
        loading.clear()
      }
    }
  }
}

/**
 * 确认框 装饰器
 * @param {*} message 提示信息
 * @param {*} cancelFn 异常处理逻辑
 */
export const confirm = (message = '确定要删除该数据?', cancelFn = function() {}) => {
  return (target, name, descriptor) => {
    let fn = descriptor.value
    descriptor.value = async (...rest) => {
      try {
        await Dialog.confirm({ message })
        fn.apply(this, rest)
      } catch (error) {
        cancelFn && cancelFn()
      }
    }
  }
}
