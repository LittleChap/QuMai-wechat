<template>
  <div class="item-wrap">
    <div class="top flexBox">
      <span>积分
        <strong :class="{'add': itemData.points>=0 , 'dis': itemData.points<0 }"> {{itemData.points < 0 ? itemData.points : ('+' + itemData.points)   }}</strong>
      </span>
      <span class="time">{{itemData.createTime}}</span>
    </div>
    <div class="content">
      {{itemData.messageContent}}
    </div>
  </div>


</template>

<script type="text/ecmascript-6">
  export default{
    name: 'item',
    data () {
      return {}
    },
    props: {
      itemData: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";
  .item-wrap {
    @include wrapPadding;
    @include blockMargin;
    background: #fff;
    font-size: $importantFontSize;
    color: $importantInfoAndTitleColor;
    border-top: 1px solid $lineColor;
    border-bottom: 1px solid $lineColor;
    .top{
      line-height: pr(80);
      justify-content: space-between;
      border-bottom: 1px solid $lineColor;
      .time{
        color: $supportTextColor;
      }
      strong{
        &.add {
          color: $mainFontColor;
        }
        &.dis {
          color: $saleTextColor;
        }
      }
    }
    .content{
      padding: pr(14) 0 ;
      line-height: pr(40);
    }
  }

</style>

