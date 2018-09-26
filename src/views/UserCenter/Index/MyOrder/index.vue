<!--个人中心 - 我的订单模块-->
<template>
    <div class="orderWrap">
      <Cell title="我的订单" link="none" @click.native="gotoOrderList(0)" text="查看全部订单" border="full">
      </Cell>
      <div class="iconList">
        <div class="iconWrap" @click="gotoOrderList(1)">
          <img src="./img/pic_payment@3x.png" alt="" class="iconImg" />待付款
          <badge :text="orderCountNumber[1][1]" v-if="orderCountNumber[1][1]" class="badge"></badge>
        </div>
        <div class="verticalLine"></div>
        <div class="iconWrap"  @click="gotoOrderList(2)">
          <img src="./img/pic_delivery@3x.png" alt="" class="iconImg" />待发货
          <badge :text="orderCountNumber[2][2]"  v-if="orderCountNumber[2][2]" class="badge"></badge>
        </div>
        <div class="verticalLine"></div>
        <div class="iconWrap"  @click="gotoOrderList(3)">
          <img src="./img/pic_goods@3x.png" alt="" class="iconImg" />待收货
          <badge :text="orderCountNumber[3][3]"  v-if="orderCountNumber[3][3]" class="badge"></badge>
        </div>
        <div class="verticalLine" ></div>
        <div class="iconWrap"  @click="gotoOrderList(4)">
          <img src="./img/pic_comment@3x.png" alt="" class="iconImg" />待评价
          <badge :text="orderCountNumber[4][4]"  v-if="orderCountNumber[4][4]" class="badge"></badge>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    props: {},
    data () {
      return {
        orderCountNumber: [0, 0, 0, 0, 0]
      }
    },
    computed: {},
    methods: {
      gotoOrderList (type) {
        if (this.$getUser()) {
          localStorage.setItem('orderStatus', type)
          this.$router.push('/order/myOrder')
        } else {
          this.$wechat.getAuth(this.$route)
        }
      },
      async getOrderCountNumber () {
        let url = '/mobileOrder/ getOrderNums'
        let res = await this.$post(url, {})
        if (res.code == 1) {
          this.orderCountNumber = res.data
        }
      }
    },
    created () {
      this.getOrderCountNumber()
    },
    mounted () {}
  }
</script>

<style lang="scss" scoped  rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .orderWrap {
    width:100vw;
    box-sizing: border-box;
    color: #000;
    background: #fff;
    border-bottom: 1px solid $lineColor;
  }
  .iconList{
    padding:pr(20) 0 pr(15) 0;
    display: flex;
    align-items: center;
  }
  .iconWrap{
    font-size: $normalFontSize;
    color:$importantInfoAndTitleColor;
    line-height:pr(48);
    width: 25vw;
    box-sizing: border-box;
    position: relative;
    /*background: red;*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .iconImg{
    width: pr(54);
    height: pr(54);
    border:none;
  }
  .verticalLine{
    width: 1px;
    height: pr(60);
    background:$lineColor;
  }
  .badge{
    position: absolute;
    right: pr(50);
    top:pr(0);
    /*background:$buttonColor;*/
    /*border-radius: 50%;*/
    /*height: pr(20);*/
    /*max-width:pr(50) ;*/
  }
</style>
