<!--商品平铺模块-->
<template>
  <div class="mb20">
    <div v-for="data, idx in productTiledata" :key="idx">
      <div class="img_wrap" @click="gotoDetail(data)">
        <img :src="data.image" alt="" class="big_img">
        <div class="triangle" v-if="data.url_type>0"></div>
      </div>
      <div class="listWrap" v-if="data.goodsListJson && data.goodsListJson.goodsArray && data.goodsListJson.goodsArray.length">
        <div class="item" v-for="item, index in data.goodsListJson.goodsArray" :key="index" @click="$goto('/goodsDetail/'+item.goodsId)">
          <img :src="item.image" alt="" class="item_img"/>
          <div class="item_text">{{item.goodsName}}</div>
          <div class="price"><span class="f24">￥</span>{{$tomoney(getDisplayPrice(item))}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        productTiledata: []   // 接口取回来的数据
      }
    },
    methods: {
      // 判断链接的跳转类型
      gotoDetail (item) {
        let url = ''
        switch (item.url_type) {
          case 0: url = ''; break
          case 1: url = this.$router.push('/secondlevelpage?rankId=' + item.page_rank_id); break
          case 2: url = item.url; break
          case 3: url = item.url_image; break
          case 4: url = '/goodsDetail/' + item.url_goodsId; break
        }
        this.$router.push(url)
      },
      // 判断要显示哪种价格 会员日价>折扣价>销售价格
      getDisplayPrice (item) {
        if (item.priceForMemberDay) { return this.$tomoney(item.priceForMemberDay) }
        if (item.pricePromotion) { return this.$tomoney(item.pricePromotion) }
        if (item.price) { return this.$tomoney(item.price) }
      },
      // 获取商品平铺模块数据
      async getProductTileList () {
        let url = '/mobileIndex/getModuleContentList'
        let body = { moduleId: 5 }
        let res = await this.$post(url, body)
        if (res.code === '1') {
          this.productTiledata = res.data.pageContentList
        }
        this.$log('获取商品平铺模块数据', res)
      }
    },
    created () {
      this.getProductTileList()
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .mb20{margin-bottom: pr(20);}
  .img_wrap {
    width:100vw;
    position: relative;
  }
  .big_img{
    width:100vw;
    height: pr(320);
    display: block;
    margin: 0px;
    background: #fff;
  }
  .triangle {
    width: 0;
    height: 0;
    border-left: pr(20) solid transparent;
    border-right: pr(20) solid transparent;
    border-bottom: pr(25) solid #fff;
    position: absolute;
    bottom:0;
    right:pr(80);
    z-index: 9;
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
    /*border: 1px solid $lineColor;*/
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
