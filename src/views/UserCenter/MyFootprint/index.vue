<template>
  <div class="footprint-wrap" :class="{'wrap':isEditStatus}">
    <header-bar :btnText="editText" :clickEvent="toEdit"></header-bar>
    <div class="content-wrap" :style="{'height':isEditStatus ? 'calc(100vh - 4.2rem)' : 'calc(100vh - 2.1rem)'}">
      <PullUp v-if="footprintArray.length" :cb="getMoreList" :limited="pageInfo.limit" id="footprintPullUp">
        <group-item v-for="(groupItem, groupIndex) in footprintArray"
                    :key="groupIndex"
                    :groupItem="groupItem"
                    :groupIndex="groupIndex"
                    :isEditStatus="isEditStatus"
                    :isAllChecked="isAllChecked"
                    :isClickAllChecked="isClickAllChecked"
                    v-if="groupItem.goodsArray.length"
                    v-on:groupCheck="getGroupCheck"
                    v-on:selectGoods="getSelectGoods"></group-item>
      </PullUp>
      <div class="v-empty-status" v-if="!footprintArray.length">
        <img src="./assets/footprint-empty.png" alt="">
        <p>暂无浏览记录，去首页看看吧！</p>
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
      <button class="v-button" @click="deleteSelect">删除</button>
    </div>
    <GoTop v-if="footprintArray.length" element="#footprintPullUp"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import {parseTime} from '@/utils/utils'
  import GroupItem from './GroupItem/index.vue'

  export default {
    components: {
      GroupItem
    },
    data () {
      return {
        footprintArray: [{
          time: '',
          goodsArray: []
        }],
        isEditStatus: false,
        editText: '编辑',
        isAllChecked: false, // 是否全选
        isClickAllChecked: false, // 是否开启全选的选择
        getGroupCheckedList: new Set(),  // 选中的日期
        getGoodsIdArray: [], // 选中的商品的goodsID的组的集合
        pageInfo: {
          currentPage: 1,
          showCount: 10,
          limit: false
        }
      }
    },
    created () {
      this.footprintArray = []
      this.getList()
    },
    methods: {
      async getList () {
        let reqData = {
          currentPage: this.pageInfo.currentPage,
          showCount: this.pageInfo.showCount || 10
        }
        let res = await this.$post('/mobileGoodsLookTrack/getMyGoodsList.do', reqData)
        if (parseInt(res.code) === 1) {
          for (let i = 0; i < res.data.goodsArray.length; i++) {
            res.data.goodsArray[i].createTime = parseTime(res.data.goodsArray[i].createTime, '{y}-{m}-{d}')
          }
          this.getData(res.data.goodsArray)
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
      // 处理数据
      getData (data) {
        let firsetArr = []
        if (!this.footprintArray.length) {
          firsetArr.push(data.shift())
          this.footprintArray.push({
            time: firsetArr[0].createTime,
            goodsArray: firsetArr
          })
        }
        for (let i = 0; i < data.length; i++) {
          let itemData = data[i]
          let isOne = true
          for (let j = 0; j < this.footprintArray.length; j++) {
            if (itemData.createTime === this.footprintArray[j].time) {
              this.footprintArray[j].goodsArray.push(itemData)
              isOne = false
              break
            }
          }
          if (isOne) {
            let arr = []
            arr.push(itemData)
            this.footprintArray.push({
              time: arr[0].createTime,
              goodsArray: arr
            })
          }
        }
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
        if (this.isGroup) {
          for (let i = 0; i < this.footprintArray.length; i++) {
            this.getGroupCheckedList.add(this.footprintArray[i].time)
          }
        } else {
          this.getGroupCheckedList.clear()
        }
      },
      // group-item的选择
      getGroupCheck (groupData) {
        this.isClickAllChecked = false
        if (groupData.checked) {
          this.getGroupCheckedList.add(groupData.time)
        } else {
          this.getGroupCheckedList.delete(groupData.time)
        }
        if (this.getGroupCheckedList.size >= this.footprintArray.length) {
          this.isAllChecked = true
        } else {
          this.isAllChecked = false
        }
      },
      // 所有选中的 goodsId集合
      getSelectGoods (data) {
        this.getGoodsIdArray[data.groupIndex] = data.getCheckedList
      },
      // 删除
      deleteSelect () {
        let goodsIds = ''
        let num = 0
        for (let i = 0; i < this.getGoodsIdArray.length; i++) {
          if (this.getGoodsIdArray[i]) {
            for (let goodsId of this.getGoodsIdArray[i]) {
              num++
              goodsIds += goodsId + ','
            }
          }
        }
        if (!num) {
          this.$toast('请选择要删除的记录')
          return false
        }
        let _this = this
        this.$confirm({
          title: '提示',
          content: `是否删除这${num}条记录`,
          confirmText: '确定',
          cancelText: '取消',
          async onConfirm () {
            // 删除
            if (goodsIds.length) {
              goodsIds = goodsIds.substring(0, goodsIds.length - 1)
            }
            let res = await _this.$post('/mobileGoodsLookTrack/batchfalseDeleteGoods.do', {goodsIds: goodsIds})
            if (parseInt(res.code) === 1) {
              _this.$toast('删除成功')
              _this.pageInfo.currentPage = 1
              _this.pageInfo.limit = false
              _this.footprintArray = []
              _this.getList()
              _this.isAllChecked = false
              _this.isClickAllChecked = true
              _this.getGroupCheckedList.clear()
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
  .footprint-wrap {
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

