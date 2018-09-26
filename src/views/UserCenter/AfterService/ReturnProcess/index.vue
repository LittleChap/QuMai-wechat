<template>
  <div class="process-wrap">
    <div
        :class="{'wrap-padding': isShowApplyBtn}">
      <item v-for="(item, index) in returnOrderInfo.returnOrderLogVOS"
            :key="index"
            :item="item"
            :logistics="returnOrderInfo.logisticsVOList"
            :returnOrderItemId="returnOrderItemId" :callback="getDetail"></item>
    </div>
    <button
        v-if="isShowApplyBtn"
        @click="applyServive"
        class="v-button">申请售后
    </button>
    <div v-transfer-dom>
      <popup v-model="showConfirm" class="applyDialog">
        <div class="applyWrap">
          <div class="top">
            <i class="icon-login-del" @click="showConfirm=false"></i>
          </div>
          <div class="goodsInfo flexBox">
            <img :src="currentItem.goodsImage" alt="">
            <div class="rightPart">
              <h3>{{currentItem.goodsName}}</h3>
              <p class="flexBox">
                数量：
                <NumberInput v-model="num" :min="1" :max="currentItem.max" class="inputBox"/>
              </p>
            </div>
          </div>
          <button class="v-button" @click="confirmApplyService">
            申请售后
          </button>
        </div>
      </popup>
    </div>
    <GoTop/>
  </div>


</template>

<script type="text/ecmascript-6">
  import Item from './Item/index.vue'
  import {Popup, TransferDom} from 'vux'

  export default {
    components: {
      Item,
      Popup,
      TransferDom
    },
    data () {
      return {
        num: 1,             // 申请售后的商品数量
        currentItem: {},    // 要拿去申请售后的商品
        showConfirm: false, // 是否打开申请售后确认弹窗
        returnOrderItemId: Number(this.$route.query.returnOrderItemId || 0),
        returnOrderInfo: {
          returnOrderItemVOS: [
            {return_order_status: 0}
          ]
        }
      }
    },
    created () {
      this.getDetail()
    },
    computed: {
      isShowApplyBtn () {
        return this.returnOrderInfo.returnOrderItemVOS[0].return_order_status === 3 || this.returnOrderInfo.returnOrderItemVOS[0].return_order_status === 8 || this.returnOrderInfo.returnOrderItemVOS[0].return_order_status === 14
      }
    },
    methods: {
      // 申请售后
      applyServive () {
        this.num = 1
        this.showConfirm = true
      },
      // 取消 申请收货
      cancelApplyService () {
        this.num = 1
        this.showConfirm = false
      },
      // 确认 申请售后
      confirmApplyService () {
        let url = `/userCenter/returnApply?orderItemId=${this.currentItem.orderItemId}&applyNum=${this.num}`
        this.$router.push(url)
      },
      async getDetail () {
        let reqData = {
          returnOrderItemId: this.returnOrderItemId
        }
        let res = await this.$post('/mobileReturnOrder/getReturnProcess.do', reqData)
        if (parseInt(res.code) === 1) {
          res.data.returnOrderLogVOS.reverse()
          this.returnOrderInfo = res.data
          this.currentItem.max = res.data.returnOrderItemVOS[0].product_num || 1
          this.currentItem.goodsName = res.data.returnOrderItemVOS[0].goods_name
          this.currentItem.goodsImage = res.data.returnOrderItemVOS[0].image_thumbnail
          this.currentItem.orderItemId = res.data.returnOrderItemVOS[0].order_item_id
        } else {
          this.$toast(res.message)
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";
  .process-wrap {
    padding-bottom: pr(10);
    .wrap-padding {
      padding-bottom: pr(88);
    }
    .v-button {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 99;
      width: 100%;
    }
  }
  .applyDialog {
    z-index: 1000;
    .top {
      height: pr(60);
      text-align: right;
      font-size: pr(60);
      color: $paragraphColor;
    }
    .goodsInfo {
      @include wrapMargin;
      padding-bottom: pr(40);
      border-bottom: 1px solid $lineColor;
      img {
        width: pr(150);
        height: pr(150);
        border-radius: pr(4);
        border: 1px solid $lineColor;
      }
      .rightPart {
        flex: 1;
        height: pr(150);
        padding-left: pr(20);
        h3 {
          width: 100%;
          height: pr(80);
          line-height: pr(40);
          font-size: $importantFontSize;
          overflow: hidden;
          white-space: normal;
          text-overflow: ellipsis;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        p {
          font-size: $importantFontSize;
          line-height: pr(58);
          margin-top: pr(6);
          .inputBox{
            width: pr(300);
          }
        }
      }
    }
    .v-button {
      width: 100%;
      border-radius: 0;
    }
  }

</style>

