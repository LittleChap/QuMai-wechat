<template>
  <div class="wrap">
    <div :style="{'height':'calc(100vh - 2.1rem)'}">
      <PullUp v-if="pointList.length" :cb="getMoreList" :limited="pageInfo.limit" id="pointPullUp">
        <item v-for="(item, index) in pointList" :key="index" :itemData="item"></item>
      </PullUp>
      <div class="v-empty-status" v-if="!pointList.length">
        <img src="./assets/point-empty.png" alt="">
        <p>您暂无积分信息哦！</p>
      </div>
    </div>
    <div class="footer flexBox center">
      <div class="leftPart">
        <img :src="levelData.img" alt="">
        <span>目前积分：<strong>{{levelData.point}}</strong></span>
      </div>
      <button class="v-button" @click="clearAll">清空记录</button>
    </div>
    <GoTop element="#pointPullUp" v-if="pointList.length"/>
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
        pointList: [],
        levelData: {
          point: 0,
          img: require('../assets/img/level_highlight_1.png')
        },
        pageInfo: {
          currentPage: 1,
          showCount: 10,
          limit: false
        }
      }
    },
    created () {
      this.getList()
      this.getMyLevel()
    },
    methods: {
      async getList () {
        let reqData = {
          currentPage: this.pageInfo.currentPage,
          showCount: this.pageInfo.showCount || 10
        }
        let res = await this.$post('/mobileAccumulatePoints/getMyPointsList.do', reqData)
        if (parseInt(res.code) === 1) {
          this.pointList = res.data.messageArray
          if (!res.data.messageArray.length || res.data.messageArray.length < this.pageInfo.showCount) {
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
      async getMyLevel () {
        let res = await this.$post('/mobileMember/myLevel.do')
        if (parseInt(res.code) === 1) {
          this.levelData = res.data
          this.levelData.img = require('../assets/img/level_highlight_' + res.data.level + '.png')
        } else {
          this.$toast(res.message)
        }
      },
      clearAll () {
        let _this = this
        this.$confirm({
          title: '提示',
          content: `是否删除全部积分信息？`,
          confirmText: '确定',
          cancelText: '取消',
          async onConfirm () {
            // 删除
            let res = await _this.$post('/mobileAccumulatePoints/deletedAll.do')
            if (parseInt(res.code) === 1) {
              _this.pageInfo.currentPage = 1
              _this.pageInfo.limit = false
              _this.pointList = []
              _this.$toast('已成功清除积分记录')
            } else {
              _this.$toast(res.message)
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    justify-content: space-between;
    height: $headerHeight;
    width: 100%;
    background: $footerBackgroundColor;
    border-top: 1px solid $lineColor;
    .leftPart {
      line-height: $headerHeight;
      font-size: $importantFontSize;
      img {
        width: pr(48);
        margin: pr(-4) pr(20) 0 pr(24);
        vertical-align: middle;
      }
    }
    button {
      width: pr(234);
      height: $headerHeight;
      margin-top: pr(-1);
      line-height: $headerHeight;
      border: none;
      text-align: center;
      border-radius: 0;
    }
  }

</style>

