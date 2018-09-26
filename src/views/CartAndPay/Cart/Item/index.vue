<template>
  <div class="item-wrap">
    <i class="v-single-select"
        :class="{'icon-change-highlight': itemData.checked, 'icon-change-disable': !itemData.checked }"
        @click="select"></i>
    <div class="img-box" @click="toProduct">
      <img class="item-img" :src="itemData.goodsImage" alt="">
      <div class="img-mask" v-if="itemData.isPutaway===0 || itemData.store<=0">
        <span>{{itemData.isPutaway === 0 ? '已下架' : '待补货'}}</span>
      </div>
    </div>

    <div class="item-con" v-show="!isEdit">
      <div class="title">
        <h3 @click="toProduct">{{itemData.goodsName}}</h3>
        <i v-if="itemData.isPutaway===1" class="icon-edit icon-shopping-dic" @click="toEdit"></i>
      </div>
      <p class="label-box" v-if="promotionArray.length"><span class="v-label" v-for="(item, index ) in promotionArray">{{item.promotionTitle}}</span>
      </p>
      <p class="spec o-hidden">{{itemData.specName}}</p>
      <p class="price-box flexBox">
        <span class="price-main" v-format-price-num="itemData.price"></span>
        <span class="num">{{itemData.num}}</span>
      </p>
    </div>
    <div class="item-con edit-con" v-show="isEdit">
      <div class="input-number-box">
        <number-input :max="max" :min="1" :value="itemData.num" v-on:numberInput="number" v-on:clickNumber="clickNumber"
            :canInput="false"></number-input>
      </div>
      <div class="spec-box flexBox center" @click="showSpec">
        <span class="o-hidden">{{itemData.specName}}</span>
        <i class="icon-pull-down"></i>
      </div>
      <p class="price-box">
        <span class="price-main">{{itemData.price}}</span>
      </p>
      <div class="button-finish v-button flexBox center" @click="toFinish">完<br>成</div>
    </div>
    <!-- 修改数量弹窗 -->
    <div v-transfer-dom>
      <popup v-model="showInputDialog" class="popup-wrap numberInputDialog">
        <div class="numberInputWrap">
          <div class="top">
            <h4>修改购买数量</h4>
            <div class="num-box">
              <number-input :max="max" :min="1" :value="itemData.num" v-on:numberInput="dialogNumber"
                  :canInput="true"></number-input>
            </div>
          </div>
          <button class="v-button" @click="toChangeNum">
            确定
          </button>
        </div>
      </popup>
    </div>
    <!-- 规格弹窗 -->
    <div v-transfer-dom>
      <popup v-model="showSpecDialog" class="popup-wrap specDialog">
        <div class="specWrap">
          <div class="top">
            <i class="icon-login-del" @click="showSpecDialog=false"></i>
          </div>
          <div class="goodsInfo flexBox">
            <img :src="itemData.goodsImage" alt="">
            <div class="rightPart">
              <h3>{{itemData.goodsName}}</h3>
              <p class="flexBox">
                <span class="price-main" v-format-price-num="currentSpec.price"></span>
                <span class="store">库存：{{currentSpec.store}}</span>
              </p>
            </div>
          </div>
          <ul class="specBox">
            <li class="specItem" v-for="(specItem,itemIndex) in specDataObj.specValueArray" :key="itemIndex">
              <h4>{{specItem.specValue}}</h4>
              <p>
                <span v-for="(item, index) in specItem.specItemArray" @click="selectSpec(itemIndex,item.specItemId)"
                    :class="{'active': currentSpec.specItemId[itemIndex] == item.specItemId, 'disabled': checkBtnStatus(itemIndex,item.specItemId)}"
                    :key="index">{{item.specItemValue}}</span>
              </p>
            </li>
          </ul>
          <button class="v-button" @click="closeSpecWin">
            确定
          </button>
        </div>
      </popup>
    </div>
  </div>


</template>

