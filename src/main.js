// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {fetch, truePost} from './utils/fetch'
import upload from './utils/upload'
import UploadComponent from '@/components/Upload'
import GoTop from './components/GoTop'
import Cell from './components/Cell'
import PullUp from './components/PullUp'
import NumberInput from './components/NumberInput'
import PhotoViewer from './components/PhotoViewer'
import BottomTab from './components/BottomTab/BottomTab'
import HeaderBar from './components/HeaderBar/index.vue'
import CountDown from './components/CountDown'
import POP from '@/components/POP'
import {goto, log, toMoney, formatPrice, formatPriceNum} from './utils/utils'
import './styles/modules/icon.scss'
import moment from 'moment'
import VueWechatTitle from 'vue-wechat-title'
import wechat from '@/utils/wechat'
import {getUser} from '@/utils/user'
import {
  Swiper,
  ToastPlugin,
  ConfirmPlugin,
  XDialog,
  XTextarea,
  Badge,
  Rater,
  DatetimePlugin,
  Confirm,
  TransferDomDirective as TransferDom
} from 'vux'

// 注册全局的控制台打印函数log
Vue.prototype.$log = window.log = log
// 注册全局跳转方法
Vue.prototype.$goto = goto
// 注册全局 格式化货币（千位符）
Vue.prototype.$tomoney = toMoney
// 注册全局异步请求方法
Vue.prototype.$post = fetch
// 注册全局异步请求方法
Vue.prototype.$truePost = truePost
// 注册全局上传图片方法
Vue.prototype.$upload = upload
// 注册全局 moment
Vue.prototype.$moment = moment
// 像素转rem的系数
Vue.prototype.$pxrem = 0.02133334
// 全局注册wechat
Vue.prototype.$wechat = wechat
Vue.prototype.$getUser = getUser

// 注册全局的 底部菜单组件
Vue.component('BottomTab', BottomTab)
// 注册全局的 回到顶部组件
Vue.component('GoTop', GoTop)
// 注册全局的 单元格Cell组件
Vue.component('Cell', Cell)
// 注册全局的 上传图片组件
Vue.component('upload', UploadComponent)
// 注册全局的 上拉加载组件
Vue.component('PullUp', PullUp)
// 注册全局的 数字输入框组件
Vue.component('NumberInput', NumberInput)
// 注册全局的 图片浏览器组件
Vue.component('PhotoViewer', PhotoViewer)
// 注册全局的 头部条
Vue.component('HeaderBar', HeaderBar)
// 注册全局的 倒计时组件
Vue.component('CountDown', CountDown)
// 注册全局的 弹出窗口组件
Vue.component('POP', POP)

//  以下是vux的UI组件注册
Vue.component('Swiper', Swiper)
Vue.component('Badge', Badge)
Vue.component('Confirm', Confirm)
Vue.component('Rater', Rater)
Vue.component('XTextarea', XTextarea)
Vue.component('XDialog', XDialog)
//  以下是vux的JS组件注册
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(DatetimePlugin)

// 全局的设置title组件
Vue.use(VueWechatTitle)

Vue.prototype.$toast = function (text) {
  this.$vux.toast.show({
    showPositionValue: false,
    text: text,
    type: 'text',
    time: 3000,
    width: 'auto',
    position: 'middle'
  })
}

Vue.prototype.$toGoods = function (id) {
  this.$router.push('/goodsDetail/' + id)
}

Vue.prototype.$datetime = function (datetimeObj) {
  this.$vux.datetime.show(datetimeObj)
}

Vue.prototype.$confirm = function (confirmObj) {
  this.$vux.confirm.show(confirmObj)
}

export function toast (text) {
  Vue.$vux.toast.show({
    showPositionValue: false,
    text: text,
    type: 'text',
    time: 3000,
    width: 'auto',
    position: 'middle'
  })
}

Vue.config.productionTip = true

Vue.directive('format-price', function (el, binding) {
  el.innerHTML = formatPrice(binding.value)
})
Vue.directive('format-price-num', function (el, binding) {
  el.innerHTML = formatPriceNum(binding.value)
})
Vue.directive('TransferDom', TransferDom)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
