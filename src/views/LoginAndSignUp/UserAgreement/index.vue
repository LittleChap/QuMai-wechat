<template>
  <div v-html="detail">
    {{detail}}
  </div>
</template>

<script type="text/ecmascript-6">
  import {fetch} from '@/utils/fetch'
  export default {
    data () {
      return {
        detail: ''
      }
    },
    async created () {
      const response = await fetch('/mobileArticle/getPolicyAgreement.do', {
        code: 'userAgreement'
      })
      if (parseInt(response.code) === 1) {
        this.detail = response.data.articleJson.articleContent
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
