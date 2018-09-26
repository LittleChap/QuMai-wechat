<!--帮助中心 文章列表-->
<template>
  <div>
    <div class="helpWrap">
      <div class="helpTitle">{{data.catName}}</div>
      <div class="helpItem" v-for="i,idx in data.articleArray" index="idx" @click="$goto('/helpCenter/ArticleDetail?articleId=' + i.articleId)">
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
        data: {
          data: {}
        }
      }
    },
    methods: {
      // 获取帮助中心分类下的文章列表
      async getHelpArticleList () {
        let url = '/mobileArticle/getArticleListOfOneCat'
        let catId = this.$route.query.catId || ''
        let body = {catId: catId}
        let res = await this.$post(url, body)
        if (res.code == 1) {
          this.data = res.data
        } else {
          this.$toast(res.message)
        }
        console.log('获取帮助中心分类下的文章列表', res)
      }
    },
    created () {
      this.getHelpArticleList()
    }
  }
</script>

<style lang="scss" scoped  rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .helpWrap{
    margin-top: pr(10);
    padding: 0 pr(24);
    line-height: pr(88);
    background: #fff;
    border-bottom: 1px solid $lineColor;
  }
  .helpTitle{
    border-bottom: 1px solid $buttonColor;
    font-size: $titleFontSize;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:$buttonColor;
  }
  .helpItem{
    border-bottom: 1px solid $lineColor;
    font-size: $importantFontSize;
    color:$importantInfoAndTitleColor;
    line-height: pr(88);
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  .helpItem:last-child{
    border-bottom:none;
  }
</style>
