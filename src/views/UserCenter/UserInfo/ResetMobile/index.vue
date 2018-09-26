<template>
  <router-view></router-view>
</template>

<script type="text/ecmascript-6">
  export default {
    created () {
      let mobile
      if (!this.userInfo) {
        this.$store.dispatch('getUserInfo')
      }
      mobile = this.userInfo.mobile
      if (mobile == null || !mobile.length) {
        this.$router.push('/loginAndSignUp/thirdLogin')
      }
    },
    computed: {
      userInfo () {
        return this.$getUser()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
