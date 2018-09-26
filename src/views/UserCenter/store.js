/**
 * Created by yangzhanpeng on 2017/12/9.
 */
import {fetch} from '@/utils/fetch'
import {toast} from '@/main'
import {getUser, setUser} from '@/utils/user'

const UserCenter = {
  state: {
    userInfo: getUser() || '',
    levelInfo: '',
    resetPwd: {
      editKey: '',
      changeMobileKey: ''
    }
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      setUser(userInfo)
      state.userInfo = userInfo
    },
    SET_LEVELINFO: (state, levelInfo) => {
      state.levelInfo = levelInfo
    },
    SET_EDITKEY: (state, editKey) => {
      state.resetPwd.editKey = editKey
    },
    SET_CHANGEMOBILEKEY: (state, changeMobileKey) => {
      state.resetPwd.changeMobileKey = changeMobileKey
    }
  },
  actions: {
    // 获取用户资料
    async getUserInfo ({commit}) {
      const url = '/mobileMember/getMemberInfo.do'
      const response = await fetch(url, {})
      commit('SET_USERINFO', response.data)
    },
    // 修改用户资料
    async setUserInfo ({commit, state}, newInfo) {
      const url = '/mobileMember/editMemberInfo.do'
      const response = await fetch(url, newInfo)
      if (response.code == 1) {
        toast('保存成功')
      } else {
        toast(response.message)
      }
      commit('SET_USERINFO', Object.assign(state.userInfo, newInfo))
    },
    // 获取我的等级
    async getMyLevel (store) {
      if (!store.state.userInfo) { return }
      const url = '/mobileMember/myLevel.do'
      const response = await fetch(url, {})
      if (parseInt(response.code) === 1) {
        // response.data.point = 3888
        // response.data.level = 2
        // response.data.leftPoint = 1112
        store.commit('SET_LEVELINFO', response.data)
        // commit('SET_LEVELINFO', response.data)
      } else {
        toast(response.message)
      }
    }
  },
  getters: {
    GET_USERINFO (state) {
      return state.userInfo || {}
    },
    GET_LEVELINFO (state) {
      return state.levelInfo || {}
    }
  }
}

export default UserCenter
