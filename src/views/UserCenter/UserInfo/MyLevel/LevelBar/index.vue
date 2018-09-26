<template>
  <section>
    <ul class="level-text flexBox">
      <li class="flexBox center column flexChild">
        <img v-if="levelInfo.level>=1" src="../../../assets/img/level_highlight_1.png">
        <img v-else="" src="../../../assets/img/level_grey_1.png">
        <span :class="{'main-color' : levelInfo.level>=1}">普通会员</span>
      </li>
      <li class="flexBox center column flexChild">
        <img v-if="levelInfo.level>=2" src="../../../assets/img/level_highlight_2.png">
        <img v-else="" src="../../../assets/img/level_grey_2.png">
        <span :class="{'main-color' : levelInfo.level>=2}">银卡会员</span>
      </li>
      <li class="flexBox center column flexChild">
        <img v-if="levelInfo.level>=3" src="../../../assets/img/level_highlight_3.png">
        <img v-else="" src="../../../assets/img/level_grey_3.png">
        <span :class="{'main-color' : levelInfo.level>=3}">金卡会员</span>
      </li>
      <li class="flexBox center column flexChild">
        <img v-if="levelInfo.level>=4" src="../../../assets/img/level_highlight_4.png">
        <img v-else="" src="../../../assets/img/level_grey_4.png">
        <span :class="{'main-color' : levelInfo.level>=4}">白金会员</span>
      </li>
      <li class="flexBox center column flexChild">
        <img v-if="levelInfo.level>=5" src="../../../assets/img/level_highlight_5.png">
        <img v-else="" src="../../../assets/img/level_grey_5.png">
        <span :class="{'main-color' : levelInfo.level>=5}">钻石会员</span>
      </li>
    </ul>
    <div class="time-axis">
      <ul ref="levelLine" class="time-axis-ul flexBox">
        <hr :style="{width: levelLineLength + 'px'}"/>
        <li class="flexChild"><b :class="{'choose-color' : levelInfo.level>=1}"></b></li>
        <li class="flexChild"><b :class="{'choose-color' : levelInfo.level>=2}"></b></li>
        <li class="flexChild"><b :class="{'choose-color' : levelInfo.level>=3}"></b></li>
        <li class="flexChild"><b :class="{'choose-color' : levelInfo.level>=4}"></b></li>
        <b :class="{'choose-color' : levelInfo.level>=5}"></b>
      </ul>
      <ul class="point-ul flexBox center">
        <li :class="{'main-color' : levelInfo.level>=1}" class="flexChild">
          {{levelInfo.onePoint}}

        </li>
        <li :class="{'main-color' : levelInfo.level>=2}" class="flexChild">
          {{levelInfo.twoPoint}}

        </li>
        <li :class="{'main-color' : levelInfo.level>=3}" class="flexChild">
          {{levelInfo.threePoint}}

        </li>
        <li :class="{'main-color' : levelInfo.level>=4}" class="flexChild">
          {{levelInfo.fourPoint}}

        </li>
        <li :class="{'main-color' : levelInfo.level>=5}" class="flexChild">
          {{levelInfo.fiveLevel}}

        </li>
      </ul>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        lineLength: 0
      }
    },
    created () {
      const _this = this
      this.$nextTick(() => {
        _this.lineLength = _this.$refs.levelLine.clientWidth
      })
    },
    computed: {
      levelInfo () {
        return this.$store.state.UserCenter.levelInfo
      },
      levelLineLength () {
        const levelInfo = this.$store.state.UserCenter.levelInfo
        const levelNow = levelInfo.level
        const levelArr = [levelInfo.onePoint, levelInfo.twoPoint, levelInfo.threePoint, levelInfo.fourPoint, levelInfo.fiveLevel]
        if (levelNow >= levelArr.length) {
          return this.lineLength
        } else {
          const nextPoint = levelArr[levelNow] - levelArr[levelNow - 1]
          const nextLevel = levelInfo.leftPoint
          const levelLength = this.lineLength / 4
          return levelLength * (levelNow - 1) + ((levelLength / nextPoint) * (nextPoint - nextLevel))
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  section {
    @include wrapPadding();
    margin-top: pr(10);
    background: #fff;
    padding: pr(40) 0;
    hr {
      position: absolute;
      z-index: 1;
      width: 100px;
      margin: 0;
      margin-top: pr(-8);
      height: pr(8);
      background-color: #ffdfa7;
      border: none;
      border-radius: pr(4);
      transition: width .5s;
    }
    ul.level-text {
      li {
        img {
          width: pr(50);
        }
        span {
          margin-top: pr(20);
          font-size: $normalFontSize;
          color: $supportTextColor;
        }
      }
    }
    .time-axis {
      margin: pr(60) pr(62) pr(40);
      border-top: 4px solid #f5f5f5;
      .time-axis-ul {
        li {
          position: relative;
          z-index: 2;
        }
        b {
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: -6px;
          background: #eee;
          border: 1px solid #c1c1c1;
          &.choose-color {
            border: 1px solid #ffd07f;
            background: #ffdfa7;
          }
        }
      }
      .point-ul {
        position: absolute;
        width: 100%;
        left: 0;
        margin-top: pr(20);
        text-align: center;
        font-size: $normalFontSize;
        color: $supportTextColor;
        li:first-child {
          text-indent: pr(-10);
        }
      }
    }
    .main-color {
      color: $mainFontColor !important;
    }
  }
</style>
