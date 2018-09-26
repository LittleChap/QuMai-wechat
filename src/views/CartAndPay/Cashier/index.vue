<template>
  <div class="pay-wrap">
    <div class="top">
      <img src="./assets/cashier.png" alt="">
      <p>请于{{lastPayTime}}内付款，超时将自动取消此订单！</p>
    </div>
    <ul class="pay-box">
      <li class="v-list-item">
        <span class="main-title">
          选择支付方式
        </span>
        <span class="price" v-format-price="orderInfo.price"></span>
      </li>
      <li class="v-list-item">
        <div class="left-part">
          <img src="./assets/WeChat@3x.png" alt="">
          <span>微信支付</span>
        </div>
        <i class="icon v-single-select icon-change-highlight"></i>
      </li>
    </ul>
    <button class="v-button pay-btn" @click="toPay">去支付</button>

  </div>


</template>

<script type="text/ecmascript-6">
  import config from '@/utils/config.json'

  export default {
    data () {
      return {
        lastPayTime: '',
        openId: '',
        webChatAppId: config.appId,
        orderInfo: {
          orderSn: this.$route.query.orderSn,
          price: this.$route.query.price,
          goodsId: this.$route.query.goodsId
        },
        payJson: {
          nonceStr: '',
          package: '',
          paySign: '',
          signType: '',
          sn: '',
          timeStamp: ''
        },
        timer: null
      }
    },
    created () {
      if (!this.$route.query.orderSn) {
        this.$toast('无相关支付信息')
        this.$router.go(-1)
        return
      }
      this.getLastPayTime()
    },
    methods: {
      // 获得付款时间
      async getLastPayTime () {
        let response = await this.$post('mobileSetting/getOrderTimerInfo.do')
        let lastTime = response.data.orderWaitPayTimeliness
        this.lastPayTime = this.$moment.duration(lastTime).asMinutes() + '分钟'
        let _this = this
        this.timer = setInterval(function () {
          lastTime = lastTime - 1000
          if (lastTime <= 0) {
            clearInterval(this.timer)
            _this.payTimeOut()
          }
        }, 1000)
      },
      payTimeOut () {
        let _this = this
        this.$confirm({
          title: false,
          content: `很抱歉，您未在${this.lastPayTime}内付款，系统已自动取消此单！`,
          confirmText: '重新下单',
          cancelText: '去首页',
          onConfirm () {
            _this.$toGoods(_this.orderInfo.goodsId)
          },
          onCancel () {
            _this.$router.push('/')
          }
        })
      },
      // 去支付
      toPay () {
        if (this.orderInfo.price <= 0) { // 免支付
          this.toFreePay()
        } else {
          this.toWeChatPay()
        }
      },
      // 免支付
      async toFreePay () {
        let payJson = {
          sn: this.orderInfo.orderSn,
          pluginId: 'freePayPlugin'
        }
        let resData = await this.$post('/mobilePay/pay.do', payJson)
        if (parseInt(resData.code) === 1) {
          // 跳转到全部订单页
          localStorage.setItem('orderStatus', 0)
          this.$router.push('/order/myOrder')
        } else {
          this.$toast(resData.message)
        }
      },
      /* 去支付--微信 */
      async toWeChatPay () {
        let payJson = {
          sn: this.orderInfo.orderSn,
          openId: localStorage.getItem('openId'),
          pluginId: 'wechatWapPlugin'
        }
        let resData = await this.$post('/mobilePay/pay.do', payJson)
        if (parseInt(resData.code) === 1) {
          resData.data.timeStamp = resData.data.timeStamp.toString()
          this.payJson = resData.data
          this.payJson.appId = this.webChatAppId
          this.weChatPay()
        } else {
          this.$toast(resData.message)
        }
      },
      weChatPay () {
        let _this = this
        if (typeof WeixinJSBridge === 'undefined') {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', _this.onBridgeReady(), false)
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', _this.onBridgeReady())
            document.attachEvent('onWeixinJSBridgeReady', _this.onBridgeReady())
          }
        } else {
          _this.onBridgeReady()
        }
      },
      onBridgeReady () {
        let _this = this
        WeixinJSBridge.invoke(  // eslint-disable-line
            'getBrandWCPayRequest', _this.payJson,
            function (res) {
              if (res.err_msg.indexOf('ok') >= 0) {
                // 跳转到全部订单页
                localStorage.setItem('orderStatus', 0)
                _this.$router.push('/order/myOrder')
              } else if (res.err_msg.indexOf('fail') >= 0) {
                _this.$toast(`支付失败：${res.err_msg}`)
              }
            }
        )
      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";
  .pay-wrap {
    .top {
      height: pr(360);
      background: #fff;
      @include blockMargin;
      text-align: center;
      img {
        height: pr(240);
        margin-top: pr(40);
      }
      p {
        line-height: pr(60);
        font-size: $importantFontSize;
        color: $importantInfoAndTitleColor;
      }
    }
    .pay-box {
      width: 100%;
      .main-title {
        color: $supportTextColor;
      }
      .price {
        color: $mainFontColor;
      }
      .v-list-item {
        justify-content: space-between;
        &:nth-last-child(1){
          border-bottom: none;
        }
      }
      .left-part {
        line-height: $defaultHeight;
        img {
          width: pr(45);
          height: pr(45);
          margin-right: pr(20);
          vertical-align: middle;
        }
      }
      .icon {
        margin-top: pr(20);
      }

    }
    .pay-btn {
      margin: pr(60) auto 0;
    }
  }

</style>

