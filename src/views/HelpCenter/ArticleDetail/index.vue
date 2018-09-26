<!--帮助中心 文章详情-->
<template>
  <div class="articleWrap">
    <div class="title">{{data.articleTitle}}</div>
    <div class="content" v-html="data.articleContent"></div>
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
      // 获取帮助中心文章详情
      async getHelpArticleDetail () {
        let url = '/mobileArticle/getArticleDetail'
        let articleId = this.$route.query.articleId || 0
        let body = { articleId: articleId }
        let res = await this.$post(url, body)
        if (res.code == 1) {
          this.data = res.data.articleJson
        } else {
          this.$toast(res.message)
        }
        // console.log('获取文章详情', res)
      }
    },
    created () {
      this.getHelpArticleDetail()
    }
  }
</script>

<style lang="scss" scoped  rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .articleWrap{
    background: #fff;
    width: 100%;
    line-height: pr(50);
    padding: pr(24);
    box-sizing: border-box;
  }
  .title{
    color: $importantInfoAndTitleColor;
    font-size: $importantFontSize;
    text-align: center;
    border-bottom: 1px solid $lineColor;
    padding-bottom: pr(24);
    margin-bottom: pr(24);
  }
  .content{
    color: $paragraphColor;
    font-size: $normalFontSize;
  }
</style>
