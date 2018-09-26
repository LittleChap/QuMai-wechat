<template>
  <div>
    <address-form v-if="isInit" ref="addressForm"></address-form>
    <button @click="$refs.addressForm.editAddress()" class="v-button">保存</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import AddressForm from '../AddressForm'

  export default {
    data () {
      return {
        addressId: this.$route.params.id
      }
    },
    components: {
      AddressForm
    },
    async created () {
      this.$store.dispatch('getAddressItem', this.addressId)
    },
    computed: {
      isInit () {
        return this.$store.state.AddressCenter.addressInfo.addressId
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .v-button {
    margin: 0 auto;
  }
</style>
