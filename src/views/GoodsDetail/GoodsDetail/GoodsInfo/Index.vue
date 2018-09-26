<template>
  <div class="flexChild">
    <span>已售{{buyNum}}件</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    computed: {
      buyNum () {
        return this.$store.state.GoodsDetail.goodsDetail.buyNum || 0
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";
  div{
    text-align: right;
    span {
      color: $paragraphColor;
      line-height: pr(40);
      font-size: $normalFontSize;
    }
  }
</style>
