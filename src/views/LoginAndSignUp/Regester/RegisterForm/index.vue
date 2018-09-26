<template>
  <form>
    <input id="phoneNum" @keyup="checkBtnStatus" @keydown="checkBtnStatus" name="phoneNum" class="v-input" type="tel"
        maxlength="11" v-model="phoneNum" placeholder="请输入手机号"/>
    <p>
      <input id="validCode" name="validCode" class="v-input" type="text" maxlength="4" v-model="validCode"
          placeholder="请输入验证码"/>
      <img :src="validCodeUrl" @click="getValidCodeImg" alt="">
    </p>
    <p class="flexBox">
      <input id="smsCode" @keyup="checkBtnStatus" @keydown="checkBtnStatus" name="smsCode"
          class="v-input sms-input flexChild" type="text" maxlength="6" v-model="smsCode" placeholder="请输入验证码"/>
      <button v-if="!sendMsgDisabled" @click.prevent="getSmsCode" class="v-button sms-button">获取短信验证码</button>
      <button v-if="sendMsgDisabled" disabled class="v-button disabled sms-button">{{countDownTime}}</button>
    </p>
    <input id="password" @keyup="checkBtnStatus" @keydown="checkBtnStatus" name="password" class="v-input"
        type="password" v-model="password" placeholder="请输入6-12位英文字符及数字"/>
    <p>
      密码由6-20位字母、数字或半角符号组成，不能是10位以下纯数字
    </p>
  </form>
</template>

<script type="text/ecmascript-6">
  import {getImgUrl, checkPhoneNum} from '@/utils/utils.js'
  import {fetch} from '@/utils/fetch'

  export default {
    name: 'form',
    data () {
      return {
        countDownTime: 60,
        sendMsgDisabled: false,
        phoneNum: '',
        password: '',
        validCode: '',
        smsCode: '',
        validCodeUrl: ''
      }
    },
    methods: {
      async commitFormData () {
        if (this.phoneNum.length <= 0) {
          return this.$toast('请输入手机号码')
        }
        if (checkPhoneNum(this.phoneNum)) {
          return this.$toast('请输入正确的手机号')
        }
        if (this.password.length < 6 || this.password.length > 20) {
          return this.$toast('密码长度不正确')
        }
        if (this.password.length < 10 && /^[0-9]+.?[0-9]*$/.test(this.password)) {
          return this.$toast('不能是10位以下纯数字')
        }
        this.$store.commit('SET_REGISTERDATA', {
          mobile: this.phoneNum,
          smsCode: this.smsCode,
          pwd: this.password
        })
        const res = await this.$store.dispatch('register')
        if (parseInt(res.code) === 1) {
          this.$router.push('/')
        }
      },
      checkBtnStatus () {
        if (this.phoneNum.length > 0 & this.smsCode.length > 0 & this.password.length > 0) {
          this.$store.commit('SET_REGISTERBTNSTATUS', 1)
        } else {
          this.$store.commit('SET_REGISTERBTNSTATUS', 0)
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
        if (checkPhoneNum(this.phoneNum)) {
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
    input {
      margin-bottom: pr(16);
      &::-webkit-input-placeholder {
        color: #d2d2d2;
      }
    }
    p {
      width: pr(664);
      margin: 0 auto pr(16);
      text-align: left;
      font-size: 0;
      #validCode {
        width: pr(452);
        margin-bottom: 0;
        font-size: $importantFontSize;
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

</style>
