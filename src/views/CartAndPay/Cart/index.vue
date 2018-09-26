<template>
  <div>
    <div class="cart-wrap wrap" v-if="userInfo && cartList.length">
      <header-bar :btnText="editText" :clickEvent="toEdit"></header-bar>
      <div v-if="cartList.length">
        <group-item v-for="(item, key) in cartList" v-if="item.productArray && item.productArray.length"
                    :shopIndex="key"
                    :key="key"></group-item>
      </div>
      <bottom-box></bottom-box>
    </div>
    <div v-if="!cartList.length">
      <div class="v-empty-status" v-if="userInfo">
        <img src="./assets/cart-empty.png" alt="">
        <p>购物车内空空如也</p>
        <p>看看我们为您推荐的商品吧！</p>
      </div>
      <div class="v-empty-status" v-if="!userInfo">
        <img src="./assets/cart-bind.png" alt="">
        <p>您还未登录，绑定手机后将自动登录。</p>
        <button class="v-button empty-button" @click="toLogin">绑定手机</button>
      </div>
      <div class="recommendBox">
        <recommend-goods></recommend-goods>
      </div>
    </div>
    <bottom-tab :index="3"></bottom-tab>
    <GoTop/>
  </div>
</template>

<script type="text/ecmascript-6">
  import wechat from '@/utils/wechat'
  import GroupItem from './GroupItem/index.vue'
  import BottomBox from './BottomBox/index.vue'
  import RecommendGoods from '@/components/RecommendGoods/index.vue'

  export default {
    components: {
      GroupItem,
      BottomBox,
      RecommendGoods
    },
    data () {
      return {
        isEditStatus: false,
        editText: '编辑'
      }
    },
    async created () {
      if (this.userInfo) {
        this.$store.dispatch('ChangeEditStatus', false)
        this.isEditStatus = this.$store.getters.isEditStatus
        await this.$store.dispatch('GetCartList')
      }
    },
    computed: {
      userInfo () {
        return this.$getUser()
      },
      cartList () {
        let newCartList = []
        this.$store.getters.cartList.map(shop => {   // 排除掉有空的商铺
          if (shop.productArray && shop.productArray.length) {
            newCartList.push(shop)
          }
        })
        return newCartList
      }
    },
    methods: {
      toEdit () {
        this.isEditStatus = !this.isEditStatus
        this.$store.dispatch('ChangeEditStatus', this.isEditStatus)
        this.editText = this.isEditStatus ? '完成' : '编辑'
      },
      toLogin () {
        wechat.getAuth(this.$route)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/index";

  .cart-wrap {
    padding: pr(110) 0 pr(98);
  }

  .recommendBox {
    margin-top: pr(60);
    background: #fff;
  }
</style>

