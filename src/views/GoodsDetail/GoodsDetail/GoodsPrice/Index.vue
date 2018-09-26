<template>
  <div v-if="isPromotionPrice == 0">
    <span>{{price}}</span>
  </div>
  <div v-else-if="isPromotionPrice == 1">
    <span>{{promotionPrice}}</span>
    <span><s>{{price}}</s></span>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatPriceNum} from '@/utils/utils'
  export default {
    computed: {
      isPromotionPrice () {
        // 为1时有优惠价 0没有
        return this.$store.state.GoodsDetail.selectSpec.isPromotion
      },
      promotionPrice () {
        if (this.isPromotionPrice === 1) {
          return formatPriceNum(this.$store.state.GoodsDetail.selectSpec.promotionPrice)
        }
      },
      price () {
        return formatPriceNum(this.$store.state.GoodsDetail.selectSpec.price)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  div {
    padding-top: pr(6);
  }

  span:nth-child(1) {
    color: $mainFontColor;
    line-height: pr(40);
    font-size: pr(40);
    padding-right: pr(28);
    &:before {
      content: '¥';
      font-size: $importantFontSize;
    }
  }

  span:nth-child(2) {
    color: $paragraphColor;
    line-height: pr(40);
    font-size: $normalFontSize;
    &:before {
      content: '销售价：￥';
    }
  }

</style>
