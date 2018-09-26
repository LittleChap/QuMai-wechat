<!--首页-->
<template>
  <div>
    <SearchBar class="mb10"/>
    <HotKeyword/>
    <SearchHistory/>
  </div>
</template>

<script>
  import SearchBar from './SearchBar/index'
  import HotKeyword from './HotKeyword/index'
  import SearchHistory from './SearchHistory/index'

  export default {
    components: { SearchBar, HotKeyword, SearchHistory },
    data () {
      return {
      }
    },
    methods: {
    },
    created () {
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .mb10{margin-bottom: pr(10);}
</style>
