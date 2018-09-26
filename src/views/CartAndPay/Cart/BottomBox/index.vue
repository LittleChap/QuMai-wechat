<template>
  <div class="price-wrap flexBox bottom-wrap">
    <div class="select-all">
      <i class="v-single-select"
         :class="{'icon-change-highlight': isAllChecked, 'icon-change-disable': !isAllChecked }"
         @click="select"></i>
      <span>全选</span>
    </div>
    <div class="price-right flexBox">
      <div class="price-box" v-show="!isEditStatus">
        <p class="totalPrice">合计：<span class="price-main"
                                       v-format-price-num="priceData.pricePay"></span></p>
        <p class="smallPrice">
          总额：<span v-format-price="priceData.priceTotal"></span>
          优惠：<span v-format-price="priceData.priceDiscount"></span>
        </p>
      </div>
      <button v-if="isEditStatus" class="payButtom toDelete v-button" @click="toDelete">删除</button>
      <button v-else class="payButtom v-button" @click="toCommit">立即结算 <span v-if="selectCart.length">({{selectCart.length}})</span>
      </button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    computed: {
      priceData () {  // 价格的数据
        return this.$store.getters.countPrice
      },
      isAllChecked () {  // 是否全选
        return this.$store.getters.isAllChecked
      },
      isEditStatus () {  // 是否编辑状态
        return this.$store.getters.isEditStatus
      },
      selectCart () {   // 获得选中的可下单的商品
        return this.$store.getters.selectCart
      },
      selectCartAll () { // 获得所有选中的
        return this.$store.getters.selectCartAll
      }
    },
    methods: {
      // 选中店铺
      select () {
//        this.isAllChecked = !this.isAllChecked
        this.$store.dispatch('SetSelectCart', {
          shopIndex: -1,
          productIndex: -1,
          checked: !this.isAllChecked
        })
      },
      // 删除
      toDelete () {
        if (!this.selectCartAll.length) {
          this.$toast('请选择商品')
          return false
        }
        let _this = this
        this.$confirm({
          title: '提示',
          content: `确认要删除这 ${this.selectCartAll.length} 种商品吗？`,
          confirmText: '我再想想',
          cancelText: '狠心删除',
          onConfirm () {
            console.log('我再想想')
          },
          async onCancel () {
            // 删除
            await _this.$store.dispatch('SetDelete')
          }
        })
      },
      // 立即结算
      async toCommit () {
        if (!this.selectCartAll.length) {
          this.$toast('请选择商品')
          return false
        }
        if (!this.selectCart.length) {
          this.$toast('所选商品库存不足，无法结算')
          return false
        }
        // 结算
        let cartIdArray = []
        for (let i = 0; i < this.selectCart.length; i++) {
          cartIdArray.push({
            cartId: this.selectCart[i].cartId
          })
        }
        sessionStorage.setItem('payJson', JSON.stringify(cartIdArray))
        let response = await this.$post('/mobileCart/buyNow.do', {cartIdArray: JSON.stringify(cartIdArray)})
        if (parseInt(response.code) === 1) {
          this.$router.push('/cartAndPay/confirmOrder')
        } else {
          this.$toast(response.message)
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/commom";
  .price-wrap {
    position: fixed;
    bottom: pr(98);
    left: 0;
    z-index: 498;
    .select-all {
      flex: 0 0 pr(150);
      padding-left: pr(24);
      height: pr(98);
      line-height: pr(98);
      font-size: $importantFontSize;
      color: $importantInfoAndTitleColor;
      span {
        display: inline-block;
        height: 100%;
        margin-left: pr(10);
      }
    }
    .price-right {
      flex: 1;
      justify-content: flex-end;
    }
    .price-box {
      flex: 1;
      padding-right: pr(16);
      text-align: right;
      color: $importantInfoAndTitleColor;
      .totalPrice {
        line-height: pr(60);
        font-size: $importantFontSize;
      }
      .smallPrice {
        font-size: $smallFontSize;
        span:first-child {
          margin-right: pr(12);
        }
      }
    }
    .payButtom {
      flex: 0 0 pr(234);
    }
  }
</style>

