<!--产品列表-->
<template>
  <div>
    <div class="searchResultWrap" v-if="productList.length">
      <PullUp :cb="loadMoreProduct" :limited="productLimit" id="productListPullup">
        <div class="itemWrap">
          <div class="item" v-for="(item, index) in productList" :key="index" @click="$toGoods(item.goodsId)">
            <img :src="item.imageThumbnail" alt="" class="item_img"/>
            <div class="item_text">{{item.goodsName}}</div>
            <div class="price"><span class="f24">￥</span>{{$tomoney(item.showPrice)}}</div>
          </div>
        </div>
      </PullUp>
      <GoTop element="#productListPullup" v-if="productList.length" />
    </div>
    <div class="v-empty-status" v-else>
      <img src="~@/assets/order-empty.png" alt="">
      <p>没有搜索到对应的商品！</p>
      <p>去首页看看吧！</p>
      <router-link class="v-button empty-button" to="/">去首页</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data () {
      return {}
    },
    computed: {
      productList () {
        return this.$store.getters.GET_SearchResult
      },
      productLimit () {
        return !this.$store.getters.GET_HasMoreSearchResult
      }
    },
    methods: {
      changeSearchParam (type) {
        this.$store.dispatch('searchProducts', {type: type})
      },
      loadMoreProduct (done) {
        this.$store.dispatch('searchProducts', done)
      }
    },
    created () {
    },
    mounted () {
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .searchResultWrap {
    background: #fff;
    width: 100vw;
    box-sizing: border-box;
    padding: pr(10) pr(15);
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .itemWrap{
    display: flex;
    flex-wrap: wrap;
  }
  .item{
    width: pr(340);
    margin: pr(10);
  }
  .item_img{
    width: pr(340);
    height: pr(340);
    border: 1px solid $lineColor;
    border-radius: pr(6);
    display: block;
  }
  .item_text{
    width: pr(340);
    font-size: $importantFontSize;
    line-height: pr(40);
    height: pr(80);
    margin: pr(10) 0;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .f24{
    font-size: $normalFontSize!important;
  }
  .price{
    width: pr(340);
    line-height: pr(44);
    font-size: $titleFontSize;
    color:$mainFontColor;
  }

</style>
