<template>
  <div class="recommend-wrap" v-if="goodsList.length">
    <PullUp :cb="getMoreList" :limited="pageInfo.limit"  id="recommendPullup" :style="{'margin-bottom': goodsList.length>2?'2.32533rem':'0'}">
      <h2>推荐商品</h2>
      <section class="content">
        <item v-for="(item, index) in goodsList"
              :key="index"
              :itemData="item"></item>
      </section>
    </PullUp>
  </div>
</template>

<script type="text/ecmascript-6">
  import Item from './item.vue'

  export default {
    components: {
      Item
    },
    data () {
      return {
        goodsList: [],
        pageInfo: {
          currentPage: 1,
          showCount: 6,
          limit: false
        }
      }
    },
    created () {
      this.goodsList = []
      this.getList()
    },
    methods: {
      async getList () {
        let reqData = {
          currentPage: this.pageInfo.currentPage,
          showCount: this.pageInfo.showCount || 10
        }
        let res = await this.$post('/mobileGoods/listRecommendGoods.do', reqData)
        if (parseInt(res.code) === 1) {
          this.goodsList = this.goodsList.concat(res.data.goodsArray)
          if (!res.data.goodsArray.length || res.data.goodsArray.length < this.pageInfo.showCount) {
            this.pageInfo.limit = true
          }
        } else {
          this.$toast(res.message)
        }
      },
      getMoreList (done) {
        this.pageInfo.currentPage++
        this.getList()
        done()
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";
  .recommend-wrap {
    /*padding-bottom: pr(109);*/
    width: 100%;
    min-height: calc( 100vh - 13.2rem );
    max-height: 100vh;
    border-top: 1px solid $lineColor;
    h2 {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $headerTextFontSize;
      color: $importantInfoAndTitleColor;
      line-height: pr(88);
      text-align: center;
      background: #fff;
      &:before, &:after{
        display: inline-block;
        content: '  ';
        margin: 0 pr(20);
        width: pr(120);
        border-top: 1px solid $buttonLineColor;
      }
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      min-height: pr(600);
      background: #fff;
      @include wrapPadding;
    }
  }
</style>

