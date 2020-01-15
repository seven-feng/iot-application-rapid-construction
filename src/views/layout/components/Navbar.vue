<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb  ref="myBreadcrumb"></breadcrumb>
    <el-button v-if="showMap" type="primary" size="small" class="show-map" @click="linkToDeviceMap"><svg-icon icon-class="deviceMap" class="map-icon"></svg-icon>地图模式</el-button>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created() {
    this.getBreadcrumb()
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  data() {
    return {
      showMap: false,
      scenseTitle: null
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    getBreadcrumb() {
      const matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name === 'main') {
        this.showMap = true
      } else {
        this.showMap = false
      }
    },
    linkToDeviceMap() {
      this.$router.push({
        path: '../device/map'
      })
    },
    getChildScenseTitle(val) {
      if (val) {
        this.scenseTitle = val
        this.$refs.myBreadcrumb.getChildScenseTitle(this.scenseTitle)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  border-radius: 0px !important;
  height: 50px;
  line-height: 50px;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .show-map{
    position: absolute;
    margin: 8px 0 0 12px;
  }
  .map-icon{
    margin-right: 8px;
  }
}
</style>

