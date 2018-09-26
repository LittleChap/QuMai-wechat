<template>
  <form>
    <i class="icon-login-del" @click="$router.push('/')"></i>
    <p>
      <input id="phoneNum" @keyup="checkBtnStatus" @keydown="checkBtnStatus" name="phoneNum" class="v-input" type="tel"
          maxlength="11" v-model="phoneNum" placeholder="请输入手机号" onkeyup="this.value=this.value.replace(/\D/g,'')"/>
      <i class="icon-login-tel"></i>
    </p>
    <p>
      <input id="validCode" name="validCode" class="v-input" type="text" maxlength="4" v-model="validCode"
          placeholder="请输入验证码"/>
      <img :src="validCodeUrl" @click="getValidCodeImg" alt="">
      <i class="icon-login-code"></i>
    </p>
    <p class="flexBox">
      <input id="smsCode" @keyup="checkBtnStatus" @keydown="checkBtnStatus" name="smsCode" class="sms-input flexChild"
          type="text" maxlength="6" v-model="smsCode" placeholder="请输入验证码"/>
      <span v-if="!sendMsgDisabled" @click.prevent="getSmsCode" class="sms-button">获取短信验证码</span>
      <span v-if="sendMsgDisabled" disabled class="v-button disabled sms-button">{{countDownTime}}</span>
      <i class="icon-login-code"></i>
    </p>
    <p class="user-agreement">
      <i class="v-single-select" @click="agreement"
          :class="{'icon-change-highlight': isCheck, 'icon-change-disable': !isCheck }"></i>
      同意
      <router-link to="userAgreement">《用户注册协议》</router-link>
    </p>
  </form>
</template>

<script type="text/ecmascript-6">
  import {getImgUrl, checkPhoneNum} from '@/utils/utils.js'
  import {fetch} from '@/utils/fetch'

  export default {
    name: 'loginForm',
    data () {
      return {
        isCheck: true,
        countDownTime: 60,
        sendMsgDisabled: false,
        phoneNum: '',
        validCode: '',
        smsCode: '',
        validCodeUrl: ''
      }
    },
    methods: {
      agreement () {
        this.isCheck = !this.isCheck
        if (this.phoneNum.length > 0 & this.smsCode.length > 0 & this.isCheck) {
          this.$store.commit('SET_BINDMOBILEBTNSTATUS', 1)
        } else {
          this.$store.commit('SET_BINDMOBILEBTNSTATUS', 0)
        }
      },
      async commitFormData () {
        if (this.phoneNum.length <= 0) {
          return this.$toast('请输入手机号码')
        }
        if (!checkPhoneNum(this.phoneNum)) {
          return this.$toast('请输入正确的手机号')
        }
        if (this.smsCode.length <= 0) {
          return this.$toast('请输入短信验证码')
        }
        this.$store.commit('SET_THIRDDATA', {
          openId: localStorage.getItem('openId'),
          mobile: this.phoneNum,
          smsCode: this.smsCode,
          type: 0
        })
        this.$store.dispatch('bindMobile', this.$router)
      },
      checkBtnStatus () {
        if (this.phoneNum.length > 0 & this.smsCode.length > 0 & this.isCheck) {
          this.$store.commit('SET_BINDMOBILEBTNSTATUS', 1)
        } else {
          this.$store.commit('SET_BINDMOBILEBTNSTATUS', 0)
        }
      },
      getValidCodeImg () {
        const getURL = getImgUrl()
        const validToken = new Date().getTime()
        this.validCodeUrl = `${getURL}?validToken=${validToken}`
      },
      async getSmsCode () {
        if (this.phoneNum.length <= 0) {
          return this.$toast('请输入手机号码')
        }
        if (!checkPhoneNum(this.phoneNum)) {
          return this.$toast('请输入正确的手机号')
        }
        if (!this.validCode) {
          return this.$toast('请输入图形验证码')
        }
        const url = '/mobileMessage/sendSmsCode.do'
        const data = {
          mobile: this.phoneNum,
          type: 0,
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
      }
    },
    created () {
      this.getValidCodeImg()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  form {
    @include pageTop();
    text-align: center;
    margin-bottom: pr(16);
    .icon-login-del {
      font-size: pr(66);
      position: absolute;
      top: pr(12);
      left: pr(24);
    }
    .sms-input {
      margin-bottom: 0;
      border-radius: $borderRadius;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border: 1px solid #d2d2d2;
      border-right: none;
      height: pr(88);
      padding-left: pr(76);
      background-color: #fff;
      color: $importantInfoAndTitleColor;
      font-size: $headerTextFontSize;
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
    input {
      font-size: $importantFontSize !important;
      &::-webkit-input-placeholder {
        color: #d2d2d2;
      }
    }
    p {
      position: relative;
      width: pr(664);
      margin: 0 auto pr(16);
      text-align: left;
      font-size: 0;
      #validCode {
        width: pr(452);
        margin-bottom: 0;
        display: inline-block;
        vertical-align: middle;
      }
      img {
        margin-left: pr(16);
        width: pr(196);
        height: pr(88);
        display: inline-block;
        vertical-align: middle;
        background: #d2d2d2;
        border-radius: $borderRadius;
      }
    }
  }

  .v-single-select {
    line-height: pr(40);
    font-size: pr(30);
  }

  .user-agreement {
    font-size: $normalFontSize;
    color: $supportTextColor;
  }

  .icon-login-tel, .icon-login-code {
    color: #969696;
    font-size: pr(44);
    position: absolute;
    top: pr(20);
    left: pr(20);
  }
</style>
