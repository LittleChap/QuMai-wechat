<!---返回栏-->
<template>
  <div class="backBarWrap">
    <img src="./img/icon_back@3x.png" class="backIcon" @click="$goto('/userCenter')">
    <div class="title">我的订单</div>
    <div class="message" @click="gotoMessage">
      <i class="icon-home-nav-mess"></i>
      <div class="badge" v-if="hasNewMessage"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      hasNewMessage () {
        return this.$store.getters.GET_HasNewMessage
      },
      userInfo () {
        return this.$getUser() || null
      }
    },
    methods: {
      // 跳转到消息页面
      gotoMessage () {
        if (!this.userInfo) {
          this.$wechat.getAuth(this.$route)
          return
        }
        this.$router.push('/userCenter/myNews')
      }
    },
    created () {
      this.$store.dispatch('getHasNewMessage')
    },
    mounted () {}
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  @import '~@/styles/noahcommon.scss';
  .backBarWrap{
    width: 100%;
    height: pr(88);
    display: flex;
    padding: 0 pr(24);
    justify-content: space-between;
    box-sizing: border-box;
    background: #fff;
    border-bottom: 1px solid $lineColor;
    align-items: center;
  }
  .backIcon{
    display: block;
    height: $headerTitleFontSize;
    border: none;
    margin: 0;
    padding: 0;
  }
  .title{
    font-size: $headerTitleFontSize;
    color:$importantInfoAndTitleColor;
  }
  .message{
    position:relative;
  }
  .badge{
    width: $badgeSize;
    height: $badgeSize;
    border-radius: pr(12.5);
    position:absolute;
    top: $badgePisition;
    right: $badgePisition;
    font-size: pr(20);
    color: #666;
    background: $mainFontColor;
  }
</style>
