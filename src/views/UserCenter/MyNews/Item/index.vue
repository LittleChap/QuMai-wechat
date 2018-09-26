<template>
  <div class="item-wrap">
    <div class="top flexBox" @click="clickProduct">
      <div class="leftPart">
        <i class="v-single-select"
           :class="{'icon-change-highlight': isChecked, 'icon-change-disable': !isChecked }"
           v-show="isEdit"></i>
        <span>{{itemData.messageTitle}}</span>
      </div>
      <div class="rightPart">
        <span>{{itemData.createTime}}</span>
        <i v-show="!isEdit" class="icon-mess-del" @click="deleteSingle"></i>
      </div>
    </div>
    <div class="content" @click="toProduct">{{itemData.messageContent}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      itemData: {
        type: Object,
        default: {}
      },
      itemIndex: {
        type: Number,
        default: 0
      },
      isEditStatus: {
        type: Boolean,
        default: false
      },
      isAllChecked: {
        type: Boolean,
        default: false
      },
      isClickAllChecked: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        checked: false
      }
    },
    computed: {
      isEdit () {
        return this.isEditStatus
      },
      isChecked () {
        if (this.isClickAllChecked) {
          this.checked = this.isAllChecked
        } else if (this.isAllChecked) {
          this.checked = true
        }
        return this.checked
      }
    },
    methods: {
      deleteSingle () {
        let _this = this
        this.$confirm({
          title: '提示',
          content: `是否删除该消息？`,
          confirmText: '确定',
          cancelText: '取消',
          async onConfirm () {
            // 删除
            let res = await _this.$post('/mobileInstationMessage/batchfalseDeleteMessage.do', {messageIds: _this.itemData.messageId})
            if (parseInt(res.code) === 1) {
              _this.$toast('删除成功')
              _this.$emit('deleteIndex', _this.itemIndex)
            } else {
              this.$toast(res.message)
            }
          }
        })
      },
      clickProduct () {
        if (!this.isEdit) {
          return false
        }
        this.checked = !this.checked
        this.$emit('singleCheck', {checked: this.checked, messageId: this.itemData.messageId})
      },
      toProduct () {
        let url = ''
        if (this.itemData.messageType === 2 || this.itemData.messageType === 3 || this.itemData.messageType === 4) {  // 到订单详情页
          url = `/order/orderDetail?orderSn=${this.itemData.orderSn}`
        } else if (this.itemData.messageType === 5 || this.itemData.messageType === 6 || this.itemData.messageType === 7) { // 到售后进度详情页
          url = `/userCenter/returnProcess?returnOrderItemId=${this.itemData.returnOrderItemId}`
        }
        this.$router.push(url)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";
  .item-wrap {
    @include blockMargin;
    @include wrapPadding;
    background: #fff;
    border-top: 1px solid $lineColor;
    border-bottom: 1px solid $lineColor;
    font-size: $importantFontSize;
    color: $importantInfoAndTitleColor;
    .top {
      justify-content: space-between;
      height: pr(80);
      line-height: pr(80);
      border-bottom: 1px solid $lineColor;
      .rightPart {
        color: $supportTextColor;
        vertical-align: top;
        span {
          vertical-align: top;
          line-height: pr(80);
        }
        i {
          line-height: pr(80);
          margin-left: pr(6);
          color: $lineColor;
          font-size: pr(36);
        }
      }
    }
    .content {
      padding: pr(14) 0;
      line-height: pr(40);
    }
  }

</style>

