<template>
  <div>
    <div v-if="addressList.length">
      <address-item v-for="item in addressList" :key="item.addressId" :item="item"></address-item>
      <button @click="toAddAddress" class="v-button">新增收货地址</button>
    </div>
    <div v-if="!addressList.length">
      <div class="v-empty-status">
        <img src="./empty.png" alt="">
        <p>您还未设置收货地址哦，请点击<br/>下方按钮设置地址吧！</p>
        <button @click="toAddAddress" class="empty-button v-button">新增收货地址</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import AddressItem from './AddressItem/index.vue'

  export default {
    components: {
      AddressItem
    },
    created () {
      this.$store.dispatch('getAddressList')
    },
    methods: {
      toAddAddress () {
        if (this.addressList.length < 10) {
          this.$router.push('/addressList/addAddress')
        } else {
          this.$toast('收货地址最多设置10个！')
        }
      }
    },
    computed: {
      addressList () {
        return this.$store.state.AddressCenter.addressList
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index";

  .v-button {
    margin: pr(60) auto 0;
  }
</style>
