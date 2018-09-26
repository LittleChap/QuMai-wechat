<template>
  <section>
    <p>当前积分</p>
    <p>{{point}}</p>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    computed: {
      point () {
        return this.$store.state.UserCenter.levelInfo.point
      }
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~@/styles/index.scss';

  section {
    padding-top:pr(80);
    text-align: center;
    color: $buttonTextColor;
    font-size:$headerTextFontSize;
    width: 100%;
    height: pr(340);
    background: url("pic_personl_background@3x.png");
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    p:nth-child(2) {
      margin-top:pr(30);
      font-size: pr(120);
      line-height:pr(100);
      text-shadow: pr(6) pr(6) pr(4) rgba(195,10,16,0.9);
    }
  }
</style>
