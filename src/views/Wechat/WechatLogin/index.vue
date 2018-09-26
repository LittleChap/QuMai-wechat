<template>
  <div>正在加载中...</div>
</template>

<script type="text/ecmascript-6">
  import {queryString} from '@/utils/utils'
  import {fetch} from '@/utils/fetch'
  import {setUser} from '@/utils/user'
  export default {
    data () {
      return {
        code: '',
        openId: '',
        unionId: '',
        type: 0
      }
    },
    created () {
      const params = queryString()
      if (params.code) {
        this.code = params.code
        this.getOpenId()
      }
    },
    methods: {
      async getOpenId () {
        const url = '/mobileWechat/getAuthCode.do'
        const params = {
          code: this.code
        }
        const response = await fetch(url, params)
        if (parseInt(response.code) === 1) {
          this.openId = response.data.openid
          localStorage.setItem('openId', this.openId)
          this.getUnionId()
        } else {
          this.$toast(response.message)
        }
      },
      async getUnionId () {
        const url = '/mobileWechat/getWechatUid.do'
        const params = {
          code: this.code,
          openId: this.openId
        }
        const response = await fetch(url, params)
        if (parseInt(response.code) === 1) {
          this.unionId = response.data.unionId
          this.thirdLogin()
        } else {
          this.$toast(response.message)
        }
      },
      thirdLogin () {
        const _this = this
        const url = '/mobileMember/thirdLogin.do'
        const params = {
          unionId: this.unionId,
          type: this.type
        }
        fetch(url, params).then((response) => {
          if (parseInt(response.code) === 1) {
            if (response.data.associated) {
              setUser(response.data)
              const returnUrl = sessionStorage.getItem('returnUrl')
              this.$store.commit('SET_USERINFO', response.data)
              sessionStorage.removeItem('returnUrl')
              _this.$router.push(returnUrl)
            } else {
              localStorage.setItem('unionId', this.unionId)
              _this.$router.push('/loginAndSignUp/thirdLogin')
            }
          } else {
            _this.$toast(response.message)
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
