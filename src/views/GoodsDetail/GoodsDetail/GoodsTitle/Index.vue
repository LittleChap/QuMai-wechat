<template>
  <div>
    <p><goods-discount></goods-discount>{{goodsTitle}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import GoodsDiscount from '../GoodsDiscount/Index'
  export default {
    components: {
      GoodsDiscount
    },
    computed: {
      goodsTitle () {
        return this.$store.state.GoodsDetail.goodsDetail.name
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  div {
    display: inline-block;
    padding-right:pr(24);
    @include blockPaddingTB();
    p {
      display: -webkit-box;
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    font-size: $headerTextFontSize;
    line-height: pr(40);
  }
</style>
