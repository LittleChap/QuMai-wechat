<template>
  <div ref="touchbar">
    <tab v-show="showHeader" :line-width=2 :custom-bar-width="'4rem'" v-model="index">
      <tab-item class="vux-center" v-for="(item, index) in tabList" :key="index">
        {{item}}
      </tab-item>
    </tab>
    <GoTop @clic="showHeader = true"/>
    <div id="srcollWrap" class="graphic-detail" v-html="detail" v-show="index == 0"></div>
    <div v-show="index == 1">
      <table>
        <tr v-for="line in propertyArray">
          <td>{{line.propertyKey}}</td>
          <td><span>{{line.propertyValue}}</span></td>
        </tr>
      </table>
    </div>
    <goTop element="#srcollWrap" @click.native="showHeader = true"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Tab, TabItem, Swiper, SwiperItem} from 'vux'
  export default {
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    data () {
      return {
        tabList: ['图文详情', '规格参数'],
        index: 0,
        begin: 0,
        showHeader: true
      }
    },
    methods: {
      touchMethod (e) {
        console.log(e)
      }
    },
    computed: {
      detail () {
        return this.$store.state.GoodsDetail.goodsDetail.detail
      },
      pageStatus () {
        return this.$store.state.GoodsDetail.goodsDetail.detail ? 1 : 0
      },
      propertyArray () {
        return this.$store.state.GoodsDetail.goodsDetail.propertyArray
      }
    },
    mounted () {
      if (!this.pageStatus) { // 刷新页面后返回商品详情页
        this.$router.go(-1)
      }
      let touchbar = this.$refs.touchbar
      let _this = this
      touchbar.addEventListener('touchstart', (e) => {
        _this.begin = e.targetTouches[0].pageY
      }, false)
      touchbar.addEventListener('touchmove', (e) => {
        let touchHeight = _this.begin - e.targetTouches[0].pageY
        if (touchHeight < -20) {
          _this.showHeader = true
        }
        if (touchHeight > 20) {
          _this.showHeader = false
        }
      }, false)
//      touchbar.onscroll = (e) => {
//        let touchHeight = _this.begin - e.target.scrollTop
// //        console.log(touchHeight)
//        if (touchHeight < -20) {
//          _this.showHeader = true
//        }
//        if (touchHeight > 20) {
//          _this.showHeader = false
//        }
//      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  #graphic-detail {
    padding-top: pr(88)
  }

  table {
    font-size: $importantFontSize;
    text-align: center;
    margin: 0 auto;
    margin-top: pr(98);
    width: pr(700);
    border-collapse: collapse;
    color: $paragraphColor;
    tr, thead {
      border: 1px solid $lineColor;
      line-height: pr(88);
      td:first-child {
        border: 1px solid $lineColor;
        width: pr(240);
        background: #fafafa;
      }
      td:last-child {
        background: #fff;
        span:not(:last-child):after {
          content: ',';
        }
      }
    }
  }

  .vux-tab {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 999;
  }

  .wrapper {
    padding-top: $defaultHeight;
  }
</style>
