// import NP from 'number-precision'

export { format } from './util-date'

/**
 * 缓动算法 | 平滑滚动
 * https://www.zhangxinxu.com/wordpress/2017/01/share-a-animation-algorithm-js/
 * @param A 起始位置；
 * @param B 目标位置；
 * @param rate 缓动速率；
 * @param rate callback 变化的位置回调，支持两个参数，value和isEnding，表示当前的位置值（数值）以及是否动画结束了（布尔值）；
 *
 */
export function easeout(A, B, rate, callback = () => {}) {
  if (A === B || typeof A !== 'number') {
    return
  }
  B = B || 0
  rate = rate || 2

  var step = function() {
    A = A + (B - A) / rate
    if (A < 1) {
      callback(B, true)
      return
    }
    callback(A, false)
    requestAnimationFrame(step)
  }
  step()
}
