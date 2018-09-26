/**
 * Created by ruth.chen on 2017/12/12.
 */
import {fetch} from '@/utils/fetch'
import {toast} from '@/main'

const CartAndPay = {
  state: {
    // --- 购物车的数据
    cartList: [],
    cartNum: 0,  // 购物车的数量
    countPrice: {  // 计算购物车总价
      pricePay: 0,
      priceTotal: 0,
      priceDiscount: 0
    },
    isAllChecked: false,
    selectGroup: [],  // 选择的商品  所有的店铺的集合  [[店铺1里面选中的商品],[店铺2],[店铺3],[店铺4]]
    selectCart: [], // 选中的可下单的
    selectCartAll: [],  // 全部的 包括不可下单的
    isEditStatus: false,
    //  ---- 购物车的数据 --end

    // 确认订单
    confirmData: {}, // 订单的总数据
    commitData: {},  // 要提交订单时的数据
    toPriceData: {}, // 去计算价格的参数
    productIds: '',  // 规格id集合  以”,”隔开
    addressInfo: {}  // 地址信息
    // 确认订单--end
  },
  mutations: {
    // --- 购物车的数据
    SET_CARTLIST: (state, cartList) => {
      state.cartList = cartList
    },
    SET_CARTNUM: (state, cartNum) => {
      state.cartNum = cartNum
    },
    SET_COUNTPRICE: (state, data) => {
      state.countPrice = {
        pricePay: data.pricePay,
        priceTotal: data.priceTotal,
        priceDiscount: data.priceDiscount
      }
    },
    SET_SELECTCART: (state, selectCart) => {
      state.selectCart = selectCart
    },
    SET_SELECTCARTALL: (state, selectCartAll) => {
      state.selectCartAll = selectCartAll
    },
    SET_GROUP: (state, selectGroup) => {
      state.selectGroup = selectGroup
    },
    SET_ISALLCHECKED: (state, isAllChecked) => {
      state.isAllChecked = isAllChecked
    },
    SET_ISEDITSTATUS: (state, isEditStatus) => {
      state.isEditStatus = isEditStatus
    },
    //  ---- 购物车的数据 --end
    // 确认订单
    SET_CONFIRMDATA: (state, confirmData) => {
      state.confirmData = confirmData
    },
    SET_COMMITDATA: (state, commitData) => {
      state.commitData = commitData
    },
    SET_TOPRICEDATA: (state, toPriceData) => {
      state.toPriceData = toPriceData
    },
    SET_PRODUCTIDS: (state, productIds) => {
      state.productIds = productIds
    },
    SET_ADDRESSINFO: (state, addressInfo) => {
      state.addressInfo = addressInfo
    }
  },
  actions: {
    //  ---- 购物车的数据
    // 获得列表
    async GetCartList ({commit, dispatch}, isSelect) {
      let url = '/mobileCart/list.do'
      let cartListData = await fetch(url)
      if (parseInt(cartListData.code) !== 1) {
        toast(cartListData.message)
        return false
      }
      let cartList = []
      if (cartListData.data.cartProductArray) {
        cartList = cartListData.data.cartProductArray
      }
      let cartNum = 0
      let groupSet = []  // 保存所有店铺的商品的选中状态

      for (let i = 0; i < cartList.length; i++) {
        cartNum += cartList[i].productArray.length
        let groupSelect = new Set()  // 保存当前店铺选中的商品的cartid
        for (let j = 0; j < cartList[i].productArray.length; j++) {
          let itemObj = cartList[i].productArray[j]
          if (isSelect !== 1) {  // 1是不选中
            // ---这里去判断是否选中
            let createDate = new Date(itemObj.createTime).getTime()
            let t = new Date().getTime() - createDate
            let day = Math.floor(t / 86400000)
            cartList[i].productArray[j].checked = (day <= 0)
            if (day <= 0) {
              groupSelect.add(itemObj.cartId)
            }
          }
        }
        cartList[i].checked = (groupSelect.size >= cartList[i].productArray.length)
        groupSet.push(groupSelect)
      }
      commit('SET_CARTLIST', cartList)
      commit('SET_CARTNUM', cartNum)
      commit('SET_GROUP', groupSet)
      dispatch('IsSelectAll')
    },
    // 获得价格
    GetCountPrice ({state, commit}) {
      let countPrice = {  // 计算购物车总价
        pricePay: 0,
        priceTotal: 0,
        priceDiscount: 0
      }
      state.selectCart.map(product => {
        let pricePay = Number(product.price - product.discount_price) > 0 ? Number(product.price - product.discount_price) : 0
        countPrice.pricePay += Number(pricePay * product.num)
        countPrice.priceTotal += Number(product.price * product.num)
        countPrice.priceDiscount += Number(product.discount_price * product.num)
      })
      commit('SET_COUNTPRICE', countPrice)
    },
    // 选中的处理
    SetSelectCart ({state, commit, dispatch}, data) {
      let cartList = state.cartList
      let selectGroup = state.selectGroup
      let isAllChecked = state.isAllChecked
      if (data.productIndex !== -1 && data.shopIndex !== -1) {  // 商品项的点击
        cartList[data.shopIndex].productArray[data.productIndex].checked = data.checked
        if (data.checked) {
          selectGroup[data.shopIndex].add(cartList[data.shopIndex].productArray[data.productIndex].cartId)
        } else {
          selectGroup[data.shopIndex].delete(cartList[data.shopIndex].productArray[data.productIndex].cartId)
        }
      } else if (data.shopIndex !== -1 && data.productIndex === -1) {  // 商店项的点击
        cartList[data.shopIndex].checked = data.checked
        if (data.checked) {
          for (let i = 0; i < cartList[data.shopIndex].productArray.length; i++) {
            selectGroup[data.shopIndex].add(cartList[data.shopIndex].productArray[i].cartId)
            cartList[data.shopIndex].productArray[i].checked = data.checked
          }
        } else {
          selectGroup[data.shopIndex].clear()
          for (let i = 0; i < cartList[data.shopIndex].productArray.length; i++) {
            cartList[data.shopIndex].productArray[i].checked = data.checked
          }
        }
      } else {  // 全选的点击
        isAllChecked = data.checked
        for (let shop = 0; shop < cartList.length; shop++) {
          for (let j = 0; j < cartList[shop].productArray.length; j++) {
            selectGroup[shop].add(cartList[shop].productArray[j].cartId)
            cartList[shop].productArray[j].checked = data.checked
          }
          if (!data.checked) {
            selectGroup[shop].clear()
          }
        }
      }
      commit('SET_CARTLIST', cartList)
      commit('SET_GROUP', selectGroup)
      commit('SET_ISALLCHECKED', isAllChecked)
      dispatch('IsSelectAll')
    },
    // 判断是否全选 和 店铺选择
    IsSelectAll ({state, commit, dispatch}) {
      let cartList = state.cartList
      let selectGroup = state.selectGroup
      let isAllChecked = state.isAllChecked
      let selectAll = new Set()
      selectAll.clear()
      for (let i = 0; i < selectGroup.length; i++) {
        if (selectGroup[i].size >= cartList[i].productArray.length) {
          selectAll.add(cartList[i].shopId)
          cartList[i].checked = true
        } else {
          selectAll.delete(cartList[i].shopId)
          cartList[i].checked = false
        }
      }
      if (selectAll.size >= cartList.length) {
        isAllChecked = true
      } else {
        isAllChecked = false
      }
      commit('SET_CARTLIST', cartList)
      commit('SET_GROUP', selectGroup)
      commit('SET_ISALLCHECKED', isAllChecked)
      dispatch('GetSelectCart')
    },
    // 获得选中的数据
    GetSelectCart ({state, commit, dispatch}) {
      let cartList = state.cartList
      let selectCart = []  // 选中的可下单的
      let selectCartAll = []  // 全部的 包括不可下单的
      for (let i = 0; i < cartList.length; i++) {
        let shopItem = cartList[i]
        for (let j = 0; j < shopItem.productArray.length; j++) {
          let productItem = shopItem.productArray[j]
          if (productItem.checked) {
            selectCartAll.push(productItem)
          }
          if (productItem.checked && productItem.isPutaway === 1 && productItem.store > 0) {
            selectCart.push(productItem)
          }
        }
      }
      commit('SET_SELECTCART', selectCart)
      commit('SET_SELECTCARTALL', selectCartAll)
      dispatch('GetCountPrice')
    },
    // 修改编辑状态
    ChangeEditStatus ({commit}, isEdit) {
      commit('SET_ISEDITSTATUS', isEdit)
    },
    // 修改单个商品
    changeCartList ({state, commit, dispatch}, newInfo) {
      let cartList = state.cartList
      cartList[newInfo.shopIndex].productArray[newInfo.productIndex] = newInfo.newItem

      commit('SET_CARTLIST', cartList)
      dispatch('GetCountPrice')
    },
    // 删除的操作
    async SetDelete ({state, dispatch}) {
      let selectCartAll = state.selectCartAll
      let cartArray = []
      for (let i = 0; i < selectCartAll.length; i++) {
        cartArray.push({
          cartId: selectCartAll[i].cartId,
          productId: selectCartAll[i].productId,
          num: 0
        })
      }
      let url = '/mobileCart/editCart.do'
      let req = {
        cartArray: JSON.stringify(cartArray)
      }
      let response = await fetch(url, req)
      if (parseInt(response.code) === 1) {
        dispatch('GetCartList', 1)
        toast('删除成功！')
      }
    },
    //  ---- 购物车的数据 --end

    // 确认订单
    // 获得确认订单数据
    async GetConfirmData ({state, commit, dispatch}, data) {
      let url = ''
      if (data.type === 1) {  // 从商品详情页
        url = '/mobileGoods/buyNow.do'
      } else {  // 从购物车
        url = '/mobileCart/buyNow.do'
      }
      let response = await fetch(url, data.product)
      if (parseInt(response.code) === 1 && response.data.shopProductArray.length) {
        response.data.couponDiscountArray = []
        commit('SET_CONFIRMDATA', response.data)
        let toPriceData = state.toPriceData
        if (toPriceData.shopArray && sessionStorage.getItem('currentAddressId')) {  // 从选择地址选择的地址
          console.log('已经有提交的数据')
          dispatch('getAddressInfoList')
        } else {
          toPriceData = {
            addressId: response.data.addressId || '',
            shopArray: []
          }
          let productIds = ''
          for (let i = 0; i < response.data.shopProductArray.length; i++) {
            let shop = response.data.shopProductArray[i]
            let productArray = []
            for (let j = 0; j < shop.productArray.length; j++) {
              productIds += shop.productArray[j].productId + ','
              productArray.push({
                productId: shop.productArray[j].productId,
                num: shop.productArray[j].num,
                cartId: shop.productArray[j].cartId || ''
              })
            }
            toPriceData.shopArray.push({
              shopId: shop.shopId,
              productArray: productArray,
              couponMemberId: null,
              remark: ''
            })
          }
          if (productIds.length) {
            productIds = productIds.substring(0, productIds.length - 1)
          }
          commit('SET_PRODUCTIDS', productIds)
          commit('SET_TOPRICEDATA', toPriceData)
          dispatch('SetCommitData', toPriceData)
          let addressInfo = {
            addressId: null,
            isSupported: true
          }
          if (response.data.addressId || response.data.addressId === 0) {
            addressInfo = {
              addressId: response.data.addressId,
              streetId: response.data.streetId,
              shipMobile: response.data.shipMobile,
              shipName: response.data.shipName,
              address: response.data.address,
              isSupported: true
            }
          }
          dispatch('SetAddressInfo', addressInfo)
        }

        // if (sessionStorage.getItem('currentAddressId')) {   // 从选择地址选择的地址
        //   // let commitData = state.commitData  // 保存去选择地址页的选择数据
        //   // dispatch('SetCommitData', commitData)
        //   // dispatch('getAddressInfoList')
        // } else {
        //   dispatch('SetCommitData', toPriceData)
        //   let addressInfo = {
        //     addressId: null,
        //     isSupported: true
        //   }
        //   if (response.data.addressId || response.data.addressId === 0) {
        //     addressInfo = {
        //       addressId: response.data.addressId,
        //       streetId: response.data.streetId,
        //       shipMobile: response.data.shipMobile,
        //       shipName: response.data.shipName,
        //       address: response.data.address,
        //       isSupported: true
        //     }
        //   }
        //   dispatch('SetAddressInfo', addressInfo)
        // }
      } else {
        // toast('无相关商品信息')
        toast(response.message)
        setTimeout(function () {
          data.router.go(-1)
        }, 2000)
      }
    },

    // 保存计算价格的参数
    SetPriceData ({state, commit, dispatch}, data) {
      let toPriceData = state.toPriceData
      toPriceData = Object.assign(toPriceData, data)
      commit('SET_TOPRICEDATA', toPriceData)
      dispatch('GetPriceData', toPriceData)
    },
    // 获得计算价格
    async GetPriceData ({state, commit, dispatch}) {
      let toPriceData = Object.assign({}, state.toPriceData)
      if (toPriceData.addressId || toPriceData.addressId === 0) {
        toPriceData.shopArray = JSON.stringify(toPriceData.shopArray)
        let res = await fetch('/mobileOrder/countPrice.do', toPriceData)
        if (parseInt(res.code) === 1) {
          let confirmData = state.confirmData
          confirmData.payPrice = res.data.payPrice
          confirmData.couponDiscountArray = res.data.couponDiscountArray
          let shopProductArray = confirmData.shopProductArray
          res.data.priceArray.map((shopItem, index) => {
            shopProductArray[index].goodsPrice = shopItem.goodsPrice
            shopProductArray[index].shippingPrice = shopItem.shippingPrice
            shopProductArray[index].discountPrice = shopItem.discountPrice
            shopProductArray[index].discount = shopItem.discount
          })
          commit('SET_CONFIRMDATA', confirmData)
          dispatch('SetCommitData', state.toPriceData)
        }
      }
    },
    // 保存地址的信息
    async SetAddressInfo ({state, commit, dispatch}, data) {
      if (data.addressId || data.addressId === 0) {
        let req = {
          productIds: state.productIds,
          streetId: data.streetId
        }
        let res = await fetch('/mobileCart/isAddressSupported.do', req)
        if (parseInt(res.code) === 1 && parseInt(res.data.isAddressSupported) === 0) {
          data.isSupported = false
        }
      }
      commit('SET_ADDRESSINFO', data)

      if (data.type === 1) {  // 如果是从选择地址过来  在数据中修改地址id 保存一下信息
        let changeData = {
          addressId: data.addressId
        }
        dispatch('SetPriceData', changeData)
      }
    },
    // 获得地址的列表 --- > 获得选择的地址
    async getAddressInfoList ({dispatch}) {
      let res = await fetch('/mobileMemberAddress/getAddressById.do', {addressId: parseInt(sessionStorage.getItem('currentAddressId'))})
      if (parseInt(res.code) === 1) {
        let addressInfo = res.data
        let address = {
          addressId: addressInfo.addressId,
          streetId: addressInfo.regionId,
          shipMobile: addressInfo.mobile,
          shipName: addressInfo.name,
          address: addressInfo.province + addressInfo.city + addressInfo.region + addressInfo.address,
          isSupported: true,
          type: 1
        }
        dispatch('SetAddressInfo', address)
      } else {
        toast(res.message)
      }
    },
    // 提交数据的保存
    SetCommitData ({state, commit}, data) {
      let commitData = state.commitData
      commitData = Object.assign(commitData, data)
      commit('SET_COMMITDATA', commitData)
    },
    // 清空数据
    ClearCommitData ({commit}) {
      commit('SET_CONFIRMDATA', {})
      commit('SET_COMMITDATA', {})
      commit('SET_TOPRICEDATA', {})
      commit('SET_PRODUCTIDS', '')
      commit('SET_ADDRESSINFO', {})
    }
  },
  getters: {
    cartList: state => state.cartList,
    cartNum: state => state.cartNum,
    selectCart: state => state.selectCart,
    selectCartAll: state => state.selectCartAll,
    countPrice: state => state.countPrice,
    isAllChecked: state => state.isAllChecked,
    isEditStatus: state => state.isEditStatus,
    toPriceData: state => state.toPriceData,
    confirmData: state => state.confirmData,
    addressInfo: state => state.addressInfo,
    commitData: state => state.commitData
  }
}

export default CartAndPay
