import {LOGOUT, RECEIVE_TOKEN, RECEIVE_USER} from "../mutation-types";
import {reqAutoLogin} from "../../api";

const state = {
  user: {},
  token: localStorage.getItem('token_key'),
}
const mutations = {
  [RECEIVE_USER] (state, {user}) {
    state.user = user
  },
  [RECEIVE_TOKEN] (state, {token}) {
    state.token = token
  },
  [LOGOUT] (state) {
    state.token = ''
    state.user = {}
  },
}
const actions = {
  saveUser ({commit}, user) {
    /*const token = user.token
    localStorage.setItem('token_key', token)
    delete user.token*/
    commit(RECEIVE_USER, {user})
  /*  commit(RECEIVE_TOKEN, {token})*/
  },
  logout ({commit}) {
    localStorage.removeItem('token_key')
    commit(LOGOUT)
  },
  async autoLogin ({commit}) {
    const result = await reqAutoLogin()
    if (result.code === 0) {
      const user = result.data
      commit(RECEIVE_USER, {user})
    }
  },
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
