<template>
  <section>
    <ul class="flexBox" v-if="couponList.length>0">
      <coupon-item class="coupon-item" v-for="item in couponList" :item="item" :key="item.couponSearchId"></coupon-item>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">
  import couponItem from './couponItem.vue'
  export default {
    data () {
      return {
        couponList: []
      }
    },
    created () {
      this.getCouponList()
    },
    methods: {
      async getCouponList () {
        const url = '/mobileCoupon/getAvailableCouponList.do'
        const params = {
          goodsIds: this.$route.params.id
        }
        const res = await this.$post(url, params)
        if (res.code == 1) {
          this.couponList = res.data.couponArray
        }
      }
    },
    components: {
      couponItem
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";
  section {
    padding:0!important;
    background: #f5f5f5 !important;
    ul{
      overflow-x: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .coupon-item:first-child {
        margin-left:pr(24);
      }
      .coupon-item:last-child {
        padding-right:pr(24);
      }
    }
  }
</style>
