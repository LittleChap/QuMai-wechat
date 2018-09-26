<template>
  <div>
    <div class="spec-infos flexBox" @click="openSelectWin">
      <p class="flexChild">
        <span v-if="goodsStore > 0">已选</span>
        <span v-else>未选</span>
        <span v-if="goodsStore <= 0">商品缺货</span>
        <span v-if="isSelected == 0 && goodsStore > 0">未选择</span>
        <span v-else-if="isSelected == 1 && goodsStore > 0">{{selectedSpec.specName}}</span>
      </p>
      <i class="icon-details-left"></i>
    </div>
    <div v-transfer-dom>
      <popup v-model="selectStatus" class="popup-wrap specDialog">
        <div v-if="selectedSpec.specItemIds" class="specWrap">
          <div class="top">
            <i class="icon-login-del" @click="closeSelectWin"></i>
          </div>
          <div class="goodsInfo flexBox">
            <img v-if="itemData.galleryArray" :src="itemData.galleryArray[0].imageThumbnail" alt="">
            <div class="rightPart">
              <h3>{{itemData.name}}</h3>
              <p class="flexBox">
                <span class="price-main" v-format-price-num="selectedSpec.specPrice">{{selectedSpec.specPrice}}</span>
                <span class="store">库存：{{selectedSpec.store}}</span>
              </p>
            </div>
          </div>
          <ul class="specBox" ref="scrollBar">
            <li class="specItem" v-for="(specItem,itemIndex) in itemData.specValueArray" :key="itemIndex">
              <h4>{{specItem.specValue}}</h4>
              <p>
                <span @click="selectSpec(itemIndex,item.specItemId)" v-for="(item, index) in specItem.specItemArray"
                    :class="{'active': selectId[itemIndex] == item.specItemId,'disabled': checkBtnStatus(itemIndex,item.specItemId)}"
                    :key="index">{{item.specItemValue}}</span>
              </p>
            </li>
            <div class="num-wrapper flexBox" v-if="selectedSpec.specItemIds">
              <h4 class="flexChild">
                数量
              </h4>
              <number-input :max="selectedSpec.store" :min="1" :value="selectNum" v-on:numberInput="number"
                  :canInput="true"></number-input>
            </div>
          </ul>
          <p class="flexBox">
            <button class="v-button pinkColor flexChild" @click="addToCart">加入购物车</button>
            <button class="v-button flexChild" @click="buyNow">立即购买</button>
          </p>
        </div>
      </popup>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {fetch} from '@/utils/fetch'
  import {PopupHeader, Popup, TransferDom} from 'vux'
  import NumberInput from './NumberInput.vue'
  export default {
    components: {
      PopupHeader,
      Popup,
      TransferDom,
      NumberInput
    },
    data () {
      return {
        screenHeight: document.body.clientHeight
      }
    },
    mounted () {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenHeight = document.body.clientHeight
          that.screenHeight = window.screenHeight
        })()
      }
    },
    watch: {
      screenHeight (val) {
        this.$refs.scrollBar.scrollTop = 10000
      }
    },
    directives: {
      TransferDom
    },
    methods: {
      checkBtnStatus (lineIndex, id) {
        // 检查按钮状态
        const produIdArray = this.itemData.specArray
        let checkItem = Array.from(this.selectId)
        checkItem[lineIndex] = id
        checkItem = checkItem.join(',')
        for (let i = 0; i < produIdArray.length; i++) {
          if (produIdArray[i].specItemIds == checkItem) {
            return produIdArray[i].store <= 0
          }
        }
        return true // 后台返回的顺序是乱的，没有匹配到就返回可选
      },
      buyNow () {
        if (this.userInfo) {
          const payJson = {
            productId: this.$store.state.GoodsDetail.selectSpec.productId,
            num: this.$store.state.GoodsDetail.selectNum
          }
          sessionStorage.setItem('payJson', JSON.stringify(payJson))
          this.$router.push('/cartAndPay/confirmOrder')
        } else {
          const _this = this
          this.$toast('您还未登录！')
          setTimeout(() => {
            _this.$wechat.getAuth(this.$route)
          }, 1000)
        }
      },
      async addToCart () {
        if (this.userInfo) {
          const url = '/mobileCart/add.do'
          const payJson = {
            productId: this.$store.state.GoodsDetail.selectSpec.productId,
            num: this.$store.state.GoodsDetail.selectNum
          }
          const response = await fetch(url, payJson)
          if (response.code == 1) {
            this.$toast('加入购物车成功！')
          }
        } else {
          const _this = this
          this.$toast('您还未登录！')
          setTimeout(() => {
            _this.$wechat.getAuth(this.$route)
          }, 1000)
        }
      },
      // 计数器 数量
      number (value) {
        this.$store.commit('SET_SELECTNUM', parseInt(value))
        let item = this.selectedSpec
        item.price = value * item.specPrice
        this.$store.commit('SET_SELECTSPEC', item)
      },
      selectSpec (index, id) {
        if (!this.checkBtnStatus(index, id)) {
          let ids = this.selectId
          ids[index] = id
          ids = ids.join(',')
          this.$store.commit('SET_SPEC', ids)
        }
      },
      openSelectWin () {
        if (this.goodsStore > 0) {
          this.selectStatus = true
        } else {
          this.$toast('商品正在补货中')
        }
      },
      closeSelectWin () {
        this.selectStatus = false
      }
    },
    computed: {
      selectNum: {
        set (val) {
          this.$store.commit('SET_SELECTNUM', parseInt(val))
        },
        get () {
          return this.$store.state.GoodsDetail.selectNum
        }
      },
      goodsStore () {
        return this.$store.state.GoodsDetail.goodsDetail.goodsStore
      },
      isSelected () {
        return this.$store.state.GoodsDetail.selectSpec.specName ? 1 : 0
      },
      selectedSpec () {
        return this.$store.state.GoodsDetail.selectSpec
      },
      itemData () {
        return this.$store.state.GoodsDetail.goodsDetail
      },
      selectId () {
        let ids = this.$store.state.GoodsDetail.selectSpec.specItemIds.split(',')
        return ids
      },
      selectStatus: {
        set (val) {
          this.$store.commit('SET_SPECWIN', val)
        },
        get () {
          return this.$store.state.GoodsDetail.specWinStatus
        }
      },
      userInfo () {
        return this.$getUser()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";
  @import "./assets/commom";

  .pinkColor {
    background: #ea7b7c !important;
  }

  .num-wrapper {
    border-top: 1px solid $lineColor;
    padding-top: pr(30);
    margin-top: pr(10);
  }

  h4 {
    color: $importantInfoAndTitleColor;
    font-size: $importantFontSize;
    line-height: pr(68);
  }

  .spec-infos {
    font-size: 0;
    padding: pr(32) 0;
    color: $paragraphColor;
    border-bottom: 1px solid $lineColor;
    span {
      font-size: $importantFontSize;
    }
    span:last-child {
      padding-left: pr(32);
    }
    .icon-details-left {
      font-size:pr(28);
      color: $secondaryTextColor;
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
