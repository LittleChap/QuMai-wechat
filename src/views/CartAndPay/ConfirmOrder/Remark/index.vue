<template>
  <div class="v-list-item">
    <div class="part-left">买家留言：</div>
    <div class="part-right input-box">
      <input type="text" v-model="remark" placeholder="选填，可填写您与卖家达成一致的要求" maxlength="100" @change="saveRemark">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'remark',
    props: {
      shopIndex: { // 索引
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        toRemark: null
      }
    },
    created () {
      // if (this.commitData.shopArray) {
      //   this.saveRemark()
      // }
    },
    computed: {
      commitData () {
        return this.$store.getters.commitData
      },
      remark: {
        get () {
          if (this.toRemark === null && this.commitData.shopArray) {
            this.toRemark = this.commitData.shopArray[this.shopIndex].remark || ''
          }
          return this.toRemark
        },
        set (newValue) {
          this.toRemark = newValue
        }
      }
    },
    methods: {
      saveRemark () {
        this.commitData.shopArray[this.shopIndex].remark = (this.remark || '')
        this.$store.dispatch('SetCommitData', this.commitData)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/commom";
</style>

