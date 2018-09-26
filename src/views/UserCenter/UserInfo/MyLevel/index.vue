<template>
  <div v-if="levelState">
    <my-point></my-point>
    <level-bar></level-bar>
    <point-bar></point-bar>
    <member-privileges></member-privileges>
  </div>
</template>

<script type="text/ecmascript-6">
  import MyPoint from './MyPoint'
  import LevelBar from './LevelBar'
  import PointBar from './PointBar'
  import MemberPrivileges from './MemberPrivileges'

  export default {
    components: {
      MyPoint,
      LevelBar,
      PointBar,
      MemberPrivileges
    },
    created () {
      this.$store.dispatch('getMyLevel')
    },
    computed: {
      levelState () {
        return this.$store.state.UserCenter.levelInfo
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
