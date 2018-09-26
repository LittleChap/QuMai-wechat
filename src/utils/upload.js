/**
 * Created by yangzhanpeng on 2017/12/9.
 */
import axios from 'axios'
import store from '../store'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // baseURL: 'http://192.168.10.43:8080/backend', // api的base_url
  timeout: 10000                  // 请求超时时间
})

// 上传图片方法
export default async function upload (url, data) {
  try {
    let res = await service({
      url: url,
      method: 'post',
      headers: {'Content-Type': 'multipart/form-data'},
      data: data
    })
    return res
  } catch (e) {
    return {code: -1, message: '网络异常'}
  }
}

/**
 * 拦截request，加上用户信息
 */
service.interceptors.request.use(config => {
  if (store.getters.userInfo.token && store.getters.userInfo.memberId) {
    // 账号密码登录时加上token和memberId
    const data = config.params || {}
    config.params = Object.assign(data, {
      token: store.getters.userInfo.token,
      memberId: store.getters.userInfo.memberId
    })
  } else if (store.getters.userInfo.unionId && store.getters.userInfo.type) {
    // 第三方登录时加上unionId和type
    const data = config.params || {}
    config.params = Object.assign(data, {
      unionId: store.getters.userInfo.unionId,
      type: store.getters.userInfo.type
    })
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

/**
 * 拦截response，处理全局异常
 */
service.interceptors.response.use(
  response => {
    const res = response.data
    if (parseInt(res.code) === 5) {
      console.log(123123)
      return
    }
    return response.data
  },
  error => {
    console.log('err ' + error)
    return false
  }
)
