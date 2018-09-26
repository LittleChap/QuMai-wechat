<template>
    <div @click="jumpPage" class="goods-item">
      <img :src="goodsImage">
      <p class="goods-name">{{goods.goodsName}}</p>
      <p v-if="isPromotionPrice">
        <span>{{promotionPrice}}</span>
        <span><s>{{price}}</s></span>
      </p>
      <p v-else>
        <span>{{price}}</span>
      </p>
    </div>
</template>

<script type="text/ecmascript-6">
  import {formatPrice} from '@/utils/utils'
  export default {
    props: {
      goods: Object
    },
    methods: {
      jumpPage () {
        this.$toGoods(this.goods.goodsId)
      }
    },
    computed: {
      goodsImage () {
        return this.goods.goodsImage || 'http://www.hht618.com/statics/attachment/goods/201611230947098301.jpg'
      },
      isPromotionPrice () {
        return this.goods.promotionPrice ? 1 : 0
      },
      price () {
        return formatPrice(this.goods.price)
      },
      promotionPrice () {
        return formatPrice(this.goods.promotionPrice)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  .goods-item {
    width: pr(230);
    img {
      width: pr(216);
      height: pr(216);
      border: 1px solid $lineColor;
    }
    p {
      &:not(:last-child) {
        height:pr(72);
      }
      width: pr(210);
      margin: 0 auto;
      font-size: $importantFontSize;
      line-height: pr(40);
      color: $importantInfoAndTitleColor;
      display: -webkit-box;
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      span:first-child {
        color: $mainFontColor;
        line-height: pr(40);
        font-size: $importantFontSize;
      }
      span:nth-child(2) {
        color: $paragraphColor;
        line-height: pr(40);
        font-size: $smallFontSize;
      }
    }
  }
</style>
