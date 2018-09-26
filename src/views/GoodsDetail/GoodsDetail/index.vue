<template>
  <div id="app" v-if="isInit">
    <pull-to-detail :cb="openDetail" :limited="false">
      <v-header></v-header>
      <banner></banner>
      <section class="goods-info-block">
        <div class="detail-block flexBox">
          <goods-title class="flexChild"></goods-title>
          <div @click="openDetail" class="to-detail">
            <i class="icon-details"></i>
            <span>
              查看详情
            </span>
          </div>
        </div>
        <p>
          <goods-discription></goods-discription>
        </p>
        <p class="flexBox">
          <goods-price></goods-price>
          <goods-info></goods-info>
        </p>
        <p>
          <store-address></store-address>
        </p>
      </section>
      <coupon-list></coupon-list>
      <section>
        <spec-info></spec-info>
        <freight-info></freight-info>
      </section>
      <goods-comments></goods-comments>
      <feature-goods-slider></feature-goods-slider>
    </pull-to-detail>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import PullToDetail from '../PullToDetail.vue'
  import FeatureGoodsSlider from '@/components/FeatureGoodsSlider'
  import Banner from './Banner/Index'
  import CouponList from './CouponList/index'
  import FreightInfo from './FreightInfo/Index'
  import GoodsComments from './GoodsComments/index'
  import GoodsDiscription from './GoodsDiscription/Index'
  import GoodsInfo from './GoodsInfo/Index'
  import GoodsPrice from './GoodsPrice/Index'
  import GoodsTitle from './GoodsTitle/Index'
  import VHeader from './VHeader/Index'
  import VFooter from './VFooter/index'
  import SpecInfo from './SpecInfo/Index'
  import StoreAddress from './StoreAddress/index'

  export default {
    name: 'GoodsDetail',
    data () {
      return {
        hostUrl: `${window.location.protocol}//${window.location.host}`,
        goodsId: this.$route.params.id,
        storeName: '观前街1号'
      }
    },
    methods: {
      openDetail () {
        this.$router.push(`/goodsDetail/${this.goodsId}/graphicTxtDetail`)
      },
      initShare (goodsName, image) {
        const _this = this
        this.$wechat.initShare(this.globalUrl, `${this.hostUrl}/goodsDetail/${this.goodsId}`, image, goodsName, `我在「${this.storeName}」发现了一个不错的宝贝，赶紧来看看吧~`, function () {
          _this.$store.commit('SET_SHAREWIN', false)
        })
      }
    },
    computed: {
      globalUrl () {
        return this.$store.state.mainStore.globalUrl
      },
      isInit () {
        return this.$store.state.GoodsDetail.isInit
      }
    },
    watch: {
      '$route' () {
        this.goodsId = this.$route.params.id
        const actionParams = {
          cb: this.initShare,
          goodsId: this.goodsId
        }
        this.$store.commit('SET_SPECWIN', false)
        this.$store.dispatch('getGoodsDetail', actionParams)
      }
    },
    created () {
      const actionParams = {
        cb: this.initShare,
        goodsId: this.goodsId
      }
      this.$store.dispatch('getGoodsDetail', actionParams)
    },
    destroyed () {
      if (this.$route.path.indexOf('graphicTxtDetail') < 0) {
        this.$store.commit('REMOVE_GOODSSTATE')
      }
      this.$store.commit('SET_SPECWIN', false)
    },
    components: {
      PullToDetail,
      Banner,
      CouponList,
      FreightInfo,
      GoodsComments,
      GoodsDiscription,
      GoodsInfo,
      GoodsPrice,
      GoodsTitle,
      VHeader,
      VFooter,
      SpecInfo,
      StoreAddress,
      FeatureGoodsSlider
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  #app {
    padding-bottom: $footerHeight;
  }

  section {
    @include wrapPadding();
    @include blockMargin();
    width: 100vw;
    background-color: $blockDefaultColor;
    &.feature-goods {
      color: $importantInfoAndTitleColor;
      font-size: $headerTextFontSize;
      line-height: pr(40);
      padding: pr(24) 0;
      overflow-x: hidden;
      padding-right: 0;
    }
    &.goods-info-block {
      padding-bottom: pr(20);
    }
  }

  .detail-block {
    .to-detail {
      margin: pr(20) 0;
      padding-left: pr(24);
      /*height:pr(70);*/
      text-align: center;
      width: pr(128);
      color: #999;
      border-left: 1px solid #e6e6e6;
      i {
        font-size: pr(48);
        display: block;
      }
      span {
        display: block;
        font-size: $smallFontSize;

      }
    }
  }
</style>
