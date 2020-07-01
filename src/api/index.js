import ajax from './ajax'

export const reqAddress = (latitude, longitude) => ajax({
  method: 'GET',
  url: `/position/${latitude},${longitude}`
})
export const reqCategorys = () => ajax({
  method: 'GET',
  url: `index_category`
})
export const reqShops = ({latitude, longitude}) => ajax({
  method: 'GET',
  url: `/shops`,
  params: {
    latitude,
    longitude
  },
/*    headers: {
    checkToken: true
  }*/
})
export const repSendCode = (phone) => ajax({
  method: 'GET',
  url: `/sendcode`,
  params: {
    phone
  }
})
export const reqPwdLogin = ({name, pwd, captcha}) => ajax({
  method: 'POST',
  url: `/login_pwd`,
  data: {
    name,
    pwd,
    captcha
  }
})
export const repSmsLogin = ({phone, code}) => ajax({
  method: 'POST',
  url: `/login_sms`,
  data: {
    phone,
    code
  }
})
export const reqAutoLogin = () => ajax({
  method: 'GET',
  url: `/auto_login`
})
export const reqGoods = () => ajax('/goods')
export const reqRatings = () => ajax('/ratings')
export const reqInfo = () => ajax('/info')
