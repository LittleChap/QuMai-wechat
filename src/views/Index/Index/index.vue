<!--首页-->
<template>
  <div id="scrollwrap">
    <SearchBar/>
    <PopAdvertise/>
    <div style="display: flex; flex-direction: column;">
      <!--轮播图模块-->
      <div :style="{order: moduleOrder.appBannerModulePlugin}">
        <swiper :list="swiperData" height="8.533rem" v-model="currentWeiperIndex" dots-position="center" :loop="true"
            :show-desc-mask="false" :auto="true" dots-class="dotStyle" @on-index-change="swiperIndexChange"></swiper>
      </div>
      <!--活动图标模块-->
      <div :style="{order: moduleOrder.appActivityModulePlugin}">
        <ActiveIconBar/>
      </div>
      <!--滑动商品模块-->
      <div :style="{order: moduleOrder.appGoodsSlideModulePlugin}">
        <RecommondProduct/>
      </div>
      <!--平铺商品模块-->
      <div :style="{order: moduleOrder.appGoodsTileModulePlugin}">
        <ProductTile/>
      </div>
      <div class="blank" style="order:999;">&nbsp;</div>
    </div>
    <BottomTab :index="1"/>
    <GoTop element="#scrollwrap"/>
    <!--<POP v-model="showModel">-->
    <!--<div style="position: absolute; bottom: 0; background: #fff; height: 100px; overflow: scroll; width: 100%;">-->
    <!--asdfasdfasdfasdfs <br>-->
    <!--asdfasdfasdfasdfs <br>-->
    <!--asdfasdfasdfasdfs <br>-->
    <!--</div>-->
    <!--</POP>-->
  </div>
</template>

<script>
  import SearchBar from './SearchBar/index'
  import ActiveIconBar from './ActiveIconBar/index'
  import RecommondProduct from './RecommondProduct/index'
  import PopAdvertise from './PopAdvertise/index'
  import ProductTile from './ProductTile/index'

  export default {
    components: {SearchBar, ActiveIconBar, RecommondProduct, PopAdvertise, ProductTile},
    data () {
      return {
        // showModel: true,
        currentWeiperIndex: 0, // swiper 的当前页面
        swiperData: [], // swiper 的数据
        moduleData: [],  // 商品平铺模块的数据
        moduleOrder: {}  // 模块排序
      }
    },
    methods: {
      // swiper 小按钮切换事件
      swiperIndexChange (index) {
        this.currentWeiperIndex = index
      },
      // 根据模块名称 查询模块排序
      // queryModuleOrder (moduleName) {
      //   for (let i in this.moduleOrder) {
      //     if (this.moduleOrder[i].pluginId == moduleName) {
      //       // console.log(moduleName + '的排序顺序是', i)
      //       return i
      //     }
      //   }
      // },
      async getSwiperData () {
        let url = '/mobileIndex/getModuleContentList'
        let data = {moduleId: 1}
        let res = await this.$post(url, data)
        if (res.code === '1') {
          res.data.pageContentList.map(item => {
            let url = ''
            switch (item.url_type) {
              case 0:
                url = ''
                break
              case 1:
                url = '/secondlevelpage?rankId=' + item.page_rank_id
                break
              case 2:
                url = item.url
                break
              case 3:
                url = item.url_image
                break
              case 4:
                url = '/goodsDetail/' + item.url_goodsId
                break
            }
            this.swiperData.push({img: item.image, url: url, title: item.title})
          })
        } else {
          this.$toast(res.message)
        }
        this.$log('请求结果', res)
      },
      // 获取首页模块排序
      async getModuleOrder () {
        let url = '/mobileIndex/listModules.do'
        let res = await this.$post(url, {})
        if (res.code == 1) {
          // this.moduleOrder = res.data.pageModuleList
          for (let i in res.data.pageModuleList) {
            this.moduleOrder[res.data.pageModuleList[i].pluginId] = i
          }
        } else {
          this.$toast(res.message)
        }
      }
    },
    created () {
      this.getModuleOrder()
      this.getSwiperData()
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';

  .dotStyle {
    background: #f7c02a;
    color: #f7c02a;
  }
  .blank{
    width: 100vw;
    height: pr(88);
    flex-shrink: 0;
  }
</style>
