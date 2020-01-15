<template>
  <div class="tabs-container">
    <div class="btns-container">
      <el-button size="small" type="primary">发布</el-button>
      <el-button size="small" @click="goBack">返回</el-button>
    </div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="设备地图" name="map">
        <device-map :scenceId="scenceId"></device-map>
      </el-tab-pane>
      <el-tab-pane label="设备列表" name="device">
        <device-list :scenceId="scenceId"></device-list>
      </el-tab-pane>
      <el-tab-pane label="报警列表" name="alarm">
        <alarm-list :scenceId="scenceId"></alarm-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DeviceMap from './deviceMap'
import DeviceList from './deviceList'
import AlarmList from './alarmList'
export default {
  components: {
    DeviceMap, DeviceList, AlarmList
  },
  data() {
    return {
      activeName: 'map',
      scenceId: null
    }
  },
  methods: {
    goBack() {
      this.$router.push('/device/webstudio')
    }
  },
  created() {
    this.scenceId = parseInt(this.$route.query.scenceId)
  }
}
</script>

<style lang="scss" scoped>
  .tabs-container {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #fff;
    /deep/ .el-tabs {
      height: 100%;
    }
    /deep/ .el-tabs__header {
      margin: 0;
    }
    /deep/ .el-tabs__content {
      height: calc(100% - 41px);
      background-color: #f0f2f5;
    }
    /deep/ .el-tab-pane {
      height: 100%;
    }
  }
  .btns-container {
    height: 40px;
    position: absolute;
    // top: -50px;
    right: 18px;
    display: flex;
    align-items: center;
    z-index: 1;
  }
</style>