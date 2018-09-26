/**
 * Created by yangzhanpeng on 2018/1/2.
 */
import {fetch} from '@/utils/fetch'
import {toast} from '@/main'

const AddressCenter = {
  state: {
    addressList: [],
    addressInfo: {}
  },
  mutations: {
    SET_ADDRESSLIST: (state, addressList) => {
      state.addressList = addressList
    },
    SET_ADDADDRESSINFO: (state, address) => {
      state.addressInfo = address
    }
  },
  actions: {
    // 获取收货地址列表
    async getAddressList ({commit}) {
      const url = '/mobileMemberAddress/getAddressList.do'
      const response = await fetch(url, {})
      if (parseInt(response.code) === 1) {
        commit('SET_ADDRESSLIST', response.data.addresArray)
      } else {
        toast(response.message)
      }
    },
    async getAddressItem ({commit, state, dispatch}, addressId) {
      await dispatch('getAddressList')
      state.addressList.map((item) => {
        if (parseInt(item.addressId) === parseInt(addressId)) {
          commit('SET_ADDADDRESSINFO', item)
        }
      })
    },
    async addAddress ({state}, $router) {
      const url = '/mobileMemberAddress/addAddress.do'
      const response = await fetch(url, state.addressInfo)
      toast(response.message)
      if (parseInt(response.code) === 1) {
        // dispatch('getAddressList')
        setTimeout(() => {
          $router.go(-1)
        }, 2000)
      }
    },
    async editAddress ({state}, $router) {
      const url = '/mobileMemberAddress/editAddress.do'
      const response = await fetch(url, state.addressInfo)
      toast(response.message)
      if (parseInt(response.code) === 1) {
        // dispatch('getAddressList')
        setTimeout(() => {
          $router.go(-1)
        }, 2000)
      }
    },
    async setDefaultAddress ({dispatch}, addressId) {
      const url = '/mobileMemberAddress/defaultAddress.do'
      const response = await fetch(url, {addressId})
      toast(response.message)
      if (parseInt(response.code) === 1) {
        dispatch('getAddressList')
      }
    },
    async deleteAddress ({dispatch}, addressId) {
      const url = '/mobileMemberAddress/deleteAddress.do'
      const response = await fetch(url, {addressId})
      toast(response.message)
      if (parseInt(response.code) === 1) {
        dispatch('getAddressList')
      }
    }
  },
  getters: {}
}

export default AddressCenter
