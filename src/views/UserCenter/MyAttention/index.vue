<template>
  <div class="attention-wrap" :class="{'wrap':isEditStatus}">
    <header-bar :btnText="editText" :clickEvent="toEdit"></header-bar>
    <div class="content" :style="{'height':isEditStatus ? 'calc(100vh - 4.2rem)' : 'calc(100vh - 2.1rem)'}">
      <PullUp v-if="attentionList.length" :cb="getMoreList" :limited="pageInfo.limit" id="attentionPullUp">
        <item v-for="(item, index) in attentionList"
              :key="index"
              :item="item"
              :itemIndex="index"
              :isEditStatus="isEditStatus"
              :isAllChecked="isAllChecked"
              :isClickAllChecked="isClickAllChecked"
              v-on:singleCheck="getSingleCheck"></item>
      </PullUp>
      <div class="v-empty-status" v-if="!attentionList.length">
        <img src="./assets/attention-empty.png" alt="">
        <p>您还有关注任何商品哦！</p>
        <p>去首页看看吧！</p>
        <router-link class="v-button empty-button" to="/">去首页</router-link>
      </div>
    </div>
    <div class="footer flexBox" v-show="isEditStatus">
      <div class="select-all" @click="select">
        <i class="v-single-select"
           :class="{'icon-change-highlight': isAllChecked, 'icon-change-disable': !isAllChecked }"
        ></i>
        <span>全选</span>
      </div>
      <button class="v-button" @click="deleteSelect">取消关注</button>
    </div>
    <GoTop element="#attentionPullUp" v-if="attentionList.length"/>
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
        attentionList: [],
        isEditStatus: false,
        editText: '编辑',
        isAllChecked: false,
        isClickAllChecked: false,
        getCheckedList: new Set(),
        pageInfo: {
          currentPage: 1,
          showCount: 10,
          limit: false
        }
      }
    },
    created () {
      this.getList()
    },
    methods: {
      async getList () {
        let res = await this.$post('/mobileGoodsCollection/getMyGoodsList.do', this.pageInfo)
        if (parseInt(res.code) === 1) {
          this.attentionList = this.attentionList.concat(res.data.goodsArray)
          if (!res.data.goodsArray.length || res.data.goodsArray.length < this.pageInfo.showCount) {
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
      // 去编辑
      toEdit () {
        this.isEditStatus = !this.isEditStatus
        this.editText = this.isEditStatus ? '完成' : '编辑'
      },
      // 全选选择的操作
      select () {
        this.isAllChecked = !this.isAllChecked
        this.isClickAllChecked = true
        if (this.isAllChecked) {
          for (let i = 0; i < this.attentionList.length; i++) {
            this.getCheckedList.add(this.attentionList[i].goodsId)
          }
        } else {
          this.getCheckedList.clear()
        }
      },
      // 单个的选择返回
      getSingleCheck (singleData) { // 子组件返回的信息
        this.isClickAllChecked = false
        if (singleData.checked) {
          this.getCheckedList.add(singleData.goodsId)
        } else {
          this.getCheckedList.delete(singleData.goodsId)
        }
        this.isSelectAll()
      },
      // 判断是否全选
      isSelectAll () {
        if (this.getCheckedList.size >= this.attentionList.length) {
          this.isAllChecked = true
        } else {
          this.isAllChecked = false
        }
      },
      // 删除
      deleteSelect () {
        let goodsIds = ''
        let num = 0
        for (let goodsId of this.getCheckedList) {
          num++
          goodsIds += goodsId + ','
        }
        if (!num) {
          this.$toast('请选择要取消关注的商品')
          return false
        }
        let _this = this
        this.$confirm({
          title: '提示',
          content: `是否取消关注这${num}件商品`,
          confirmText: '确定',
          cancelText: '取消',
          async onConfirm () {
            // 删除
            if (goodsIds.length) {
              goodsIds = goodsIds.substring(0, goodsIds.length - 1)
            }
            let res = await _this.$post('/mobileGoodsCollection/batchfalseDeleteGoods.do', {goodsIds: goodsIds})
            if (parseInt(res.code) === 1) {
              _this.$toast('删除成功')
              _this.attentionList = []
              _this.pageInfo.currentPage = 1
              _this.pageInfo.limit = false
              _this.getList()
              _this.isAllChecked = false
              _this.isClickAllChecked = true
              _this.getCheckedList.clear()
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
  .attention-wrap {
    padding-top: pr(110);
  }
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
    .select-all {
      padding-left: pr(24);
      height: pr(98);
      line-height: pr(98);
      font-size: $importantFontSize;
      color: $importantInfoAndTitleColor;
      span {
        display: inline-block;
        height: 100%;
        margin-left: pr(10);
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

