<template>
  <form class="address-form">
    <p class="flexBox">
      <span>收货人：</span>
      <input placeholder="请输入收货人姓名" type="text" class="flexChild" v-model="addrInfo.name"/>
    </p>
    <p class="flexBox">
      <span>手机号码：</span>
      <input placeholder="请输入收货人联系电话" type="tel" maxlength="11" class="flexChild" v-model="addrInfo.mobile"/>
    </p>
    <p class="flexBox" v-if="addressData.length > 0">
      <span>所在地区：</span><input placeholder="请选择地区" @click="showAddrMethod" readonly="readonly" class="flexChild"
        v-model="regions"/>
      <x-address style="display:none;" v-model="value" :title="'请选择地址'" :list="addressData" placeholder="请选择地区"
          :show.sync="showAddress"></x-address>
    </p>

    <p class="flexBox">
      <span>详细地址：</span>
      <input placeholder="请输入详细地址" type="text" class="flexChild" v-model="addrInfo.address"/>
    </p>
  </form>
</template>

<script type="text/ecmascript-6">
  import initAddress from '@/utils/address'
  import {XAddress, Value2nameFilter as value2name} from 'vux'
  import {checkPhoneNum} from '@/utils/utils'
  export default {
    components: {
      XAddress
    },
    data () {
      return {
        value: ['', '', ''],
        showAddress: false,
        addressData: [],
        addrInfo: {
          addressId: 0,
          address: '',
          name: '',
          mobile: '',
          provinceId: '',
          cityId: '',
          regionId: '',
          province: '',
          city: '',
          sregion: '',
          isDefault: 0
        }
      }
    },
    computed: {
      regions () {
        if (this.value[0] || this.value[1] || this.value[2]) {
          return value2name(this.value, this.addressData)
        } else {
          return ''
        }
      }
    },
    methods: {
      showAddrMethod () {
        this.showAddress = true
      },
      addAddress () {
        this.saveAddressData('addAddress')
      },
      editAddress () {
        this.saveAddressData('editAddress')
      },
      saveAddressData (action) {
        if (!this.addrInfo.name) {
          return this.$toast('请输入收货人姓名')
        }
        console.log(checkPhoneNum)
        if (!this.addrInfo.mobile) {
          return this.$toast('请输入手机号码')
        }
        if (!checkPhoneNum(this.addrInfo.mobile)) {
          return this.$toast('手机号格式有误！')
        }
        if (!this.regions) {
          return this.$toast('请选择所在地区')
        }
        if (!this.addrInfo.address) {
          return this.$toast('请输入详细地址')
        }
        let commitData = {
          name: this.addrInfo.name,
          mobile: this.addrInfo.mobile,
          address: this.addrInfo.address,
          provinceId: this.value[0],
          cityId: this.value[1],
          regionId: this.value[2]
        }
        if (action === 'editAddress') {
          commitData.addressId = this.addrInfo.addressId
        }
        this.$store.commit('SET_ADDADDRESSINFO', commitData)
        this.$store.dispatch(action, this.$router)
      }
    },
    destroyed () {
      this.$store.commit('SET_ADDADDRESSINFO', {})
    },
    created () {
      const _this = this
      initAddress().then((address) => {
        _this.addressData = address
        if (_this.$store.state.AddressCenter.addressInfo.addressId) {
          _this.addrInfo = _this.$store.state.AddressCenter.addressInfo
          _this.value = [_this.addrInfo.provinceId.toString(), _this.addrInfo.cityId.toString(), _this.addrInfo.regionId.toString()]
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../styles/index";

  .address-form {
    margin-top: pr(10);
    margin-bottom: pr(60);
    width: 100%;
    padding: 0 pr(24);
    background: #fff;
    p {
      height: pr(88);
      &:not(:last-child) {
        border-bottom: 1px solid $lineColor;
      }
      span {
        background: #fff;
        color: $importantInfoAndTitleColor;
        font-size: $importantFontSize;
        width: pr(160);
        padding-right: pr(20);
        line-height: pr(88);
      }
      input {
        line-height: 1.87733rem;
        font-size: $importantFontSize;
        color: $importantInfoAndTitleColor;
        &::-webkit-input-placeholder {
          color: #d2d2d2;
        }
      }
    }
  }
</style>
