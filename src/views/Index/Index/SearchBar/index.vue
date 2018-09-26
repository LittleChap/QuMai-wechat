<!--搜索栏-->
<template>
  <div>
    <div class="wrap">
      <input type="text" class="text" placeholder="搜商城商品" @click="$goto('/searchIndex')">
      <div class="search_icon">
        <i class="icon-nav-seach"></i>
      </div>

      <div class="message_icon" @click="gotoMessage">
        <i class="icon-home-nav-mess"></i>
        <div class="badge" v-if="hasNewMessage"></div>
      </div>
    </div>
    <div class="blank"></div>
  </div>

</template>

<script>
  export default {
    components: {},
    props: {},
    data () {
      return {}
    },
    computed: {
      hasNewMessage () {
        return this.$store.getters.GET_HasNewMessage
      },
      userInfo () {
        return this.$getUser()
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
    mounted () {
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .wrap {
    background:#fff;
    width:100vw;
    height: pr(98);
    box-sizing: border-box;
    padding:pr(19);
    /*position: relative;*/
    position: fixed;
    z-index: 490;
  }
  .blank{
    width: 100vw;
    height: pr(1);
    padding-bottom:pr(100) ;
    background: transparent;
  }
  .text{
    color:#bebebe;
    background: $searchBlockColor;
    border:none;
    font-size: pr(24);
    outline: none;
    border-radius: 5rem;
    height: pr(60);
    /*width: pr(629);*/
    /*width: calc( 100vw - 121*0.02133333rem );*/
    width: calc100vw(122);
    padding-left: pr(76);
    box-sizing: border-box;
  }
  .search_icon{
    position:absolute;
    top:pr(31);
    left:pr(39);
    font-size: pr(36);
    color: #818181;
  }
  .message_icon{
    position:absolute;
    top:pr(27);
    right:pr(26);
    font-size: pr(44);
    color: #666;
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
