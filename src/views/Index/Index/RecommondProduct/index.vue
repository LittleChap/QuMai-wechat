<!--推荐产品-->
<template>
  <div style="background: #fff;">
    <div v-for="item, index in moduleData" :key="index">
      <div class="img_wrap" @click="gotoDetail(item)">
        <img :src="item.image" alt="" class="big_img">
        <div class="triangle" v-if="item.url_type>0"></div>
      </div>
      <div class="item_wrap" v-if="item.url_type>0 && item.goodsListJson && item.goodsListJson.goodsArray">
        <div class="item" v-for="i, idx in item.goodsListJson.goodsArray" :key="idx" @click="$goto('/goodsDetail/'+i.goodsId)">
          <img :src="i.image" alt="" class="img"/>
          <div class="text">{{i.goodsName}}</div>
          <div class="price"><span class="f24">￥</span>{{$tomoney(i.pricePromotion || i.price)}}</div>
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
        moduleData: []
      }
    },
    computed: {},
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
          case 1: url = '/secondlevelpage?rankId=' + item.page_rank_id; break
          case 2: url = item.url; break
          case 3: url = item.url_image; break
          case 4: url = '/goodsDetail/' + item.url_goodsId; break
        }
        this.$router.push(url)
      },
      async getRecommondModuleData () {
        let url = '/mobileIndex/getModuleContentList'
        let data = { moduleId: 2 }
        let res = await this.$post(url, data)
        if (res.code === '1') {
          this.moduleData = res.data.pageContentList
        } else {
          this.$toast(res.message)
        }
        this.$log('获取推荐商品', res)
      }
    },
    created () {
      this.getRecommondModuleData()
    },
    mounted () {}
  }
</script>

<style lang="scss" scoped  rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .img_wrap {
    width:100vw;
    margin-bottom: pr(20);
    position: relative;
  }
  .big_img{
    width:100vw;
    height: pr(320);
    display: block;
    margin: 0px;
  }
  .item_wrap {
    width:100vw;
    overflow-x: scroll;
    margin-bottom: pr(10);
    padding:0 pr(10);
    display: flex;
    box-sizing: border-box;
  }
  .item_wrap::-webkit-scrollbar {display:none;}
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
  .item{
    width:pr(210);
    box-sizing: border-box;
    overflow: hidden;
    flex-shrink: 0;
    flex-grow: 0;
    margin:0 pr(10);
  }
  .img{
    width: pr(210);
    height: pr(210);
    display: block;
    border-radius: pr(10);
    border:1px solid $lineColor;
  }
  .text{
    margin-top: pr(18);
    width: pr(210);
    line-height: pr(32);
    height: pr(64);
    font-size: pr(26);
    color:#333;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    /*border:1px solid #f00;*/
  }
  .f24{
    font-size: $normalFontSize!important;
  }
  .price{
    width: pr(174);
    line-height: pr(64);
    font-size: $importantFontSize;
    color:$mainFontColor;
  }
</style>
