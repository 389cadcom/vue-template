import $axios from './request'

let url = 'http://mock.allhome.com.cn/mock/5f7fddf8cc51c50010bf12f3/example'
export default {
  getTest(data) {
    return $axios.get(`${url}/mock`, data)
  },
  send(data) {
    return $axios.post(`${url}/upload`, data)
  },
}
