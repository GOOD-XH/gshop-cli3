<template>
  <div>
      <router-view/>
      <FooterGuide v-show="$route.meta.isShowFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide";
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  mounted () {
    this.$store.dispatch('getShops')
    // this.$store.dispatch('autoLogin') 自动登录
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
