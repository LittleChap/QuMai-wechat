<template>
  <div class="item-wrap flexBox" @click="clickProduct">
    <i class="v-single-select"
       :class="{'icon-change-highlight': isChecked, 'icon-change-disable': !isChecked }"
       v-if="isEdit"></i>
    <div class="img-box">
      <img class="item-img" :src="item.goodsImageSmall" alt="">
      <div class="img-mask" v-if="item.isPutaway===0 || item.store<=0">
        <span>{{item.isPutaway===0 ? '已下架' : '待补货'}}</span>
      </div>
    </div>

    <div class="item-con">
      <div class="title">
        <h3>{{item.goodsName}}</h3>
      </div>
      <p class="clearfix price-box">
        <span class="price-main" v-format-price-num="activeData.mainPrice"></span>
        <span class="price-line" v-if="item.price && activeData.mainPrice!== item.price"
              v-format-price="item.price"></span>
      </p>
      <p class="label-box" v-if="activeData.label">
        <span class="v-label">{{activeData.label}}</span>
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      item: {
        type: Object,
        default: {}
      },
      isEditStatus: {
        type: Boolean,
        default: false
      },
      isAllChecked: {
        type: Boolean,
        default: false
      },
      isClickAllChecked: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
//        isEdit: this.isEditStatus,
        checked: false
      }
    },
    computed: {
      activeData () {
        let label = null
        let mainPrice = 0
        if (this.item.priceType === 1) {
          mainPrice = this.item.promotionPrice
        } else {
          mainPrice = this.item.price
        }
        return {
          label: label,
          mainPrice: mainPrice
        }
      },
      isEdit () {
        return this.isEditStatus
      },
      isChecked () {
        if (this.isClickAllChecked) {
          this.checked = this.isAllChecked
        } else if (this.isAllChecked) {
          this.checked = true
        }
        return this.checked
      }
    },
    methods: {
      clickProduct () {
        if (this.isEdit) {
          this.select()
        } else {
          this.toProduct()
        }
      },
      toProduct () {
        if (this.item.isPutaway === 0) {
          this.$toast('商品已下架，无法查看！')
          return false
        }
        this.$toGoods(this.item.goodsId)
      },
      select () {
        this.checked = !this.checked
        this.$emit('singleCheck', {checked: this.checked, goodsId: this.item.goodsId})
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";

  .price-line {
    font-size: $normalFontSize;
    text-decoration: line-through;
    color: $supportTextColor;
    line-height: pr(20);
    margin-left: pr(20);
  }

  .price-main {
    color: $mainFontColor;
    font-size: $titleFontSize;
    &:before {
      content: '￥';
      font-size: $normalFontSize;
    }
  }

  .item-wrap {
    position: relative;
    display: flex;
    padding: pr(20) 0 pr(20) $normalFontSize;
    min-height: pr(210);
    background: $blockProductColor;
    border-bottom: 1px solid $lineColor;
    &:first-child {
      border-top: 1px solid $lineColor;
    }
    &:last-child {
      border: none;
    }
    .v-single-select {
      flex: 0 0 pr(62);
      margin-top: pr(72);
    }
    .img-box {
      position: relative;
      box-sizing: border-box;
      width: pr(190);
      height: pr(190);
      border: 1px solid $lineColor;
      border-radius: pr(4);
      background: #fff;
      .item-img {
        width: 100%;
        height: 100%;
      }
      .img-mask {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: pr(60);
        background: rgba(0, 0, 0, 0.4);
        text-align: center;
        line-height: pr(60);
        span {
          color: #fff;
          font-size: $importantFontSize;
        }
      }
    }
    .item-con {
      flex: 1;
      padding: 0 $normalFontSize 0 pr(20);
      .title {
        font-size: $importantFontSize;
        color: $importantInfoAndTitleColor;
        line-height: pr(40);
        h3 {
          height: pr(66);
          width: 100%;
          line-height: pr(34);
          overflow: hidden;
          white-space: normal;
          text-overflow: ellipsis;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .label-box {
        margin-top: pr(20);
        height: pr(30);
      }
      .price-box {
        margin-top: pr(16);
        height: pr(34);
        line-height: pr(24);
      }
    }
  }
</style>



