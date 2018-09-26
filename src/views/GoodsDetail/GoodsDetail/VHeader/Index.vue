<template>
  <header class="flexBox">
    <div class="flexChild center header-bar">
      <img @click="$router.go(-1)" src="./btn_nav_back@3x.png" alt="">
    </div>
    <!--<div class="flexChild center header-bar">-->
      <!--<img src="./btn_nav_mess@3x.png" alt="" @click="toggleWin">-->
    <!--</div>-->
    <!--<div>-->
      <!--<ul class="flexBox center column" v-show="winStatus">-->
        <!--<li @click="winStatus = false;shareStatus = true" class="flexChild">-->
          <!--<img src="./share@2x.png" alt=""><span>分享</span>-->
        <!--</li>-->
        <!--<li @click="$router.push('/')" class="flexChild">-->
          <!--<img src="./home@3x.png" alt=""><span>首页</span>-->
        <!--</li>-->
        <!--<li @click="$router.push('/searchIndex')" class="flexChild">-->
          <!--<img src="./search@3x.png" alt=""><span>搜索</span>-->
        <!--</li>-->
        <!--<li @click="toFooter" class="flexChild">-->
          <!--<img src="./foot@3x.png" alt=""><span>足迹</span>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
    <!--<div v-show="winStatus" @click="winStatus = false" class="click-mask"></div>-->
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        winStatus: false
      }
    },
    computed: {
      shareStatus: {
        get: function () {
          return this.$store.state.GoodsDetail.shareWinStatus
        },
        set: function (val) {
          this.$store.commit('SET_SHAREWIN', val)
        }
      }
    },
    methods: {
      toggleWin () {
        this.winStatus = !this.winStatus
      },
      toFooter () {
        if (this.$getUser()) {
          this.$router.push('/userCenter/myFootprint')
        } else {
          this.$toast('您还未登录！')
          setTimeout(() => {
            this.$wechat.getAuth(this.$route)
          }, 1000)
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  .share-text {
    position: fixed;
    right: pr(24);
    top: pr(24);
    z-index: 1000;
    width: 90%;

  }

  .click-mask {
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0);
  }

  ul {
    border: 1px solid $lineColor;
    position: absolute;
    z-index: 1000;
    top: pr(88);
    right: pr(30);
    background: #fff;
    opacity: .8;
    width: pr(180);
    border-radius: pr(8);
    li {
      text-align: center;
      width: 100%;
      line-height: pr(60);
      &:not(:last-child) {
        border-bottom: 1px solid $lineColor;
      }
      span {
        vertical-align: middle;
        padding-left: pr(20);
        font-size: $importantFontSize;
        color: $paragraphColor;
      }
      img {
        vertical-align: middle;
        width: pr(32);
        height: pr(32);
      }
    }
  }

  header {
    width: 100vw;
    z-index: 996;
    height: $headerHeight;
    position: absolute;
    top: 0;
    left: 0;
    .header-bar {
      padding: pr(24);
      height: $headerHeight;
      &:first-child {
        text-align: left;
      }
      &:nth-child(2) {
        text-align: right;
      }
      img {
        width: pr(52);
      }
    }
  }
</style>
