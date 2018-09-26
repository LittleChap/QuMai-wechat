<template>
  <li class="flexChild flexBox">
    <div class="coupon-left">
      <div class="coupon-top flexBox">
        <div class="coupon-top-left flexBox">
          <div class="price-box">
            <strong class="price"><span>￥</span>{{item.priceDiscount}}</strong>
            <p>{{item.priceThreshold <= 0 ? '无门槛' : '满' + item.priceThreshold + '使用'}}</p>
          </div>
        </div>
        <div class="coupon-top-right">
          <h3>{{item.couponName}}</h3>
          <p>{{item.shopName}}商品使用</p>
        </div>
      </div>
      <div class="coupon-bottom">{{useStartTime}} - {{useEndTime}}</div>
    </div>
    <div class="coupon-right disabled" v-if="item.couponMemberId">
      <span>已</span><span>领</span><span>取</span>
    </div>
    <div class="coupon-right disabled" v-else-if="item.isOutOfStock">
      <span>已</span><span>抢</span><span>光</span>
    </div>
    <div class="coupon-right" @click="getCoupon" v-else>
      <span>待</span><span>领</span><span>取</span>
    </div>
  </li>
</template>

<script type="text/ecmascript-6">
  import {fetch} from '@/utils/fetch'
  export default {
    props: {
      item: Object
    },
    computed: {
      useStartTime () {
        return this.$moment(this.item.useStartTime).format('YYYY.MM.DD')
      },
      useEndTime () {
        return this.$moment(this.item.useEndTime).format('YYYY.MM.DD')
      },
      userInfo () {
        return this.$getUser()
      }
    },
    methods: {
      async getCoupon () {
        if (this.userInfo) {
          const url = '/mobileCoupon/receiveCoupon.do'
          const params = {
            couponSearchId: this.item.couponSearchId,
            couponSn: this.item.couponSn
          }
          const res = await fetch(url, params)
          if (res.code == 1) {
            this.$toast('领取成功')
            this.item.couponMemberId = 1
          } else {
            this.$toast(res.message)
          }
        } else {
          this.$toast('您还未登录！')
          setTimeout(() => {
            this.$wechat.getAuth(this.$route)
          }, 1000)
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  li {
    font-size: 0;
    margin-right: pr(12);
    .coupon-left, .coupon-right {
      height: pr(188);
      display: inline-block;
      vertical-align: middle;
    }
    .coupon-left {
      background: #fff;
      border-top-left-radius: pr(10);
      border-bottom-left-radius: pr(10);
      width: pr(382);
      padding: 0 pr(14) 0 pr(14);
      .coupon-bottom {
        font-size: $smallFontSize;
        color: $supportTextColor;
      }
      .coupon-top {
        .coupon-top-left {
          padding-right: pr(18);
          border-right: 1px dashed $lineColor;
        }
        .coupon-top-right {
          padding-left: pr(18);
          display: flex;
          flex-direction: column;
          justify-content: center;
          h3 {
            line-height: pr(30);
            height: pr(60);
            font-size: $normalFontSize;
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
            line-height: pr(40);
            font-size: $smallFontSize;
            color: $supportTextColor;
          }
        }
      }
    }
    .coupon-right {
      &.disabled {
        background: #999;
      }
      background: #ea7c7b;
      width: pr(48);
      border-top-right-radius: pr(10);
      border-bottom-right-radius: pr(10);
      font-size: $normalFontSize;
      line-height: pr(32);
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        text-align: center;
      }
    }
  }

  .price-box {
    .price {
      height: pr(40);
      line-height: pr(40);
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
      text-overflow: ellipsis;
      color: $mainFontColor;
      display: block;
      margin: pr(40) 0 pr(18);
      font-size: pr(40);
      span {
        font-size: pr(24);
      }
    }
    p {
      margin-bottom: pr(40);
      font-size: $normalFontSize;
      color: $paragraphColor;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
