<!--活动图标-->
<template>
    <div class="activeIconWrap">
      <div class="item" v-for="item, index in itemList" :key="index" @click="gotoDetail(item)">
        <img :src="item.image" alt="" class="img" />
        <div class="text">{{item.title}}</div>
      </div>
    </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data () {
      return {
        text: '',
        itemList: []
      }
    },
    computed: {},
    methods: {
      async getActiveItemList () {
        let url = '/mobileIndex/getModuleContentList'
        let data = { moduleId: 13 }
        let res = await this.$post(url, data)
        if (res.code === '1') {
          this.itemList = res.data.pageContentList
        }
        this.$log('获取活动图标', res)
      },
      gotoDetail (item) {
        let url = ''
        if (item.url_type == 2) {
          window.location.href = item.url
          return
        }
        if (item.url_type == 3) {
          window.location.href = item.url_image
          return
        }
        switch (item.url_type) {
          case 0: url = ''; break
          case 1: url = '/secondlevelpage?rankId=' + item.page_rank_id; break
          case 2: url = item.url; break
          case 3: url = item.url_image; break
          case 4: url = '/goodsDetail/' + item.url_goodsId; break
        }
        this.$router.push(url)
      }
    },
    created () {
      this.getActiveItemList()
    },
    mounted () {}
  }
</script>

<style lang="scss" scoped  rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .activeIconWrap {
    background:#fff;
    width:100vw;
    /*height: pr(164);*/
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid $lineColor;
    margin-bottom: pr(10);
  }
  .item{
    display: flex;
    flex-direction: column;
    width: 25vw;
    justify-content: center;
    align-items: center;
    height: pr(164);
    box-sizing: border-box;
    overflow: hidden;
  }
  .img{
    width: pr(90);
    height: pr(90);
    border-radius: pr(90);
    border: none;
  }
  .text{
    line-height: pr(44);
    font-size: $normalFontSize;
    color:#333;
  }
</style>
