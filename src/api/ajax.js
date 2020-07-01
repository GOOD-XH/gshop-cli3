import axios from 'axios'
import qs from 'qs'
import { Toast } from 'mint-ui'
import store from '../vuex/store'
import router from '../router'

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.request.use(config => {
    const {method, data} = config
    if (method.toUpperCase()==='POST' && data && typeof data==='object') {
      config.data = qs.stringify(data) // {name: 'tom', pwd: '123'} ==> name=tom&pwd=123
    }
/*   const token = state.token
     if (token) {
      config.headers['Authorization'] = token
      } else {
        if (config.headers.checkToken) {
          throw new Error('没有token，不能请求')
    }
  }
  }*/
    return config
  }
)
instance.interceptors.response.use(
  res =>{
    return res.data
  },
  error => {
  if (!error.response) {
    if (error.status===401) {
      if (router.currentRoute.path !== './login') {
        router.replace('/login')
        Toast('提示', error.message)
      } else {
        console.log('没有token, 请求前取消的请求, 已在login, 不需要跳转')
      }
    }
  } else {
    if (error.response.status === 401) {
      store.dispatch('logout')
      if (router.currentRoute.path !== './login') {
        Toast('提示', error.message)
        router.replace('/login')
      }
    } else if (error.response.status === 404) {
      Toast('提示', '资源不存在')
    }
    Toast('提示', error.message)
  }
    return new Promise(() => {})
  }
)
export default instance
