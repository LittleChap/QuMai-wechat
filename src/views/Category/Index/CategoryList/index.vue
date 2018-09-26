<!--搜索栏-->
<template>
    <div class="wrap">
      <!--<div v-for="item, index in itemList" :key="index" v-if="item.childrenGoodsCatArray && item.childrenGoodsCatArray.length>0">-->
      <div v-for="item, index in itemList" :key="index">
        <div class="title">{{item.catName}}</div>
        <div class="item_wrap">

          <div class="item" v-for="i, idx in item.childrenGoodsCatArray" @click="search(i)">
            <img :src="i.image" alt="" class="img" v-if="i.image">
            <img src="~@/assets/default.png" alt="" class="img" v-else>
            <div class="text">{{i.catName}}</div>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data () {
      return {
        defaultImg: ''
      }
    },
    computed: {
      itemList () {
        return this.$store.getters.GET_ChildCategoryList
      }
    },
    methods: {
      search (item) {
        // this.$store.dispatch('searchProducts', {catId: item.catId})
        // this.$router.push('/searchResult?key=')
        this.$router.push('/searchResult?catId=' + item.catId)
      }
    },
    created () {},
    mounted () {

    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .wrap {
    background:#fff;
    width:calc100vw(168);
    box-sizing: border-box;
    padding:0 pr(24);
  }
  .title{
    line-height: pr(88);
    color:$paragraphColor;
    font-size: $importantFontSize;
    border-bottom: 1px solid $lineColor;
  }
  .item_wrap{
    padding: pr(9) 0;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .item{
    width: pr(160);
    flex-shrink: 0;
    margin: pr(10) pr(9);
    /*background: #f7c02a;*/
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .img{
    height: pr(140);
    width: pr(140);
    border: none;
    display: block;
  }
  .text{
    width: pr(160);
    font-size: $normalFontSize;
    line-height: pr(68);
    height: pr(68);
    overflow: hidden;
    text-align: center;
    color:$paragraphColor
  }
</style>
