<template>
  <div id="app">
    <form>
      <input id="phoneNum" name="phoneNum" class="v-input" type="tel" maxlength="11" v-model="phoneNum"
          placeholder="请输入手机号"/>
      <p>
        <input id="validCode" name="validCode" class="v-input" type="text" maxlength="4" v-model="validCode"
            placeholder="请输入验证码"/>
        <img src="" alt="">
      </p>
    </form>
    <button class="v-button" @click="nextStep">下一步</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'firstStep',
    data () {
      return {
        validCode: '',
        phoneNum: ''
      }
    },
    methods: {
      nextStep () {
        this.$store.commit('SET_RETRIEVEPHONENUM', this.phoneNum + '')
        this.$store.commit('SET_STEP', 2)
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

  .v-button {
    margin: 0 auto;
    margin-bottom: pr(16);
  }
</style>
