<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <iot-header></iot-header>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar ref="myNavbar"></navbar>
      <app-main @scenseTitle="getScenseTitle"></app-main>
    </div>
    <iot-footer></iot-footer>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import IotHeader from './components/IoTHeader'
import IotFooter from './components/IoTFooter'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  data() {
    return {
      scenseTitle: null
    }
  },
  components: {
    IotHeader,
    Navbar,
    Sidebar,
    AppMain,
    IotFooter
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    getScenseTitle(val) {
      this.scenseTitle = val
      this.$refs.myNavbar.getChildScenseTitle(this.scenseTitle)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;//巧妙利用z-index来实现监听点击区域以外的click
}
</style>
