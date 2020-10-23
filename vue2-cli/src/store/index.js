import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


let modules = {}
let files = require.context('./modules/', false, /\.js$/)
files.keys().forEach( file => {
  var name = file.replace(/^\.\/|.js$/g, '')
  // console.log(files(file))

  modules[name] = files(file).default || files(file);
})


const store = new Vuex.Store({
  state: {
    token: ''                     
  },
  mutations: {
    set_token(state, token){
      state.token = token
      sessionStorage.token = token
    },
    remove_token(state){
      state.token = ''
      sessionStorage.removeItem('token')
    }
  },
  actions: { },
  modules: modules,
})

export default store;

/*
import createPersistedState from "vuex-persistedstate"
plugins:[
  createPersistedState({
    storage: sessionStorage,
    reducer(state){
      var {direction, token:{tokenId}} = state
      return {
        direction,
        tokenId
      }
    }
  })
]
*/