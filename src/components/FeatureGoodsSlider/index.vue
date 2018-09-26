<template>
  <section v-if="isShowFeatureGoods" class="feature-goods">
    <div class="feature-header">
      推荐商品
    </div>
    <div class="box flexBox scroll-bar">
      <div class="box-item" v-for="(item, index) in featureGoods">
        <feature-goods-item :goods="item"></feature-goods-item>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import {Scroller} from 'vux'
  import featureGoodsItem from './featureGoodsItem'
  export default {
    components: {
      Scroller,
      featureGoodsItem
    },
    computed: {
      boxWidth () {
        return this.$pxrem * this.featureGoods.length * 116 + 'rem'
      },

      isShowFeatureGoods () {
        return this.featureGoods != null && this.featureGoods.length > 0
      }
    },
    data () {
      return {
        featureGoods: []
      }
    },
    async created () {
      const url = '/mobileGoods/listRecommendGoods.do'
      const response = await this.$post(url, {})
      this.featureGoods = response.data.goodsArray
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  .scroll-bar {
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .feature-header {
    padding-bottom:pr(28);
    padding-left: pr(24);
  }

  .box-item {
    &:first-child {
      margin-left: pr(24);
    }
    display: inline-block;
    vertical-align: top;
    /*margin-right:pr(10);*/
  }

</style>
