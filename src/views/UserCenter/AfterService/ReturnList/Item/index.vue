<template>
  <div class="item-wrap">
    <div class="top flexBox center">
      <div class="leftPart">
        <p>订单编号：{{item.orderCode}}</p>
        <p>下单时间：{{item.orderTime}}</p>
      </div>
      <span class="rightPart" v-if="item.returnStatus === 0">退款待审核</span>
      <span class="rightPart" v-if="item.returnStatus === 1">同意退款申请</span>
      <span class="rightPart" v-if="item.returnStatus === 2">退款成功</span>
      <span class="rightPart" v-if="item.returnStatus === 3">退款关闭</span>

      <span class="rightPart" v-if="item.returnStatus === 4">退货待审核</span>
      <span class="rightPart" v-if="item.returnStatus === 5">同意退货申请</span>
      <span class="rightPart" v-if="item.returnStatus === 6">卖家已签收</span>
      <span class="rightPart" v-if="item.returnStatus === 7">退货成功</span>
      <span class="rightPart" v-if="item.returnStatus === 8">退货关闭</span>

      <span class="rightPart" v-if="item.returnStatus === 9">换货待审核</span>
      <span class="rightPart" v-if="item.returnStatus === 10">同意换货申请</span>
      <span class="rightPart" v-if="item.returnStatus === 11">卖家已签收</span>
      <span class="rightPart" v-if="item.returnStatus === 12">换货商品寄出</span>
      <span class="rightPart" v-if="item.returnStatus === 13">换货成功</span>
      <span class="rightPart" v-if="item.returnStatus === 14">换货关闭</span>
    </div>
    <div class="contentWrap flexBox">
      <img :src="item.goodsImage" alt="">
      <div class="content">
        <h3>{{item.goodsName}}</h3>
        <div class="bottomWrap flexBox">
          <div class="priceBox">
          <p>规格：{{item.specName}}</p>
          <p>数量：{{item.applyNum}}</p>
          </div>
          <router-link class="button"
                       :to="{path:'/userCenter/returnProcess',query:{returnOrderItemId: item.returnOrderItemId}}">进度查询
          </router-link>
        </div>
      </div>

    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      item: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";
  .item-wrap{
    @include blockMargin;
    border-top: 1px solid $lineColor;
    border-bottom: 1px solid $lineColor;
    .top{
      @include wrapPadding;
      justify-content: space-between;
      height: pr(108);
      background: #fff;
      font-size: $importantFontSize;
      .leftPart{
        color: $paragraphColor;
        line-height: pr(42);
      }
      .rightPart{
        color: $importantInfoAndTitleColor;
      }
    }
    .contentWrap{
      @include wrapPadding;
      padding-top: pr(20);
      padding-bottom: pr(20);
      background: $blockProductColor;
      img{
        width: pr(190);
        height: pr(190);
        border: 1px solid $lineColor;
        border-radius: pr(4);
        background: #fff;
      }
      .content{
        flex: 1;
        padding-left: pr(18);
        font-size: $importantFontSize;
        h3{
          height: pr(80);
          line-height: pr(40);
          overflow: hidden;
          white-space: normal;
          text-overflow: ellipsis;
          word-wrap: break-word;
          display:-webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .bottomWrap{
          justify-content: space-between;
          align-items: flex-end;
          .priceBox{
            flex: 1;
            margin-top: pr(14);
            line-height: pr(48);
            font-size: $normalFontSize;
            color: $supportTextColor;
          }
          .button{
            flex: 0 0 pr(158);
            display: inline-block;
            height: 100%;
            width: pr(156);
            line-height: pr(58);
            text-align: center;
            background: #fff;
            border: 1px solid $mainFontColor;
            border-radius: pr(30);
            color: $mainFontColor;
            font-size: $normalFontSize;
          }
        }
      }
    }
  }

</style>

