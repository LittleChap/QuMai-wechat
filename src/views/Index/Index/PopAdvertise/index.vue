<!--弹出广告-->
<template>
  <div v-transfer-dom class="advertiseWrap">
    <x-dialog v-model="showAdvertise">
      <img @click="gotoDetail" :src="this.advertiseInfo.image" alt="广告图">
      <button @click="showAdvertise = false" class="icon-login-del closeBtn"></button>
    </x-dialog>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data () {
      return {
        text: '',
        advertiseInfo: [],
        showAdvertise: false
      }
    },
    computed: {},
    methods: {
      async getActiveItemList () {
        let url = '/mobileIndex/getModuleContentList'
        let data = {moduleId: 17}
        let res = await this.$post(url, data)
        if (res.code === '1') {
          if (res.data.pageContentList.length) {
            this.showAdvertise = true
            this.advertiseInfo = res.data.pageContentList[0]
          }
        }
        this.$log('获取弹出广告内容', res)
      },
      gotoDetail () {
        let url = ''
        if (this.advertiseInfo.url_type == 2) {
          window.location.href = this.advertiseInfo.url
          return
        }
        if (this.advertiseInfo.url_type == 3) {
          window.location.href = this.advertiseInfo.url_image
          return
        }
        switch (this.advertiseInfo.url_type) {
          case 0:
            url = ''
            break
          case 1:
            url = '/secondlevelpage?rankId=' + this.advertiseInfo.page_rank_id
            break
          case 2:
            url = this.advertiseInfo.url
            break
          case 3:
            url = this.advertiseInfo.url_image
            break
          case 4:
            url = '/goodsDetail/' + this.advertiseInfo.url_goodsId
            break
        }
        this.$router.push(url)
      }
    },
    created () {
      if (!sessionStorage.getItem('showAdvertise')) {
        this.getActiveItemList()
        sessionStorage.setItem('showAdvertise', true)
      }
    },
    mounted () {
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';

  .advertiseWrap {
    img {
      display: block;
      width: 80vw;
      height: 107vw;
      /*width: pr(600);*/
      /*height: pr(800);*/
    }
    .closeBtn {
      width: pr(100);
      height: pr(100);
      margin: pr(80) 0 pr(10);
      text-align: center;
      line-height: pr(98);
      border: 1px solid #fff;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      font-size: pr(80);
      &:before {
        vertical-align: top;
      }
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  .advertiseWrap {
    .weui-dialog {
      background: transparent;
    }
  }
</style>
