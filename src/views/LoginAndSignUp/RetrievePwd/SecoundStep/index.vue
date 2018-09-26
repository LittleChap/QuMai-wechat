<template>
  <p>{{phoneNum}}</p>
</template>

<script type="text/ecmascript-6">
  import {hidePhoneNum} from '@/utils/utils'
  export default {
    computed: {
      phoneNum () {
        const phoneNum = this.$store.state.loginAndSignUp.retrieve.phoneNum
        return hidePhoneNum(phoneNum)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
