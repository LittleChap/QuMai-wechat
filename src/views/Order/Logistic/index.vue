<!--查看物流-->
<template>
  <div>

    <!--包裹选择 开始-->
    <div class="bgw dsf p24 bdb mb10" v-if="logisticIDs.length">
      <div class="packageItem" :class="{active:currentParcel==index}" v-for="item, index in logisticIDs" :key="index"
          @click="changParcel(item, index)">
        <div class="packageCar"><i class="icon-logistics"></i></div>
        <div class="f28 mt10">包裹{{index + 1}}</div>
      </div>
    </div>
    <!--包裹选择 结束-->

    <!--商品图片和快递单号 开始-->
    <div class="mtb10 bgw bdb dsf p24">
      <div class="goods" v-if="logisticIDs.length">
        <img :src="goodsImg" alt="" class="goodsImg">
        <div class="goodsLabel">{{goodsCount}}件商品</div>
      </div>

      <div class="f28 lh50 dsf aic c333">
        物流公司：{{logisticDetail.com || '暂无'}} <br>
        物流单号：{{logisticDetail.nu || '暂无'}}

      </div>
    </div>
    <!--商品图片和快递单号 结束-->

    <!--物流进度 开始-->
    <div class="bgw p24" v-if="logisticIDs.length">
      <div class="logWrap" :class="{red:index == 0}" v-for="item, index in logisticDetail.data" :key="index">
        <div class="logTime">{{formatDate(item.time)}}<br> <span class="f24">{{formatTime(item.time)}}</span></div>
        <div class="logIcon">
          <i class="icon-logistics-highlight bgw red" v-if="index==0"></i>
          <i class="icon-logistics-disable bgw" v-else></i>
        </div>
        <div class="logText">{{item.context}}</div>
      </div>
    </div>
    <!--物流进度 结束-->
  </div>
  <!--<i class="icon-logistics-disable"></i>-->
  <!--<i class="icon-logistics-highlight"></i>-->
</template>

<script>
  import moment from 'moment'
  export default {
    components: {},
    data () {
      return {
        logisticIDs: [],
        currentParcel: 0,
        logisticDetail: {
          com: '暂无',
          nu: '暂无'
        },
        goodsCount: 0,
        goodsImg: ''
      }
    },
    methods: {
      // 格式化日期
      formatDate (dt = '1971-01-01') {
        return moment(dt).format('YYYY-MM-DD')
      },
      // 格式化日期
      formatTime (dt = '1971-01-01') {
        return moment(dt).format('HH:mm')
      },
      // 切换显示包裹
      changParcel (item, index) {
        this.currentParcel = index
        this.getLogisticDetail(item)
      },
      // 根据包裹的单号，查询包裹的详细信息
      async getLogisticDetail (logistic) {
        if (logistic.logisticsDistributionId && logistic.logisticsDistributionSn) {
          let url = '/mobileSellerLogistics/viewLogistics'
          let body = {
            logistics_distribution_id: logistic.logisticsDistributionId,
            logistics_distribution_sn: logistic.logisticsDistributionSn,
            isOrder: logistic.isOrder
          }
          let res = await this.$post(url, body)
          if (res.code == 1) {
            this.logisticDetail = JSON.parse(res.data.logistics)
            this.goodsCount = res.data.num
            this.goodsImg = res.data.img
          } else {
            this.$toast(res.message)
          }
        }
      }
    },
    created () {
      this.logisticIDs = JSON.parse(this.$route.query.logisticIDs || '[]')
      // console.log('转换前', this.$route.query.logisticIDs)
      // console.log('转换后', this.logisticIDs)
      // this.logisticIDs = this.logisticIDs.concat(this.logisticIDs)
      // 如果有单号，就去查询第一个单号，并且显示
      if (this.logisticIDs.length) {
        this.getLogisticDetail(this.logisticIDs[0])
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  @import '~@/styles/noahcommon.scss';

  .red {
    color: $buttonColor !important;
  }

  .packageItem {
    margin-right: pr(40);
    font-size: $titleFontSize;
    color: $supportTextColor;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .packageCar {
    font-size: pr(60);
    width: pr(60);
    height: pr(60);
    border-radius: pr(30);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $lineColor;
  }

  .active {
    color: $buttonColor !important;
    .packageCar {
      border: 1px solid $buttonColor !important;
    }
  }

  .goods {
    width: pr(150);
    height: pr(150);
    border-radius: pr(8);
    margin-right: pr(20);
    position: relative;
    overflow: hidden;
  }

  .goodsImg {
    width: pr(150);
    height: pr(150);
    display: block;
    border-radius: pr(8);
    border: 1px solid $lineColor;
    margin-right: pr(20);
  }

  .goodsLabel {
    width: 100%;
    left: 0;
    bottom: 0;
    position: absolute;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    font-size: $normalFontSize;
    line-height: pr(40);
    text-align: center;
  }

  .logWrap {
    display: flex;
    padding: pr(30) 0;
    font-size: $normalFontSize;
    line-height: pr(40);
    color: $importantInfoAndTitleColor;
    position: relative;
    .logTime {
      flex-shrink: 0;
      width: pr(180);

    }
    .logIcon {
      flex-shrink: 0;
      margin-right: pr(30);
      margin-top: pr(10);
      font-size: pr(40);
      z-index: 100;
      color: #cccccc;
    }
  }

  .logWrap:before {
    content: ' ';
    top: 0;
    display: block;
    position: absolute;
    left: pr(200);
    height: 100%;
    width: 1px;
    background: $lineColor;
    overflow: hidden;
  }

  .logWrap:first-child:before {
    top: pr(60);
    height: calc(100% - 1.2rem);
  }

  .logWrap:last-child:before {
    height: pr(60);
  }
</style>
