<template>
  <section>
    <div class="title-bar">
      会员特权
    </div>
    <div class="privileges-bar">
      <ul>
        <li v-if="discount">最低享受{{discount}}</li>
        <li v-if="freeShippingPrice">{{levelText}}单笔订单满{{freeShippingPrice}}元免运费</li>
      </ul>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    computed: {
      levelText () {
        const levelArr = ['普通会员', '银卡会员', '金卡会员', '白金会员', '钻石会员']
        const level = this.$store.state.UserCenter.levelInfo.level
        return levelArr[level - 1]
      },
      discount () {
        return this.$store.state.UserCenter.levelInfo.discount
      },
      freeShippingPrice () {
        return this.$store.state.UserCenter.levelInfo.freeShippingPrice
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  section {
    @include wrapPadding();
    margin-top: pr(10);
    background: #fff;
    font-size:$importantFontSize;
    .title-bar {
      color: $importantInfoAndTitleColor;
      height:pr(88);
      line-height:pr(88);
      border-bottom:1px solid $lineColor;
    }
    .privileges-bar {
      color: $supportTextColor;
      padding:pr(24) 0;
      line-height:pr(88);
    }
  }
  ul,li {
    list-style: inside;
  }

</style>
