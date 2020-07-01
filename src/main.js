import Vue from 'vue'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import './mock/mockServer'
import * as API from './api'
import './filter'

import App from './App.vue'
import router from './router'
import store from './vuex/store'
import Header from './components/Header/Header'
import Star from './components/Star/Star'
import CartControl from './components/CartControl/CartControl'
import loading from './common/imgs/loading.gif'

Vue.config.productionTip = false
Vue.prototype.$API = API
Vue.use(VueLazyload, {
  loading
})

Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component(Button.name, Button)

new Vue({
  render: h => h(App),
  store,
  router,

}).$mount('#app')
