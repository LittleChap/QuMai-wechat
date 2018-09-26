<template>
  <div class="confirm-wrap">
    <address-info></address-info>
    <group-item v-for="(shopItem, shopIndex) in confirmData.shopProductArray" :key="shopIndex"
                :shopIndex="shopIndex"></group-item>
    <bill-box></bill-box>
    <bottom-box></bottom-box>
  </div>


</template>

<script type="text/ecmascript-6">
  import AddressInfo from './AddressInfo/index.vue'
  import GroupItem from './GroupItem/index.vue'
  import BillBox from './BillBox/index.vue'
  import BottomBox from './BottomBox/index.vue'
  let fromProduct = false

  export default {
    components: {
      AddressInfo,
      GroupItem,
      BillBox,
      BottomBox
    },
    data () {
      return {
        fromProduct: false
      }
    },
    beforeRouteEnter (to, from, next) {
      // 获得上一级的路径
      if (from.path.indexOf('goodsDetail') > -1 || from.path.indexOf('cart') > -1) {
        fromProduct = true
        sessionStorage.removeItem('currentAddressId')   // 清除之前选择的地址
      } else {
        fromProduct = false
      }
      next()
    },
    async created () {
      if (fromProduct) {  // 清楚之前store里面的提交信息
        this.$store.dispatch('ClearCommitData')
      }
      if (sessionStorage.getItem('payJson')) {
        let payJson = JSON.parse(sessionStorage.getItem('payJson'))
        let data = {}
        if (payJson.num) {   // 从商品详情页
          data.type = 1
          data.product = payJson
        } else { //  从购物车
          data.type = 2
          data.product = {
            cartIdArray: sessionStorage.getItem('payJson')
          }
        }
        data.router = this.$router
        await this.$store.dispatch('GetConfirmData', data)
      } else {
        this.$toast('没有相关商品信息')
        let _this = this
        setTimeout(function () {
          _this.$router.go(-1)
        }, 2000)
      }
    },
    computed: {
      confirmData () {
        return this.$store.getters.confirmData
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '~@/styles/modules/config.scss';
  .confirm-wrap {
    padding-bottom: $headerHeight;
  }

</style>

