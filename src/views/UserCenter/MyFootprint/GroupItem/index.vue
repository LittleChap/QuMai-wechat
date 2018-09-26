<template>
  <div class="group-wrap">
    <div class="top" @click="select">
      <i class="v-single-select"
         :class="{'icon-change-highlight': isGroup, 'icon-change-disable': !isGroup }"
         v-if="isEdit"
      ></i>
      {{groupItem.time}}
    </div>
    <item
            v-for="(item, index) in groupItem.goodsArray"
            :key="index"
            :item="item"
            :isEditStatus="isEdit"
            :isClickGroup="isClickGroup"
            :isGroup="isGroup"
            v-on:singleCheck="getSingleCheck"></item>
  </div>


</template>

<script type="text/ecmascript-6">
  import Item from '../Item/index.vue'
  export default{
    components: {
      Item
    },
    props: {
      groupItem: {
        type: Object,
        default: {}
      },
      groupIndex: {
        type: Number,
        default: 0
      },
      isEditStatus: {
        type: Boolean,
        default: false
      },
      isAllChecked: {
        type: Boolean,
        default: false
      },
      isClickAllChecked: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        checked: false, // 组的选择
        isClickGroup: false,  // 是否开启全选组的选择
        getCheckedList: new Set()
      }
    },
    computed: {
      isEdit () {
        return this.isEditStatus
      },
      isGroup () {
        if (this.isClickAllChecked) {
          this.checked = this.isAllChecked
          if (this.isClickAllChecked) {
            for (let i = 0; i < this.groupItem.goodsArray.length; i++) {
              this.getCheckedList.add(this.groupItem.goodsArray[i].goodsId)
            }
          } else {
            this.getCheckedList.clear()
          }
          this.isClickGroup = true
          this.$emit('selectGoods', {groupIndex: this.groupIndex, getCheckedList: this.getCheckedList})
        } else if (this.isAllChecked) {
          this.checked = true
        }
        return this.checked
      }
    },
    methods: {
      // 单个的选择返回
      getSingleCheck (singleData) { // 子组件返回的信息
        this.isClickGroup = false
        if (singleData.checked) {
          this.getCheckedList.add(singleData.goodsId)
        } else {
          this.getCheckedList.delete(singleData.goodsId)
        }
        if (this.getCheckedList.size >= this.groupItem.goodsArray.length) {
          this.checked = true
        } else {
          this.checked = false
        }
        this.$emit('groupCheck', {checked: this.checked, time: this.groupItem.time})
        this.$emit('selectGoods', {groupIndex: this.groupIndex, getCheckedList: this.getCheckedList})// 选中的商品的goodsId集合
      },
      // 组队的选择操作
      select () {
        this.checked = !this.checked
        this.isClickGroup = true
        if (this.checked) {
          for (let i = 0; i < this.groupItem.goodsArray.length; i++) {
            this.getCheckedList.add(this.groupItem.goodsArray[i].goodsId)
          }
        } else {
          this.getCheckedList.clear()
        }
        this.$emit('groupCheck', {checked: this.checked, time: this.groupItem.time})
        this.$emit('selectGoods', {groupIndex: this.groupIndex, getCheckedList: this.getCheckedList}) // 选中的商品的goodsId集合
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";
  .group-wrap {
    @include blockMargin;
    border-top: 1px solid $lineColor;
    border-bottom: 1px solid $lineColor;
    .top {
      @include wrapPadding;
      background: #fff;
      height: $defaultHeight;
      line-height: $defaultHeight;
      font-size: $importantFontSize;
      color: $importantInfoAndTitleColor;
      i {
        margin: pr(-4) pr(20) 0 0;
      }
    }
  }
</style>

