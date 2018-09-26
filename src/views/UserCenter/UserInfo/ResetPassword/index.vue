<template>
  <router-view></router-view>
</template>

<script type="text/ecmascript-6">
  export default {
    created () {
      if (!this.userInfo) {
        this.$store.dispatch('getUserInfo')
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
