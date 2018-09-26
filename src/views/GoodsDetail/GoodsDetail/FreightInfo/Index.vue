<template>
  <div class="flexBox freight-info center" v-if="isInit">
    <div>
      <p>运费</p>
    </div>
    <div class="flexChild">
      <p @click="isShow = true" v-if="freightStatus == 1 || addressInfo.province">
        <span>{{addressInfo.province}}</span>
        <span>></span>
        <span>{{addressInfo.city}}</span>
        <span>></span>
        <span>{{addressInfo.region}}</span>
      </p>
      <p @click="isShowOther = true" v-else>请选择</p>
      <p v-if="addressInfo.freight > 0" class="freight-price">{{freightPrice}}</p>
      <p class="main-color" v-else-if="addressInfo.freight < 0">该地区不支持配送</p>
      <p class="main-color" v-else-if="addressInfo.freight == 0 && addressInfo.province">免运费</p>
      <div v-transfer-dom>
        <popup v-model="isShow">
          <popup-header :left-text="'配送至'" :right-text="'确定'" @on-click-right="isShow = false"></popup-header>
          <div class="vux-popup-dialog-content">
            <div v-if="addressList.length > 0">
              <div @click="selectAddress(item,index)" v-for="(item,index) in addressList"
                  class="flexBox center address-item" :key="index">
                <i class="v-single-select"
                    :class="{'icon-change-highlight': selected == index, 'icon-change-disable': selected != index }"></i>
                <p :class="{'active': selected == index}" class="flexChild">{{item.province}}{{item.city}}{{item.region}}{{item.address}}</p>
              </div>
            </div>
          </div>
          <button class="buy-button" @click="isShow = false;isShowOther=true">选择其他地址</button>
        </popup>
      </div>
      <x-address style="display:none;" v-model="value" :title="'请选择地址'" :list="addressData" placeholder="请选择地区"
          :show.sync="isShowOther" @on-hide="selectRegion"></x-address>
    </div>
    <i class="icon-details-note" @click="isShowFreightDetail = true" v-if="addressInfo.province"></i>
    <div v-transfer-dom>
      <popup v-model="isShowFreightDetail">
        <popup-header :left-text="'配送规则'" :right-text="'确定'"
            @on-click-right="isShowFreightDetail = false"></popup-header>
        <div class="vux-popup-dialog-content">
          <p class="freight-text">表格中未说明的地区不支持发货</p>
          <table v-if="productId">
            <thead>
            <td>地区</td>
            <td>运费</td>
            </thead>
            <tr v-for="item in freightTemplate">
              <td>{{item.regionsNames}}</td>
              <td><p>{{item.freight}}</p></td>
            </tr>
          </table>
        </div>
      </popup>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import initAddress from '@/utils/address'
  import {PopupHeader, Popup, TransferDom, XAddress, Value2nameFilter as value2name} from 'vux'
  import {formatPriceNum} from '@/utils/utils'
  export default {
    directives: {
      TransferDom
    },
    components: {
      PopupHeader,
      Popup,
      XAddress
    },
    data () {
      return {
        value: ['', '', ''],
        addressData: [],
        isShow: false,
        isShowOther: false,
        isShowFreightDetail: false,
        selected: 0
      }
    },
    computed: {
      regions () {
        if (this.value[0] || this.value[1] || this.value[2]) {
          return value2name(this.value, this.addressData)
        } else {
          return ''
        }
      },
      productId () {
        return this.$store.state.GoodsDetail.selectSpec.productId
      },
      freightStatus () {
        return this.$store.state.GoodsDetail.goodsDetail.isLogin
      },
      freightPrice () {
        return formatPriceNum(this.$store.state.GoodsDetail.defaultAddressInfo.freight)
      },
      isInit () {
        return this.$store.state.GoodsDetail.isInit
      },
      addressInfo () {
        return this.$store.state.GoodsDetail.defaultAddressInfo
      },
      addressList () {
        return this.$store.state.AddressCenter.addressList
      },
      freightTemplate () {
        return this.$store.state.GoodsDetail.freightTemplate
      },
      userInfo () {
        return this.$getUser()
      }
    },
    created () {
      if (this.$store.state.UserCenter.userInfo) {
        if (!this.addressList.length) {
          this.$store.dispatch('getAddressList')
        }
      }
      const _this = this
      initAddress().then((address) => {
        _this.addressData = address
      }).catch((e) => {
        console.log(e)
      })
    },
    methods: {
      selectRegion (str) {
        if (str) {
          if (this.value[2]) {
            const regions = value2name(this.value, this.addressData).split(' ')
            this.$store.dispatch('changeAddress', {
              province: regions[0],
              city: regions[1],
              region: regions[2],
              street_id: this.value[2]
            })
          }
        }
      },
      selectAddress (item, index) {
        this.selected = index
        this.$store.dispatch('changeAddress', item)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  .main-color {
    color: $mainFontColor;
  }

  .freight-text {
    line-height: pr(40);
    font-size: $importantFontSize;
    margin-top: pr(10);
    color: $paragraphColor;
  }

  table {
    font-size: $importantFontSize;
    text-align: center;
    margin: 0 auto;
    margin-top: pr(10);
    width: pr(700);
    border-collapse: collapse;
    color: $paragraphColor;
    tr, thead {
      border: 1px solid $lineColor;
      line-height: pr(60);
      td:first-child {
        border: 1px solid $lineColor;
        width: pr(240);
        background: #fafafa;
      }
      td:last-child {
        p {
          width: 90%;
          margin: 0 auto;
          text-align: left;
        }
        background: #fff;
      }
    }
  }

  .freight-price {
    &:before {
      content: '¥';
      font-size: pr(20);
    }
    font-size: $importantFontSize;
    color: $mainFontColor;
  }

  .freight-info {
    min-height:pr(90);
    padding: pr(12) 0;
    font-size: $importantFontSize;
    color: $paragraphColor;
    div:nth-child(2) {
      padding-left: pr(32);
    }
    p {
      line-height: pr(40);
    }
  }

  .vux-popup-dialog-content {
    height: pr(366);
    font-size: pr(32);
    overflow-y: auto;
    padding: 0 pr(24);
  }

  .v-single-select {
    margin-right: pr(20);
    vertical-align: middle;
  }

  .address-item {
    height: pr(88);
    line-height: pr(88);
    font-size: $importantFontSize !important;
    color: $supportTextColor;
    &.active {
      color: $importantInfoAndTitleColor;
    }
  }

  .buy-button {
    background-color: #d73b3c;
    color: #fff;
    height: pr(98);
    width: 100%;
    font-size: $headerTextFontSize;
  }

  .icon-details-note {
    color: #ccc;
    width: pr(160);
    text-align: right;
  }
</style>
