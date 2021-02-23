import $router from '@/router/index'
import $api from '@/api/api-all'

let token = localStorage.getItem('accessToken')
let rtoken = localStorage.getItem('refreshToken')
//业务员   检验员   仓管员    注销员   拆解员
//APP_YWY, APP_YCY, APP_CGY, APP_ZXY, APP_CJY,

export default {
  namespaced: true,
  state: {
    accessToken: token,
    refreshToken: rtoken,
    roles: '',
    count: 0,
    userInfo: {},
  },
  mutations: {
    SET_TOKEN(state, datas) {
      state.accessToken = datas.accessToken
      state.refreshToken = datas.refreshToken

      localStorage.setItem('accessToken', datas.accessToken)
      localStorage.setItem('refreshToken', datas.refreshToken)
    },
    SET_USER(state, info) {
      //角色
      state.roles = info.roles
      state.userInfo = info
    },
    LOGIN_OUT(state) {
      state.accessToken = ''
      state.refreshToken = ''
      localStorage.clear()
      $router.push('/login')

      location.reload()
    },
  },
  actions: {
    //退出
    async loginOut({ commit, state }) {
      try {
        let headers = { accessToken: state.accessToken, refreshToken: state.refreshToken }
        let res = await $api.loginOut({}, { headers: headers })
        commit('LOGIN_OUT')
        return res
      } catch (err) {
        console.log(err)
      }
    },
    //用户
    async getUserInfo({ commit, state }) {
      let user = {}
      try {
        let res = await $api.getUserInfo()
        if (res.code != 200) {
          commit('LOGIN_OUT')
          return
        }
        let { realname, portrait, outletsLng, outletsLat, roles, todoMsgNum } = res.data
        user = { realname, portrait, lng: outletsLng, lat: outletsLat, roles }
        commit('SET_USER', user)
        state.count = todoMsgNum
      } catch (error) {
        console.log(error)
      }
      return user
    },
  },
}
