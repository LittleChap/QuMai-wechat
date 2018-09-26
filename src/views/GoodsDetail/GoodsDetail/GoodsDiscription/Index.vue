<template>
  <p>{{goodsDiscription}}</p>
</template>

<script type="text/ecmascript-6">
  export default {
    computed: {
      goodsDiscription () {
        return this.$store.state.GoodsDetail.goodsDetail.brief || ''
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";
  p{
    font-size:$normalFontSize;
    line-height:pr(32);
    color: $supportTextColor;
  }
</style>
