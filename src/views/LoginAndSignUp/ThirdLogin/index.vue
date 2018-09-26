<template>
  <div id="app">
    <login-form class="login-form" ref="dataForm"></login-form>
    <button :class="{'disabled': btnStatus==0}" @click.prevent="registerHandle" class="v-button">绑定</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import LoginForm from './LoginForm'
  export default {
    name: 'register',
    methods: {
      registerHandle () {
        this.$refs.dataForm.commitFormData()
      }
    },
    computed: {
      btnStatus () {
        const status = this.$store.state.loginAndSignUp.bindmobileBtnStatus
        return status
      }
    },
    components: {
      LoginForm
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
    }
    .router-links {
      width: pr(664);
      margin: pr(16) auto;
      font-size: $normalFontSize;
      a:last-child {
        text-align: right;
      }
    }
  }
</style>

