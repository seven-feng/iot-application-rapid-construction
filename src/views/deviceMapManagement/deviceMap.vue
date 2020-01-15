<template>
  <div class="device-map-main-container">
    <div class="left-container">
      <components-manager 
        :deviceModelList="deviceModelList" 
        :selectedModelListProp.sync="selectedModelList" 
        :selectedOptionProp.sync="selectedOption" 
        @toggleLabelShow="toggleLabelShow"
        @toggleTextShow="toggleTextShow"
        @toggleSearchShow="toggleSearchShow"
      ></components-manager>
    </div>
    <div class="center-container">
      <!-- <div class="switch-btn-container">
        <el-button size="small" @click="backDeviceList">切换到设备列表</el-button>
      </div> -->
      <!-- <device-map :deviceList="deviceList" :selectedModelList="selectedModelList" :showLabel="showLabel" :showText="showText" ref="deviceMap"></device-map> -->
      <center-page :scenceId="scenceId" :defaultActive="1">
          <device-map 
            :deviceList="deviceList" 
            :selectedModelList="selectedModelList" 
            :showLabel="showLabel" 
            :showText="showText"
            :showSearch="showSearch"
            :scenceId="scenceId" 
            ref="deviceMap"></device-map>
      </center-page>
    </div>
    <div class="right-container">
      <options-manager :selectedOption="selectedOption" @updateMap="updateMap" :poiIconsProp.sync="poiIcons"></options-manager>
    </div>
  </div>
</template>

<script>
import { deviceModelList, styleOptions, featureTypes } from './constant'

import DeviceMap from '@/views/deviceMapManagement/components/deviceMap'
import CenterPage from '@/views/deviceMapManagement/components/centerPage'
import ComponentsManager from '@/views/deviceMapManagement/components/mapComponentsManager'
import OptionsManager from '@/views/deviceMapManagement/components/mapOptionsManager'
export default {
  components: {
    DeviceMap, ComponentsManager, OptionsManager, CenterPage
  },
  props: {
    scenceId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      styleOptions,
      featureTypes,
      deviceModelList: [],
      deviceList: [],
      selectedModelList: [],
      showLabel: false,
      showText: false,
      showSearch: false,
      selectedOption: 'map',
      poiIcons: {
        demo_iravoid: 'infrared',
        demo_fan: 'fan',
        demo_lamp: 'lamp',
        demo_light: 'light',
        demo_pressure: 'pressure',
        demo_smoke: 'smoke',
        demo_video: 'video',
        demo_tmp: 'temp'
      }
    }
  },
  methods: {
    updateMap(methods, params) {
      this.$refs.deviceMap[methods](params)
    },
    toggleLabelShow(val) {
      this.showLabel = val
    },
    toggleTextShow(val) {
      this.showText = val
    },
    toggleSearchShow(val) {
      this.showSearch = val
    }
  },
  created() {
    const scenseDeviceData = sessionStorage.getItem('scenseDeviceData')
    if (scenseDeviceData) {
      this.deviceModelList = JSON.parse(scenseDeviceData)
    } else {
      this.deviceModelList = deviceModelList
    }
    this.deviceModelList.forEach(deviceModel => {
      this.deviceList = this.deviceList.concat(deviceModel.deviceList)
    })
    this.selectedModelList = this.deviceModelList.map(deviceModel => deviceModel.deviceModel)
    // const deviceList = sessionStorage.getItem('deviceList')
    // if (deviceList) {
    //   this.deviceList = JSON.parse(deviceList)
    // } else {
    //   this.deviceModelList.forEach(deviceModel => {
    //     this.deviceList = this.deviceList.concat(deviceModel.deviceList)
    //   })
    // }
  }
}
</script>

 <style lang="scss" scoped>
    .device-map-main-container {
      width: 100%;
      height: 100%;
      padding: 16px;
      display: flex;
      .left-container {
        width: 340px;
        height: 100%;
        background: #FFFFFF;
        border: 1px solid #DDDDDD;
        display: flex;
        flex-direction: column;
      }
      .center-container {
        flex: 1;
        height: 100%;
        margin: 0px 10px;
        background: #FFFFFF;
        border: 1px solid #DDDDDD;
        position: relative;
      }
      .right-container {
        width: 340px;
        height: 100%;
        background: #FFFFFF;
        border: 1px solid #DDDDDD;
      }
    }
 </style>