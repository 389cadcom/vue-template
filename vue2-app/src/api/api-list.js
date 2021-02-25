import $axios from './axios'

let baseURL = process.env.VUE_APP_BASE_API
export default {
  getUser(data) {
    return $axios.post(`${baseURL}/user/xxx`, data)
  },
  getTest(data) {
    return $axios.get(`${baseURL}/user/login`, data)
  },
  getList(data) {
    return $axios.get(`${baseURL}/rec/getTodoCheckCarList`, data)
  },
}
