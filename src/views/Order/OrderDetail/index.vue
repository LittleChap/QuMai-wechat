<!--我的订单详情-->
<template>
  <div>
    <div class="header">{{transformOrderStatus(item.orderStatus)}}</div>
    <div class="address-wrap">
      <div class="address-box has-address">
        <p class="address-person"><span>{{item.shipName}}</span><span>{{item.shipMobile}}</span></p>
        <p class="address-detail">
          <i class="icon-localize flexBox center"></i>
          <span>{{item.shipAddress}}</span>
        </p>
      </div>
    </div>
    <!--店铺和商品列表 开始-->
    <div class="mb10">
      <div class="shopTitle bgw">
        <div class="c333">{{item.shopName}}</div>
        <div class="red" @click="showService">联系客服</div>
      </div>

      <div class="productItem"
           v-for="i, idx in item.orderItemArray"
           :key="idx"
           @click="$goto('/goodsDetail/'+i.goodsId)"
           :class="{bdb:idx!=item.orderItemArray.length-1}">
        <div class="dsf">
          <img :src="i.goodsImage" alt="" class="img">
          <div class="content w100">
            <div class="itemName">
              <!--<span class="label">标签</span>-->
              {{i.goodsName}}
            </div>
            <div class="dsf jcb mtb10">
              <div>
                <span class="c333 mr20" v-format-price="i.price"></span>
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
          <div class="btn" v-if="i.returnButtonType==2" @click.stop="viewServiceDetail(i)">
            {{i.returnOrderItemStatusText}}
          </div>
        </div>
      </div>
      <div class="bgw plr24">
        <div class="countWrap">
          <div class="tal">
            <div>商品净价：</div>
            <div>运费：</div>
            <div v-if="item.couponPrice">优惠券：</div>
            <div v-if="item.discountPrice">会员折扣：</div>
          </div>
          <div>
            <div>￥{{$tomoney(item.goodsPrice)}}</div>
            <div>￥{{$tomoney(item.shippingPrice)}}</div>
            <div v-if="item.couponPrice">-￥{{$tomoney(item.couponPrice)}}</div>
            <div v-if="item.discountPrice">-￥{{$tomoney(item.discountPrice)}}</div>
          </div>
        </div>
        <div class="lh88 tar f24">
          实付：
          <span class="red f20">￥</span>
          <span class="red f32">{{$tomoney(item.payPrice)}}</span>
        </div>
      </div>

      <div class="bgw plr24 mt10 bdb">
        <div class="countWrap fdc ais">
          <div>订单编号：{{item.orderSn || '暂无'}}</div>
          <div>下单时间：{{item.createTime || '暂无'}}</div>
          <div>发货时间：{{item.shipTime || '暂无'}}</div>
          <div>成交时间：{{item.payTime || '暂无'}}</div>
        </div>
        <!--<div class="lh88 f28">发票：{{item.isInvoice?'无':(item.invoiceType?'个人':'公司')}}</div>-->
      </div>
      <div class="lh88 bgw plr24 f28 bdb" v-if="item.orderStatus > 0 && item.orderStatus != 6">支付方式：微信</div>
      <div class="bgw p24 f28 lh40">发票：{{getInvoiceInfo(item)}}</div>

      <div class="bottomPanel">
        <div class="red f28 lh98 fs0" @click="viewLogistic(item)" v-if="item.orderStatus>2">查看物流</div>
        <div class="orderFootWrap">
          <div class="btn" v-if="(item.orderStatus==4 && item.isReturning!=1) || item.orderStatus==6" @click.stop="deleteOrder(item)">删除订单</div>
          <div class="btn" v-if="item.orderStatus==0" @click="cancelOrder(item)">取消订单</div>
          <div class="btn" v-if="item.orderStatus==3 && item.isReturning!=1" @click.stop="confirmReceive(item)">确认收货</div>
          <div class="btn" v-if="item.orderStatus==4 && item.canEvaluate==1" @click.stop="gotoEvaluate(item)">待评价</div>
          <div class="btn" v-if="item.canEvaluate==2" @click.stop="gotoAppendEvaluate(item)">追加评价</div>
          <div class="btn" v-if="item.orderStatus==5 && item.canEvaluate!=2" @click.stop="gotoViewEvaluate(item)">查看评价</div>
          <div class="btn btnRed" v-if="item.orderStatus==0 && item.waitPayTimeliness>1000 " @click.stop="gotoCashier(item)">立即付款 <CountDown v-model="item.waitPayTimeliness"></CountDown></div>
        </div>
      </div>
      <div class="w100 h100r"></div>

    </div>
    <!--店铺和商品列表 结束-->

    <GoTop/>
    <!--申请售后弹出 开始-->
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
                <NumberInput v-model="num" :min="1" :max="currentItem.num" class="inputBox"/>
              </p>
            </div>
          </div>
          <button class="v-button" @click="confirmApplyService">
            申请售后
          </button>
        </div>
      </popup>
      <!--<Confirm v-model="showConfirm" @on-cancel="cancelApplyService" @on-confirm="confirmApplyService"-->
               <!--confirm-text="申请售后">-->
        <!--<div class="dsf">-->
          <!--<img :src="currentItem.goodsImage" alt="" class="confirmItemImage">-->
          <!--<div>-->
            <!--<div class="lh60">{{currentItem.goodsName}}</div>-->
            <!--<div class="dsf aic mt15">-->
              <!--数量：-->
              <!--<NumberInput v-model="num" class="w230r h40r"/>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</Confirm>-->
      <x-dialog v-model="showQrcodeDialog">
        <div class="qrcodeImg"><img :src="qrcodeUrl" style="max-width:100%"></div>
        <div @click="showQrcodeDialog=false" class="closeQrcode">关闭</div>
      </x-dialog>
    </div>
    <!--申请售后弹出 结束-->
  </div>
