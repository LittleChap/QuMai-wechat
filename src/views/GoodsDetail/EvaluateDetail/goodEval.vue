<template>
  <div id="eval-wrapper" class="flexBox column">
    <div v-if="labels.length > 0" class="label-bar">
      <span @click="selectLabel(item.id)" :class="{'active': selectId == item.id}" v-for="item in labels">
        {{item.name}}&nbsp;{{item.useNums}}
      </span>
    </div>
    <evaluate-item v-if="evaluaItems.length > 0" :evaluaItems="evaluaItems"></evaluate-item>
    <div v-else>
      <div class="v-empty-status">
        <img src="./empty.png" alt="">
        <p>还没有小伙伴评价哦！</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import EvaluateItem from './EvaluateItem'
  import {fetch} from '@/utils/fetch'
  export default {
    data () {
      return {
        evaluaItems: [],
        labels: [],
        selectId: 0
      }
    },
    async created () {
      const url = '/mobileOrderItemComment/getOrderItemCommentList.do'
      const res = await fetch(url, {goodsId: this.$route.params.id, type: 1})
      if (res.code == 1) {
        this.evaluaItems = res.data.orderItemCommentArray
        this.labels = res.data.labels
        this.$store.commit('SET_COMMENTSLENGTH', {
          index: 1,
          length: this.evaluaItems.length
        })
      }
    },
    methods: {
      selectLabel (id) {
        if (id == this.selectId) {
          this.selectId = 0
        } else {
          this.selectId = id
        }
        this.getLabelComments()
      },
      async getLabelComments () {
        if (this.selectId == 0) {
          const url = '/mobileOrderItemComment/getOrderItemCommentList.do'
          const res = await fetch(url, {goodsId: this.$route.params.id, type: 1})
          if (res.code == 1) {
            this.evaluaItems = res.data.orderItemCommentArray
          }
        } else {
          const url = '/mobileOrderItemComment/getOrderItemCommentList.do'
          const res = await fetch(url, {goodsId: this.$route.params.id, type: 1, labelId: this.selectId})
          if (res.code == 1) {
            this.evaluaItems = res.data.orderItemCommentArray
          }
        }
      }
    },
    components: {
      EvaluateItem
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  .label-bar {
    background: #fff;
    padding: pr(20) pr(24) pr(10) 0;
    border-bottom: 1px solid $lineColor;
    span {
      display: inline-block;
      margin-left: pr(20);
      padding: pr(16) pr(26);
      background: #fff;
      border-radius: pr(8);
      border: 1px solid $mainFontColor;
      font-size: $normalFontSize;
      color: $mainFontColor;
      max-width: pr(350);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &.active {
        background: #ffeaea;
      }
    }
  }
</style>
