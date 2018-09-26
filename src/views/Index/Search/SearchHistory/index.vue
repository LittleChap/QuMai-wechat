<!--搜索历史-->
<template>
  <div class="wrap" v-if="searchHistoryList.length>0">

    <div class="title">
      <i class="title_img icon-search-history"></i>
      <div class="title_text">搜索历史</div>
    </div>

    <div class="item_wrap">
      <div class="item" v-for="item, index in searchHistoryList" @click="search(item)" v-if="item">
        <div class="item_text">{{item}}&nbsp;</div>
        <div class="clean_cion" @click.stop="deleteHistory(item)"></div>
      </div>
      <div class="clearHistory" @click="clearHistory">清空搜索历史</div>
    </div>

  </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data () {
      return {}
    },
    methods: {
      search (item) {
        // this.$store.dispatch('searchProducts', {goodsName: item})
        this.$router.push('/searchResult?key=' + item)
      },
      clearHistory () {
        let prop = {
          title: '提示',
          content: '确认清空所有历史记录?',
          confirmText: '确认',
          cancelText: '取消',
          onConfirm: () => {
            this.$store.commit('CLEAR_SearchHistory')
          }
        }
        this.$confirm(prop)
      },
      deleteHistory (item) {
        this.$store.commit('DELETE_SearchHistory', item)
      }
    },
    computed: {
      searchHistoryList () {
        return this.$store.getters.GET_SearchHistory
      }
    },
    created () {
      this.$store.commit('READ_SearchHistory')
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';

  .wrap {
    background: #fff;
    width: 100vw;
    padding: 0;
  }
  .title{
    height: pr(100);
    width: 100%;
    display: flex;
    align-items: center;
    padding: pr(30) pr(11);
    border-bottom:1px solid $lineColor;
    box-sizing: border-box;
  }
  .title_img{
    font-size: pr(40);
    line-height: pr(40);
    margin-right: pr(20);
    margin-left: pr(15);
    border: none;
  }
  .title_text{
    font-size: $headerTextFontSize;
    line-height:pr(40);
    color:#333;
  }
  .item_wrap{
    padding: 0 pr(11);
  }
  .item{
    height: pr(80);

    line-height: pr(80);
    font-size: $importantFontSize;
    margin: pr(15);
    border-bottom:1px solid $lineColor;
    color:#666;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .item_text{
    width: 100%;
    flex-shrink: 1;
  }
  .clearHistory{
    height: pr(80);
    line-height: pr(80);
    font-size: $importantFontSize;
    margin: pr(15);
    color:#999;
    text-align: center;
  }
  .clean_cion {
    position: relative;
    width: pr(30);
    height: pr(30);
    background: #aaa;
    border-radius: 50%;
    -webkit-transform: rotate(45deg);
  }
  .clean_cion:after {
    content: '';
    position: absolute;
    -webkit-transform: scale(0.08, 0.8);
    width: pr(30);
    height: pr(30);
    background: #fff;
  }
  .clean_cion:before {
    content: '';
    position: absolute;
    -webkit-transform: scale(0.8, 0.08);
    width: pr(30);
    height: pr(30);
    background: #fff;
  }
</style>
