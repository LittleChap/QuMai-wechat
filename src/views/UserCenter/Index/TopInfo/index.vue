<!--个人中心 - 顶部用户基本信息-->
<template>
    <div class="wrap">
      <div class="message_icon" @click="gotoMessage">
        <i class="icon-home-nav-mess"></i>
        <div class="badge" v-if="hasNewMessage"></div>
      </div>


      <div class="userInfoWarp" v-if="userInfo" @click="$goto('/userinfo')">
        <img :src="userInfo.avatar" alt="" class="userAvatar">
        <div class="userInfo">
          <div class="userName">{{userInfo.nickname}}</div>
          <div class="gradeButton">{{userInfo.levelName}}</div>
          <div v-if="levelInfo.level!=5">距成为{{ generateNextLevelString(levelInfo.level)}}会员还需{{levelInfo.leftPoint}}积分</div>
          <div v-else>您已成为最高级会员</div>
        </div>
      </div>


      <div class="loginWarp" v-else>
        <div class="loginButton" @click="$wechat.getAuth($route)">登录/注册</div>
        <div class="nologinText">第一时间发现新品及优惠信息 <br> 赶紧加入我们吧！ </div>
      </div>

    </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data () {
      return {
        text: ''
      }
    },
    computed: {
      userInfo () {
        return this.$getUser() || null
      },
      levelInfo () {
        return this.$store.getters.GET_LEVELINFO
      },
      hasNewMessage () {
        return this.$store.getters.GET_HasNewMessage
      }
    },
    methods: {
      generateNextLevelString (level) {
        switch (level + 1) {
          case 1 :return '普通会员'
          case 2 :return '银卡会员'
          case 3 :return '金卡会员'
          case 4 :return '白金会员'
          case 5 :return '钻石会员'
        }
      },
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
      this.$store.dispatch('getMyLevel')
    },
    mounted () {}
  }
</script>

<style lang="scss" scoped  rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .wrap {
    background:url(../../assets/person_background@3x.png) no-repeat;
    background-size: cover;
    width:100vw;
    height: pr(340);
    box-sizing: border-box;
    position: relative;
    color: #fff;
  }
  .message_icon{
    position:absolute;
    top:pr(24);
    right:pr(24);
    font-size: pr(48);
    color: #fff;
  }
  .badge{
    width: $badgeSize;
    height: $badgeSize;
    border-radius: pr(10);
    position:absolute;
    top:$badgePisition;
    right:$badgePisition;
    font-size: pr(20);
    color: #666;
    background: #fff;
  }
  .userInfoWarp{
    padding-left: pr(40);
    display: flex;
    align-items: center;
    height:pr(340);
  }
  .userAvatar{
     width: pr(120);
     height: pr(120);
     border-radius: 50%;
     background: #08ff0d;
   }
  .userInfo{
    margin-left: pr(20);
    font-size:$normalFontSize ;
    line-height: pr(44);
  }
  .userName{
    font-size: $titleFontSize;
    line-height: pr(56);
  }
  .gradeButton{
    background: #f44f51;
    border-radius: pr(22);
    width: pr(136);
    height: pr(44);
    font-size:$normalFontSize ;
    text-align: center;
    margin-bottom: pr(10);
  }
  .loginWarp{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:pr(340);
    line-height:pr(38);
    font-size: $importantFontSize;
  }
  .loginButton{
    background: rgba(255,255,255,.2);
    border:1px solid rgba(255,255,255,.2);
    border-radius: pr(39);
    width: pr(220);
    height: pr(74);
    line-height: pr(72);
    font-size:$headerTextFontSize ;
    text-align: center;
    margin-bottom: pr(15);
  }
  .nologinText{
    text-align: center;
    line-height: pr(40);
  }
</style>
