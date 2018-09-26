<template>
  <section>
    <p>1)&nbsp;&nbsp;您目前积分：{{levelInfo.point}}积分</p>
    <p>2)&nbsp;&nbsp;您的会员等级是：{{levelText}}</p>
    <p>3)&nbsp;&nbsp;您距离下个等级还需要：{{levelInfo.leftPoint}}积分</p>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    computed: {
      levelInfo () {
        return this.$store.state.UserCenter.levelInfo
      },
      levelText () {
        const levelArr = ['普通会员', '银卡会员', '金卡会员', '白金会员', '钻石会员']
        const level = this.$store.state.UserCenter.levelInfo.level
        return levelArr[level - 1]
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  section {
    padding:pr(24);
    margin-top: pr(10);
    background: #fff;
    p {
      font-size:$importantFontSize;
      line-height:pr(88);
      color: $importantInfoAndTitleColor;
    }
  }
</style>
