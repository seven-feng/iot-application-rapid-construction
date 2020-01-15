<template>
  <div class="device-map-main-container">
    <div class="left-container">
      <components-manager 
        :deviceModelList="deviceModelList" 
        :selectedModelListProp.sync="selectedModelList" 
        :selectedOptionProp.sync="selectedOption" 
        @toggleSearchBarShow="toggleSearchBarShow"
        @togglePaginationShow="togglePaginationShow"
      ></components-manager>
    </div>
    <div class="center-container">
      <center-page :scenceId="scenceId" :defaultActive="3">
        <alarm-list 
          :selectedModelList="selectedModelList" 
          :deviceList="deviceList" 
          :showSearchBar="showSearchBar" 
          :showPagination="showPagination" 
          ref="deviceList"
        ></alarm-list>
      </center-page>
    </div>
    <div class="right-container">
      <options-manager :selectedOption="selectedOption" @updateTable="updateTable"></options-manager>
    </div>
  </div>
</template>

<script>
import { deviceModelList } from './constant'
import CenterPage from '@/views/deviceMapManagement/components/centerPage'
import ComponentsManager from '@/views/deviceMapManagement/components/listComponentsManager'
import OptionsManager from '@/views/deviceMapManagement/components/listOptionsManager'
import AlarmList from '@/views/deviceMapManagement/components/alarmList'

export default {
  components: {
    ComponentsManager, OptionsManager, AlarmList, CenterPage
  },
  props: {
    scenceId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      deviceModelList: [],
      deviceList: [],
      selectedModelList: [],
      selectedOption: 'list',
      showSearchBar: true,
      showPagination: true
    }
  },
  methods: {
    updateTable(methods, params) {
      this.$refs.deviceList[methods](params)
    },
    toggleSearchBarShow(val) {
      this.showSearchBar = val
    },
    togglePaginationShow(val) {
      this.showPagination = val
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
  },
  mounted() {
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