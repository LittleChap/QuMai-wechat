<!---顶部的订单类型列表-->
<template>
  <div class="orderTypeWrap">
    <div class="orderTypeItem" :class="{active:orderType==0}" @click="changeOrderType(0)">全部</div>
    <div class="orderTypeItem" :class="{active:orderType==1}" @click="changeOrderType(1)">待付款</div>
    <div class="orderTypeItem" :class="{active:orderType==2}" @click="changeOrderType(2)">待发货</div>
    <div class="orderTypeItem" :class="{active:orderType==3}" @click="changeOrderType(3)">待收货</div>
    <div class="orderTypeItem" :class="{active:orderType==4}" @click="changeOrderType(4)">待评价</div>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {}
    },
    methods: {
      changeOrderType (type) {
        localStorage.setItem('orderStatus', type)
        this.$store.dispatch('getOrderList')
      }
    },
    computed: {
      orderType () {
        return this.$store.getters.GET_OrderStatus
      }
    },
    created () {
      this.$store.dispatch('getOrderList')
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .orderTypeWrap{
    width: 100%;
    height: pr(88);
    margin-bottom: pr(10);
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    background: #fff;
  }
  .orderTypeItem{
    width: pr(120);
    height: pr(88);
    line-height: pr(88);
    box-sizing: border-box;
    border-bottom: pr(3) solid #fff;
    font-size: $importantFontSize;
    text-align: center;
  }
  .active{
    color: $mainFontColor!important;
    border-bottom: pr(3) solid $mainFontColor!important;
  }
</style>
