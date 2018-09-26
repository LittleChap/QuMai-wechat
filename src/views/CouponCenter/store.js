/**
 * Created by yangzhanpeng on 2018/1/6.
 */
import {fetch} from '@/utils/fetch'
import {toast} from '@/main'

const CouponCenter = {
  state: {
    unclaimedCouponList: [],
    unclaimedTotal: 0,
    couponList: {
      unused: [],
      unusedTotal: 0,
      alreadyUsed: [],
      alreadyUsedTotal: 0,
      outOfDate: [],
      outOfDateTotal: 0
    }
  },
  mutations: {
    SET_UNCLAIMEDCOUPONLIST: (state, couponListData) => {
      state.unclaimedCouponList = state.unclaimedCouponList.concat(couponListData.couponArray)
      state.unclaimedTotal = couponListData.totalResult
    },
    SET_UNUSED: (state, couponList) => {
      state.couponList.unused = state.couponList.unused.concat(couponList.couponArray)
      state.couponList.unusedTotal = couponList.totalResult
    },
    SET_ALREADYUSED: (state, couponList) => {
      state.couponList.alreadyUsed = state.couponList.alreadyUsed.concat(couponList.couponArray)
      state.couponList.alreadyUsedTotal = couponList.totalResult
    },
    SET_OUTOFDATE: (state, couponList) => {
      state.couponList.outOfDate = state.couponList.outOfDate.concat(couponList.couponArray)
      state.couponList.outOfDateTotal = couponList.totalResult
    },
    CLEAR_GETCOUPON: (state) => {
      state.unclaimedCouponList = []
      state.unclaimedTotal = 0
    },
    CLEAR_COUPON: (state) => {
      state.couponList = {
        unused: [],
        unusedTotal: 0,
        alreadyUsed: [],
        alreadyUsedTotal: 0,
        outOfDate: [],
        outOfDateTotal: 0
      }
    }
  },
  actions: {
    async getCoupon (params) {
      const url = '/mobileCoupon/receiveCoupon.do'
      const response = await fetch(url, params)
      if (parseInt(response.code) === 1) {
        toast('领取成功')
        return true
      } else {
        toast(response.message)
      }
    },
    async getUnclaimedCouponList ({commit}, params) {
      const url = '/mobileCoupon/getUnclaimedCouponList.do'
      const response = await fetch(url, params)
      if (parseInt(response.code) === 1) {
        commit('SET_UNCLAIMEDCOUPONLIST', response.data)
        if (params.done) {
          params.done()
        }
      } else {
        toast(response.message)
      }
    },
    async getCouponList ({commit}, params) {
      const url = '/mobileCoupon/getCouponList.do'
      const response = await fetch(url, params)
      if (parseInt(response.code) === 1) {
        if (params.couponType === 0) {
          commit('SET_UNUSED', response.data)
        }
        if (params.couponType === 1) {
          commit('SET_ALREADYUSED', response.data)
        }
        if (params.couponType === 2) {
          commit('SET_OUTOFDATE', response.data)
        }
        if (params.done) {
          params.done()
        }
      } else {
        toast(response.message)
      }
    }
  },
  getters: {}
}

export default CouponCenter
