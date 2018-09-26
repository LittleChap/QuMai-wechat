<!-- 顶部条组件 -->
<template>
  <div class="headerWrap">
    <img src="./assets/logo.png" alt="">
    <button class="editBtn" @click="toClick">{{editText}}</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'header-bar',
    props: {
      clickEvent: {
        type: Function,
        default: undefined
      },
      btnText: {
        type: String,
        default: '编辑'
      }
    },
    computed: {
      editText () {
        return this.btnText
      }
    },
    methods: {
      toClick () {
        this.clickEvent()
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '~@/styles/modules/config.scss';
  .headerWrap{
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 499;
    height: $headerHeight;
    width: 100%;
    background: #fff;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $lineColor;
    box-shadow: 0 1px pr(6) pr(2) rgba(0, 0, 0, 0.1);
    .editBtn{
      padding: 0 pr(24);
      font-size: $headerTextFontSize;
      color: $importantInfoAndTitleColor;
    }
    img{
      padding-left: pr(24);
      width: auto;
      height: pr(56);
    }
  }

</style>

