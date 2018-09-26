<template>
  <div id="app">
    <login-form ref="dataForm"></login-form>
    <button class="v-button" @click="loginHandle">登录</button>
    <p class="router-links flexBox">
      <router-link class="flexChild" to="register">注册</router-link>
      <router-link class="flexChild" to="retrievePwd">忘记密码？</router-link>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import LoginForm from './LoginForm'
  export default {
    name: 'login',
    methods: {
      loginHandle () {
        this.$refs.dataForm.commitFormData()
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
      a:last-child{
        text-align: right;
      }
    }
  }
</style>