<script type="text/ecmascript-6">
  import {PopupHeader, Popup, TransferDom} from 'vux'
  import NumberInput from './NumberInput.vue'

  export default {
    components: {
      NumberInput,
      PopupHeader,
      Popup,
      TransferDom
    },
    directives: {
      TransferDom
    },
    props: {
      productIndex: { // 索引
        type: Number,
        default: 0
      },
      shopIndex: { // 索引
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        showInputDialog: false,
        showSpecDialog: false,
        isEdit: false,
        max: 1,
        specDataObj: {
          specValueArray: [],
          specArray: [],
          isHasData: false   // 判断是否已经加载数据过了
        },
        currentSpec: { // 当前选中的规格
          productId: null,
          price: 0,
          store: 0,
          specItemId: [],
          specName: ''
        },
        dialogNum: 1
      }
    },
    created () {
      this.max = this.itemData.store || 0
    },
    computed: {
      cartArray () {
        return this.$store.getters.cartList
      },
      itemData () {
        return this.$store.getters.cartList[this.shopIndex].productArray[this.productIndex] || {}
      },
      promotionArray () {
        let array = []
        if (this.itemData.promotionTitleArray && this.itemData.promotionTitleArray.length) {
          for (let i = 0; i < this.itemData.promotionTitleArray.length; i++) {
            let promotionItem = this.itemData.promotionTitleArray[i]
            if (promotionItem.promotionTitle !== '无折扣' && promotionItem.promotionTitle !== '10折') {
              array.push(promotionItem)
            }
          }
        }
        return array
      }
    },
    methods: {
      // 保存选择的规格
      closeSpecWin () {
        this.itemData.productId = this.currentSpec.productId
        // 保存到store
        let newItem = this.itemData
        newItem.specName = this.currentSpec.specName
        newItem.price = this.currentSpec.price
        newItem.store = this.currentSpec.store
        newItem.discount_price = this.currentSpec.discount_price
        newItem.num = 1
        let newInfo = {
          shopIndex: this.shopIndex,
          productIndex: this.productIndex,
          newItem: newItem
        }
        this.$store.dispatch('changeCartList', newInfo)
        this.showSpecDialog = false
      },
      // 检查按钮状态 规格按钮
      checkBtnStatus (lineIndex, id) {
        const produIdArray = this.specDataObj.specArray
        let checkItem = Array.from(this.currentSpec.specItemId)
        checkItem[lineIndex] = id
        checkItem = checkItem.join(',')
        for (let i = 0; i < produIdArray.length; i++) {
          if (produIdArray[i].specItemIds == checkItem) {
            return produIdArray[i].store <= 0
          }
        }
        return true // 后台返回的顺序是乱的，没有匹配到就返回可选
      },
      // 选中规格
      selectSpec (lineIndex, id) {
        if (!this.checkBtnStatus(lineIndex, id)) {
          const produIdArray = this.specDataObj.specArray
          this.$set(this.currentSpec.specItemId, lineIndex, id)
          let checkItem = Array.from(this.currentSpec.specItemId)
          checkItem[lineIndex] = id
          checkItem = checkItem.join(',')
          for (let i = 0; i < produIdArray.length; i++) {
            if (produIdArray[i].specItemIds == checkItem) {
              this.$set(this.currentSpec, 'price', produIdArray[i].price)
              this.$set(this.currentSpec, 'productId', produIdArray[i].productId)
              this.$set(this.currentSpec, 'store', produIdArray[i].store)
              this.$set(this.currentSpec, 'specName', produIdArray[i].specName)
              this.$set(this.currentSpec, 'discount_price', produIdArray[i].discount_price)
            }
          }
        }
      },
      // 选中商品
      select () {
        this.itemData.checked = !this.itemData.checked
        this.$store.dispatch('SetSelectCart', {
          shopIndex: this.shopIndex,
          productIndex: this.productIndex,
          checked: this.itemData.checked
        })
      },
      // 跳转到商品详情页
      toProduct () {
        if (this.itemData.isPutaway === 0) {
          this.$toast('商品已下架，无法查看！')
          return false
        }
        this.$toGoods(this.itemData.goodsId)
      },
      // 编辑
      async toEdit () {
        this.isEdit = true
        this.itemData.checked = false  // 设置选中
        this.select()

        this.currentSpec.productId = this.itemData.productId
        this.currentSpec.price = this.itemData.price
        this.currentSpec.store = this.itemData.store
        if (this.specDataObj.isHasData) {  // 已经有规格数据了
          return false
        }
        // 获取对应商品的规格数据
        let url = '/mobileGoods/getGoodsDetail.do'
        let data = {
          goodsId: this.itemData.goodsId
        }
        let resData = await this.$post(url, data)
        if (parseInt(resData.code) === 1) {
          this.specDataObj.specValueArray = resData.data.goodsjson.specValueArray || []
          this.specDataObj.specArray = resData.data.goodsjson.specArray || []
          this.specDataObj.isHasData = true
          this.specDataObj.specArray.map(spec => {
            if (resData.data.goodsjson.priceType === 2 && resData.data.goodsjson.discount && resData.data.goodsjson.discount < 100) {
              spec.discount_price = (spec.price * Number(100 - resData.data.goodsjson.discount) / 100).toFixed(2)
            } else {
              spec.discount_price = 0
            }
            console.log(spec.discount_price)
            if (spec.productId === this.currentSpec.productId) {
              this.currentSpec.specItemId = spec.specItemIds.split(',')
            }
          })
        } else {
          this.$toast(resData.message)
        }
      },
      // 编辑完成
      async toFinish () {
        let url = '/mobileCart/editCart.do'
        let cartArray = [{
          cartId: this.itemData.cartId,
          productId: this.itemData.productId,
          num: this.itemData.num
        }]
        let data = {
          cartArray: JSON.stringify(cartArray)
        }
        let resData = await this.$post(url, data)
        if (parseInt(resData.code) === 1) {
          let newItem = this.itemData
          let newInfo = {
            shopIndex: this.shopIndex,
            productIndex: this.productIndex,
            newItem: newItem
          }
          this.$store.dispatch('changeCartList', newInfo)
          this.isEdit = false
        } else {
          this.$toast(resData.message)
        }
      },
      // ---- 计数器 ----start -----//
      // 计数器 数量的修改
      number (value) {
        this.itemData.num = value
        // 保存到store
        let newItem = this.itemData
        let newInfo = {
          shopIndex: this.shopIndex,
          productIndex: this.productIndex,
          newItem: newItem
        }
        this.$store.dispatch('changeCartList', newInfo)
      },
      // 弹窗 计数器 数量
      dialogNumber (value) {
        this.dialogNum = value
      },
      // 显示 数量弹窗
      clickNumber () {
        this.showInputDialog = true
      },
      // 数量 弹窗里面的确定
      toChangeNum () {
        this.itemData.num = this.dialogNum
        this.showInputDialog = false
      },
      // ---- 计数器 ----end -----//

      // 编辑状态 -   弹出规格
      showSpec () {
        this.showSpecDialog = true
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/commom";

  .numberInputWrap {
    .top {
      display: flex;
      justify-content: space-between;
      padding: pr(40) pr(24);
      h4 {
        font-size: $titleFontSize;
        color: $importantInfoAndTitleColor;
        line-height: pr(60);
        font-weight: normal;
      }
    }
    .num-box {
      width: pr(294);
      height: pr(60);
    }
    .v-button {
      width: 100%;
      border-radius: 0;
    }
  }

  .spec-box {
    justify-content: space-between;
  }

  .specDialog {
    .top {
      height: pr(60);
      text-align: right;
      font-size: pr(60);
      color: $paragraphColor;
    }
    .goodsInfo {
      @include wrapMargin;
      padding-bottom: pr(30);
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
          width: 100%;
          margin-top: pr(40);
          justify-content: space-between;
          .store {
            font-size: $normalFontSize;
            color: $supportTextColor;
          }
        }
      }
    }
    .specBox {
      padding: pr(10) pr(24);
      height: 44vh;
      overflow: auto;
      .specItem {
        h4 {
          color: $importantInfoAndTitleColor;
          font-size: $importantFontSize;
          line-height: pr(68);
        }
        P {
          font-size: 0;
          span {
            display: inline-block;
            padding: 0 pr(24);
            margin: 0 pr(10) pr(10) 0;
            border: 1px solid $lineColor;
            line-height: pr(50);
            font-size: $normalFontSize;
            color: $importantInfoAndTitleColor;
            background: #fff;
            border-radius: pr(26);
            &.active {
              color: $mainFontColor;
              border-color: $mainFontColor;
            }
            &.disabled {
              color: $supportTextColor;
              background: $pageDefaultColor;
            }
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

