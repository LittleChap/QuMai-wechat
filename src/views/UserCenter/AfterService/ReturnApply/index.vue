<template>
  <div class="apply-wrap">
    <div class="header">
      <tab :line-width=2 :custom-bar-width="'4rem'" v-model="form.return_type">
        <tab-item class="vux-center"
                  v-for="(item, index) in tabList"
                  :key="index"
                  @on-item-click="selectType"
                  :class="{'disabled':priceInfo.orderStatus==2&&index!==0 }">
          {{item}}
        </tab-item>
      </tab>
    </div>
    <div class="content">
      <div class="moneyInput" v-show="form.return_type!==2">
        <div class="v-list-item">
          <div class="leftPart">退款金额</div>
          <div class="rightPart">
            <input type="text" v-model="form.applyMoney" @input="moneyInput(form.applyMoney)"
                   @blur="toSetNumber(form.applyMoney)">
            <i>元</i>
          </div>
        </div>
        <p>最多
          <span v-format-price-num="priceInfo.maxMoney"></span>
          元，已包含退货运费
          <span v-format-price-num="priceInfo.shipMoney"></span>
          元
        </p>
      </div>
      <div class="desBox">
        <div class="v-list-item">
          <div class="leftPart">申请说明</div>
        </div>
        <textarea maxlength="200" v-model="form.returnReason"></textarea>
        <p>{{remarkNum}}/200</p>
      </div>
      <div class="imgBox">
        <Upload :data="listImage"></Upload>
      </div>
      <div class="btnBox">
        <button class="v-button" @click="toSubmit">提交申请</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Tab, TabItem} from 'vux'
  import Upload from '@/components/Upload'

  export default {
    components: {
      Tab,
      TabItem,
      Upload
    },
    data () {
      return {
        returnOrderInfo: {
          orderItemId: this.$route.query.orderItemId,
          applyNum: this.$route.query.applyNum || 1
        },
        form: {
          return_type: 0,  // 0:退款1:退款退货;2:换货
          returnReason: '', // 退款说明
          applyMoney: 0  // 退款金额
        },
        priceInfo: {
          maxMoney: 0,
          shipMoney: 0,
          orderStatus: 5
        },
        tabList: ['仅退款', '退款退货', '换货'],
        listImage: []
      }
    },
    computed: {
      remarkNum () {
        return this.form.returnReason.length
      }
    },
    created () {
      this.getShip()
    },
    methods: {
      async getShip () {
        let reqData = Object.assign({}, this.returnOrderInfo)
        let res = await this.$post('/mobileReturnOrder/getMaxApplyMoney.do', reqData)
        if (parseInt(res.code) === 1) {
          this.priceInfo.maxMoney = res.data.priceReturnTotal || 0
          this.priceInfo.shipMoney = res.data.priceReturnByFreightIncludeCard || 0
          this.priceInfo.orderStatus = res.data.orderStatus
          this.form.applyMoney = res.data.priceReturnTotal || 0
        } else {
          this.$toast(res.message)
        }
      },
      selectType (val) {
        if (this.priceInfo.orderStatus === 2 && val !== 0) { // 待发货情况下 禁止选择 '退款退货', '换货'
          this.form.return_type = 0
          this.$toast('商品还未发货，只能申请仅退款售后！')
        }
      },
      moneyInput (value) {
        value = value.replace(/[^\d.]/g, '')  // 清除“数字”和“.”以外的字符
        value = value.replace(/^\./g, '0.')  // 验证第一个字符是数字而不是
        value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
        value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.') // 保证.只出现一次，而不能出现两次以上
        value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')// 只能输入两个小数
        if (value.indexOf('.') < 0 && value !== '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          value = parseFloat(value)
        }
        this.form.applyMoney = value
      },
      toSetNumber (value) {
        if (value === '') {
          this.form.applyMoney = 0
        }
      },
      async toSubmit () {
        if (this.priceInfo.orderStatus === 2 && this.form.return_type !== 0) { // 待发货情况下 禁止选择 '退款退货', '换货'
          this.$toast('商品还未发货，只能申请仅退款售后！')
          return false
        }
        if (this.form.return_type === 0 && this.form.applyMoney <= 0) { // 仅退款
          this.$toast('请输入大于0的退款金额')
          return false
        }
        if (this.form.return_type === 1 && this.form.applyMoney < 0) { // 退款退货
          this.$toast('请输入大于等于0的退款金额')
          return false
        }
        if (this.form.return_type !== 2 && this.form.applyMoney > this.priceInfo.maxMoney) {
          this.$toast('退款金额超过最大限制')
          return false
        }
        if (this.form.returnReason.length > 200) {
          this.$toast('请输入少于200字符的申请说明！')
          return false
        }
        this.form.returnReason = this.form.returnReason.replace(/[\r\n]/g, ' ')
        let returnImages = []
        this.listImage.map(url => {
          returnImages.push({
            img: url
          })
        })
        let orderItemArray = []
        orderItemArray.push(this.returnOrderInfo)
        let reqData = {
          orderItemArray: JSON.stringify(orderItemArray),
          returnImages: JSON.stringify(returnImages)
        }
        reqData = Object.assign({}, reqData, this.form)
        let res = await this.$post('/mobileReturnOrder/applyAfterSale.do', reqData)
        if (parseInt(res.code) === 1) {
          this.$toast('已提交申请，请耐心等待卖家处理')
          let _this = this
          setTimeout(function () {
            _this.$router.push({
              path: '/userCenter/returnProcess',
              query: {returnOrderItemId: res.data.returnOrderItemId}
            })
          }, 1000)
        } else {
          this.$toast(res.message)
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";

  .apply-wrap {
    .header {
      margin-bottom: pr(10);
    }
    .disabled {
      color: #999;
    }
    .moneyInput {
      .v-list-item {
        border: none;
        justify-content: space-between;
        .leftPart {
          font-size: $importantFontSize;
          color: $importantInfoAndTitleColor;
          &:before {
            content: '*';
            color: $mainFontColor;
          }
        }
        .rightPart {
          font-size: $normalFontSize;
          input {
            height: 100%;
            text-align: right;
          }
          i {
            margin-left: pr(4);
            color: $supportTextColor;
            font-style: normal;
          }
        }

      }
      p {
        @include wrapPadding;
        height: pr(64);
        line-height: pr(64);
        font-size: $normalFontSize;
        color: $importantInfoAndTitleColor;
      }
    }
    .desBox {
      background: #fff;
      textarea {
        resize: none;
        border: none;
        width: 100%;
        height: pr(230);
        padding: pr(20) pr(24);
      }
      p {
        @include wrapMargin;
        border-top: 1px solid $lineColor;
        line-height: pr(42);
        text-align: right;
        font-size: $normalFontSize;
        color: $supportTextColor;
      }
    }
    .imgBox {
      background: #fff;
      padding: pr(10) 0 pr(20);
      border-bottom: 1px solid $lineColor;
    }
    .btnBox {
      width: pr(664);
      margin: pr(60) auto;
    }
  }

</style>

