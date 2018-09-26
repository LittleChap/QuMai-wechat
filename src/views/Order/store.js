import {fetch} from '@/utils/fetch'
import {toast} from '@/main'

const Order = {
  state: {
    orderParam: {
      orderStatus: 0,
      currentPage: 1,
      showCount: 10
    },
    orderHasMore: true,
    orderList: []
  },
  mutations: {
    // 设置订单列表数据
    SET_OrderList (state, orderList) {
      state.orderList = orderList
    },
    // 设置是否还有未加载的订单数据
    SET_OrderHasMore (state, flag) {
      state.orderHasMore = flag
    },
    // 订单类型切换的时候 重置请求参数
    RESET_OrderParam (state, orderStatus) {
      state.orderParam = {
        orderStatus: orderStatus,
        currentPage: 1,
        showCount: 10
      }
      state.orderList = []
      state.orderHasMore = true
    },
    // 从orderList中删除指定订单
    DELETE_CurrentOrder (state, item) {
      for (let i in state.orderList) {
        if (state.orderList[i].orderSn == item.orderSn) {
          state.orderList.splice(i, 1)
          return
        }
      }
    },
    // 追加订单数据到原有的订单列表里面
    APPEND_OrderList (state, data) {
      state.orderList = state.orderList.concat(data.orderArray)
      state.orderParam.totalResult = data.totalResult
      state.orderParam.currentPage++
      // 判断是否还有待加载的数据
      if (state.orderParam.totalResult < (state.orderParam.currentPage - 1) * state.orderParam.showCount && state.orderParam.currentPage > 2) {
        state.orderHasMore = false
        // toast('加载完毕')
      }
    }
  },
  actions: {
    async getOrderList (store, done = null) {
      let orderStatus = localStorage.getItem('orderStatus')
      // 判断是否是加载更多
      if (orderStatus != store.state.orderParam.orderStatus) {
        store.commit('RESET_OrderParam', orderStatus)
      }
      // 判断是否还有待加载的数据
      let ot = store.state.orderParam
      if (ot.totalResult < (ot.currentPage - 1) * ot.showCount) {
        // toast('没有更多了')
        store.commit('SET_OrderHasMore', false)
        return
      }
      let url = '/mobileOrder/listOrder.do'
      let body = store.state.orderParam
      let res = await fetch(url, body)
      if (res.code == 1) {
        store.commit('APPEND_OrderList', res.data)
        if (done) { done() }
      } else {
        toast(res.message)
      }
    }
  },
  getters: {
    GET_OrderList (state) {
      return state.orderList
    },
    GET_HasMoreOrder (state) {
      return state.orderHasMore
    },
    GET_OrderStatus (state) {
      return state.orderParam.orderStatus
    }
  }
}

export default Order
