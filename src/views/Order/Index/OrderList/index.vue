<!---订单列表-->
<template>
  <div>
    <div class="v-empty-status" v-if="!orderList.length">
      <img src="~@/assets/order-empty.png" alt="">
      <p>您还没有相关订单！</p>
      <p>去首页看看吧！</p>
      <router-link class="v-button empty-button" to="/">去首页</router-link>
    </div>

    <div v-else  class="orderListWrap">
      <PullUp :cb="loadMoreOrder" :limited="orderLimit" id="orderListPullup">
      <div class="bgw mb10" v-for="item, index in orderList" :key="index">
        <div class="shopTitle">
          <div class="c333">{{item.shopName}}</div>
          <div class="red">{{transformOrderStatus(item.orderStatus)}}</div>
        </div>

        <div class="productItem" v-for="i, idx in item.itemArray" :key="idx" :class="{bdb:idx!=item.itemArray.length-1}">
          <div class="dsf" @click="gotoOrderDetail(item)">
            <img :src="i.goodsImage" alt="" class="img" >
            <div class="content w100">
              <div class="itemName">
                <!--<span class="label">标签</span>-->
                {{i.goodsName}}
              </div>
              <div class="dsf jcb mtb10">
                <div>
                  <span class="c333 mr20"  v-format-price="i.price"></span>
                  <!--<span class="modifyPrice" v-if="i.isModifyPrice" v-format-price="i.price"></span>-->
                </div>
                <div>×{{i.num}}</div>
              </div>
              <div class="grey ff24">{{i.specName}}</div>
              <span class="label" v-if="i.isModifyPrice">价格已修改</span>
            </div>
          </div>
          <div class="w100 dsf jce" v-if="i.returnButtonType!=0">
            <div class="btn" v-if="i.returnButtonType==1" @click.stop="applyServive(i)">申请售后</div>
            <div class="btn" v-if="i.returnButtonType==2" @click.stop="viewServiceDetail(i)">{{i.returnOrderItemStatusText}}</div>
          </div>
        </div>
        <div class="countWrap">共{{item.itemArray.length}}件商品 实付: ￥ <span class="ff32">{{$tomoney(item.price)}}</span> (含运费：￥{{$tomoney(item.shipPrice)}})</div>
        <div class="orderFootWrap">
          <div class="btn" v-if="(item.orderStatus==4 && item.isReturning!=1) || item.orderStatus==6" @click.stop="deleteOrder(item)">删除订单</div>
          <div class="btn" v-if="item.orderStatus==0" @click="cancelOrder(item)">取消订单</div>
          <div class="btn" v-if="item.orderStatus==3 && item.isReturning!=1" @click.stop="confirmReceive(item)">确认收货</div>
          <div class="btn" v-if="item.orderStatus==4 && item.canEvaluate==1" @click.stop="gotoEvaluate(item)">待评价</div>
          <div class="btn" v-if="item.canEvaluate==2" @click.stop="gotoAppendEvaluate(item)">追加评价</div>
          <div class="btn" v-if="item.orderStatus==5" @click.stop="gotoViewEvaluate(item)">查看评价</div>
          <div class="btn btnRed" v-if="item.orderStatus==0 && item.waitPayTimeliness>1000 " @click.stop="gotoCashier(item)">立即付款 <CountDown v-model="item.waitPayTimeliness"></CountDown></div>
        </div>
      </div>



      <div v-transfer-dom>
        <popup v-model="showConfirm" class="applyDialog">
          <div class="applyWrap">
            <div class="top">
              <i class="icon-login-del" @click="cancelApplyService"></i>
            </div>
            <div class="goodsInfo flexBox">
              <img :src="currentItem.goodsImage" alt="">
              <div class="rightPart">
                <h3>{{currentItem.goodsName}}</h3>
                <p class="flexBox">
                  数量：
                  <NumberInput v-model="num" :min="1" :max="currentItem.num"  class="inputBox"/>
                </p>
              </div>
            </div>
            <button class="v-button" @click="confirmApplyService">
              申请售后
            </button>
          </div>
        </popup>
        <!--<Confirm v-model="showConfirm" @on-cancel="cancelApplyService" @on-confirm="confirmApplyService" confirm-text="申请售后">
          <div class="dsf">
            <img :src="currentItem.goodsImage" alt="" class="confirmItemImage">
            <div>
              <div class="lh60">{{currentItem.goodsName}}</div>
              <div class="dsf aic mt15">
                数量：<NumberInput v-model="num" class="w230r h40r" /></div>
            </div>
          </div>
        </Confirm>-->
      </div>
      </PullUp>
      <GoTop element="#orderListPullup" v-if="orderList.length" />
    </div>
  </div>

