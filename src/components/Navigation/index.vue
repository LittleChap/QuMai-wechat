<template>
  <div id="nav-content" v-show="showContent">
    <div class="nav-mask" v-show="showNav" @click="toggleNav"></div>
    <div class="nav-bar" @click="toggleNav" :class="{'active': showNav}">
      <div v-show="!showNav" class="nav-flag">
        <img src="./button-open@3x.png" alt="">
        <div class="flexBox column center">
          <span class="doubleLine flexChild">快速</span>
          <span class="doubleLine flexChild">导航</span>
        </div>
      </div>
      <div v-show="showNav" class="nav-flag">
        <img src="./button-closed@3x.png" alt="">
        <div class="flexBox column center">
          <span class="flexChild">收回</span>
        </div>
      </div>
      <div class="nav-btns flexChild">
        <ul class="flexBox">
          <li @click="shareMethods" class="flexChild flexBox column center">
            <img class="flexChild" src="./button-share@3x.png" alt="">
            <span class="flexChild">分享</span>
          </li>
          <li @click="$router.push('/')" class="flexChild flexBox column center">
            <img src="./button-home@3x.png" alt="">
            <span>首页</span>
          </li>
          <li @click="$router.push('/searchIndex')" class="flexChild flexBox column center">
            <img src="./button-search@3x.png" alt="">
            <span>搜索</span>
          </li>
          <li @click="toFooter" class="flexChild flexBox column center">
            <img src="./button-foot@3x.png" alt="">
            <span>足迹</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-show="shareStatus" class="mask" @click="shareStatus=false"></div>
    <img v-show="shareStatus" class="share-text" @click="shareStatus=false" src="./share-arrow@3x.png"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        routeFullPath: this.$route.fullPath,
        showNav: false,
        excludeArray: [
          '/loginAndSignUp', // 登录注册模块
          '/searchIndex', // 搜索页
//          '/searchresult', // 搜索结果页
          '/category', // 分类页
          '/cartAndPay', // 购物车模块
          '/myOrder', // 我的订单页
          '/Evaluate', // 评价页
          '/AppendEvaluate', // 追加评论页
          '/returnApply', // 首页申请页
          '/ServiceAndFeedback', // 客服反馈页
//          '/myFootprint', // 我的足迹
          '/userInfo', // 个人资料模块
          '/jump' // 微信跳转页
        ]
      }
    },
    methods: {
      shareMethods () {
        const _this = this
        setTimeout(function () {
          _this.shareStatus = true
        })
      },
      toggleNav () {
        this.showNav = !this.showNav
        console.log(this.showNav)
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
    },
    computed: {
      showContent () {
        console.log(this.routeFullPath)
        // 如果符合排除页面 返回false
        for (let i = 0; i < this.excludeArray.length; i++) {
          if (this.routeFullPath.indexOf(this.excludeArray[i]) >= 0) {
            return false
          }
        }
        // 如果是首页或个人中心首页 返回false
        let routeNow = this.routeFullPath.toLowerCase()
        if (routeNow == '/' || routeNow == '/usercenter') {
          return false
        }
        return true // 其余页面展示导航栏
      },
      shareStatus: {
        get: function () {
          return this.$store.state.GoodsDetail.shareWinStatus
        },
        set: function (val) {
          this.$store.commit('SET_SHAREWIN', val)
        }
      }
    },
    watch: {
      '$route': function () {
        this.showNav = false
        this.routeFullPath = this.$route.fullPath
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index";

  .share-text {
    position: fixed;
    right: pr(24);
    top: pr(24);
    z-index: 1000;
    width: 90%;

  }

  #nav-content {
    .nav-bar {
      transition: 300ms all;
      position: fixed;
      font-size: 0;
      bottom: pr(220);
      right: pr(-428);
      z-index: 666;
      .nav-flag {
        display: inline-block;
        vertical-align: middle;
        height: pr(74);
        text-align: center;
        padding: pr(12) pr(12);
        background: rgba(0, 0, 0, 0.8);
        border-radius: pr(6) 0 0 pr(6);
        color: #fff;
        font-size: 0;
        img {
          display: inline-block;
          vertical-align: middle;
          width: pr(10);
          height: pr(20);
        }
        div {
          display: inline-block;
          vertical-align: middle;
          margin-left: pr(10);
          span {
            font-size: pr(20);
            vertical-align: middle;
            display: block;
            line-height: pr(52);
            &.doubleLine {
              line-height: pr(26);
            }
          }
        }
      }
      .nav-btns {
        background: #fff;
        border-radius: pr(6) 0 0 pr(6);
        display: inline-block;
        vertical-align: middle;
        padding: pr(20) pr(16);
        height: pr(114);
        width: pr(428);
        ul,li {
          height:100%;
        }
        img {
          width: pr(44);
          height: pr(44);
          margin-bottom:pr(12);
        }
        span {
          color: $paragraphColor;
          font-size:pr(24);
        }
      }
      &.active {
        right: 0;
        z-index: 1001;
      }
    }
    .nav-mask {
      transition: 300ms all;
      position: fixed;
      z-index: 1000;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      line-height: pr(60);
    }
  }
</style>
