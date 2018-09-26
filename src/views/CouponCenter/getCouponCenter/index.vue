<template>
  <div>
    <pull-up v-if="total > 0" :cb="getMoreList" :limited="limit" :height="'93.4vh'">
      <ul>
        <coupon-item v-for="item in couponList" :key="item.couponSn" :item="item"></coupon-item>
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
          currentPage: 1,
          showCount: 10,
          done: null
        }
      }
    },
    created () {
      this.$store.dispatch('getUnclaimedCouponList', this.pageInfo)
    },
    destroyed () {
      this.$store.commit('CLEAR_GETCOUPON')
    },
    computed: {
      couponList () {
        return this.$store.state.CouponCenter.unclaimedCouponList
      },
      total () {
        return this.$store.state.CouponCenter.unclaimedTotal
      },
      limit () {
        return this.couponList.length >= this.total
      }
    },
    methods: {
      getMoreList (done) {
        this.pageInfo.currentPage++
        this.pageInfo.done = done
        this.$store.dispatch('getUnclaimedCouponList', this.pageInfo, done)
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
