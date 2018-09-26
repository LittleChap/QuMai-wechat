<template>
  <div v-if="userInfo" id="app">
    <p class="phone-num">绑定手机号：{{phoneNum}}</p>
    <form>
      <p>
        <input id="validCode" @keyup="checkBtnStatus" @keydown="checkBtnStatus" name="validCode" class="v-input"
            type="text" maxlength="4" v-model="validCode" placeholder="请输入验证码"/>
        <img :src="validCodeUrl" @click="getValidCodeImg" alt="">
        <i class="icon-login-code"></i>
      </p>
      <p class="flexBox">
        <input id="smsCode" @keyup="checkBtnStatus" @keydown="checkBtnStatus" name="smsCode"
            class="v-input sms-input flexChild" type="text" maxlength="6" v-model="smsCode" placeholder="请输入验证码"/>
        <span v-if="!sendMsgDisabled" @click.prevent="getSmsCode" class="v-button sms-button">获取短信验证码</span>
        <span v-if="sendMsgDisabled" disabled class="v-button disabled sms-button">{{countDownTime}}</span>
        <i class="icon-login-code"></i>
      </p>
    </form>
    <button class="v-button" :class="{'disabled': btnStatus==0}" @click="nextStep">下一步</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import {hidePhoneNum, getImgUrl} from '@/utils/utils'
  import {fetch} from '@/utils/fetch'
  export default {
    data () {
      return {
        validCode: '',
        validToken: '',
        validCodeUrl: '',
        btnStatus: false,
        countDownTime: 60,
        sendMsgDisabled: false,
        smsCode: ''
      }
    },
    computed: {
      phoneNum () {
        const phoneNum = this.$getUser().mobile
        return hidePhoneNum(phoneNum)
      },
      userInfo () {
        return this.$getUser()
      }
    },
    methods: {
      async getSmsCode () {
        if (this.phoneNum.length <= 0) {
          return this.$toast('请输入手机号码')
        }
        if (!this.validCode) {
          return this.$toast('请输入图形验证码')
        }
        const url = '/mobileMessage/sendSmsCode.do'
        const data = {
          mobile: this.$getUser().mobile,
          type: 3,
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
          const url = '/mobileMember/changeMobileStepOne.do'
          const data = {
            mobile: this.$getUser().mobile,
            validToken: this.validToken,
            validCode: this.validCode,
            pwd: 'a123456',
            smsCode: this.smsCode
          }
          const res = await fetch(url, data)
          if (parseInt(res.code) === 1) {
            _this.$store.commit('SET_CHANGEMOBILEKEY', res.data.changeMobileKey)
            _this.$router.push('stepTwo')
          } else {
            this.$toast(res.message)
          }
        }
      },
      checkBtnStatus () {
        if (this.validCode.length > 0 && this.smsCode.length > 0) {
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
      font-size: $titleFontSize;
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
        position: relative;
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
          display: block;
          vertical-align: middle;
          height: pr(88);
          line-height: pr(88);
          text-align: center;
          border-radius: $borderRadius;
          background-color: $buttonColor;
          color: $buttonTextColor;
          font-size: $importantFontSize;
          width: pr(260);
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        #validCode, #smsCode {
          width: pr(452);
          font-size: $importantFontSize;
          display: inline-block;
          vertical-align: middle;
        }
        img {
          margin-left: pr(16);
          width: pr(196);
          height: pr(88);
          border: 1px solid #d2d2d2;
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

  .icon-login-code {
    color: #969696;
    font-size: pr(44);
    position: absolute;
    top: pr(20);
    left: pr(20);
  }
</style>
