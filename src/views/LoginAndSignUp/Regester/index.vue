<template>
  <div id="app">
    <register-form ref="dataForm"></register-form>
    <button :class="{'disabled': btnStatus==0}" @click.prevent="registerHandle" class="v-button">注册</button>
    <p class="router-links flexBox">
      <router-link class="flexChild" to="login">登录</router-link>
      <router-link class="flexChild" to="retrievePwd">忘记密码？</router-link>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import RegisterForm from './RegisterForm'
  export default {
    name: 'register',
    methods: {
      registerHandle () {
        this.$refs.dataForm.commitFormData()
      }
    },
    computed: {
      btnStatus () {
        const status = this.$store.state.loginAndSignUp.registerBtnStatus
        return status
      }
    },
    components: {
      RegisterForm
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
