<!--查看订单的评价-->
<template>
  <div>

    <div v-for="item, index in orderInfo.orderItemArray" :key="index" class="mb10 bdb">
      <!--回显 初次评价的数据 开始-->
      <div class="bgw p24">
        <!--评分+商品名称+商品图片 开始-->
        <div class="dsf bdb pb15">
          <img :src="item.goodsImage" alt="" class="goodsImg">
          <div>
            <div class="goodsName line2">{{item.goodsName}}</div>
            <rater v-model="item.orderItemComment.grade" :disabled="true" active-color="#d73b3c"></rater>
          </div>
        </div>
        <!--评分+商品名称+商品图片 结束-->

        <!--选中的评价的标签 开始-->
        <div class="mb6 dsf fww" v-if="item.labels.length">
          <div class="rateLabel active"
               v-if="renderLabels(item,i)"
               v-for="i, idx in item.labels"
               :key="idx"
          >{{i.name}}</div>
        </div>
        <!--选中的评价的标签 开始-->

        <div class="f28 line2 c333 mt20">{{item.orderItemComment.content}}</div>

        <!--评价的图片 开始-->
        <div class="dsf fww">
          <img :src="i.image"
               class="commenImg"
               v-for="i in JSON.parse(item.orderItemComment.images)"
               @click="viewFullPhoto(index, JSON.parse(item.orderItemComment.images))" >
        </div>
        <!--评价的图片 结束-->
        <!--卖家回复 开始-->
        <div class="sellerReply" v-if="item.orderItemComment.seller_reply">
          <div class="triangle"></div>
          <div class="line2 psr">
            卖家回复：{{item.orderItemComment.seller_reply}}
          </div>
        </div>
        <!--卖家回复 结束-->

      </div>
      <div class="w100 plr24 bgw" v-if="item.orderItemComment.content_append || item.orderItemComment.images_append">
        <div class="bdb"></div>
      </div>
      <!--回显 初次评价的数据 结束-->

      <!--追评 开始-->
      <div class="bgw red plr24 f28 pb20" v-if="item.orderItemComment.content_append || item.orderItemComment.images_append">
        <div class="lh66">追加评论</div>
        <!--追评 内容-->
        <div class="f28 line2 c333">{{item.orderItemComment.content_append}}</div>
        <!--追评的图片 开始-->
        <div class="dsf fww">
          <img :src="i.image"
               class="commenImg"
               v-for="i in JSON.parse(item.orderItemComment.images_append)"
               @click="viewFullPhoto(index, JSON.parse(item.orderItemComment.images_append))"
          >
        </div>
        <!--追评的图片 结束-->
      </div>
      <!--追评 结束-->
    </div>

    <PhotoViewer :data="currentImages" :index="currentPhotoIndex" v-model="showPhotos" v-if="showPhotos" />
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        showPhotos: false,    // 是否显示照片查看器
        currentPhotoIndex: 0, // 当前照片的索引
        currentImages: [],    // 当前的图片数组
        orderInfo: {
          orderItemArray: []
        },
        orderSn: ''    // 订单号
      }
    },
    methods: {
      // 查看大图
      viewFullPhoto (index, images) {
        this.currentPhotoIndex = index
        this.currentImages = []
        images.map(item => { this.currentImages.push(item.image) })
        this.showPhotos = true
      },
      // 判断label标签是否有选中
      renderLabels (item, i) {
        let labels = item.orderItemComment.label_ids || ''
        let selectedLables = labels.split(';')
        let hasLabel = false
        selectedLables.map(label => { if (label == i.id) hasLabel = true })
        return hasLabel
      },
      // 去追评
      async appendEvaluateOrder () {
        let url = '/mobileOrder/ valuateOrderAgain.do'
        let commentArray = []
        this.orderInfo.orderItemArray.map(item => {
          let imageArray = []
          item.imageArray.map(item => { imageArray.push({ image: item }) })
          let comment = {
            orderItemId: item.orderItemId,
            content: item.content,
            commentId: item.orderItemComment.id,
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
          this.$toast('追评成功！')
          // this.$toast('评价成功！')
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
            item.content = ''
            // begin
            // item.grade = 5
            // item.labels = [{id: 11, name: '价格实惠'}, {id: 12, name: '价格实惠2'}, {id: 13, name: '价格实惠3'}]
            // item.orderItemComment.label_ids = '11;13'
            // item.orderItemComment.content = '买家没有在规定时间内评论,系统默认好评!'
            // item.orderItemComment.seller_reply = '谢谢亲,满意的话,欢迎下次再光临,谢谢!'
            // item.orderItemComment.content_append = '系统默认好评'
            //
            // item.orderItemComment.images = [{image: 'http://qmadmin.haitaogoods.com/static/attachment/goods/15151390747083807_small.jpeg'},
            //   {image: 'http://qmadmin.haitaogoods.com/static/attachment/goods/15151390747083807_small.jpeg'},
            //   // {image: 'http://qmadmin.haitaogoods.com/static/attachment/goods/15151390747083807_small.jpeg'},
            //   // {image: 'http://qmadmin.haitaogoods.com/static/attachment/goods/15151390747083807_small.jpeg'},
            //   {image: 'http://qmadmin.haitaogoods.com/static/attachment/goods/15151390747083807_small.jpeg'}]
            // item.orderItemComment.images_append = item.orderItemComment.images
            // // item.labels = [{id: 1, name: 'asdasd'}, {id: 1, name: 'asdasd'}, {id: 1, name: 'asdasd'}]
            // item.labels.map(i => { i.isSelected = false })
            // end
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
  .triangle{
    width: pr(20);
    height: pr(20);
    top: pr(-10);
    left: pr(40);
    position: absolute;
    background: $pageDefaultColor;
    transform: rotate(45deg);
  }
  .goodsImg{
    width: pr(150);
    height: pr(150);
    border: none;
    border-radius: pr(8);
    margin-right: pr(20);
  }
  .goodsName{
    margin: pr(14) 0;
    font-size: $importantFontSize;
    color: $importantInfoAndTitleColor;
    line-height: pr(40);
  }
  .rateLabel{
    margin-top: pr(20);
    margin-right: pr(20);
    border: 1px solid $supportTextColor;
    width: pr(160);
    height: pr(56);
    line-height: pr(54);
    border-radius: pr(8);
    font-size: $normalFontSize;
    color: $supportTextColor;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
  }
  .rateLabel:nth-child(4){
    margin-right:0!important;
  }
  .active{
    color:$buttonColor;
    border: 1px solid $buttonColor;
  }
  .commenImg{
    width: pr(165);
    height: pr(165);
    border-radius: pr(10);
    border:1px solid $lineColor;
    box-sizing: border-box;
    flex-shrink: 0;
    margin-right: pr(14);
    margin-top: pr(20);
  }
  .commenImg:nth-child(4){
    margin-right: 0 !important;
  }
  .sellerReply{
    background: $pageDefaultColor;
    border-radius:pr(10);
    color: $importantInfoAndTitleColor;
    font-size: $normalFontSize;
    padding: pr(12) pr(18);
    line-height: pr(34);
    margin-top: pr(20);
    z-index: 12;
    position: relative;
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
