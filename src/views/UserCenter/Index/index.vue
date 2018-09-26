<!--个人中心首页-->
<template>
  <div>
    <TopInfo></TopInfo>
    <MyOrder></MyOrder>
    <div class="bgw bdb mb10">
      <Cell title="我的足迹" link="none" @click.native="goto('/userCenter/myFootprint')">
        <i class="cellImg icon-personl-footmark" style="color:#a798ea;"></i>
      </Cell>

      <Cell title="我的关注" link="none" @click.native="goto('/userCenter/myAttention')">
        <i class="cellImg icon-personl-attention" style="color:#ffc0c0;"></i>
      </Cell>

      <Cell title="我的积分" link="none" @click.native="goto('/userCenter/myPoint')">
        <i class="cellImg icon-personl-integral" style="color:#ffd041;"></i>
      </Cell>

      <Cell title="我的优惠券" link="none" @click.native="goto('/getCouponCenter/myCoupon')">
        <i class="cellImg icon-personl-coupons" style="color:#fc8634;"></i>
      </Cell>

      <Cell title="领券中心" link="none" @click.native="goto('/getCouponCenter')">
        <i class="cellImg icon-personl-couponscenter" style="color:#fd5858;"></i>
      </Cell>
    </div>

    <div class="bgw bdb mb10">
      <Cell title="售后服务" link="none" @click.native="goto('/userCenter/returnList')">
        <i class="cellImg icon-personl-service" style="color:#7dd3fb;"></i>
      </Cell>

      <Cell title="客服/反馈" link="/ServiceAndFeedback">
        <i class="cellImg icon-personl-feedback" style="color:#e46868;"></i>
      </Cell>

      <Cell title="帮助中心" link="/helpcenter">
        <i class="cellImg icon-personl-help" style="color:#423737;"></i>
      </Cell>
    </div>
    <BottomTab :index="4" />
  </div>
</template>

<script>
  import TopInfo from './TopInfo/index'
  import MyOrder from './MyOrder/index'
  export default {
    components: {TopInfo, MyOrder},
    data () {
      return {}
    },
    methods: {
      goto (url) {
        if (this.$getUser()) {
          this.$router.push(url)
        } else {
          this.$wechat.getAuth(this.$route)
        }
      }
    },
    created () {
      this.$store.dispatch('getUserInfo')
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';

  .blank {
    width: 100vw;
    height: pr(98);
  }

  .bgw {
    background: #fff;
  }

  .bdb {
    border-bottom: #e6e6e6;
  }

  .mb10 {
    margin-bottom: pr(10);
  }

  .cellImg {
    font-size: pr(44);
    line-height: pr(44);
  }
</style>
