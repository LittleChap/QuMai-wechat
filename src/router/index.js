import Vue from 'vue'
import Router from 'vue-router'

/* 购物车 */
import CartAndPay from 'views/CartAndPay'
import Cart from 'views/CartAndPay/Cart/index.vue'
import ConfirmOrder from 'views/CartAndPay/ConfirmOrder/index.vue'
import Cashier from 'views/CartAndPay/Cashier/index.vue'

// 首页
import Index from '@/views/Index/Index'
// 搜索页
import Search from '@/views/Index/Search'
// 搜索结果页
import SearchResult from '@/views/Index/SearchResult'
// 分类页
import Category from '@/views/Category/Index'
// 二级分类
import SecondLevelPage from '@/views/Index/SecondLevelPage'

import GoodsView from '@/views/GoodsDetail'
import GoodsDetail from '@/views/GoodsDetail/GoodsDetail'
import GraphicTxtDetail from '@/views/GoodsDetail/GraphicTxtDetail'
import EvaluateDetail from '@/views/GoodsDetail/EvaluateDetail'

/* 登录注册 */
import LoginAndSignUp from 'views/LoginAndSignUp'
import Login from 'views/LoginAndSignUp/Login'
import Regester from 'views/LoginAndSignUp/Regester'
import RetrievePwd from 'views/LoginAndSignUp/RetrievePwd'
import ThirdLogin from 'views/LoginAndSignUp/ThirdLogin'
import UserAgreement from 'views/LoginAndSignUp/UserAgreement'

/* 优惠券、领券中心 */
import CouponCenter from 'views/CouponCenter'
import getCouponCenter from 'views/CouponCenter/getCouponCenter'
import myCoupon from 'views/CouponCenter/myCoupon'

/* 个人中心 */
import MyPoint from 'views/UserCenter/MyPoint/index.vue'
import MyFootprint from 'views/UserCenter/MyFootprint/index.vue'
import MyNews from 'views/UserCenter/MyNews/index.vue'
import MyAttention from 'views/UserCenter/MyAttention/index.vue'
import UserCenter from '@/views/UserCenter/Index/index.vue'
import UserCenterView from '@/views/UserCenter/UserCenterView'

// 帮助中心
import HelpCenter from '@/views/HelpCenter/Index'
import ArticleList from '@/views/HelpCenter/ArticleList'
import ArticleDetail from '@/views/HelpCenter/ArticleDetail'
import HelpCenterView from '@/views/HelpCenter/HelpCenterView'

// 客服/反馈
import ServiceAndFeedback from '@/views/ServiceAndFeedback/Index'
import Feedback from '@/views/ServiceAndFeedback/Feedback'
import ServiceAndFeedbackView from '@/views/ServiceAndFeedback/ServiceAndFeedbackView'

// 订单
import Order from '@/views/Order/Index'
import OrderDetail from '@/views/Order/OrderDetail'
import Evaluate from '@/views/Order/Evaluate'
import AppendEvaluate from '@/views/Order/AppendEvaluate'
import ViewEvaluate from '@/views/Order/ViewEvaluate'
import Logistic from '@/views/Order/Logistic'
import OrderView from '@/views/Order/OrderView'

/* 个人资料 */
import UserInfo from '@/views/UserCenter/UserInfo'
import MyLevel from '@/views/UserCenter/UserInfo/MyLevel'
import ResetPassword from '@/views/UserCenter/UserInfo/ResetPassword'
import ResetStepOne from 'views/UserCenter/UserInfo/ResetPassword/StepOne'
import ResetStepTwo from 'views/UserCenter/UserInfo/ResetPassword/StepTwo'
import ResetMobile from '@/views/UserCenter/UserInfo/ResetMobile'
import ResetMobileStepOne from 'views/UserCenter/UserInfo/ResetMobile/StepOne'
import ResetMobileStepTwo from 'views/UserCenter/UserInfo/ResetMobile/StepTwo'

/* 收货地址 */
import AddressCenter from 'views/AddressCenter'
import AddressList from 'views/AddressCenter/AddressList'
import AddAddress from 'views/AddressCenter/AddAddress'
import EditAddress from 'views/AddressCenter/EditAddress'
import SelectAddress from 'views/AddressCenter/SelectAddress'

import ReturnList from 'views/UserCenter/AfterService/ReturnList/index.vue'
import ReturnProcess from 'views/UserCenter/AfterService/ReturnProcess/index.vue'
import ReturnApply from 'views/UserCenter/AfterService/ReturnApply/index.vue'

