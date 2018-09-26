<!--首页-->
<template>
  <div>
    <SearchBar />
    <ProductList/>
  </div>
</template>

<script>
  import SearchBar from './SearchBar/index'
  import ProductList from './ProductList/index'

  export default {
    components: { SearchBar, ProductList },
    data () {
      return {
      }
    },
    methods: {
    },
    created () {
      let goodsName = this.$route.query.key || ''
      let catId = this.$route.query.catId || ''
      this.$store.dispatch('searchProducts', {goodsName, catId})
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/index.scss';
</style>
