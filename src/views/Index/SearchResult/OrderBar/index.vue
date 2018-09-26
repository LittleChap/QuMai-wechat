<!--排序栏-->
<template>
  <div class="wrap">
    <div class="text pipe" :class="{active:orderType==0}" @click="changeOrder(0)">综合排序</div>
    <div class="text pipe" :class="{active:orderType==1}" @click="changeOrder(1)">销量</div>
    <div class="text pipe" :class="{active:orderType==2 || orderType==3}"  @click="changeOrder(2)" >
      价格
      <div class="icon_wrap">
        <i class="icon-search-up" :class="{active: orderType==3}" ></i>
        <i class="icon-search-down" :class="{active: orderType==2}"></i>
      </div>
    </div>
    <div class="text" :class="{active:orderType==4}" @click="changeOrder(4)">新品</div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data () {
      return {
        text: '',
        orderType: 0
      }
    },
    computed: {},
    methods: {
      cleanText () {
        this.text = ''
      },
      changeOrder (type) {
        if (this.orderType == 2 && type == 2) {
          this.orderType = type = 3
        }
        if (this.orderType == 3 && type == 2) {
          this.orderType = type = 2
        }
        this.orderType = type
        this.$store.dispatch('searchProducts', {type: type})
      }
    },
    created () {
    },
    mounted () {
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';

  .wrap {
    background: #fff;
    width: 100vw;
    height: pr(88);
    box-sizing: border-box;
    padding: pr(25) 0;
    margin-bottom: pr(20);
    border-bottom: 1px solid #d7d7d7 ;
    border-top: 1px solid #d7d7d7 ;
    display: flex;
    justify-content: space-around;
  }
  .text {
    color: #333;
    border: none;
    width: 25vw;
    font-size:$importantFontSize;
    line-height: pr(38);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }
  .active {
    color: $mainFontColor;
  }
  .pipe{
    border-right: 1px solid #d7d7d7 ;
  }
  .icon_wrap{
    color: #333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /*margin-left: pr(10);*/
    font-size: pr(15);
    padding-top: pr(4);
    line-height: pr(15);
    margin-left: pr(5);
  }
</style>
