<!--一级分类树-->
<template>
    <div class="leftTreeWrap">
      <div v-for="item, index in categoryList"
           :key="index"
           @click="chooseCategory(item)"
           :class="{active:currentChooseId == item.catId}"
           class="item" >{{item.catName}}</div>
    </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data () {
      return {
        categoryList: [],
        currentChooseId: 0
      }
    },
    computed: {},
    methods: {
      async getParentCategoryList () {
        let url = '/mobileGoodsCat/getFirstLevelGoodsCatList.do'
        let res = await this.$post(url, {})
        if (res.code == 1) {
          this.categoryList = res.data.goodsCatArray
          if (this.categoryList.length > 0) {
            this.currentChooseId = this.categoryList[0].catId
            this.$store.dispatch('getHotCategoryList', this.currentChooseId)
            this.$store.dispatch('getChildCategoryList', this.currentChooseId)
          }
        }
        // console.log('获取一级分类列表', res)
      },
      chooseCategory (item) {
        this.currentChooseId = item.catId
        this.$store.dispatch('getHotCategoryList', item.catId)
        this.$store.dispatch('getChildCategoryList', item.catId)
      }
    },
    created () {
      this.getParentCategoryList()
    },
    mounted () {}
  }
</script>

<style lang="scss" scoped  rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .leftTreeWrap {
    flex-shrink: 0;
    width:pr(168);
    box-sizing: border-box;
    /*height: calc100vh(112);*/
    height: calc(100vh - 4.26666rem);
    overflow-y: scroll;
    background: $blockProductColor;
  }
  .leftTreeWrap::-webkit-scrollbar {display:none}
  .item{
    color:#000;
    line-height: pr(110);
    height: pr(110);
    font-size: $importantFontSize;
    box-sizing: border-box;
    overflow: hidden;
    padding-left: pr(20);
    padding-right: pr(10);
  }
  .active{
    color: $mainFontColor!important;
    position: relative;
  }
  .active:before{
    content: '';
    position: absolute;
    width: pr(4);
    height: pr(22);
    background:$mainFontColor;
    border-radius: pr(2);
    top:pr(44);
    left:pr(10);
  }
</style>
