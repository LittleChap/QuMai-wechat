<template>
  <div v-if="isDiscount">
    <span class="v-label">{{discount}}折</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    computed: {
      isDiscount () {
        return this.$store.state.GoodsDetail.goodsDetail.priceType == 2 && this.$store.state.GoodsDetail.goodsDetail.discount < 100
      },
      discount () {
        return this.$store.state.GoodsDetail.goodsDetail.discount
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
