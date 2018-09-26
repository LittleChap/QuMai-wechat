<!--二级页面-->
<template>
  <div>
    <img :src="data.page_rank_image" alt="" class="topImg" v-if="data.page_rank_image"/>

    <div class="listWrap" v-if="data.goodsArray.length">
      <div class="item" v-for="item, index in data.goodsArray" :key="index" @click="$goto('/goodsDetail/'+item.goodsId)">
        <img :src="item.image" alt="" class="item_img"/>
        <div class="item_text">{{item.goodsName}}</div>
        <div class="price"><span class="f24">￥</span>{{$tomoney(getDisplayPrice(item))}}</div>
      </div>
    </div>
    <div class="v-empty-status" v-else>
      <img src="~@/assets/order-empty.png" alt="">
      <p>该分类下暂无商品！</p>
      <p>去首页看看吧！</p>
      <router-link class="v-button empty-button" to="/">去首页</router-link>
    </div>
    <GoTop/>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        data: []   // 接口取回来的数据
      }
    },
    methods: {
      // 判断要显示哪种价格 会员日价>折扣价>销售价格
      getDisplayPrice (item) {
        if (item.priceForMemberDay) { return this.$tomoney(item.priceForMemberDay) }
        if (item.pricePromotion) { return this.$tomoney(item.pricePromotion) }
        if (item.price) { return this.$tomoney(item.price) }
      },
      // 获取二级页面数据
      async getModuleData () {
        // 获取上级页面传过来的id
        let rankId = this.$route.query.rankId || 0
        let url = '/mobileIndex/getPageRankInfo'
        let data = { pageRankId: rankId }
        let res = await this.$post(url, data)
        if (res.code === '1') {
          this.data = res.data.goodsListJson
        } else {
          this.$toast(res.message)
        }
        console.log('获取二级页面数据', res)
      }
    },
    created () {
      this.getModuleData()
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .topImg{
    width: 100vw;
    height: pr(400);
    border: none;
    display: block;
    /*margin-bottom: pr(10);*/
  }
  .listWrap {
    background: #fff;
    width: 100vw;
    box-sizing: border-box;
    padding: pr(10) pr(15);
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .item{
    width: pr(340);
    margin: pr(10);
    box-sizing: border-box;
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
