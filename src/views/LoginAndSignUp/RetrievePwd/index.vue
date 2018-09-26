<template>
  <div id="app">
    <first-step v-if="showStep == 1"></first-step>
    <secound-step v-else-if="showStep == 2"></secound-step>
  </div>
</template>

<script type="text/ecmascript-6">
  import FirstStep from './FirstStep'
  import SecoundStep from './SecoundStep'
  export default {
    name: 'retrievePwd',
    components: {
      FirstStep,
      SecoundStep
    },
    computed: {
      showStep () {
        return this.$store.state.loginAndSignUp.retrieve.step
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  #app {
    background-color: #fff;
    width: 100vw;
    height: 100vh;
    .v-button {
      margin: 0 auto;
      margin-bottom: pr(16);
    }
    .router-links {
      width: pr(664);
      margin: 0 auto;
      font-size: $normalFontSize;
      a:last-child {
        text-align: right;
      }
    }
  }

</style>
