<template>
  <div v-if="userInfo" id="app">
    <p class="phone-num">绑定手机号：{{phoneNum}}</p>
    <form>
      <p>
        <input id="phoneNum" @keyup="checkBtnStatus" @keydown="checkBtnStatus" name="phoneNum" class="v-input"
            type="tel" maxlength="11" v-model="newPhoneNum" placeholder="请输入手机号"/>
        <i class="icon-login-tel"></i>
      </p>
      <p>
        <input id="validCode" @keyup="checkBtnStatus" @keydown="checkBtnStatus" name="validCode" class="v-input"
            type="text" maxlength="4" v-model="validCode" placeholder="请输入验证码"/>
        <img :src="validCodeUrl" @click="getValidCodeImg" alt="">
      </p>
      <p class="flexBox">
        <input id="smsCode" @keyup="checkBtnStatus" @keydown="checkBtnStatus" name="smsCode"
            class="v-input sms-input flexChild" type="text" maxlength="6" v-model="smsCode" placeholder="请输入验证码"/>
        <button v-if="!sendMsgDisabled" @click.prevent="getSmsCode" class="v-button sms-button">获取短信验证码</button>
        <button v-if="sendMsgDisabled" disabled class="v-button disabled sms-button">{{countDownTime}}</button>
        <i class="icon-login-code"></i>
      </p>
    </form>
    <button class="v-button" :class="{'disabled': btnStatus==0}" @click="nextStep">下一步</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import {hidePhoneNum, getImgUrl, checkPhoneNum} from '@/utils/utils'
  import {fetch} from '@/utils/fetch'
  export default {
    data () {
      return {
        newPhoneNum: '',
        validToken: '',
        btnStatus: false,
        countDownTime: 60,
        sendMsgDisabled: false,
        validCode: '',
        smsCode: '',
        validCodeUrl: ''
      }
    },
    computed: {
      phoneNum () {
        const phoneNum = this.$store.state.UserCenter.userInfo.mobile
        return hidePhoneNum(phoneNum)
      },
      userInfo () {
        return this.$getUser()
      }
    },
    methods: {
      async getSmsCode () {
        if (this.phoneNum.length <= 0) {
          return this.$toast('请输入手机号码！')
        }
        if (!checkPhoneNum(this.newPhoneNum)) {
          return this.$toast('请输入正确的手机号！')
        }
        if (!this.validCode) {
          return this.$toast('请输入图形验证码！')
        }
        const url = '/mobileMessage/sendSmsCode.do'
        const data = {
          mobile: this.newPhoneNum,
          type: 4,
          validToken: this.validToken,
          validCode: this.validCode
        }
        const res = await fetch(url, data)
        this.$toast(res.message)
        if (parseInt(res.code) === 1) {
          let me = this
          me.sendMsgDisabled = true
          let interval = window.setInterval(function () {
            if ((me.countDownTime--) <= 0) {
              me.countDownTime = 60
              me.sendMsgDisabled = false
              window.clearInterval(interval)
            }
          }, 1000)
        }
      },
      async nextStep () {
        const _this = this
        if (this.btnStatus) {
          const url = '/mobileMember/changeMobileStepTwo.do'
          const data = {
            mobile: this.newPhoneNum,
            smsCode: this.smsCode,
            changeMobileKey: this.$store.state.UserCenter.resetPwd.changeMobileKey
          }
          const res = await fetch(url, data)
          if (parseInt(res.code) === 1) {
            _this.$router.go(-3)
          } else {
            this.$toast(res.message)
          }
        }
      },
      checkBtnStatus () {
        if (this.newPhoneNum.length > 0 && this.smsCode.length > 0) {
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
      padding: 0 pr(40);
      font-size: $normalFontSize;
      text-align: right;
    }
  }

  .v-button {
    margin: 0 auto;
    margin-bottom: pr(16);
  }

</style>
