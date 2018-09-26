<template>
  <div id="app" class="flexBox column">
    <div class="comments-header flexBox center">
      <div :class="{'active': index == 0}" @click="index=0" class="flexChild">
        全部&nbsp;
          <p>({{commentsLength.length0}})</p>
      </div>
      <div :class="{'active': index == 1}" @click="index=1" class="flexChild">
        有图&nbsp;
          <p>({{commentsLength.length4}})</p>
      </div>
      <div :class="{'active': index == 2}" @click="index=2" class="flexChild">
        好评&nbsp;
          <p>({{commentsLength.length1}})</p>
      </div>
      <div :class="{'active': index == 3}" @click="index=3" class="flexChild">
        中评&nbsp;
          <p>({{commentsLength.length2}})</p>
      </div>
      <div :class="{'active': index == 4}" @click="index=4" class="flexChild">
        差评&nbsp;
          <p>({{commentsLength.length3}})</p>
      </div>
    </div>
    <!--<tab  v-model="index">-->
    <!--<tab-item class="vux-center" v-for="(item, index) in tabList" :key="index">-->
    <!--{{item}}&nbsp;-->
    <!--{{}}-->
    <!--</tab-item>-->
    <!--</tab>-->
    <all-eval v-show="index == 0"></all-eval>
    <image-eval v-show="index == 1"></image-eval>
    <good-eval v-show="index == 2"></good-eval>
    <normal-eval v-show="index == 3"></normal-eval>
    <bad-eval v-show="index == 4"></bad-eval>
  </div>
</template>

<script type="text/ecmascript-6">
  //  import {Tab, TabItem} from 'vux'
  import allEval from './allEval.vue'
  import imageEval from './imageEval.vue'
  import goodEval from './goodEval.vue'
  import normalEval from './normalEval.vue'
  import badEval from './badEval.vue'

  export default {
    data () {
      return {
        tabList: ['全部', '有图', '好评', '中评', '差评'],
        index: 0
      }
    },
    computed: {
      commentsLength () {
        return this.$store.state.GoodsDetail.commentsLength
      }
    },
    components: {
      allEval,
      imageEval,
      goodEval,
      normalEval,
      badEval
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  .comments-header {
    position: relative;
    left:0;
    top:0;
    width:100%;
    z-index: 999;
    background: #fff;
    padding:pr(10);
    color: $importantInfoAndTitleColor;
    border-bottom: 1px solid $lineColor;
    div {
      line-height:pr(40);
      font-size:$importantFontSize;
      text-align: center;
      p {
        font-size:$smallFontSize;
      }
    }
  }
  .active {
    color: $mainFontColor;
  }
</style>
