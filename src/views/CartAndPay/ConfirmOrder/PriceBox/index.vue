<template>
  <ul class="price-box">
    <li class="price-item">
      <span class="left-part">商品净价：</span>
      <span class="right-part price" v-format-price="shopData.goodsPrice"></span>
    </li>
    <li class="price-item">
      <span class="left-part">运费：</span>
      <span class="right-part addPrice" v-format-price-num="shopData.shippingPrice"></span>
    </li>
    <li class="price-item" v-if="shopData.discountPrice>0">
      <span class="left-part">会员折扣（ {{shopData.discount}} ）：</span>
      <span class="right-part disPrice" v-format-price-num="shopData.discountPrice"></span>
    </li>
  </ul>


</template>

<script type="text/ecmascript-6">
  export default{
    name: 'priceBox',
    props: {
      shopIndex: { // 索引
        type: Number,
        default: 0
      }
    },
    computed: {
      shopData () {
        return this.$store.getters.confirmData.shopProductArray[this.shopIndex]
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";
  .price-box{
    @include wrapPadding;
    padding-top: pr(12);
    padding-bottom: pr(12);
    background: $blockDefaultColor;
    border-bottom: 1px solid $lineColor;
    .price-item{
      display: flex;
      font-size: $importantFontSize;
      color: $importantInfoAndTitleColor;
    }
    .left-part,
    .right-part{
      flex: 1;
      height: pr(60);
      line-height: pr(60);
    }
    .right-part{
      text-align: right;
    }
    .price{
      color: $mainFontColor;
    }
    .addPrice{
      color: $mainFontColor;
      &:before{
        content: '+ ';
      }
    }
    .disPrice{
      color: $saleTextColor;
      &:before{
        content: '- ';
      }
    }
  }

</style>

