/**
 * Created by yangzhanpeng on 2017/12/9.
 */
import {fetch} from '@/utils/fetch'
import {toast} from '@/main'

const GoodsDetail = {
  state: {
    shareWinStatus: false,
    goodsId: 0,
    goodsDetail: {},
    selectSpec: {},
    selectNum: 1,
    specWinStatus: false,
    defaultAddressInfo: {},
    isInit: false,
    totalCommentNum: 0,
    goodsDetailComments: [],
    commentsLength: {
      length0: 0,
      length1: 0,
      length2: 0,
      length3: 0,
      length4: 0
    },
    specStatusNow: [],
    specStatusAll: [],
    specGroup: [],
    freightTemplate: []
  },
  mutations: {
    SET_SHAREWIN: (state, status) => {
      state.shareWinStatus = status
    },
    REMOVE_GOODSSTATE: (state) => {
      state.goodsDetail = {}
      state.selectSpec = {}
      state.selectNum = 1
      state.specWinStatus = false
      state.defaultAddressInfo = {}
      state.isInit = false
      state.totalCommentNum = 0
      state.goodsDetailComments = []
      state.freightTemplate = []
      state.commentsLength = {
        length0: 0,
        length1: 0,
        length2: 0,
        length3: 0,
        length4: 0
      }
    },
    SET_SPECWIN: (state, status) => {
      state.specWinStatus = status
    },
    SET_FAVORITE: (state) => {
      state.goodsDetail.isFavorite = !state.goodsDetail.isFavorite
    },
    SET_SELECTNUM: (state, num) => {
      state.selectNum = num
    },
    SET_COMMENTSLENGTH: (state, obj) => {
      state.commentsLength['length' + obj.index] = obj.length
    },
    SET_GOODSDETAIL: (state, goodsDetail) => {
      state.goodsDetail = goodsDetail.goodsjson
    },
    SET_SELECTSPEC: (state, selectItem) => {
      state.selectSpec = selectItem
    },
    SET_DEFAULTADDRESSINFO: (state, addrArr) => {
      state.defaultAddressInfo = addrArr
    },
    SET_PAGEINIT: (state, status) => {
      state.isInit = status
    },
    SET_GOODSDETAILCOMMENTS: (state, comments) => {
      state.goodsDetailComments = comments.orderItemCommentArray
      state.totalCommentNum = comments.totalCommentNum
    },
    SET_SPEC: (state, ids) => {
      for (let i = 0; i < state.goodsDetail.specArray.length; i++) {
        const specItem = state.goodsDetail.specArray[i]
        if (ids == specItem.specItemIds) {
          specItem.price = specItem.specPrice * state.selectNum
          state.selectSpec = specItem
        }
      }
    },
    SET_SPECGROUP: (state, group) => {
      state.specGroup = group
    },
    SET_TEMPLATE: (state, template) => {
      state.freightTemplate = template
    }
  },
  actions: {
    async getTwoComments ({commit}, goodsId) {
      const url = '/mobileOrderItemComment/getTwoOrderItemComment.do'
      const data = {goodsId}
      const response = await fetch(url, data)
      commit('SET_GOODSDETAILCOMMENTS', response.data)
    },
    async getGoodsDetail ({commit, dispatch, state}, params) {
      const url = '/mobileGoods/getGoodsDetail.do'
      const data = {goodsId: params.goodsId}
      const response = await fetch(url, data)
      if (parseInt(response.code) === 1) {
        params.cb && params.cb(response.data.goodsjson.name, response.data.goodsjson.galleryArray[0].imageThumbnail)
        commit('SET_PAGEINIT', true)
        commit('SET_GOODSDETAIL', response.data)
        dispatch('initAddressList')
        dispatch('getTwoComments', params.goodsId)
        setTimeout(() => {
          document.documentElement.scrollTop = 0
        }, 200)
        setTimeout(() => {
          if (state.goodsDetail.goodsStore > 0) {
            for (let i = 0; i < state.goodsDetail.specArray.length; i++) {
              if (state.goodsDetail.specArray[i].specItemIds == state.goodsDetail.fitSpecItemIds) {
                commit('SET_SELECTSPEC', state.goodsDetail.specArray[i])
                return dispatch('getTemplate')
              }
            }
          }
        })
      } else {
        toast(response.message)
      }
    },
    initAddressList ({commit, state}) {
      if (parseInt(state.goodsDetail.isLogin) === 1) {
        commit('SET_DEFAULTADDRESSINFO', {
          province: state.goodsDetail.province,
          city: state.goodsDetail.city,
          region: state.goodsDetail.region,
          street: state.goodsDetail.street,
          street_id: state.goodsDetail.street_id,
          freight: state.goodsDetail.freight
        })
      }
    },
    async changeAddress ({commit, state}, addressParam) {
      const url = '/mobileGoods/calculateOneProductFreight.do'
      const data = {
        productId: state.selectSpec.productId,
        regionId: addressParam.street_id || addressParam.streetId
      }
      const response = await fetch(url, data)
      if (parseInt(response.code) === 1) {
        commit('SET_DEFAULTADDRESSINFO', {
          province: addressParam.province,
          city: addressParam.city,
          region: addressParam.region,
          street_id: addressParam.street_id,
          freight: response.data.freight
        })
      } else {
        toast(response.message)
      }
    },
    async getTemplate ({commit, state}) {
      const url = '/mobileGoods/getFreightInfo.do'
      const data = {
        productId: state.selectSpec.productId
      }
      const response = await fetch(url, data)
      if (response.code == 1) {
        commit('SET_TEMPLATE', response.data.freightArray)
        setTimeout(() => {
          document.body.scrollTop = 0
        }, 100)
      }
    }
  },
  getters: {}
}

export default GoodsDetail
