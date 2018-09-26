<template>
  <div class="bill-box block">
    <div class="v-list-item">
      <div class="part-left">发票</div>
      <div class="part-right switch-box">
        <input class="v-switch v-switch-animbg" type="checkbox" v-model="isOpen" @change="saveBill">
      </div>
    </div>
    <div v-show="isOpen" class="bill-content">
      <div class="v-list-item">
        <div class="part-right select-box">
          <span @click="select(1)"><i class="v-single-select"
                                      :class="{'icon-change-highlight': isPerson, 'icon-change-disable': !isPerson }"></i>个人</span>
          <span @click="select(0)"><i class="v-single-select"
                                      :class="{'icon-change-highlight': !isPerson, 'icon-change-disable': isPerson }"></i>公司</span>
        </div>
      </div>
      <div class="v-list-item">
        <div class="part-left">发票抬头</div>
        <div class="part-right input-box">
          <input type="text" placeholder="请输入发票抬头" v-model="invoiceTitle" @change="saveBill">
        </div>
      </div>
      <div v-show="!isPerson" class="v-list-item">
        <div class="part-left">纳税人识别号</div>
        <div class="part-right  input-box">
          <input type="text" placeholder="请输入纳税人识别号" v-model="invoiceIdno" @change="saveBill">
        </div>
      </div>
    </div>
  </div>


</template>

<script type="text/ecmascript-6">
  export default {
    name: 'bill-box',
    data () {
      return {
        isToOpen: null,
        isToPerson: null,
        inTovoiceTitle: null,
        inTovoiceIdno: null
      }
    },
    created () {
      this.saveBill()
    },
    computed: {
      commitData () {
        return this.$store.getters.commitData
      },
      isOpen: {
        get () {
          if (this.isToOpen === null) {
            this.isToOpen = (this.commitData.isInvoice === 1)
          }
          return this.isToOpen
        },
        set (newValue) {
          this.isToOpen = newValue ? 1 : 0
        }
      },
      isPerson: {
        get () {
          if (this.isToPerson === null) {
            this.isToPerson = (this.commitData.invoiceType ? 0 : 1)
          }
          return this.isToPerson
        },
        set (newValue) {
          this.isToPerson = newValue ? 1 : 0
        }
      },
      invoiceTitle: {
        get () {
          if (this.inTovoiceTitle === null) {
            this.inTovoiceTitle = this.commitData.invoiceTitle || ''
          }
          return this.inTovoiceTitle
        },
        set (newValue) {
          this.inTovoiceTitle = newValue
        }
      },
      invoiceIdno: {
        get () {
          if (this.inTovoiceIdno === null) {
            this.inTovoiceIdno = this.commitData.invoiceIdno || ''
          }
          return this.inTovoiceIdno
        },
        set (newValue) {
          this.inTovoiceIdno = newValue
        }
      }
    },
    methods: {
      select (isPerson) {  // 选择是否是个人
        this.isPerson = (isPerson === 1)
        this.saveBill()
      },
      saveBill () {
        let billData = {}
        if (this.isOpen) {
          billData.isInvoice = 1
          billData.invoiceType = (this.isPerson ? 0 : 1)
          billData.invoiceTitle = this.invoiceTitle
          billData.invoiceIdno = this.invoiceIdno
        } else {
          billData.isInvoice = 0
        }
        this.$store.dispatch('SetCommitData', billData)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/commom";

  .bill-box {
    border-bottom: 1px solid $lineColor;
    background: $blockDefaultColor;
    .switch-box {
      padding-top: pr(22);
    }
    .v-list-item{
      border-bottom: none;
      border-top: 1px solid $lineColor;
    }
    .bill-content {
      @include wrapPadding;
      border-top: 1px solid $lineColor;
      .v-list-item {
        padding: 0;
        &:first-child {
          border: none;
        }
      }
      .part-left {
        flex: 0 0 pr(180);
      }
      .select-box {
        i.v-single-select {
          margin: pr(-6) pr(20) 0 pr(80);
        }
      }
    }

  }
</style>

