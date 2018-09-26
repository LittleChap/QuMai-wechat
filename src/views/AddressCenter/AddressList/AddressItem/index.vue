<template>
  <section>
    <div>
      <p class="flexBox">
        <span class="flexChild">联系人：{{item.name}}</span>
        <span class="flexChild">{{mobile}}</span>
      </p>
      <p>收货地址：{{item.province}}&nbsp;{{item.city}}&nbsp;{{item.region}}&nbsp;{{item.address}}</p>
    </div>
    <div class="flexBox center">
      <div class="set-defaul-btn">
        <i class="v-single-select"
            :class="{'icon-change-highlight': item.isDefault, 'icon-change-disable': !item.isDefault }"
            @click="select"></i>&nbsp; <span v-if="item.isDefault" class="is-default">默认地址</span>
        <span v-else>设为默认</span>
      </div>
      <div class="flexChild addr-btns">
        <span @click="editAddress"><i class="icon-ReceAdd-edit"></i><span>编辑</span></span>
        <span @click="deleteAddress"><i class="icon-ReceAdd-del"></i><span>删除</span></span>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import {hidePhoneNum} from '@/utils/utils'
  export default {
    props: {
      item: {
        type: Object
      }
    },
    computed: {
      mobile () {
        return hidePhoneNum(this.item.mobile)
      }
    },
    methods: {
      select () {
        if (!this.item.isDefault) {
          this.$store.dispatch('setDefaultAddress', this.item.addressId)
        }
      },
      deleteAddress () {
        let _this = this
        this.$confirm({
          title: '提示',
          content: `是否删除`,
          confirmText: '确定',
          cancelText: '取消',
          onConfirm () {
            _this.$store.dispatch('deleteAddress', _this.item.addressId)
          }
        })
      },
      editAddress () {
        this.$store.commit('SET_ADDADDRESSINFO', this.item)
        this.$router.push(`/addressList/editAddress/${this.item.addressId}`)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index";

  section {
    .addr-btns {
      i {
        display: inline-block;
        margin-top: pr(-4);
        vertical-align: middle;
        font-size: pr(36);
      }
      span {
        vertical-align: middle;
      }
    }
    background: #fff;
    margin-top: pr(10);
    padding: 0 pr(24);
    width: 100%;
    div:nth-child(1) {
      padding: pr(10) 0 pr(20);
      border-bottom: 1px solid $lineColor;
      p {
        padding-top: pr(20);
        font-size: $importantFontSize;
        &:nth-child(1) {
          color: $importantInfoAndTitleColor;
        }
        &:nth-child(2) {
          line-height:pr(40);
          color: $supportTextColor;
          overflow:hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
        }
        span {
          &:nth-child(1) {
            text-align: left;
          }
          &:nth-child(2) {
            text-align: right;
          }
        }
      }
    }
    div:nth-child(2) {
      padding: pr(20) 0;
      font-size: $importantFontSize;
      div:nth-child(1) {
        padding: 0;
        border: none;
        color: $importantInfoAndTitleColor;
      }
      div:nth-child(2) {
        padding: 0;
        text-align: right;
        color: $supportTextColor;
      }
    }

    .set-defaul-btn {
      i {
        vertical-align: middle !important;
      }
      span {
        &.is-default {
          color: $mainFontColor;
        }
        vertical-align: middle !important;
      }
    }
  }

</style>