</template>

<script>
  import {Popup, TransferDom} from 'vux'
  export default {
    components: { Popup, TransferDom },
    data () {
      return {
        num: 1,             // 申请售后的商品数量
        currentItem: {},    // 要拿去申请售后的商品
        showConfirm: false  // 是否打开申请售后确认弹窗
      }
    },
    computed: {
      orderList () {
        return this.$store.getters.GET_OrderList
      },
      orderLimit () {
        return !this.$store.getters.GET_HasMoreOrder
      }
    },
    methods: {
      // 申请售后
      applyServive (item) {
        this.num = 1
        this.showConfirm = true
        this.currentItem = item
      },
      // 取消 申请收货
      cancelApplyService () {
        this.num = 1
        this.showConfirm = false
        this.currentItem = {}
      },
      // 确认 申请售后
      confirmApplyService () {
        let url = `/userCenter/returnApply?orderItemId=${this.currentItem.orderItemId}&applyNum=${this.num}`
        this.$router.push(url)
      },
      // 去收银台
      gotoCashier (item) {
        // console.log(item)
        let goodsId = 0
        if (item.itemArray && item.itemArray[0]) {
          goodsId = item.itemArray[0].goodsId || 0
        }
        let url = `${window.location.protocol}//${window.location.host}/cartAndPay/cashier?orderSn=${item.orderSn}&price=${item.price}&goodsId=${goodsId}`
        window.location.href = url
      },
      // 获取订单的状态
      transformOrderStatus (status) {
        switch (status) {
          case 0:return '待买家付款'
          case 1:return '待付尾款'
          case 2:return '待卖家发货'
          case 3:return '卖家已发货'
          case 4:return '买家已收货'
          case 5:return '已完成'
          case 6:return '已关闭'
          default: return ''
        }
      },
      // 查看售后详情
      viewServiceDetail (item) {
        let url = '/userCenter/returnProcess?returnOrderItemId=' + item.returnOrderItemId
        this.$router.push(url)
      },
      // 取消订单
      cancelOrder (item) {
        let that = this
        this.$confirm({
          title: '是否取消？',
          async onConfirm () {
            let url = '/mobileOrder/cancelOrder.do'
            let body = {orderSn: item.orderSn}
            // let body = {orderSn: ''}
            let res = await that.$post(url, body)
            if (res.code == 1) {
              that.$toast('取消成功！')
              // that.$store.dispatch('getOrderList')
              that.$store.commit('DELETE_CurrentOrder', item)
            } else {
              that.$toast(res.message)
            }
            // console.log('取消订单', res)
          }
        })
      },
      // 删除订单
      deleteOrder (item) {
        let that = this
        this.$confirm({
          title: '是否删除该订单？',
          async onConfirm () {
            let url = '/mobileOrder/deleteOrder.do'
            let body = {orderSn: item.orderSn}
            let res = await that.$post(url, body)
            if (res.code == 1) {
              that.$toast('删除成功！')
              that.$store.commit('DELETE_CurrentOrder', item)
              // that.$store.dispatch('getOrderList')
            } else {
              that.$toast(res.message)
            }
            console.log('删除订单', res)
          }
        })
      },
      // 确认收货
      confirmReceive (item) {
        let that = this
        this.$confirm({
          title: '是否确认收货？',
          async onConfirm () {
            let url = '/mobileOrder/confirmReceive.do'
            let body = {orderSn: item.orderSn}
            let res = await that.$post(url, body)
            if (res.code == 1) {
              that.$toast('确认收货成功！')
              // that.$store.dispatch('getOrderList')
              localStorage.setItem('orderStatus', 4)
              that.$store.dispatch('getOrderList')
              // that.$store.commit('DELETE_CurrentOrder', item)
            } else {
              that.$toast(res.message)
            }
            // console.log('确认收货', res)
          }
        })
      },
      // 去 评价 订单
      gotoEvaluate (item) {
        let url = `/order/evaluate?orderSn=${item.orderSn}`
        this.$router.push(url)
      },
      // 去 追评 订单
      gotoAppendEvaluate (item) {
        let url = `/order/appendEvaluate?orderSn=${item.orderSn}`
        this.$router.push(url)
      },
      // 查看评价详情
      gotoViewEvaluate (item) {
        // console.log(item)
        let url = `/order/ViewEvaluate?orderSn=${item.orderSn}`
        this.$router.push(url)
      },
      // 去 订单详情页
      gotoOrderDetail (item) {
        let url = `/order/orderDetail?orderSn=${item.orderSn}`
        this.$router.push(url)
      },
      // 上拉加载更多订单
      loadMoreOrder (done) {
        // let args = {orderStatus: -1, done: done}
        // setTimeout(() => { this.$store.dispatch('getOrderList', args) }, 3000)
        this.$store.dispatch('getOrderList', done)
      }
    },
    created () {},
    mounted () {}
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  @import '~@/styles/noahcommon.scss';
  .shopTitle{
    display: flex;
    justify-content: space-between;
    line-height: pr(88);
    font-size: $importantFontSize;
    padding: 0 pr(24);
  }
  .ff24{font-size: $normalFontSize!important;}
  .ff32{font-size: $titleFontSize;}
  .w230r{width: pr(230)!important;}
  .orderListWrap{
    width: 100%;
    height: calc100vh(55);
  }
  .btn{
    font-size: $normalFontSize;
    color:$importantInfoAndTitleColor;
    border-radius: pr(30);
    line-height: pr(58);
    border: 1px solid $supportTextColor;
    padding: 0 pr(30);
    background: #fff;
    margin: pr(15) 0 pr(15) pr(20);
  }
  .btnRed{
    color:$buttonColor!important;
    border: 1px solid $buttonColor!important;
  }
  .productItem{
    padding: pr(20) pr(24) pr(10) pr(24);
    background: #fafafa;
    .img{
      width: pr(190);
      height: pr(190);
      border-radius: pr(8);
      border: 1px solid $lineColor;
      margin-right: pr(20);
      flex-shrink: 0;
    }
    .content{
      font-size: $importantFontSize;
      color:$secondaryTextColor;
    }
    .label{
      line-height: pr(38);
      border:1px solid $mainFontColor;
      border-radius: pr(4);
      color:$mainFontColor;
      padding: 0 pr(10);
      margin-top: pr(15);
      display:inline-block;
    }
    .itemName{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: pr(46);
      color: $importantInfoAndTitleColor;
    }
    .modifyPrice{
      text-decoration: line-through;
    }
  }
  .countWrap{
    width: 100%;
    height: pr(88);
    line-height: pr(87);
    background: #fff;
    border-bottom: 1px solid $lineColor;
    text-align: right;
    padding: 0 pr(24);
    box-sizing: border-box;
    font-size: $normalFontSize;
    color:#333;
  }
  .orderFootWrap{
    width: 100%;
    background: #fff;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    padding-right:pr(24);
  }
  .serviceStatus{
    margin-top: pr(10);
    font-size: $normalFontSize;
    color:$importantInfoAndTitleColor;
    line-height: pr(60);
    padding: 0 pr(30);
  }
  .confirmItemImage{
    width: pr(150);
    height: pr(150);
    border: none;
    margin-right: pr(20);
  }
  .applyDialog {
    z-index: 1000;
    .top {
      height: pr(60);
      text-align: right;
      font-size: pr(60);
      color: $paragraphColor;
    }
    .goodsInfo {
      @include wrapMargin;
      padding-bottom: pr(40);
      border-bottom: 1px solid $lineColor;
      img {
        width: pr(150);
        height: pr(150);
        border-radius: pr(4);
        border: 1px solid $lineColor;
      }
      .rightPart {
        flex: 1;
        height: pr(150);
        padding-left: pr(20);
        h3 {
          width: 100%;
          height: pr(80);
          line-height: pr(40);
          font-size: $importantFontSize;
          overflow: hidden;
          white-space: normal;
          text-overflow: ellipsis;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        p {
          font-size: $importantFontSize;
          line-height: pr(58);
          margin-top: pr(6);
          .inputBox{
            width: pr(300);
          }
        }
      }
    }
    .v-button {
      width: 100%;
      border-radius: 0;
    }
  }

</style>
