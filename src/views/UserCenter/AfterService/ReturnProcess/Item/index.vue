<template>
  <div>
    <div class="item-wrap"
         v-if="itemData.return_order_status===0 || itemData.return_order_status===4 || itemData.return_order_status===9">
      <h2 class="time">{{itemData.create_time}}</h2>
      <div class="contentBox">
        <div class="top flexBox">
          <h3>
            <span>等待卖家处理</span>
          </h3>
          <span>售后单号：{{itemData.return_order_code}}</span>
        </div>
        <div class="content"
             v-if="itemData.return_order_status===0 || itemData.return_order_status===4 || itemData.return_order_status===9">
          <p v-if="itemData.return_order_status===0">1. 如果卖家同意，则系统会自动按原付款路径退款</p>
          <p v-else>1. 如果卖家同意，请按系统给出的收货地址寄回货物</p>
          <p>2. 如果卖家拒绝，该售后申请将自动关闭。</p>
        </div>
      </div>
    </div>
    <div class="item-wrap">
      <h2 class="time">{{itemData.create_time}}</h2>
      <div class="contentBox">
        <div class="top flexBox">
          <h3>
            <span v-if="itemData.return_order_status===0">退款待审核</span>
            <span v-if="itemData.return_order_status===1">同意退款申请</span>
            <span v-if="itemData.return_order_status===2">退款成功</span>
            <span v-if="itemData.return_order_status===3">退款关闭</span>

            <span v-if="itemData.return_order_status===4">退货待审核</span>
            <span v-if="itemData.return_order_status===5">同意退货申请</span>
            <span v-if="itemData.return_order_status===6">卖家完成签收</span>
            <span v-if="itemData.return_order_status===7">退货成功</span>
            <span v-if="itemData.return_order_status===8">退货关闭</span>

            <span v-if="itemData.return_order_status===9">换货待审核</span>
            <span v-if="itemData.return_order_status===10">同意换货申请</span>
            <span v-if="itemData.return_order_status===11">卖家完成签收</span>
            <span v-if="itemData.return_order_status===12">换货商品寄出</span>
            <span v-if="itemData.return_order_status===13">换货成功</span>
            <span v-if="itemData.return_order_status===14">换货关闭</span>
          </h3>
          <span>售后单号：{{itemData.return_order_code}}</span>
        </div>
        <div class="content"
             v-if="itemData.return_order_status===0 || itemData.return_order_status===4 || itemData.return_order_status===9">
          <p>1. 申请服务：{{itemData.content.return_type}}</p>
          <p v-if="itemData.return_order_status===9">2. 换货数量：{{itemData.content.apply_num}}</p>
          <p v-else>2. 退款金额：<span v-format-price-num="itemData.content.refund_price"></span>
            元，数量：{{itemData.content.apply_num}}</p>
          <p>3. 申请说明：{{itemData.content.reason || '无'}}</p>
        </div>
        <div class="content" v-if="itemData.return_order_status===1">
          <p>系统将尽快完成退款，请注意查收！</p>
        </div>

        <div class="content" v-if="itemData.return_order_status===5 || itemData.return_order_status===10">
          <p>请寄回货物并附上您的帐号和订单号信息，收货地址：{{itemData.content.address.linkAddress ||
            '无'}}，{{itemData.content.address.linkMan}}(收)，{{itemData.content.address.linkTel}}</p>
          <p v-if="itemData.return_order_status===5">待卖家完成签收后完成退款退货售后！</p>
          <p v-else>待卖家完成签收后将会寄出换货商品！</p>
        </div>
        <div class="content" v-if="itemData.return_order_status===6 || itemData.return_order_status===11">
          <p v-if="itemData.return_order_status===6">卖家已完成签收，系统将尽快完成退款，请注意查收！</p>
          <p v-else>卖家已完成签收，等待卖家寄出换货商品！</p>
        </div>
        <div class="content" v-if="itemData.return_order_status===12">
          <p>卖家已寄出换货商品，请及时查收！</p>
          <p>
            <button class="btn" @click="toViewLogistics">查看物流</button>
            <button class="btn" @click="toReceived">确认收货</button>
          </p>
        </div>

        <div class="content"
             v-if="itemData.return_order_status===2 || itemData.return_order_status===7  || itemData.return_order_status===13">
          <p v-if="itemData.return_order_status===13">您已签收换货商品，换货售后完成！</p>
          <p v-else>尊敬的用户，系统已将退款退回至微信（<span v-format-price="itemData.content.refund_price"></span>），请注意查收！</p>
        </div>
        <div class="content"
             v-if="itemData.return_order_status===3 ||  itemData.return_order_status===8 || itemData.return_order_status===14 ">
          <p v-if="itemData.return_order_status===3">卖家拒绝退货，本次售后申请关闭！</p>
          <p v-else-if="itemData.return_order_status===8">卖家拒绝换货，本次售后申请关闭！</p>
          <p v-else>卖家拒绝申请，本次售后申请关闭！</p>
          <p>拒绝理由：{{itemData.content.reason || '无'}}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'item',
    props: {
      item: {
        type: Object,
        default: {}
      },
      returnOrderItemId: {
        type: Number
      },
      logistics: {
        type: Array,
        default: []
      },
      callback: {
        type: Function,
        default: undefined
      }
    },
    computed: {
      itemData () {
        if (this.item.content && this.item.content.length) {
          this.item.content = this.item.content.replace(/[\r\n]/g, ' ')  // 去掉回车
          this.item.content = JSON.parse(this.item.content)
          if (this.item.content.address) {
            this.item.content.address = JSON.parse(this.item.content.address)
          }
        }
        return this.item
      }
    },
    methods: {
      toViewLogistics () {  // 查看物流
        // console.log('物流单号', JSON.stringify(this.logistics))
        let url = '/order/logistic?logisticIDs=' + JSON.stringify(this.logistics)
        this.$router.push(url)
      },
      async toReceived () { // 确认收货
        let reqData = {
          returnOrderItemId: this.returnOrderItemId
        }
        let res = await this.$post('/mobileReturnOrder/buyerReceivedGoods.do', reqData)
        if (parseInt(res.code) === 1) {
          this.$toast('确认收货成功')
          this.callback()
        } else {
          this.$toast(res.message)
        }
      }

    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";
  .item-wrap {
    color: $importantInfoAndTitleColor;
    font-size: $importantFontSize;
    .time {
      height: pr(72);
      line-height: pr(72);
      text-align: center;
    }
    .contentBox {
      @include wrapPadding;
      background: #fff;
      border-top: 1px solid $lineColor;
      border-bottom: 1px solid $lineColor;
      .top {
        justify-content: space-between;
        height: $defaultHeight;
        line-height: $defaultHeight;
        border-bottom: 1px solid $lineColor;
      }
      .content {
        padding: pr(16) 0;
        p {
          line-height: pr(40);
          margin: pr(18) 0;
        }
        .btn {
          border: 1px solid $lineColor;
          line-height: pr(50);
          padding: 0 pr(20);
          border-radius: pr(2);
          margin-right: pr(20);
          color: $importantInfoAndTitleColor;
        }
      }
    }

  }

</style>

