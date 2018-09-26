<!--帮助中心 首页-->
<template>
  <div class="bgw bdb">
    <Cell :title="`在线客服 ${stationInfo.onlineServiceWorkingTime}`"
          link="none" @click.native="showOnlineService"
          v-if="stationInfo.isOnlineServiceOpen"></Cell>
    <Cell :title="`电话客服 ${stationInfo.customerServiceWorkingTime}`"
          link="none"
          @click.native="showTelephoneService"
          v-if="stationInfo.isPhoneServiceOpen"></Cell>
    <Cell title="意见反馈" link="/ServiceAndFeedback/Feedback"></Cell>

    <div v-transfer-dom>
      <x-dialog v-model="showQrcodeServiceDialog">
        <div class="qrcodeTitle">长按二维码关注{{stationInfo.shopName}}公众号联系客服</div>
        <div class="qrcodeImg"><img :src="qrcodeUrl" style="max-width:100%"></div>
        <div @click="showQrcodeServiceDialog=false" class="closeQrcode">关闭</div>
      </x-dialog>
    </div>

  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        qrcodeUrl: '',   // 在线客服 二维码地址
        stationInfo: {
          onlineServiceWorkingTime: '获取中...',
          customerServiceWorkingTime: '获取中...'
        },  // 站点信息（包含电话客服的数据）
        showQrcodeServiceDialog: false,  // 是否显示二维码对话框
        showPhoneServiceDialog: false  // 是否显示电话客服对话框

      }
    },
    methods: {
      // 显示在线客服二维码
      showOnlineService () {
        if (this.stationInfo.isOnlineServiceOpen) {
          this.showQrcodeServiceDialog = true
        } else {
          this.$confirm({content: '对不起，在线客服暂未开通'})
        }
      },
      // 显示电话客服
      async showTelephoneService () {
        let msg = {
          title: '提示',
          content: '对不起，电话客服暂未开通'
        }
        if (this.stationInfo.isPhoneServiceOpen) {
          msg.content = `您好，我们的客服电话为<br>${this.stationInfo.customerServicePhoneNumber}<br>确定拨打?`
          msg.onConfirm = () => {
            if (this.stationInfo.isPhoneServiceOpen) {
              window.location.href = 'tel://' + this.stationInfo.customerServicePhoneNumber
            }
          }
        }
        this.$confirm(msg)
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
      }
    },
    created () {
      this.getQrcode()
      this.getStationInfo()
    }
  }
</script>

<style lang="scss" scoped  rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .bgw{background: #fff;}
  .bdb{border-bottom: #e6e6e6;}
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
  .qrcodeTitle{
    line-height: pr(88);
    font-size: $normalFontSize;
    color: $paragraphColor;
    border-bottom: 1px solid $lineColor;
    width: 100%;
  }
</style>
