<template>
  <div class="bottom-wrap flexBox">
    <div class="price-box">
      需支付：
      <span class="price-main" v-format-price-num="confirmData.payPrice || 0"></span>
    </div>
    <button class="payButtom v-button" @click="toCommit">提交订单</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'bottom-box',
    computed: {
      confirmData () {
        return this.$store.getters.confirmData
      },
      commitData () {
        return this.$store.getters.commitData
      },
      addressInfo () {
        return this.$store.getters.addressInfo
      }
    },
    methods: {
      async toCommit () {
        if (!this.commitData.addressId && this.commitData.addressId !== 0) {
          this.$toast('请填写收货地址')
          return false
        }
        if (!this.addressInfo.isSupported) {
          this.$toast('该地区不支持发货，请选择其他地区！')
          return false
        }
        if (this.commitData.isInvoice) {
          if (this.commitData.invoiceTitle === '') {
            this.$toast('请输入发票抬头')
            return false
          }
          if (this.commitData.invoiceType && this.commitData.invoiceIdno === '') {
            this.$toast('请输入纳税人识别号')
            return false
          }
        }
        let reqData = Object.assign({}, this.commitData)
        // let reqData = Object.assign({}, this.commitData.shopArray )
        reqData.shopProductArray = JSON.stringify(this.commitData.shopArray)

        delete (reqData.shopArray)
        let res = await this.$post('/mobileOrder/createOrder.do', reqData)
        if (parseInt(res.code) === 1) {
          let goodsId = this.confirmData.shopProductArray[0].productArray[0].goodsId
          const cashierUrl = `${window.location.protocol}//${window.location.host}/cartAndPay/cashier?orderSn=${res.data.sn}&price=${res.data.price}&goodsId=${goodsId}`
          window.location.href = cashierUrl
        } else {
          this.$toast(res.message)
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/commom";

  .bottom-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 499;
    .price-box {
      flex: 1;
      line-height: $headerHeight;
      padding-left: pr(24);
      color: $importantInfoAndTitleColor;
      font-size: $importantFontSize;
    }
    .payButtom {
      flex: 0 0 pr(234);
    }

  }
</style>

