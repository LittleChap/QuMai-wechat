<template>
  <form>
    <input id="phoneNum" name="phoneNum" class="v-input" type="tel" maxlength="11" v-model="phoneNum"
        placeholder="请输入手机号"/>
    <input id="password" name="password" class="v-input" type="password" v-model="password"
        placeholder="请输入6-12位英文字符及数字"/>
    <p v-show="showValidCode">
      <input id="validCode" name="validCode" class="v-input" type="text" maxlength="4" v-model="validCode"
          placeholder="请输入验证码"/>
      <img :src="validCodeUrl" @click="getValidCodeImg" alt="">
    </p>
  </form>
</template>

<script type="text/ecmascript-6">
  import {getImgUrl, checkPhoneNum} from '@/utils/utils.js'
  export default {
    name: 'form',
    data () {
      return {
        phoneNum: '',
        password: '',
        validCode: '',
        validToken: '',
        validCodeUrl: '',
        showValidCode: false
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
        if (this.sendMsgDisabled && this.validCode.length < 4) {
          return this.$toast('请输入正确的验证码')
        }
        let data = {
          username: this.phoneNum,
          password: this.password
        }
        if (this.sendMsgDisabled) {
          data.validCode = this.validCode
          data.validToken = this.validToken
        }
        this.$store.commit('SET_LOGINDATA', data)
        const res = await this.$store.dispatch('logInByPwd')
        if (parseInt(res.code) === 1) {
          this.$router.push('/')
          this.$store.dispatch('getUserInfo')
        } else {
          if (res.message.indexOf('验证码') >= 0) {
            this.showValidCode = true
            this.getValidCodeImg()
          }
        }
      },
      getValidCodeImg () {
        const getURL = getImgUrl()
        const validToken = new Date().getTime()
        this.validCodeUrl = `${getURL}?validToken=${validToken}`
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  form {
    @include pageTop();
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
