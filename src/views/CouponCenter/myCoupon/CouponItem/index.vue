<template>
  <li class="flexBox" :class="{'active':couponType == 0}">
    <div class="price-box">
      <strong class="price">{{item.priceDiscount}}</strong>
      <p>{{item.priceThreshold <= 0 ? '无门槛' : '满' + item.priceThreshold + '使用'}}</p>
    </div>
    <div class="coupon-content">
      <h3>{{item.couponName}}</h3>
      <p>{{item.shopName}}商品使用</p>
      <p>{{grantStartTime}}-{{grantEndTime}}</p>
      <img v-if="couponType == 1" class="label-img" src="./uesd.png">
      <img v-if="couponType == 2" class="label-img" src="./lapsed.png" alt="">
      <span v-if="couponType == 0" class="coupon-btn" @click="useCoupon">立即使用</span>
    </div>
  </li>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      item: Object,
      couponType: Number
    },
    methods: {
      useCoupon () {
        this.$router.push('/')
      }
    },
    computed: {
      grantStartTime () {
        return this.$moment(this.item.useStartTime).format('YYYY.MM.DD')
      },
      grantEndTime () {
        return this.$moment(this.item.useEndTime).format('YYYY.MM.DD')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  li {
    position: relative;
    height: pr(200);
    margin-bottom: pr(30);
    &.active {
      .price-box {
        background: linear-gradient(-72deg, #f17171, #ff9d67);
      }
    }
    .price-box {
      position: relative;
      flex: 0 0 pr(190);
      height: pr(200);
      background: linear-gradient(-72deg, #999999, #bfbfbf);
      border-radius: pr(16) 0 0 pr(16);
      color: #fff;
      text-align: center;
      &:before, &:after {
        position: absolute;
        right: 0;
        display: block;
        content: ' ';
        width: 0;
        height: 0;
        border-left: pr(12) solid transparent;
      }
      &:before {
        top: 0;
        border-top: pr(12) solid $pageDefaultColor;
      }
      &:after {
        bottom: 0;
        border-bottom: pr(12) solid $pageDefaultColor;
      }
      .price {
        display: block;
        margin: pr(40) 0 pr(18);
        font-size: pr(60);
        &:before {
          content: '￥';
          font-size: pr(28);
        }
      }
      p {
        font-size: $normalFontSize;
      }
    }
    .coupon-content {
      position: relative;
      flex: 1;
      height: pr(200);
      padding: pr(12) pr(20);
      font-size: pr(28);
      border-radius: 0 pr(16) pr(16) 0;
      background: #ffffff;
      .coupon-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        margin-right: pr(30);
        margin-bottom: pr(30);
        padding: pr(16) pr(36);
        border-radius: pr(8);
        color: $mainFontColor;
        font-size: $normalFontSize;
        border: 1px solid $mainFontColor;
      }
      &:before, &:after {
        position: absolute;
        left: 0;
        display: block;
        content: ' ';
        width: 0;
        height: 0;
        border-right: pr(12) solid transparent;
      }
      &:before {
        top: 0;
        border-top: pr(12) solid $pageDefaultColor;
      }
      &:after {
        bottom: 0;
        border-bottom: pr(12) solid $pageDefaultColor;
      }
      h3 {
        height: pr(78);
        width: 100%;
        line-height: pr(40);
        margin-bottom: pr(12);
        font-size: $importantFontSize;
        color: $importantInfoAndTitleColor;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      p {
        font-size: $normalFontSize;
        line-height: pr(38);
        color: $supportTextColor;
      }
      i {
        position: absolute;
        bottom: pr(30);
        right: pr(30);
      }
    }
  }
  .label-img {
    position: absolute;
    bottom:pr(20);
    right:pr(20);
    width:pr(136);
  }
</style>
