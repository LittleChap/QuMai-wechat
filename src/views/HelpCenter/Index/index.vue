<!--帮助中心 首页-->
<template>
  <div>
    <div class="helpWrap" v-for="item, index in data" :key="index">
      <div class="helpTitle">
        <div class="w50">{{item.catName}}</div>
        <div class="w50 tar grey f28" @click="$goto('/helpCenter/ArticleList?catId='+item.catId)">更多</div>
      </div>
      <div class="helpItem"
           v-for="i,idx in item.articleArray"
           index="idx"
           @click="$goto('/helpCenter/ArticleDetail?articleId=' + i.articleId)">
        {{i.articleTitle}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        data: {}
      }
    },
    methods: {
      // 获取帮助中心文章列表
      async getHelpArticleList () {
        let url = '/mobileArticle/getArticleList'
        let body = {}
        let res = await this.$post(url, body)
        if (res.code == 1) {
          this.data = res.data.articleCatArray
        } else {
          this.$toast(res.message)
        }
      }
    },
    created () {
      this.getHelpArticleList()
    }
  }
</script>

<style lang="scss" scoped  rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .bgw{background: #fff;}
  .bdb{border-bottom: #e6e6e6;}
  .mb10{margin-top: pr(10);}
  .mt10{margin-bottom: pr(10);}
  .ml10{margin-left: pr(10);}
  .mr10{margin-right: pr(10);}
  .w100{width: 100%;}
  .w50{width: 50%;}
  .f28{font-size:$importantFontSize}
  .tar{text-align: right;}
  .grey{color: $supportTextColor;}
  .helpWrap{
    margin-top: pr(10);
    padding: 0 pr(24);
    line-height: pr(88);
    background: #fff;
    border-bottom: 1px solid $lineColor;
  }
  .helpTitle{
    border-bottom: 1px solid $lineColor;
    font-size: $titleFontSize;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .helpTitle:before{
    content:'';
    width: pr(4);
    height: pr(20);
    background:$buttonColor;
    margin-right: pr(20);
  }
  .helpItem{
    border-bottom: 1px solid $lineColor;
    font-size: $importantFontSize;
    color:$importantInfoAndTitleColor;
    line-height: pr(88);
    /*display: -webkit-box;*/
    /*-webkit-box-orient: vertical;*/
    /*-webkit-line-clamp: 2;*/
    /*overflow: hidden;*/
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  .helpItem:last-child{
    border-bottom:none;
  }
</style>
