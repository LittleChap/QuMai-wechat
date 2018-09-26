/**
 * Created by yangzhanpeng on 2017/12/9.
 */
import axios from 'axios'
import {getUser} from '@/utils/user'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // baseURL: 'http://192.168.10.43:8080/backend', // api的base_url
  timeout: 10000                  // 请求超时时间
})

/**
 * 拦截request，加上用户信息
 */
service.interceptors.request.use(config => {
  const userInfo = getUser()
  if (userInfo) {
    // if (userInfo.token && userInfo.memberId) {
    //  // 账号密码登录时加上token和memberId
    //  const data = config.params || {}
    //  config.params = Object.assign(data, {
    //    token: userInfo.token,
    //    memberId: userInfo.memberId
    //  })
    // } else
    if (userInfo.unionId) {
      // 第三方登录时加上unionId和type
      const data = config.params || {}
      config.params = Object.assign({
        unionId: userInfo.unionId,
        type: '0',
        memberId: userInfo.memberId
      }, data)
    }
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
      return {code: 0, message: '您在别处登录,请重新登录'}
    }
    let strRes = JSON.stringify(res)
    strRes = strRes.replace(/\/\/guanqianjie1hao.oss-cn-hangzhou.aliyuncs.com/g, '//img.1guanqian.com')
    strRes = JSON.parse(strRes)
    return strRes
  },
  error => {
    console.log('err ' + error)
    return false
  }
)

export function fetch (url, data) {
  try {
    let res = service({
      url: url,
      method: 'post',
      params: data
    })
    return res
  } catch (e) {
    return {code: -1, message: '网络异常'}
  }
}
