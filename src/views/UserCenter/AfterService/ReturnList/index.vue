<template>
  <div>
    <header class="flexBox center">
      <form class="leftPart flexBox center" action="javascript:;">
        <i class="icon-nav-seach"></i>
        <input type="text" placeholder="请输入商品名称或订单编号" v-model="searchStr" @keyup.enter="search">
      </form>
      <router-link to="/userCenter/myNews" class="message_icon">
        <i class="icon-home-nav-mess"></i>
        <div class="badge" v-if="hasNewMessage"></div>
      </router-link>
    </header>
    <div class="content-wrap">
      <PullUp v-if="returnOrderArray.length" :cb="getMoreList" :limited="pageInfo.limit" id="returnListPullUp">
        <item v-for="(item, index) in returnOrderArray" :key="index" :item="item"></item>
      </PullUp>
      <div class="v-empty-status" v-if="!returnOrderArray.length">
        <img src="./assets/after-empty.png" alt="">
        <p>你还没有申请售后的订单哦！</p>
      </div>
    </div>
    <GoTop v-if="returnOrderArray.length" element="#returnListPullUp"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Item from './Item/index.vue'

  export default {
    components: {
      Item
    },
    data () {
      return {
        returnOrderArray: [],
        searchStr: '',
        pageInfo: {
          currentPage: 1,
          showCount: 10,
          limit: false
        }
      }
    },
    computed: {
      hasNewMessage () {
        return this.$store.getters.GET_HasNewMessage
      }
    },
    created () {
      this.getList()
      this.$store.dispatch('getHasNewMessage')
    },
    methods: {
      async getList () {
        let reqData = {
          currentPage: this.pageInfo.currentPage,
          showCount: this.pageInfo.showCount || 10,
          goodsName: this.searchStr
        }
        let res = await this.$post('/mobileReturnOrder/getReturnOrderList.do', reqData)
        if (parseInt(res.code) === 1) {
          this.returnOrderArray = this.returnOrderArray.concat(res.data.returnOrderArray)
          if (!res.data.returnOrderArray.length || res.data.returnOrderArray.length < this.pageInfo.showCount) {
            this.pageInfo.limit = true
          }
        } else {
          this.$toast(res.message)
        }
      },
      getMoreList (done) {
        this.pageInfo.currentPage++
        this.getList()
        done()
      },
      search () {
        this.pageInfo.currentPage = 1
        this.getList()
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";
  header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 499;
    @include wrapPadding;
    justify-content: space-between;
    height: $headerHeight;
    width: 100%;
    background: #fff;
    i {
      font-size: pr(44);
      color: $paragraphColor;
    }
    .leftPart {
      width: 84vw;
      height: pr(60);
      padding-left: pr(20);
      background: $searchBlockColor;
      border-radius: pr(30);
      i {
        font-size: pr(32);
        margin-right: pr(30);
      }
      input {
        width: 70vw;
        height: 100%;
        background: transparent;
        font-size: $normalFontSize;
        color: $paragraphColor;
      }
    }
    .message_icon {
      position: absolute;
      top: pr(27);
      right: pr(26);
      font-size: pr(44);
      color: #666;
      .badge{
        width: $badgeSize;
        height: $badgeSize;
        border-radius: pr(12.5);
        position:absolute;
        top: $badgePisition;
        right: $badgePisition;
        font-size: pr(20);
        color: #666;
        background: $mainFontColor;
      }
    }
  }
  .content-wrap {
    padding-top: pr(98);
    height: 100vh;
    #returnListPullUp {
      padding-top: pr(10);
    }
  }

</style>

