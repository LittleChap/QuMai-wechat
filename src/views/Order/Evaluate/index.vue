<!--评价订单-->
<template>
  <div>

    <div v-for="item, index in orderInfo.orderItemArray" :key="index" class="mb10 bdb">
      <!--顶部 评分+标签 开始-->
      <div class="bgw bdb p24">
        <div class="dsf">
          <img :src="item.goodsImage" alt="" class="goodsImg">
          <div>
            <div class="rateText">评分: {{rateScoreTexts[item.grade]}}</div>
            <rater v-model="item.grade" active-color="#d73b3c"></rater>
          </div>
        </div>
        <div class="labelTitle" v-if="item.labels.length">打个标签吧！</div>
        <div class="mb6 dsf fww" v-if="item.labels.length">
          <div class="rateLabel"
               :class="{active:i.isSelected}"
               v-for="i, idx in item.labels"
               :key="idx"
               @click="addSelectLabel(i)"
          >{{i.name}}</div>
        </div>
      </div>
      <!--顶部 评分+标签 结束-->

      <!--中间 评价的文本框 开始-->
      <div class="bgw">
        <x-textarea v-model="item.content" :max="200" :rows="6" class="txtRemark"></x-textarea>
        <div class="mlr24 bsbb bdb"></div>
      </div>
      <!--中间 评价的文本框 结束-->

      <upload :data="item.imageArray"></upload>

    </div>

    <div class="bgw bdb p24 dsf aic mt20">
      <i class="icon-change-highlight anonymousIcon red" v-if="isAnonymous" @click="isAnonymous=false"></i>
      <i class="icon-change-disable anonymousIcon" v-else @click="isAnonymous=true"></i>
      <span class="anonymousText">匿名评价</span>
    </div>
    <div class="publishBtn" @click="evaluateOrder">发表评论</div>

  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        orderInfo: {
          orderItemArray: []
        },
        orderSn: '',    // 订单号
        rateScoreTexts: ['差评', '差评', '中评', '中评', '好评', '好评'], // 评分对应的显示文字
        isAnonymous: true  // 是否匿名评价
      }
    },
    methods: {
      // 选择 / 取消选择商品标签
      addSelectLabel (item) {
        item.isSelected = !item.isSelected
      },
      // 评价订单
      async evaluateOrder () {
        let url = '/mobileOrder/valuateOrder.do'
        let commentArray = []
        this.orderInfo.orderItemArray.map(item => {
          let labelIds = []
          item.labels.filter(item => { return item.isSelected }).map(item => { labelIds.push(item.id) })
          let imageArray = []
          item.imageArray.map(item => { imageArray.push({ image: item }) })
          let comment = {
            orderItemId: item.orderItemId,
            grade: item.grade,
            content: item.content,
            labelIds: labelIds.join(';'),
            imageArray: imageArray
          }
          commentArray.push(comment)
        })
        let body = {
          isAnonymous: this.isAnonymous ? 1 : 0,
          orderSn: this.orderSn,
          commentArray: JSON.stringify(commentArray)
        }
        let res = await this.$post(url, body)
        if (res.code == 1) {
          this.$toast('评价成功！')
          this.$store.commit('RESET_OrderParam', -1)
          // localStorage.setItem('orderStatus', 4)
          this.$router.push('/order/myOrder')
        } else {
          this.$toast(res.message)
        }
      },
      // 获取订单详情
      async getOrderDetail () {
        let url = '/mobileOrder/detailOrder.do'
        let body = {orderSn: this.orderSn}
        let res = await this.$post(url, body)
        if (res.code == 1) {
          res.data.orderItemArray.map(item => {
            item.imageArray = []
            item.grade = 5
            item.content = ''
            // item.labels = [{id: 1, name: 'asdasd'}, {id: 1, name: 'asdasd'}, {id: 1, name: 'asdasd'}]
            item.labels.map(i => { i.isSelected = false })
          })
          this.orderInfo = res.data
        }
        console.log('获取订单详情', res)
      }
    },
    created () {
      this.orderSn = this.$route.query.orderSn || ''
      this.getOrderDetail()
    }
  }
</script>

<style lang="scss" scoped  rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  @import '~@/styles/noahcommon.scss';
  .goodsImg{
    width: pr(150);
    height: pr(150);
    border: none;
    border-radius: pr(8);
    margin-right: pr(20);
  }
  .rateText{
    font-size: $importantFontSize;
    color: $importantInfoAndTitleColor;
    line-height: pr(68);
  }
  .labelTitle{
    font-size: $importantFontSize;
    color: $paragraphColor;
    margin-top: pr(20);
  }
  .rateLabel{
    margin-top: pr(20);
    margin-right: pr(20);
    border: 1px solid $supportTextColor;
    max-width: pr(350);
    padding: 0 pr(24);
    overflow: hidden;
    text-overflow: ellipsis;
    height: pr(56);
    line-height: pr(54);
    border-radius: pr(8);
    font-size: $normalFontSize;
    color: $supportTextColor;
    text-align: center;
    white-space: nowrap;
    box-sizing: border-box;
  }
  .rateLabel:nth-child(4){
    margin-right:0!important;
  }
  .active{
    color:$buttonColor;
    background: #fdeaea;
    border: 1px solid $buttonColor;
  }
  .anonymousIcon{
    font-size: pr(42);
  }
  .anonymousText{
    color: $supportTextColor;
    font-size: $importantFontSize;
    margin-left: pr(20);
  }
  .publishBtn{
    background: $buttonColor;
    color: #fff;
    width: pr(664);
    line-height: pr(88);
    text-align: center;
    font-size: $headerTitleFontSize;
    margin: pr(60) auto;
    margin-bottom: 0;
  }
</style>
