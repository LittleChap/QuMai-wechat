<!--商品平铺模块-->
<template>
  <div class="mb20">
    <div v-for="data, idx in productTiledata" :key="idx">
      <div class="img_wrap" @click="gotoDetail(data)">
        <img :src="data.image" alt="" class="big_img">
      </div>
      <div class="listWrap" v-if="data.goodsListJson && data.goodsListJson.goodsArray && data.goodsListJson.goodsArray.length">
        <div class="item" v-for="item, index in data.goodsListJson.goodsArray" :key="index" @click="$goto('/goodsDetail/'+item.goodsId)">
          <img :src="item.image" alt="" class="item_img"/>
          <div>
            <div class="item_text">{{item.goodsName}}</div>
            <div class="price"><span class="f28">￥</span>{{$tomoney(item.pricePromotion || item.price)}}</div>
          </div>
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
        if (item.url_type == 2) {
          window.location.href = item.url
          return
        }
        if (item.url_type == 3) {
          window.location.href = item.url_image
          return
        }
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
    background: #fff;
  }
  .big_img{
    width:100vw;
    height: pr(320);
    display: block;
    margin: 0px;
    background: #fff;
  }

  .listWrap {
    width:100vw;
    /*overflow-x: scroll;*/
    margin-bottom: pr(10);
    /*display: flex;*/
    box-sizing: border-box;
  }
  .item{
    box-sizing: border-box;
    overflow: hidden;
    flex-shrink: 0;
    flex-grow: 0;
    display: flex;
    padding: pr(20) pr(24);
    background: #fff;
    margin-bottom: pr(10);
  }
  .item_img{
    width: pr(174);
    height: pr(174);
    display: inline-block;
    border: none;
    margin: 0;
    padding: 0;
    border-radius: pr(10);
    margin-right: pr(20);
    flex-shrink: 0;
  }
  .item_text{
    margin-top: pr(18);
    line-height: pr(42);
    height: pr(84);
    font-size: pr(28);
    color:#333;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    /*border:1px solid #f00;*/
  }
  .f28{
    font-size: pr(28);
  }
  .price{
    font-size: pr(32);
    color:$mainFontColor;
  }
</style>
