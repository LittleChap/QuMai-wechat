<template>
    <div class="shop-wrap block">
      <div class="shop-title">
        <span>{{shopData.shopName}}</span>
      </div>
      <div class="shop-item">
        <item v-for="(item, productIndex) in shopData.productArray" :key="productIndex" :shopIndex="shopIndex" :productIndex="productIndex"></item>
      </div>
      <price-box :shopIndex="shopIndex"></price-box>
      <coupon :shopIndex="shopIndex"></coupon>
      <remark :shopIndex="shopIndex"></remark>
    </div>
</template>

<script type="text/ecmascript-6">
  import Item from '../Item/index.vue'
  import Coupon from '../Coupon/index.vue'
  import Remark from '../Remark/index.vue'
  import PriceBox from '../PriceBox/index.vue'
  export default{
    name: 'group-item',
    components: {
      Item,
      Coupon,
      Remark,
      PriceBox
    },
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
  @import "../../assets/commom";
  .shop-wrap{
    border-top: 1px solid $lineColor;
    .shop-title {
      padding: 0 pr(24);
    }
    .shop-item{
      padding: 1px pr(24);
      border-top: 1px solid $lineColor;
      border-bottom: 1px solid $lineColor;
      background: $blockProductColor;
    }
  }
</style>

