<template>
  <div v-if="userInfo" id="app">
    <p class="phone-num">绑定手机号：{{phoneNum}}</p>
    <form>
      <input id="oldPassWord" name="oldPassWord" @keyup="checkBtnStatus" @keydown="checkBtnStatus" class="v-input" type="password" v-model="oldPassWord"
          placeholder="请输入原登录密码"/>
      <p>
        <input id="validCode" name="validCode" @keyup="checkBtnStatus" @keydown="checkBtnStatus" class="v-input" type="text" maxlength="4" v-model="validCode"
            placeholder="请输入验证码"/>
        <img :src="validCodeUrl" @click="getValidCodeImg" alt="">
      </p>
      <p class="flexBox">
        <input id="smsCode" @keyup="checkBtnStatus" @keydown="checkBtnStatus" name="smsCode"
            class="v-input sms-input flexChild" type="text" maxlength="6" v-model="smsCode" placeholder="请输入验证码"/>
        <button v-if="!sendMsgDisabled" @click.prevent="getSmsCode" class="v-button sms-button">获取短信验证码</button>
        <button v-if="sendMsgDisabled" disabled class="v-button disabled sms-button">{{countDownTime}}</button>
      </p>
    </form>
    <button class="v-button" :class="{'disabled': btnStatus==0}" @click="nextStep">下一步</button>
    <p class="forget-pwd"><router-link to="/loginAndSignUp/retrievePwd">忘记密码</router-link></p>
  </div>
</template>

<script type="text/ecmascript-6">
  import {hidePhoneNum, getImgUrl} from '@/utils/utils'
  import {fetch} from '@/utils/fetch'
  export default {
    data () {
      return {
        countDownTime: 60,
        oldPassWord: '',
        sendMsgDisabled: false,
        validCode: '',
        validToken: '',
        smsCode: '',
        validCodeUrl: '',
        btnStatus: false
      }
    },
    computed: {
      phoneNum () {
        const phoneNum = this.$store.state.UserCenter.userInfo.mobile
        return hidePhoneNum(phoneNum)
      },
      userInfo () {
        return this.$store.state.UserCenter.userInfo
      }

    },
    methods: {
      async nextStep () {
        const _this = this
        if (this.oldPassWord && this.smsCode && this.btnStatus) {
          const url = '/mobileMember/editPasswordStepOne.do'
          const data = {
            pwd: this.oldPassWord,
            smsCode: this.smsCode
          }
          const res = await fetch(url, data)
          if (parseInt(res.code) === 1) {
            _this.$store.commit('SET_EDITKEY', res.data.editKey)
            _this.$router.push('stepTwo')
          }
        }
      },
      checkBtnStatus () {
        if (this.smsCode.length > 0 & this.oldPassWord.length > 0) {
          this.btnStatus = true
        } else {
          this.btnStatus = false
        }
      },
      getValidCodeImg () {
        const getURL = getImgUrl()
        const validToken = new Date().getTime()
        this.validToken = validToken
        this.validCodeUrl = `${getURL}?validToken=${validToken}`
      },
      async getSmsCode () {
        if (!this.validCode) {
          return this.$toast('请输入图形验证码')
        }
        const url = '/mobileMessage/sendSmsCode.do'
        const data = {
          mobile: this.$store.state.UserCenter.userInfo.mobile,
          type: 3,
          validToken: this.validToken,
          validCode: this.validCode
        }
        const res = await fetch(url, data)
        this.$toast(res.message)
        if (parseInt(res.code) === 1) {
          let _this = this
          _this.sendMsgDisabled = true
          let interval = window.setInterval(function () {
            if ((_this.countDownTime--) <= 0) {
              _this.countDownTime = 60
              _this.sendMsgDisabled = false
              window.clearInterval(interval)
            }
          }, 1000)
        }
      }
    },
    created () {
      this.getValidCodeImg()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  #app {
    background: #fff;
    min-height: 100vh;
    .phone-num {
      padding: pr(30) pr(40);
      color: $paragraphColor;
      font-size: $importantFontSize;
    }
    form {
      text-align: center;
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
    .forget-pwd {
      padding:0 pr(40);
      font-size:$normalFontSize;
      text-align: right;
    }
  }

  .v-button {
    margin: 0 auto;
    margin-bottom: pr(16);
  }
</style>
