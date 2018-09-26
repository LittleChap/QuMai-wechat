/**
 * Created by yangzhanpeng on 2017/12/9.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

/**
 * 模块store引入
 */
import loginAndSignUp from 'views/LoginAndSignUp/store'
import GoodsDetail from 'views/GoodsDetail/store'
import CartAndPay from 'views/CartAndPay/store'
import Order from 'views/Order/store'
import UserCenter from 'views/UserCenter/store'
import Index from 'views/Index/store'
import Category from 'views/Category/store'
import AddressCenter from 'views/AddressCenter/store'
import CouponCenter from 'views/CouponCenter/store'
import mainStore from 'views/mainStore.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    mainStore,
    loginAndSignUp,
    GoodsDetail,
    CartAndPay,
    Order,
    UserCenter,
    CouponCenter,
    Index,
    Category,
    AddressCenter
  },
  getters: getters
})

export default store
