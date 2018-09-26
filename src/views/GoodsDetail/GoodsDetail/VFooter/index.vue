<template>
  <footer>
    <section class="flexBox">
      <div class="left-icons flexChild flexBox">
        <div style="position: relative;" @click="$router.push('/cartAndPay/cart')" class="flexChild center">
          <i class="icon-tab-cart"></i>
          <span>购物车</span>
          <badge v-if="badge > 0" class="badge" :text="badge"></badge>
        </div>
        <div @click="openServiceWindow" class="flexChild">
          <i class="icon-tab-service"></i>
          <span>客服</span>
        </div>
        <div class="flexChild" @click="checkFavorite">
          <i :class="isFavorite == 0? 'icon-tab-atte' : 'icon-tab-atte-highlight'"></i>
          <span>关注</span>
        </div>
      </div>
      <div v-if="goodsStore > 0" class="right-buttons">
        <button @click="openSelectWin" class="add-to-cart">加入购物车</button>
        <button @click="openSelectWin" class="buy-now">立即购买</button>
      </div>
      <div class="right-buttons" v-else>
        <button class="no-store">
          补货中
        </button>
      </div>
    </section>
    <div v-transfer-dom>
      <x-dialog v-model="showQrcodeServiceDialog">
        <div class="qrcodeTitle">长按二维码关注{{stationInfo.shopName}}公众号联系客服</div>
        <div class="qrcodeImg"><img :src="qrcodeUrl" style="max-width:100%"></div>
        <div @click="showQrcodeServiceDialog=false" class="closeQrcode">关闭</div>
      </x-dialog>
    </div>
    <confirm v-model="showPhoneServiceDialog" :hide-on-blur="true" :content="'您好，您可以拨打客服热线或者关注公众号“观前街1号”与线上客服进行相关咨询。'"
        :title="'联系客服'" :confirm-text="'关注二维码'" :cancel-text="'拨打热线'" @on-cancel="onCancel"
        @on-confirm="onConfirm"></confirm>
  </footer>
</template>

<script type="text/ecmascript-6">
  import {fetch} from '@/utils/fetch'
  import {Badge} from 'vux'
  export default {
    components: {
      Badge
    },
    async created () {
      if (this.userInfo) {
        const url = '/mobileCart/list.do'
        const res = await fetch(url, {})
        if (res.code == 1) {
          let cartLength = 0
          for (let i = 0; i < res.data.cartProductArray.length; i++) {
            cartLength += res.data.cartProductArray[i].productArray.length
          }
          this.badge = cartLength
        }
      }
      this.getQrcode()
      this.getStationInfo()
    },
    data () {
      return {
        badge: 0,
        qrcodeUrl: '',
        stationInfo: {
          onlineServiceWorkingTime: '获取中...',
          customerServiceWorkingTime: '获取中...'
        },
        showQrcodeServiceDialog: false,  // 是否显示二维码对话框
        showPhoneServiceDialog: false  // 是否显示电话客服对话框
      }
    },
    computed: {
      isFavorite () {
        return this.$store.state.GoodsDetail.goodsDetail.isFavorite
      },
      userInfo () {
        return this.$getUser()
      },
      goodsStore () {
        return this.$store.state.GoodsDetail.goodsDetail.goodsStore
      }
    },
    methods: {
      onConfirm () {
        this.showQrcodeServiceDialog = true
      },
      onCancel () {
        if (this.stationInfo.isPhoneServiceOpen) {
          window.location.href = 'tel://' + this.stationInfo.customerServicePhoneNumber
        }
      },
      // 获取在线客服二维码数据
      async getQrcode () {
        let url = '/mobileWechat/getPublishQrcode.do'
        let res = await this.$post(url, {})
        if (res.code == 1) {
          this.qrcodeUrl = res.data.url
        } else {
          this.$toast(res.message)
        }
        // console.log('在线客服的数据', res)
      },
      // 获取站点信息（包含电话客服）数据
      async getStationInfo () {
        let url = '/mobileSetting/getSiteSettingInfo.do'
        let res = await this.$post(url, {})
        if (res.code == 1) {
          this.stationInfo = res.data
        } else {
          this.$toast(res.message)
        }
        // console.log('电话客服的数据', res)
      },
      openServiceWindow () {
        this.showPhoneServiceDialog = true
      },
      openSelectWin () {
        this.$store.commit('SET_SPECWIN', true)
      },
      async checkFavorite () {
        if (this.userInfo) {
          if (this.isFavorite == 0) {
            const url = '/mobileGoodsCollection/goodsCollection.do'
            const params = {goodsId: this.$route.params.id}
            const res = await fetch(url, params)
            if (res.code == 1) {
              this.$toast('关注成功')
              this.$store.commit('SET_FAVORITE')
            }
          } else {
            const url = '/mobileGoodsCollection/goodsCancelCollection.do'
            const params = {goodsId: this.$route.params.id}
            const res = await fetch(url, params)
            if (res.code == 1) {
              this.$toast('已取消关注')
              this.$store.commit('SET_FAVORITE')
            }
          }
        } else {
          this.$wechat.getAuth(this.$route)
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
          this.$toast('您还未登录！')
        }
      },
      buyNow () {
        if (this.userInfo) {
          const payJson = {
            productId: this.$store.state.GoodsDetail.selectSpec.productId,
            num: this.$store.state.GoodsDetail.selectNum
          }
          sessionStorage.setItem('payJson', JSON.stringify(payJson))
          this.$router.push('/cartAndPay/confirmOrder')
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  .badge {
    position: absolute;
    right: 0;
    top: 0;
  }

  .qrcodeImg {
    max-width: pr(600);
    overflow: hidden;
  }

  .closeQrcode {
    line-height: pr(88);
    font-size: $importantFontSize;
    color: $paragraphColor;
    background: $pageDefaultColor;
    width: 100%;
  }

  footer {
    background: $footerBackgroundColor;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: $footerHeight;
    border-top: pr(1) solid $lineColor;
    section {
      font-size: 0;
      div {
        text-align: center;
        [class^="icon-"] {
          display: block;
          margin-top: pr(12);
          margin-bottom: pr(8);
          color: $buttonColor;
          font-size: pr(44);
        }
        span {
          display: block;
          font-size: $smallFontSize;
        }
      }
      .right-buttons {
        button {
          width: pr(208);
          height: $footerHeight;
          color: #fff;
          font-size: $importantFontSize;
        }
        .no-store {
          width:pr(400);
          background: #999;
        }
        .add-to-cart {
          background: #ea7b7c;
        }
        .buy-now {
          background: $buttonColor;
        }
      }
    }
  }

  .qrcodeTitle {
    line-height: pr(88);
    font-size: $normalFontSize;
    color: $paragraphColor;
    border-bottom: 1px solid $lineColor;
    width: 100%;
  }
</style>
