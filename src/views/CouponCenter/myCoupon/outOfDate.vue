<template>
  <div>
    <pull-up v-if="total > 0" :cb="getMoreList" :limited="limit" :height="'93.4vh'">
      <ul>
        <coupon-item v-for="item in couponList" :couponType="pageInfo.couponType" :key="item.couponSn"
            :item="item"></coupon-item>
      </ul>
    </pull-up>
    <div v-else class="v-empty-status">
      <img src="../empty.png" alt="">
      <p>您暂无优惠券哦！</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import CouponItem from './CouponItem'
  export default {
    components: {
      CouponItem
    },
    data () {
      return {
        pageInfo: {
          couponType: 2,
          currentPage: 1,
          showCount: 10,
          done: null
        }
      }
    },
    created () {
      this.$store.dispatch('getCouponList', this.pageInfo)
    },
    computed: {
      couponList () {
        return this.$store.state.CouponCenter.couponList.outOfDate
      },
      total () {
        return this.$store.state.CouponCenter.couponList.outOfDateTotal
      },
      limit () {
        return this.couponList.length >= this.total
      }
    },
    methods: {
      getMoreList (done) {
        this.pageInfo.currentPage++
        this.pageInfo.done = done
        this.$store.dispatch('getCouponList', this.pageInfo, done)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  ul {
    padding: pr(24);
  }
</style>
