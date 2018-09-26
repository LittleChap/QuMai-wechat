<template>
  <div class="news-wrap" :class="{'wrap':isEditStatus}">
    <header-bar :btnText="editText" :clickEvent="toEdit"></header-bar>
    <div class="content" :style="{'height':isEditStatus ? 'calc(100vh - 4.2rem)' : 'calc(100vh - 2.1rem)'}">
      <PullUp :cb="getMoreList" :limited="pageInfo.limit" v-if="newsList.length" id="newsPullUp">
        <item v-for="(item, index) in newsList"
              :key="index"
              :itemData="item"
              :itemIndex="index"
              :isEditStatus="isEditStatus"
              :isAllChecked="isAllChecked"
              :isClickAllChecked="isClickAllChecked"
              v-on:singleCheck="getSingleCheck"
              v-on:deleteIndex="deleteOne"></item>
      </PullUp>
      <div class="v-empty-status" v-if="!newsList.length">
        <img src="./assets/news-empty.png" alt="">
        <p>您暂无消息哦！</p>
      </div>
    </div>
    <div class="footer flexBox" v-show="isEditStatus">
      <div class="select-all" @click="select">
        <i class="v-single-select"
           :class="{'icon-change-highlight': isAllChecked, 'icon-change-disable': !isAllChecked }"
        ></i>
        <span>全选</span>
      </div>
      <button class="v-button" @click="deleteSelect">删除</button>
    </div>
    <GoTop element="#newsPullUp" v-if="newsList.length"/>
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
        newsList: [],
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
      this.newsList = []
      this.getList()
    },
    methods: {
      async getList () {
        let reqData = {
          currentPage: this.pageInfo.currentPage,
          showCount: this.pageInfo.showCount || 10
        }
        let res = await this.$post('/mobileInstationMessage/getMyMessageList.do', reqData)
        if (parseInt(res.code) === 1) {
          this.newsList = this.newsList.concat(res.data.messageArray)
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
          for (let i = 0; i < this.newsList.length; i++) {
            this.getCheckedList.add(this.newsList[i].messageId)
          }
        } else {
          this.getCheckedList.clear()
        }
      },
      // 单个的选择返回
      getSingleCheck (singleData) { // 子组件返回的信息
        this.isClickAllChecked = false
        if (singleData.checked) {
          this.getCheckedList.add(singleData.messageId)
        } else {
          this.getCheckedList.delete(singleData.messageId)
        }
        this.isSelectAll()
      },
      // 判断是否全选
      isSelectAll () {
        if (this.getCheckedList.size >= this.newsList.length) {
          this.isAllChecked = true
        } else {
          this.isAllChecked = false
        }
      },
      // 删除
      deleteSelect () {
        let messageIds = ''
        let num = 0
        for (let messageId of this.getCheckedList) {
          num++
          messageIds += messageId + ','
        }
        if (!num) {
          this.$toast('请选择要删除的消息')
          return false
        }
        let _this = this
        this.$confirm({
          title: '提示',
          content: `是否删除这${num}条消息`,
          confirmText: '确定',
          cancelText: '取消',
          async onConfirm () {
            // 删除
            if (messageIds.length) {
              messageIds = messageIds.substring(0, messageIds.length - 1)
            }
            let res = await _this.$post('/mobileInstationMessage/batchfalseDeleteMessage.do', {messageIds: messageIds})
            if (parseInt(res.code) === 1) {
              _this.$toast('删除成功')
              _this.newsList = []
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
      },
      // 单个删除
      deleteOne (deleteIndex) {
        this.newsList.splice(deleteIndex, 1)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";
  .news-wrap {
    padding-top: pr(108);
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

