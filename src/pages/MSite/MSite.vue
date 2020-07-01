<template>
  <div class="on">
    <section class="msite">
      <!--首页头部-->
      <Header :title="address.name || '正在定位中'">
        <span class="header_search" slot="left">
              <i class="iconfont icon-sousuo"></i>
            </span>
        <span class="header_login" slot="right">
              <span class="header_login_text">登录|注册</span>
            </span>
      </Header>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container" v-if="categorys.length">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
                <div class="food_container">
                  <img :src="baseImageUrl + category.image_url">
                </div>
                <span>{{category.title}}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <div v-else>
          <img src="./images/msite_back.svg">
        </div>
      </nav>
      <!--首页附近商家-->
      <ShopList></ShopList>
    </section>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import chunk from 'lodash/chunk'
import ShopList from 'components/ShopList/ShopList'
import {mapState} from 'vuex'
export default {
  name: "MSite",
  data () {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  components: {
    ShopList
  },
  computed: {
    ...mapState({
      address: state => state.msite.address,
      categorys: state => state.msite.categorys
    }),
    categorysArr () {
      const {categorys} = this
      return chunk(categorys, 8)
    }
  },
  watch: {
    categorys () {
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  mounted () {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getCategorys')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>
