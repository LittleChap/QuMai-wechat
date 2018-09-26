<!--容器页-->
<template>
  <div>
    <!--<div v-if="!isWechat" v-wechat-title="$route.meta.title">-->
    <div v-wechat-title="$route.meta.title">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
      <navigation></navigation>
    </div>
    <!--<div class="wechat-empty" v-else>-->
      <!--<img src="/static/empty.png">-->
      <!--<p class="flexChild">-->
        <!--请在微信浏览器中打开-->
      <!--</p>-->
    <!--</div>-->
  </div>
</template>

<script>
  import wechat from '@/utils/wechat'
  import Navigation from '../src/components/Navigation'
  export default {
    components: {
      Navigation
    },
    computed: {
      isWechat () {
        return wechat.isWechat()
      },
      globalUrl () {
        return this.$store.state.mainStore.globalUrl
      }
    },
    methods: {
      initShare () {
        const _this = this
        if (this.$route.fullPath.indexOf('goodsDetail') <= 0 && location.href.indexOf('favicon.ico') <= 0) {
          wechat.initShare(this.globalUrl, this.hostUrl, `${this.hostUrl}/static/logo.png`, this.storeName, `正品保障，优惠多多，尽在${this.storeName}`, function () {
            _this.$store.commit('SET_SHAREWIN', false)
          })
        }
      }
    },
    data () {
      return {
        hostUrl: `${window.location.protocol}//${window.location.host}`,
        storeName: '观前街1号'
      }
    },
    watch: {
      '$route' () {
        this.initShare()
      }
    },
    created () {
      this.$store.dispatch('getUserInfo')
      if (!this.globalUrl) {
        this.$store.commit('SET_GLOBALURL', window.location.href)
      }
      this.initShare()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";

  .wechat-empty {
    background: #fff;
    height: 100vh;
    padding-top:pr(200);
    img {
      display: block;
      margin:0 auto;
      width: pr(642);
      height: pr(436);
    }
    p {
      font-size: pr(36);
      color: #333;
      text-align: center;
    }
  }
</style>
