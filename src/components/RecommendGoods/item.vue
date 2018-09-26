<template>
  <div class="item-wrap" @click="$toGoods(itemData.goodsId)">
    <img :src="itemData.goodsImage" alt="">
    <h3>{{itemData.goodsName}}</h3>
    <p class="price-box">
      <span class="price-main" v-format-price-num="itemData.promotionPrice || itemData.price"></span>
      <span v-if="itemData.promotionPrice && itemData.promotionPrice!==itemData.price" v-format-price="itemData.price" class="price-line"></span>
    </p>
  </div>


</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      itemData: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";
  .item-wrap{
    display: inline-block;
    width: pr(340);
    margin-bottom: pr(20);
    background: #fff;
    img{
      display: block;
      width: pr(340);
      height: pr(340);
      border: 1px solid $lineColor;
      border-radius: pr(6);
      overflow: hidden;
    }
    h3{
      width: pr(340);
      height: pr(80);
      margin: pr(14) 0;
      line-height: pr(40);
      font-size: $importantFontSize;
      color: $importantInfoAndTitleColor;
      overflow:hidden;
      text-overflow:ellipsis;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
    }
    .price-box{
      .price-line {
        font-size: $normalFontSize;
        text-decoration: line-through;
        color: $supportTextColor;
        line-height: pr(20);
        margin-left: pr(20);
      }
      .price-main {
        color: $mainFontColor;
        font-size: $titleFontSize;
        &:before {
          content: '￥';
          font-size: $normalFontSize;
        }
      }
    }
  }
</style>

