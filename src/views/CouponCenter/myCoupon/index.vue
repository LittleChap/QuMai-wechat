<template>
  <div>
    <tab :line-width=2 :custom-bar-width="'2.8rem'" v-model="index">
      <tab-item class="vux-center" v-for="(item, index) in tabList" :key="index">
        {{item}}

      </tab-item>
    </tab>
    <unused v-show="index==0"></unused>
    <already-used v-show="index==1"></already-used>
    <out-of-date v-show="index==2"></out-of-date>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Tab, TabItem} from 'vux'
  import unused from './unused.vue'
  import alreadyUsed from './alreadyUsed.vue'
  import outOfDate from './outOfDate.vue'
  export default {
    components: {
      Tab,
      TabItem,
      unused,
      alreadyUsed,
      outOfDate
    },
    data () {
      return {
        tabList: ['已领取', '已使用', '已失效'],
        index: 0
      }
    },
    destroyed () {
      this.$store.commit('CLEAR_COUPON')
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
