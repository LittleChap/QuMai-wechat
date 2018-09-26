<template>
  <div class="flexBox">
    <span class="flexChild flexBox center" v-if="sendGoodsAddress"><i class="icon-localize"></i>{{sendGoodsAddress}}</span>
    <span class="flexChild" v-if="sendGoodsTime">{{sendGoodsTime}}内发货</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    computed: {
      sendGoodsAddress () {
        return this.$store.state.GoodsDetail.goodsDetail.sendGoodsAddress
      },
      sendGoodsTime () {
        return this.$store.state.GoodsDetail.goodsDetail.sendGoodsTime
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";
    span {
      i {
        margin-right:pr(10);
      }
      color: $paragraphColor;
      line-height: pr(40);
      font-size: $normalFontSize;
      &:nth-child(2) {
        text-align: right;
      }
    }

</style>
