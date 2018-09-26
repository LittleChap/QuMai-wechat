<template>
  <div v-if="userInfo" id="app">
    <form>
      <input id="oldPassWord" name="oldPassWord" class="v-input" type="password" v-model="oldPassWord"
          placeholder="请输入原登录密码"/>
    </form>
    <button class="v-button" :class="{'disabled': btnStatus==0}" @click="nextStep">确定</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import {fetch} from '@/utils/fetch'
  export default {
    data () {
      return {
        pwd: '',
        btnStatus: false
      }
    },
    computed: {
      editKey () {
        return this.$store.state.UserCenter.resetPwd.editKey
      }
    },
    methods: {
      async nextStep () {
        const _this = this
        if (this.btnStatus && this.pwd) {
          const url = '/mobileMember/editPasswordStepTwo.do'
          const data = {
            pwd: this.oldPassWord,
            editKey: this.$store.state.UserCenter.resetPwd.editKey
          }
          const res = await fetch(url, data)
          if (parseInt(res.code) === 1) {
            _this.$toast('成功')
            setTimeout(() => {
              _this.$router.go(-2)
            }, 2000)
          }
        }
      },
      checkBtnStatus () {
        if (this.pwd.length > 0) {
          this.btnStatus = true
        } else {
          this.btnStatus = false
        }
      }
    },
    created () {
      if (!this.$store.state.UserCenter.resetPwd.editKey) {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  #app {
    background: #fff;
    min-height: 100vh;
    form {
      padding-top:pr(50);
      text-align: center;
      margin-bottom: pr(16);
      input {
        margin-bottom: pr(16);
        &::-webkit-input-placeholder {
          color: #d2d2d2;
        }
      }
      p {
        width: pr(664);
        margin: 0 auto;
        text-align: left;
        font-size: 0;
        .sms-input {
          margin-bottom: 0;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-right: none;
        }
        .sms-button {
          font-size: pr(28);
          width: pr(240);
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        #validCode {
          width: pr(452);
          font-size: $importantFontSize;
          display: inline-block;
          vertical-align: middle;
        }
        img {
          margin-left: pr(16);
          width: pr(196);
          height: pr(88);
          display: inline-block;
          vertical-align: top;
          background: #d2d2d2;
          border-radius: $borderRadius;
        }
      }
    }
  }

  .v-button {
    margin: 0 auto;
    margin-bottom: pr(16);
  }
</style>
