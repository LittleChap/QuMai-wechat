<template>
  <div class="v-list-item">
    <div class="part-left">优惠劵</div>
    <div class="part-right" @click="toShowCoupon">
      <span v-if="shopData.canUseCoupon && disCount>0" v-format-price="disCount"></span>
      <span v-else-if="shopData.canUseCoupon && shopData.couponArray &&  shopData.couponArray.length">
        {{shopData.couponArray.length}} 张可用
      </span>
      <span v-else>无可用</span>
      <i class="icon icon-details-left"
         v-if="shopData.canUseCoupon && shopData.couponArray && shopData.couponArray.length"></i>
    </div>
    <div v-transfer-dom>
      <popup v-model="show" class="popup-wrap">
        <popup-header
          :left-text="'选择优惠劵'"
          :right-text="'确定'"
          :show-bottom-border="false"
          @on-click-right="confirmCoupon"></popup-header>
        <ul class="coupon-wrap">
          <li v-for="(item, index) in shopData.couponArray"
              :key="index"
              class="flexBox"
              :class="{'active': currentIndex === index}">
            <div class="price-box">
              <strong class="price">{{item.priceDiscount}}</strong>
              <p>{{item.priceThreshold<=0 ? '无门槛' :'满'+item.priceThreshold+'使用'}}</p>
            </div>
            <div class="coupon-content" @click="select(index)">
              <h3>{{item.couponName}}</h3>
              <p>{{item.shopName}}商品使用</p>
              <p>{{$moment(item.useStartTime).format('YYYY.MM.DD')}} ~
                {{$moment(item.useEndTime).format('YYYY.MM.DD')}}</p>
              <i class="v-single-select"
                 :class="{'icon-change-highlight': currentIndex === index, 'icon-change-disable': currentIndex !== index }"></i>
            </div>
          </li>
        </ul>
      </popup>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {PopupHeader, Popup, TransferDom} from 'vux'

  export default {
    components: {
      PopupHeader,
      Popup,
      TransferDom
    },
    directives: {
      TransferDom
    },
    props: {
      shopIndex: { // 索引
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        show: false,
        ToCurrentIndex: -1
      }
    },
    computed: {
      shopData () {
        return this.$store.getters.confirmData.shopProductArray[this.shopIndex]
      },
      toPriceData () {
        return this.$store.getters.toPriceData
      },
      currentIndex: {
        get () {
          if (this.ToCurrentIndex === -1 && this.toPriceData.shopArray && (this.toPriceData.shopArray[this.shopIndex].couponMemberIndex || this.toPriceData.shopArray[this.shopIndex].couponMemberIndex === 0)) {
            this.ToCurrentIndex = this.toPriceData.shopArray[this.shopIndex].couponMemberIndex
          }
          return this.ToCurrentIndex
        },
        set (newValue) {
          this.ToCurrentIndex = newValue
        }
      },
      addressInfo () {
        return this.$store.getters.addressInfo
      },
      couponDiscountArray () {  // 优惠劵抵扣列表
        return this.$store.getters.confirmData.couponDiscountArray || []
      },
      disCount () {  // 优惠劵抵扣金额
        let money = 0
        for (let i = 0; i < this.couponDiscountArray.length; i++) {
          if (this.shopData.shopId === this.couponDiscountArray[i].shopId && this.currentIndex > -1) {
            // money = this.couponDiscountArray[i].couponPrice
            money = this.shopData.couponArray[this.currentIndex].priceDiscount
          }
        }
        return money
      }
    },
    methods: {
      toShowCoupon () {
        if (!this.addressInfo.addressId && this.addressInfo.addressId !== 0) {
          this.$toast('请先设置地址')
          return false
        }
        if (this.shopData.canUseCoupon && this.shopData.couponArray.length) {
          this.show = true
        }
        if (!this.disCount) {
          this.currentIndex = -1
        }
      },
      confirmCoupon () {
        this.show = false
        let toPriceData = this.toPriceData
        if (this.currentIndex === -1) {
          toPriceData.shopArray[this.shopIndex].couponMemberId = ''
          toPriceData.shopArray[this.shopIndex].couponMemberIndex = -1
        } else {
          toPriceData.shopArray[this.shopIndex].couponMemberId = this.shopData.couponArray[this.currentIndex].couponMemberId
          toPriceData.shopArray[this.shopIndex].couponMemberIndex = this.currentIndex
        }
        this.$store.dispatch('SetPriceData', toPriceData)
      },
      select (index) {
        this.currentIndex = this.currentIndex === index ? -1 : index
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/commom";

  .part-right .icon {
    margin-left: 6px;
  }

  .popup-wrap {
    height: 60% !important;
    background: $pageDefaultColor;
  }

  .coupon-wrap {
    width: 100%;
    height: calc(100% - 1.87733rem);
    @include wrapPadding;
    padding-top: pr(30);
    overflow: auto;
    li {
      position: relative;
      height: pr(200);
      margin-bottom: pr(30);
      &.active {
        .price-box {
          background: linear-gradient(-72deg, #f17171, #ff9d67);
        }
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
        border-left: pr(20) solid transparent;
      }
      &:before {
        top: 0;
        border-top: pr(20) solid $pageDefaultColor;
      }
      &:after {
        bottom: 0;
        border-bottom: pr(20) solid $pageDefaultColor;
      }
      .price {
        display: block;
        margin: pr(40) 0 pr(18);
        font-size: pr(80);
        &:before {
          content: '￥';
          font-size: pr(38);
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
      &:before, &:after {
        position: absolute;
        left: 0;
        display: block;
        content: ' ';
        width: 0;
        height: 0;
        border-right: pr(20) solid transparent;
      }
      &:before {
        top: 0;
        border-top: pr(20) solid $pageDefaultColor;
      }
      &:after {
        bottom: 0;
        border-bottom: pr(20) solid $pageDefaultColor;
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

</style>

