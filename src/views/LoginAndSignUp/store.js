/**
 * Created by yangzhanpeng on 2017/12/9.
 */
import {fetch} from '@/utils/fetch'
import {toast} from '@/main'
import {getUser, setUser, removeUser} from '@/utils/user'

const loginAndSignUp = {
  state: {
    userInfo: getUser() || '',
    loginForm: {
      username: '',
      password: '',
      validCode: ''
    },
    retrieve: {
      step: 1,
      phoneNUM: ''
    },
    registerBtnStatus: 0,
    registerFormData: {},
    loginFormData: {},
    bindmobileBtnStatus: 0,
    thirdData: {}
  },
  mutations: {
    SET_RETRIEVEPHONENUM: (state, phoneNum) => {
      state.retrieve.phoneNum = phoneNum
    },
    SET_STEP: (state, step) => {
      state.retrieve.step = step
    },
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_BINDMOBILEBTNSTATUS: (state, status) => {
      state.bindmobileBtnStatus = status
    },
    SET_REGISTERBTNSTATUS: (state, status) => {
      state.registerBtnStatus = status
    },
    SET_REGISTERDATA: (state, data) => {
      state.registerFormData = data
    },
    SET_LOGINDATA: (state, data) => {
      state.loginFormData = data
    },
    SET_THIRDDATA: (state, data) => {
      state.thirdData = data
    }
  },
  actions: {
    async bindMobile ({commit, state}, $router) {
      const url = '/mobileMember/mobileRegister.do'
      const data = state.thirdData
      data.unionId = localStorage.getItem('unionId')
      const response = await fetch(url, data)
      if (parseInt(response.code) === 1) {
        response.data.type = '0'
        setUser(response.data)
        commit('SET_USER', response.data)
        if (sessionStorage.getItem('returnUrl')) {
          const returnUrl = sessionStorage.getItem('returnUrl')
          $router.push(returnUrl)
        }
      } else {
        toast(response.message)
      }
    },
    async logInByPwd ({commit, state}) {
      const url = '/mobileMember/login.do'
      const data = state.loginFormData
      const response = await fetch(url, data)
      if (parseInt(response.code) === 1) {
        setUser(response.data)
        commit('SET_USER', response.data)
        return response
      } else {
        toast(response.message)
        return response
      }
    },
    logOut ({commit}) {
      return new Promise(resolve => {
        removeUser()
        commit('SET_USER', '')
        resolve()
      })
    },
    async register ({commit, state}) {
      const url = '/mobileMember/mobileRegister.do'
      const data = state.registerFormData
      const response = await fetch(url, data)
      if (parseInt(response.code) === 1) {
        setUser(response.data)
        commit('SET_USER', response.data)
        return response
      } else {
        toast(response.message)
        return response
      }
    }
  }
}

export default loginAndSignUp
