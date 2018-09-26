<!--热搜-->
<template>
  <div class="wrap">

    <div class="title">
      <i class="icon-search-hot title_img"></i>
      <div class="title_text">热搜</div>
    </div>

    <div class="item_wrap">
      <div class="item" :class="{highlight:item.isHighlight}" v-for="item, index in hotKeyList" :key="index" @click="search(item)">{{item.name}}</div>
    </div>

  </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data () {
      return {
        hotKeyList: []
      }
    },
    computed: {},
    methods: {
      async getHotKeyList () {
        let url = '/mobileGoods/getKeywords.do'
        let res = await this.$post(url, {})
        if (res.code === '1') {
          this.hotKeyList = res.data.keywordsArray
        }
        // console.log('获取热搜关键字', res)
      },
      search (item) {
        let url = ''
        if (item.type == 1) {
          url = '/secondlevelpage?rankId=' + item.pageId
        } else {
          url = '/searchResult?key=' + item.name
        }
        // this.$store.dispatch('searchProducts', {goodsName: item})
        this.$router.push(url)
      }
    },
    created () {
      this.getHotKeyList()
    },
    mounted () {
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';

  .wrap {
    background: #fff;
    width: 100vw;
    box-sizing: border-box;
    padding: pr(30) pr(11) 0 pr(11);
    position: relative;
    margin-bottom: pr(10);
  }
  .title{
    height: pr(40);
    width: 100%;
    display: flex;
    align-items: center;
  }
  .title_img{
    font-size: pr(40);
    line-height: pr(40);
    color: $mainFontColor;
    margin-right: pr(20);
    margin-left: pr(15);
  }
  .title_text{
    font-size: $headerTextFontSize;
    line-height:pr(40);
    color:#333;
  }
  .item_wrap{
    padding: pr(15) 0;
    display: flex;
    flex-wrap: wrap;
  }
  .item{
    height: pr(60);
    line-height: pr(60);
    padding: 0 pr(25);
    font-size: $importantFontSize;
    margin: pr(15);
    border:1px solid #666;
    color:#666;
    border-radius: pr(5);
  }
  .highlight{
    border:1px solid $buttonColor!important;
    color:$buttonColor!important;
  }
</style>