import WechatJump from 'views/Wechat/WechatLogin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'Index', component: Index, meta: {title: '观前街1号'}},
    {path: '/jump', component: WechatJump, meta: {title: ''}},
    {path: '/searchIndex', name: 'Search', component: Search, meta: {title: '搜索'}},
    {path: '/searchresult', name: 'SearchResult', component: SearchResult, meta: {title: '搜索'}},
    {path: '/category', name: 'Category', component: Category, meta: {title: '分类'}},
    {path: '/SecondLevelPage', name: 'SecondLevelPage', component: SecondLevelPage, meta: {title: '观前街1号'}},
    {
      path: '/goodsDetail/:id',
      component: GoodsView,
      children: [
        {path: '', component: GoodsDetail, meta: {title: '商品详情'}},
        {path: 'evaluateDetail', component: EvaluateDetail, meta: {title: '评论晒单'}},
        {path: 'graphicTxtDetail', component: GraphicTxtDetail, meta: {title: '查看详情'}}
      ]
    },
    {
      path: '/loginAndSignUp',
      component: LoginAndSignUp,
      children: [
        {path: 'login', name: 'login', component: Login, meta: {keepAlive: true, title: ''}},
        {path: 'register', name: 'register', component: Regester, meta: {keepAlive: true, title: ''}},
        {path: 'retrievePwd', name: 'retrievePwd', component: RetrievePwd, meta: {title: ''}},
        {path: 'thirdLogin', component: ThirdLogin, meta: {title: '绑定手机'}},
        {path: 'userAgreement', component: UserAgreement, meta: {title: '用户协议'}}
      ]
    },
    {
      path: '/cartAndPay',
      component: CartAndPay,
      redirect: '/cartAndPay/cart',
      children: [
        {path: 'cart', name: 'cart', component: Cart, meta: {title: '购物车'}},
        {path: 'confirmOrder', name: 'confirmOrder', component: ConfirmOrder, meta: {title: '确认订单'}},
        {path: 'cashier', name: 'cashier', component: Cashier, meta: {title: '收银台'}}
      ]
    },
    {
      path: '/userCenter',
      component: UserCenterView,
      children: [
        {path: '', name: 'UserCenter', component: UserCenter, meta: {title: '个人中心'}},
        {path: 'myPoint', name: 'myPoint', component: MyPoint, meta: {title: '我的积分'}},
        {path: 'myFootprint', name: 'myFootprint', component: MyFootprint, meta: {title: '我的足迹'}},
        {path: 'myNews', name: 'myNews', component: MyNews, meta: {title: '我的消息'}},
        {path: 'myAttention', name: 'myAttention', component: MyAttention, meta: {title: '我的关注'}},
        {path: 'returnList', name: 'returnList', component: ReturnList, meta: {title: '售后服务'}},
        {path: 'returnProcess', name: 'returnProcess', component: ReturnProcess, meta: {title: '售后进度'}},
        {path: 'returnApply', name: 'returnApply', component: ReturnApply, meta: {title: '申请售后'}}
      ]
    },
    {
      path: '/helpCenter',
      component: HelpCenterView,
      children: [
        {path: '', name: 'HelpCenter', component: HelpCenter, meta: {title: '帮助中心'}},
        {path: 'ArticleList', name: 'ArticleList', component: ArticleList, meta: {title: '帮助中心'}},
        {path: 'ArticleDetail', name: 'ArticleDetail', component: ArticleDetail, meta: {title: '帮助中心'}}
      ]
    },
    {
      path: '/ServiceAndFeedback',
      component: ServiceAndFeedbackView,
      children: [
        {path: '', name: 'ServiceAndFeedback', component: ServiceAndFeedback, meta: {title: '客服/反馈'}},
        {path: 'Feedback', name: 'Feedback', component: Feedback, meta: {title: '意见反馈'}}
      ]
    },
    {
      path: '/Order',
      component: OrderView,
      children: [
        {path: 'myOrder', name: 'Order', component: Order, meta: {title: '观前街1号'}},
        {path: 'OrderDetail', name: 'OrderDetail', component: OrderDetail, meta: {title: '订单详情'}},
        {path: 'Evaluate', name: 'Evaluate', component: Evaluate, meta: {title: '评价订单'}},
        {path: 'AppendEvaluate', name: 'AppendEvaluate', component: AppendEvaluate, meta: {title: '追加评价'}},
        {path: 'ViewEvaluate', name: 'ViewEvaluate', component: ViewEvaluate, meta: {title: '查看评价'}},
        {path: 'Logistic', name: 'Logistic', component: Logistic, meta: {title: '查看物流'}}
      ]
    },
    {
      path: '/userInfo',
      component: UserCenterView,
      children: [
        {path: '', name: 'userInfo', component: UserInfo, meta: {title: '个人资料'}},
        {path: '', component: UserInfo, meta: {title: '个人资料'}},
        {path: 'myLevel', component: MyLevel, meta: {title: '我的等级'}},
        {
          path: 'resetPassword',
          component: ResetPassword,
          children: [
            {path: 'stepOne', component: ResetStepOne, meta: {title: '修改密码'}},
            {path: 'stepTwo', component: ResetStepTwo, meta: {title: '修改密码'}}
          ]
        },
        {
          path: 'resetMobile',
          component: ResetMobile,
          children: [
            {path: 'stepOne', component: ResetMobileStepOne, meta: {title: '更换手机号'}},
            {path: 'stepTwo', component: ResetMobileStepTwo, meta: {title: '更换手机号'}}
          ]
        }
      ]
    },
    {
      path: '/addressList',
      component: AddressCenter,
      children: [
        {path: '', component: AddressList, meta: {title: '收货地址'}},
        {path: 'editAddress/:id', component: EditAddress, meta: {title: '收货地址'}},
        {path: 'addAddress', component: AddAddress, meta: {title: '新增收货地址'}},
        {path: 'selectAddress', name: 'selectAddress', component: SelectAddress, meta: {title: '收货地址'}}
      ]
    },
    {
      path: '/getCouponCenter',
      component: CouponCenter,
      children: [
        {path: '', component: getCouponCenter, meta: {title: '领券中心'}},
        {path: 'myCoupon', component: myCoupon, meta: {title: '我的优惠券'}}
      ]
    }
  ]
})
