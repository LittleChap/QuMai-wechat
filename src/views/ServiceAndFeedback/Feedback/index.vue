<!--帮助中心 - 意见反馈-->
<template>
    <div>
      <div class="mb10 bgw bdb p24 grey">
        <div class="feedTypeTitle">请选择意见类型</div>
        <div class="dsf fww pb10">
          <div class="feedItem"
               v-for="item, index in feedTypeList"
               :key="index"
               :class="{active:item.value == feedType}"
               @click="selectType(item)"
          >{{item.label}}</div>
        </div>
      </div>

      <div class="bgw bdb p24 fim lh88 dark bdb">反馈内容</div>
      <div class="bgw">
        <x-textarea v-model="txtRemark" :max="200" :rows="6" class="txtRemark"></x-textarea>
        <div class="mlr24 bsbb bdb"></div>
      </div>
      <upload :data="imglist" :max="3"></upload>
      <div class="w100 h10r"></div>
      <Cell title="联系方式"  v-model="txtContact" type="text" border="full" placeholder="请输入您的联系方式"></Cell>
      <div class="bgr mt60 mlr45 f32 lh88 cfff tac" :class="{disabled:isLoading}" @click="submitFeedback">提交</div>
    </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data () {
      return {
        feedTypeList: [
          { label: '功能意见', value: 1 },
          { label: '页面意见', value: 2 },
          { label: '操作意见', value: 3 },
          { label: '你的需求', value: 5 },
          { label: '其他意见', value: 4 }],
        feedType: 1,      // 反馈类型
        imglist: [],      // 反馈图片
        txtRemark: '',    // 反馈内容
        txtContact: '',   // 联系电话
        isLoading: false  // 是否正在加载中
      }
    },
    computed: {},
    methods: {
      //  切换反馈的意见类型
      selectType (item) {
        this.feedType = item.value
      },
      // 提交反馈
      async submitFeedback () {
        if (this.isLoading) { return }
        if (!this.txtRemark) {
          this.$toast('请输入反馈说明')
          return
        }
        let url = '/mobileMemberFeedback/saveFeedback.do'
        let body = {
          type: this.feedType,
          content: this.txtRemark,
          Images: this.imglist.join(','),
          contact_way: this.txtContact
        }
        this.isLoading = true
        let res = await this.$post(url, body)
        if (res.code == 1) {
          this.$toast('提交成功，谢谢反馈！')
          setTimeout(() => { this.$router.push('/userCenter') }, 1500)
        } else {
          this.$toast(res.message)
        }
      }
    },
    created () {},
    mounted () {}
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  @import '~@/styles/noahcommon.scss';
  .p24{padding: 0 pr(24);}
  .fim{font-size: $importantFontSize;}
  .feedTypeTitle{
    line-height: pr(88);
    font-size: $importantFontSize;
  }
  .feedItem{
    margin-right: pr(20);
    margin-bottom: pr(20);
    padding: 0 pr(20);
    line-height: pr(62);
    border-radius: pr(8);
    color:#333;
    font-size: $importantFontSize;
    border: 1px solid #999;
  }
  .active{
    color:$buttonColor;
    border: 1px solid $buttonColor;
  }
  .txtRemark{
    width: 100vw;
    box-sizing: border-box;
    padding: pr(20);
    border: none;
    display: block;
  }
  .disabled{
    background: $secondaryTextColor!important;
  }
</style>
