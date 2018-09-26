<!--搜索栏-->
<template>
  <div>
    <div class="wrap">
      <input type="text" class="text" v-model="goodsName" placeholder="搜商城商品" @keyup.enter="search" ref="txt">
      <div class="search_icon">
        <i class="icon-nav-seach"></i>
      </div>
      <!--<div class="message_icon" @click="gotoMessage">-->
        <!--<i class="icon-home-nav-mess"></i>-->
        <!--<div class="badge" v-if="hasNewMessage"></div>-->
      <!--</div>-->
      <div class="searchBtn" @click="search">搜索</div>
      <div class="clean_icon" @click="cleanText" v-if="goodsName.length>0"></div>
      <!--<div class="clean_icon" @click="cleanText" ></div>-->
    </div>
    <div class="blank"></div>
  </div>

</template>

<script>
  export default {
    components: {},
    props: {},
    data () {
      return {
        goodsName: ''
      }
    },
    computed: {
      hasNewMessage () {
        return this.$store.getters.GET_HasNewMessage
      }
    },
    methods: {
      gotoMessage () {
        if (this.$getUser()) {
          this.$router.push('/userCenter/myNews')
        } else {
          this.$wechat.getAuth(this.$route)
        }
      },
      search () {
        if (!this.goodsName) {
          this.$toast('请输入您要搜索的内容')
          return
        }
        this.$router.push('/searchResult?key=' + this.goodsName)
      },
      cleanText () {
        this.goodsName = ''
      }
    },
    created () {
      this.$store.dispatch('getHasNewMessage')
    },
    mounted () {
      this.$refs['txt'].focus()
    }
  }
</script>

<style lang="scss" scoped  rel="stylesheet/scss">
  @import '~@/styles/index.scss';

  .wrap {
    background: #fff;
    width: 100vw;
    height: pr(98);
    box-sizing: border-box;
    padding: pr(19);
    position: fixed;
    z-index: 490;
  }
  .blank{
    width: 100vw;
    height: pr(1);
    padding-bottom:pr(100) ;
    background: transparent;
  }
  .text {
    color: #666;
    background: $searchBlockColor;
    border: none;
    font-size: pr(24);
    outline: none;
    border-radius: 5rem;
    height: pr(60);
    /*width: pr(629);*/
    /*width: calc( 100vw - 121*0.02133333rem );*/
    /*width: calc100vw(122);*/
    width: calc100vw(120);
    padding-left: pr(76);
    box-sizing: border-box;
  }
  .searchBtn{
    position:absolute;
    top:pr(19);
    right:pr(0);
    font-size: $importantFontSize;
    padding: 0 pr(20);
    color: #333;
    line-height: pr(60);
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

  .clean_icon {
    position: absolute;
    top: pr(36);
    left: calc100vw(145);
    width: pr(25);
    height: pr(25);
    background: #aaa;
    border-radius: 50%;
    -webkit-transform: rotate(45deg);
  }

  .clean_icon:after {
    content: '';
    position: absolute;
    -webkit-transform: scale(0.08, 0.8);
    width: pr(25);
    height: pr(25);
    background: #fff;
  }

  .clean_icon:before {
    content: '';
    position: absolute;
    -webkit-transform: scale(0.8, 0.08);
    width: pr(25);
    height: pr(25);
    background: #fff;
  }
</style>
