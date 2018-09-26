<template>
  <div class="address-wrap">
    <p class="tip" v-if="(addressInfo.addressId || addressInfo.addressId===0 ) &&!addressInfo.isSupported">该地区不支持发货，请选择其他地区！</p>
    <div class="address-box has-address" @click="toSelectAddress" v-if="addressInfo.addressId || addressInfo.addressId===0">
      <p class="address-person"><span>{{addressInfo.shipName}}</span><span>{{addressInfo.shipMobile}}</span></p>
      <p class="address-detail">
        <i class="icon-localize flexBox center"></i>
        <span>{{addressInfo.address}}</span>
      </p>
    </div>
    <div class="address-box" @click="toAddAddress" v-else>
      <p class="address-add">
        <span>您还未设置收货地址哦！</span>
        <span class="toAdd">去设置<i class="icon-details-left"></i></span>
      </p>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        isSupported: true
      }
    },
    computed: {
      addressInfo () {
        return this.$store.getters.addressInfo
      }
    },
    methods: {
      toSelectAddress () {
        // 去选择地址
        this.$router.push('/addressList/selectAddress')
      },
      toAddAddress () {
        // 去添加地址
        this.$router.push('/addressList/addAddress')
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";
  .address-wrap {
    background: $blockDefaultColor;
    border-bottom: 1px solid $lineColor;
    margin-bottom: pr(10);
    .tip{
      height: pr(60);
      line-height: pr(60);
      padding: 0 pr(24);
      background: $tooltipsBackgroundColor;
      font-size: $normalFontSize;
      color: $mainFontColor;
    }
    .address-box{
      @include wrapPadding;
      padding-top: pr(30);
      padding-bottom: pr(30);
      .address-person{
        padding-left: pr(64);
        margin-bottom: pr(26);
        line-height: pr(32);
        font-size: $titleFontSize;
        color: $importantInfoAndTitleColor;
        span{
          margin-right: pr(54);
        }
      }
      .address-detail{
        display: flex;
        font-size: $normalFontSize;
        color: $paragraphColor;
        line-height: pr(30);
        i{
          flex: 0 0 pr(60);
          /*width: pr(60);*/
          /*height: 100%;*/
          /*display: inline-block;*/
          font-size: pr(30);
          color: $importantInfoAndTitleColor;
          vertical-align: top;
        }
        div{
          flex: 1;
          /*width: pr(630);*/
        }
      }
      .address-add{
        display: flex;
        justify-content: space-between ;
        line-height: pr(38);
        font-size: $titleFontSize;
        color: $importantInfoAndTitleColor;
        .toAdd{
          color: $mainFontColor;
          i{
            margin-left: pr(20);
            color: $secondaryTextColor;
            font-size: $importantFontSize;
          }

        }
      }
      &.has-address{
        background: url("./assets/pic_add.png") repeat-x left bottom;
        background-size: auto pr(3);
      }
    }
  }
</style>

