<!--分类-->
<template>
  <div>
    <div class="mainWrap">
      <SearchBar class="shadow" />
      <div class="middleWrap">
        <ParentCategory />
        <div class="layout" v-if="hasHotCategory || hasChridren">
          <HotCategory v-if="hasHotCategory" />
          <CategoryList v-if="hasChridren" />
        </div>
        <div class="layout" v-else>
          <div class="v-empty-status p100">
            <img src="~@/assets/order-empty.png" alt="">
            <p>该分类下暂无子分类！</p>
            <p>试试其他分类吧！</p>
          </div>
        </div>
      </div>
    </div>
    <GoTop />
    <BottomTab :index="2" />
  </div>
</template>

<script>
  import SearchBar from './SearchBar/index'
  import ParentCategory from './ParentCategory/index'
  import HotCategory from './HotCategory/index'
  import CategoryList from './CategoryList/index'

  export default {
    components: { SearchBar, ParentCategory, HotCategory, CategoryList },
    data () {
      return {
      }
    },
    computed: {
      hasChridren () {
        return this.$store.getters.GET_HasChridren
      },
      hasHotCategory () {
        return this.$store.getters.GET_HasHotCategory
      }
    },
    methods: {
      // swiper 小按钮切换事件
      swiperIndexChange (index) {
        this.currentWeiperIndex = index
      }
    },
    created () {
    }
  }
</script>

<style lang="scss" scoped  rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .mainWrap{
    width: 100%;
    height: calc(100vh - 4.26666rem);
  }
  .middleWrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: left;
  }
  .layout{
    height: 100%;
    background: #fff;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .layout::-webkit-scrollbar {display:none}
  .p100{
    padding: pr(100);
    box-sizing: border-box;
  }
  .shadow{
    box-shadow: 0 pr(1) pr(5) pr(0) #aaa;
  }
</style>
