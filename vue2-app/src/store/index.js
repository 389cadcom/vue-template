import Vue from 'vue'
import Vuex from 'vuex'
// import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    //user
  },
})

/**
...mapState('user', ['roles', 'userInfo']),


commit   $store.commit('user/LOGIN_OUT')
dispatch await this.$store.dispatch('user/getUserInfo')

 */
