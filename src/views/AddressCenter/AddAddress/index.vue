<template>
  <div>
    <address-form ref="addressForm"></address-form>
    <button @click="$refs.addressForm.addAddress()" class="v-button">保存</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import AddressForm from '../AddressForm'

  export default {
    data () {
      return {
        addrInfo: {}
      }
    },
    components: {
      AddressForm
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .v-button {
    margin: 0 auto;
  }
</style>