</template>

<script>
  import {Popup} from 'vux'
  export default {
    components: { Popup },
    data () {
      return {
        num: 1,               // 申请售后的商品数量
        // 当前订单
        item: {
          orderItemArray: []
        },
        currentItem: {},      // 要拿去申请售后的商品
        showConfirm: false,   // 是否打开申请售后确认弹窗
        orderSn: '',          // 订单号
        qrcodeUrl: '',        // 在线客服 二维码地址
        showServiceDialog: false,       // 是否显示客服对话框
        showQrcodeDialog: false,  // 是否显示二维码对话框
        // 站点信息（包含电话客服的数据）
        stationInfo: {
          onlineServiceWorkingTime: '获取中...',
          customerServiceWorkingTime: '获取中...'
        }

      }
    },
    methods: {
      // 计算发票的显示内容
      getInvoiceInfo (item) {
        if (item.isInvoice == 0) {
          return '无'
        }
        if (item.invoiceType == 0) {
          return item.invoiceTitle
        } else {
          return item.invoiceTitle + ' ' + item.invoiceIdno
        }
      },
      // 去收银台
      gotoCashier (item) {
        // console.log(item)
        let goodsId = 0
        if (item.itemArray && item.itemArray[0]) {
          goodsId = item.itemArray[0].goodsId || 0
        }
        // let url = `/cartAndPay/cashier?orderSn=${item.orderSn}&price=${item.payPrice}&goodsId=${goodsId}`
        // this.$router.push(url)

        let url = `${window.location.protocol}//${window.location.host}/cartAndPay/cashier?orderSn=${item.orderSn}&price=${item.payPrice}&goodsId=${goodsId}`
        window.location.href = url
      },
      // 申请售后
      applyServive (item) {
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
      // 获取订单的状态
      transformOrderStatus (status) {
        switch (status) {
          case 0:
            return '待付款'
          case 1:
            return '待付尾款'
          case 2:
            return '待发货'
          case 3:
            return '待收货'
          case 4:
            return '待评价'
          case 5:
            return '已完成'
          case 6:
            return '已关闭'
          default:
            return ''
        }
      },
      // 查看售后详情
      viewServiceDetail (item) {
        let url = '/userCenter/returnProcess?returnOrderItemId=' + item.returnOrderItemId
        this.$router.push(url)
      },
      // 查看物流
      viewLogistic (item) {
        let url = '/order/logistic?logisticIDs=' + JSON.stringify(item.logistics)
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
              that.$router.push('/order/myOrder')
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
              that.$router.push('/order/myOrder')
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
              that.$router.push('/order/myOrder')
            } else {
              that.$toast(res.message)
            }
            console.log('确认收货', res)
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
      // 获取订单详情
      async getOrderDetail () {
        let url = '/mobileOrder/detailOrder.do'
        let body = {orderSn: this.orderSn}
        let res = await this.$post(url, body)
        if (res.code == 1) {
          this.item = res.data
        } else {
          this.$toast(res.message)
        }
        // console.log('获取订单详情', res)
      },
      // 获取站点信息（包含电话客服）数据
      async getStationInfo () {
        let url = '/mobileSetting/getSiteSettingInfo.do'
        let res = await this.$post(url, {})
        if (res.code == 1) {
          this.stationInfo = res.data
        } else {
          this.$toast(res.message)
        }
        // console.log('电话客服的数据', res)
      },
      // 获取在线客服二维码数据
      async getQrcode () {
        let url = '/mobileWechat/getPublishQrcode.do'
        let res = await this.$post(url, {})
        if (res.code == 1) {
          this.qrcodeUrl = res.data.url
        } else {
          this.$toast(res.message)
        }
        // console.log('在线客服的数据', res)
      },
      // 显示客服弹窗
      async showService () {
        let msg = {
          title: '联系客服',
          content: `您好，我们的客服热线为${this.stationInfo.customerServicePhoneNumber}。您可以拨打客服热线或者关注公众号“${this.stationInfo.shopName}”与客服进行相关咨询。`,
          confirmText: '公众号二维码',
          cancelText: '拨打',
          onCancel: () => {
            window.location.href = 'tel://' + this.stationInfo.customerServicePhoneNumber
          },
          onConfirm: () => {
            this.showQrcodeDialog = true
          }
        }
        this.$confirm(msg)
      }
    },
    created () {
      this.orderSn = this.$route.query.orderSn || ''
      this.getOrderDetail()
      this.getStationInfo()
      this.getQrcode()
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  @import '~@/styles/noahcommon.scss';

  .header {
    width: 100%;
    height: pr(98);
    background: url('./img/pic_order_background@3x.png');
    padding-left: pr(24);
    font-size: $headerTextFontSize;
    color: #fff;
    line-height: pr(98);
    background-size: cover;
    margin-bottom: pr(10);
  }

  .address-wrap {
    background: $blockDefaultColor;
    border-bottom: 1px solid $lineColor;
    margin-bottom: pr(10);
    .tip {
      height: pr(60);
      line-height: pr(60);
      padding: 0 pr(24);
      background: $tooltipsBackgroundColor;
      font-size: $smallFontSize;
      color: $mainFontColor;
    }
    .address-box {
      @include wrapPadding;
      padding-top: pr(30);
      padding-bottom: pr(30);
      .address-person {
        padding-left: pr(64);
        margin-bottom: pr(26);
        line-height: pr(32);
        font-size: $titleFontSize;
        color: $importantInfoAndTitleColor;
        span {
          margin-right: pr(54);
        }
      }
      .address-detail {
        display: flex;
        font-size: $normalFontSize;
        color: $paragraphColor;
        line-height: pr(30);
        i {
          flex: 0 0 pr(60);
          /*width: pr(60);*/
          /*height: 100%;*/
          /*display: inline-block;*/
          font-size: pr(30);
          color: $importantInfoAndTitleColor;
          vertical-align: top;
        }
        div {
          flex: 1;
          /*width: pr(630);*/
        }
      }
      .address-add {
        display: flex;
        justify-content: space-between;
        line-height: pr(38);
        font-size: $titleFontSize;
        color: $importantInfoAndTitleColor;
        .toAdd {
          color: $mainFontColor;
          i {
            margin-left: pr(20);
            color: $secondaryTextColor;
            font-size: $importantFontSize;
          }

        }
      }
      &.has-address {
        background: url("./img/pic_add@3x.png") repeat-x left bottom;
        background-size: auto pr(3);
      }
    }
  }

  .shopTitle {
    display: flex;
    justify-content: space-between;
    line-height: pr(88);
    font-size: $importantFontSize;
    padding: 0 pr(24);
  }

  .ff24 {
    font-size: $normalFontSize !important;
  }

  .ff32 {
    font-size: $titleFontSize;
  }

  .w230r {
    width: pr(230) !important;
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

  .btnRed {
    color: $buttonColor !important;
    border: 1px solid $buttonColor !important;
  }

  .productItem {
    padding: pr(20) pr(24) pr(10) pr(24);
    background: #fafafa;
    .img {
      width: pr(190);
      height: pr(190);
      border-radius: pr(8);
      border: 1px solid $lineColor;
      margin-right: pr(20);
      flex-shrink: 0;
    }
    .content {
      font-size: $importantFontSize;
      color: $secondaryTextColor;
    }
    .label {
      line-height: pr(38);
      border: 1px solid $mainFontColor;
      border-radius: pr(4);
      color: $mainFontColor;
      padding: 0 pr(10);
      margin-top: pr(15);
      display: inline-block;
    }
    .itemName {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: pr(46);
      color: $importantInfoAndTitleColor;
    }
    .modifyPrice {
      text-decoration: line-through;
    }
  }

  .countWrap {
    width: 100%;
    line-height: pr(60);
    text-align: right;
    padding: pr(12) 0;
    box-sizing: border-box;
    font-size: $normalFontSize;
    color: #333;
    margin-top: pr(10);
    display: flex;
    justify-content: space-between;
  }

  .orderFootWrap {
    height: pr(98);
    width: 100%;
    flex-shrink: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .serviceStatus {
    margin-top: pr(10);
    font-size: $normalFontSize;
    color: $importantInfoAndTitleColor;
    line-height: pr(60);
    padding: 0 pr(30);
  }

  .confirmItemImage {
    width: pr(150);
    height: pr(150);
    border: none;
    margin-right: pr(20);
  }

  .qrcodeImg {
    max-width: pr(600);
    overflow: hidden;
  }

  .closeQrcode {
    line-height: pr(88);
    font-size: $importantFontSize;
    color: $paragraphColor;
    background: $pageDefaultColor;
    width: 100%;
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
  .bottomPanel{
    /*dsf bgw mt10 plr24 aic jcb*/
    display: flex;
    background: #fff;
    padding: 0 pr(24);
    align-items: center;
    justify-content: space-between;
    position: fixed;
    left:0;
    bottom: 0;
    width: 100vw;
    border-top:1px solid $lineColor;
  }
</style>
