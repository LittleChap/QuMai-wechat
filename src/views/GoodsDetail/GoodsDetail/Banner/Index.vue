<template>
  <swiper class="gallery-swipper" height="16rem" :list="galleryArray" auto loop :show-desc-mask="false" dots-class="custom-bottom"
      dots-position="center"></swiper>
</template>

<script type="text/ecmascript-6">
  import {Swiper} from 'vux'
  export default {
    computed: {
      galleryArray () {
        if (this.$store.state.GoodsDetail.goodsDetail.galleryArray) {
          let arr = []
          const galleryArray = this.$store.state.GoodsDetail.goodsDetail.galleryArray
          for (let i = 0; i < galleryArray.length; i++) {
            arr.push({
              url: 'javascript:void(0)',
              img: galleryArray[i].imageBig
            })
          }
          return arr
        }
      }
    },
    components: {
      Swiper
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  .gallery-swipper {
    width: 100%;
    height: pr(750);
  }
</style>
