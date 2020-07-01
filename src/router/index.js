import Vue from 'vue'
import VueRouter from 'vue-router'

const MSite = () => import('../pages/MSite/MSite')
const Search = () => import('../pages/Search/Search')
const Order = () => import('../pages/Order/Order')
const Profile = () => import('../pages/Profile/Profile')

import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import Goods from '../pages/Shop/Goods'
import Ratings from '../pages/Shop/Ratings'
import Info from '../pages/Shop/Info'

Vue.use(VueRouter)
export default  new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/msite',
    },
    {
      path: '/msite',
      component: MSite,
      meta: {
        isShowFooter : true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        isShowFooter : true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        isShowFooter : true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        isShowFooter : true
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        isShowFooter : false
      }
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '',
          redirect: 'goods',
        },
        {
          path: 'goods',
          component: Goods,
        },
        {
          path: 'ratings',
          component: Ratings,
        },
        {
          path: 'info',
          component: Info,
        }
      ]
    }
  ]
})
