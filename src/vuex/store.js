import Vue from 'vue'
import Vuex, {Store} from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import msite from './modules/msite'
import user from './modules/user'
import shop from './modules/shop'

Vue.use(Vuex)

export default new Store({
  mutations,
  actions,
  getters,
  modules: {
    msite,
    user,
    shop
  }
})
