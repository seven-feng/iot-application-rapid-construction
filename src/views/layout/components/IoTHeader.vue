<template>
  <div class="iot-header">
    <div class="logo">
      <router-link to="/">
        <!-- <svg-icon style="width: 2em; height: 2em; vertical-align: -0.7em;" icon-class="logo"></svg-icon>
        <span style="font-size: 20px;">{{title}}</span>-->
        <img src="/static/assets/logo/logo.png" alt />
      </router-link>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <el-avatar>
          <svg-icon
            icon-class="userSetting"
            style="color:#fff;font-size:24px;vertical-align:-0.35em;"
          ></svg-icon>
        </el-avatar>
        <span class="user-name">{{realName}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IotHeader',
  data() {
    return {
      title: '海康物联接入'
    }
  },
  props: {},
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'realName'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      // removeAccessTokenExp()
      // removeRefreshTokenExp()
      // location.reload()
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.iot-header {
  position: fixed;
  z-index: 1000;
  height: 64px;
  width: 100%;
  background-color: #242839;
  line-height: 64px;
  & .logo {
    position: relative;
    width: 250px;
    height: 100%;
    left: 16px;
    color: white;
    & img {
      margin-bottom: -15px;
      margin-left: 0;
    }
  }
  & .avatar-container {
    display: inline-block;
    position: absolute;
    right: 35px;
    top: 0;
    .avatar-wrapper {
      cursor: pointer;
      display:flex;
      /deep/ .el-avatar{
        margin-top:12px;
      }
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .user-name{
        margin-left:8px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 30px;
        font-size: 12px;
      }
    }
  }
}
</style>
