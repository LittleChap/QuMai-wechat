<template>
  <div class="number-input">
    <span class="number-button number-button-decrease icon-num-sub" :class="{'disabled': data_value <= data_min}"
        @click="decrease"></span>
    <div class="input-box">
      <input v-if="canInput" class="num-content" type="number" autocomplete="off" v-model="data_value" :min="data_min"
          :max="data_max" @blur="changeVal">
      <span v-else class="num-content" @click="clickNumber">{{data_value}}</span>
    </div>
    <span class="number-button number-button-increase icon-num-addition" :class="{'disabled': data_value >= data_max}"
        @click="increase"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'numberInput',
    props: {
      value: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: 10000
      },
      min: {
        type: Number,
        default: 0
      },
      step: {
        type: Number,
        default: 1
      },
      canInput: {  // 是否允许输入
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        data_value: this.value,
        data_max: this.max,
        data_min: this.min,
        data_step: this.step
      }
    },
    methods: {
      decrease () {
        if (this.data_value > this.data_min) {
          this.data_value = this.data_value - this.data_step
        }
      },
      increase () {
        if (this.data_value < this.data_max) {
          this.data_value = this.data_value + this.data_step
        }
      },
      changeVal () {
        if (this.data_value === '') {
          this.data_value = this.data_min
        }
      },
      clickNumber () {  // 点击数字（input）的操作
        this.$emit('clickNumber', true)
      }
    },
    watch: {
      'data_value': function (newValue, oldValue) {
        if (newValue !== oldValue && newValue !== '') {
          if (this.data_value > this.data_max) {
            this.data_value = this.data_max
          } else if (this.data_value < this.data_min) {
            this.data_value = this.data_min
          }
          this.$emit('numberInput', this.data_value)
        }
      },
      'max': function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.data_max = newValue
          if (this.data_value > this.data_max) {
            this.data_value = this.data_max
          }
        }
      },
      'value': function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.data_value = newValue
        }
      }
    }

  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";

  .number-input {
    position: relative;
    width: pr(294);
    height: pr(60);
    min-height: pr(60);
    min-width: pr(280);
    border-radius: pr(2);
    background: transparent;
    .number-button {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      width: pr(80);
      height: 100%;
      text-align: center;
      font-size: pr(26);
      color: $mainFontColor;
      cursor: pointer;
      &.number-button-decrease {
        left: 0;
        border-right: 1px solid $buttonLineColor;
      }
      &.number-button-increase {
        right: 0;
        border-left: 1px solid $buttonLineColor;
      }
      &.disabled {
        color: $secondaryTextColor;
      }
    }
    .input-box {
      height: 100%;
      padding: 0 pr(90);
      line-height: 100%;
      border: 1px solid $buttonLineColor;
      .num-content {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: transparent;
        text-align: center;
        font-size: $titleFontSize;
        color: $importantInfoAndTitleColor;
      }
    }

  }

</style>

