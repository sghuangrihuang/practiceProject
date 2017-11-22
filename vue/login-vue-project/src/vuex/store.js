import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  isLoginIn: !!localStorage.getItem('lbUser')
}
const mutations = {
  CHANGE_LOGIN(state, bool) {
    state.isLoginIn = bool;
  }
}
const actions = {
  changeLogin({commit}, {bool}) {
    commit('CHANGE_LOGIN', bool)
  }
}
var store = new Vuex.Store({
  state,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
export default store;