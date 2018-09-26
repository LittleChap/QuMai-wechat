<!--底部菜单栏-->
<template>
  <div>
    <div class="bottomWrap">
      <div class="item">
        <img src="./assets/tab_home_highlight@3x.png" alt="" @click="navigateTo('/',1)" class="img" v-if="index===1" />
        <img src="./assets/tab_home_disable@3x.png" alt="" class="img" @click="navigateTo('/',1)" v-else />
        <div :class="index==1?'active':'text'">首页</div>
      </div>

      <div class="item">
        <img src="./assets/tab_clas_highligt@3x.png" alt="" @click="navigateTo('/category',2)" class="img" v-if="index===2" />
        <img src="./assets/tab_clas_disable@3x.png" alt="" class="img" @click="navigateTo('/category',2)" v-else />
        <div :class="index==2?'active':'text'">分类</div>
      </div>

      <div class="item">
        <img src="./assets/tab_shopping_highlight@3x.png" alt="" @click="navigateTo('/cartAndPay',3)" class="img" v-if="index===3" />
        <img src="./assets/tab_shopping_disable@3x.png" alt="" class="img" @click="navigateTo('/cartAndPay',3)" v-else />
        <div :class="index==3?'active':'text'">购物车</div>
      </div>

      <div class="item">
        <img src="./assets/tab_mine_highlight@3x.png" alt="" @click="navigateTo('/userCenter',4)" class="img" v-if="index===4" />
        <img src="./assets/tab_bar_mine_disable@3x.png" alt="" class="img" @click="navigateTo('/userCenter',4)" v-else />
        <div :class="index==4?'active':'text'">我的</div>
      </div>
    </div>
    <div class="blank"></div>
  </div>

</template>

<script>
  export default {
    props: {
      index: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {}
    },
    methods: {
      navigateTo (url, index) {
        // if (!this.$getUser() && index == 3) {
        //   this.$wechat.getAuth(this.$route)
        //   return
        // }
        if (this.index === index) {
          return
        }
        this.$goto(url)
      }
    },
    created () {},
    mounted () {}
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .bottomWrap {
    background:#fff;
    width:100vw;
    height: pr(99);
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #e6e6e6;
    position: fixed;
    bottom: -1px;
    left: 0;
    z-index: 490;
  }
  .item{
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    flex-grow: 1;
    width: 25vw;
    justify-content: center;
    align-items: center;
    height: pr(98);
    /*border:1px solid red;*/
    box-sizing: border-box;
    overflow: hidden;
  }
  .img{
    width: pr(50);
    height: pr(50);
    border: none;
    margin-bottom: pr(8);
  }
  .text{
    line-height: $normalFontSize;
    font-size: $normalFontSize;
    color:#333;
  }
  .active{
    line-height: $normalFontSize;
    font-size: $normalFontSize;
    color:#d41313;
  }
  .blank{
    width: 100vw;
    height: pr(88);
  }
</style>
