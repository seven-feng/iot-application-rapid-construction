<template>
  <div class="tools-container">
    <div class="tool-group">
      <div class="tool-group-title" @click="handleIconRotate('isSensing')">
        <span>设备</span>
        <svg-icon :class="['icon-arrow', {'arrow-rotate': !isSensing}]" icon-class="arrow_down" />
      </div>
      <el-collapse-transition>
        <div v-show="isSensing" class="tool-group-list">
          <div v-for="(item, index) in sensingDevices" :key="index" class="tool-block">
            <device-model :device="item" />
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <div class="tool-group">
      <div class="tool-group-title" @click="handleIconRotate('isCharged')">
        <span>被控设备</span>
        <svg-icon :class="['icon-arrow', {'arrow-rotate': !isCharged}]" icon-class="arrow_down" />
      </div>
      <el-collapse-transition>
        <div v-show="isCharged" class="tool-group-list">
          <div v-for="(item, index) in chargedDevices" :key="index" class="tool-block">
            <device-model :device="item" />
          </div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
import deviceModel from './components/deviceModel'
import { mapState } from 'vuex'

export default {
  components: {
    deviceModel
  },
  data() {
    return {
      isSensing: true,
      isCharged: true
    }
  },
  computed: {
    // deviceModelData 左边栏提供选择的设备模型
    ...mapState({
      sensingDevices: state => state.device.sensingDeviceData,
      chargedDevices: state => state.device.chargedDeviceData
    })
  },
  methods: {
    handleIconRotate(key) {
      this[key] = !this[key]
    },
    dragstart(e) {
      var deviceModel = e.target.getAttribute('data-devicemodel')
      var deviceModelName = e.target.getAttribute('data-devicemodelname')
      var type = e.target.getAttribute('data-type')
      var src = e.target.firstChild.getAttribute('src')
      var info = {
        deviceModel,
        deviceModelName,
        type,
        src
      }
      e.dataTransfer.setData('info', JSON.stringify(info))
      e.dataTransfer.setData('mousex', e.offsetX)
      e.dataTransfer.setData('mousey', e.offsetY)
    }
  }
}
</script>
<style lang="scss" scoped>
.tools-container {
  width: 340px;
  position: absolute;
  left: 15px;
  top: 55px;
  bottom: 10px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-top: 0px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.tool-group {
  width: 340px;
  &-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    cursor: pointer;
    border-top: 1px solid #dddddd;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #2B2B2B;
    letter-spacing: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    transition: background-color .2s ease;
    &:hover {
      background-color: #E8F0FD;
    }
  }
  &-list {
    display: flex;
    flex-flow: wrap;
    border-top: 1px solid #dddddd;
  }
}
.tool-block {
  width: 165px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.arrow-rotate {
  transform: rotate(-180deg);
}
.icon-arrow {
  font-size: 16px;
  transition: transform .3s ease;
}
/*定义滚动条整体部分*/
div::-webkit-scrollbar{
  width: 5px;
  height: 5px;
}
/*定义滚动条轨道 颜色+圆角*/
div::-webkit-scrollbar-track{
  background: rgb(255, 255, 255);
  border-radius: 10px;
}
/*定义滑块 颜色+圆角*/
div::-webkit-scrollbar-thumb{
  background: rgb(144,147,154);
  border-radius: 10px;
}
</style>
