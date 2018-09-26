<template>
  <div class="item-wrap">
    <div class="img-box">
      <img class="item-img" :src="itemData.goodsImage" alt="">
    </div>
    <div class="item-con" >
      <div class="title">
        <h3 v-if="itemData.goodsName && itemData.goodsName.length">{{itemData.goodsName.substring(0, 1)}}<i style="font-size: 1px;" >&nbsp;</i>{{itemData.goodsName.substring(1, itemData.goodsName.length)}}</h3>
        <h3 v-else>{{itemData.goodsName}}</h3>
      </div>
      <p class="label-box" v-if="promotionArray.length"><span class="v-label" v-for="(item, index ) in promotionArray">{{item.promotionTitle}}</span>
      <p class="spec o-hidden">{{itemData.specName}}</p>
      <p class="price-box flexBox">
        <span class="price-main" v-format-price-num="itemData.price">{{itemData.price}}</span>
        <span class="num">{{itemData.num}}</span>
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      productIndex: { // 索引
        type: Number,
        default: 0
      },
      shopIndex: { // 索引
        type: Number,
        default: 0
      }
    },
    computed: {
      itemData () {
        return this.$store.getters.confirmData.shopProductArray[this.shopIndex].productArray[this.productIndex] || {}
      },
      promotionArray () {
        let array = []
        if (this.itemData.promotionTitleArray && this.itemData.promotionTitleArray.length) {
          for (let i = 0; i < this.itemData.promotionTitleArray.length; i++) {
            let promotionItem = this.itemData.promotionTitleArray[i]
            if (promotionItem.promotionTitle !== '无折扣' && promotionItem.promotionTitle !== '10折') {
              array.push(promotionItem)
            }
          }
        }
        return array
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/commom";
  .item-wrap{
    padding-left: 0;
    border-bottom: 1px solid $lineColor;
    .item-con{
      padding-right: 0;
    }
  }

</style>

