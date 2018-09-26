<template>
  <div class="shop-wrap block">
    <div class="shop-title">
      <i class="v-single-select"
         :class="{'icon-change-highlight': groupData.checked, 'icon-change-disable': !groupData.checked }"
         @click="select"></i>
      <span>{{groupData.shopName}}</span>
    </div>
    <item v-for="(item, key) in groupData.productArray" :key="key" :productIndex="key" :shopIndex="shopIndex"
          :item="item"></item>
  </div>


</template>

<script type="text/ecmascript-6">
  import {CheckIcon} from 'vux'
  import Item from '../Item/index.vue'
  export default{
    components: {
      Item,
      CheckIcon
    },
    props: {
      shopIndex: { // 索引
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        groupCheck: false
      }
    },
    computed: {
      groupData () {
        return this.$store.getters.cartList[this.shopIndex]
      }
    },
    methods: {
      // 选中店铺
      select () {
        this.groupData.checked = !this.groupData.checked
        this.$store.dispatch('SetSelectCart', {
          shopIndex: this.shopIndex,
          productIndex: -1,
          checked: this.groupData.checked
        })
      }
    }

  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/commom";
  .shop-wrap {
    .v-single-select {
      display: inline-block;
      margin: 0 pr(20) 0 pr(24);
    }
  }

</style>

