<!--我的订单 首页-->
<template>
  <div>
    <BackBar/>
    <OrderType/>
    <OrderList/>
  </div>
</template>

<script>
  import BackBar from './BackBar/index'
  import OrderType from './OrderType/index'
  import OrderList from './OrderList/index'
  export default {
    components: { OrderType, OrderList, BackBar },
    data () {
      return {
      }
    },
    methods: {},
    created () {}
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';
</style>
