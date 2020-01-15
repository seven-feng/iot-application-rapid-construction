<template>
  <div class="map-main-container">
    <div id="map-container"></div>
    <div class="text-container" v-show="showText" :style="`text-align:${this.textStyleOption.position}; font-family:${this.textStyleOption.fontFamily}; font-size:${this.textStyleOption.fontSize}; color:${this.textStyleOption.color}`">{{ text }}</div>
    <div :class="{'search-container': true, [searchStyleOption.position]: true}" v-show="showSearch">
      <el-input v-model="searchKey" :placeholder="getSearchPlaceHolder()" prefix-icon='el-icon-search' style="width: 220px;"></el-input>
    </div>
    <div :class="{'label-container': true, [labelStyleOption.position]: true}" :style="`background-color:${this.labelStyleOption.backgroundColor}`" v-if="showLabel && selectedModelList.length > 0">
      <div class="label-item-container" v-for="model in selectedModelList" :key="model">
        <div class="model-poi-container">
          <img :src="getModelPoiUrl(model)" alt="">
        </div>
        <div class="model-name-container">{{ getModelName(model) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import Vue from 'vue'
import GLOBAL from '@/constant/constant'
import {
  getTradeListOnServe,
  getDeviceCategoryListOnServe
} from '@/api/dictionary'

export default {
  props: {
    deviceList: {
      type: Array,
      default: () => []
    },
    selectedModelList: {
      type: Array,
      default: () => []
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    scenceId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      map: null,
      center: [120.017511, 30.281435],
      zoom: 18,
      clusterLayer: null,
      markers: [],
      infoWindow: null,
      mapStyleOption: {
        mapStyle: '7a65cbe533522671222d57dfeb0bb877',
        features: ['bg', 'road', 'building', 'point']
      },
      labelStyleOption: {
        position: 'bottom-right',
        backgroundColor: 'white'
      },
      textStyleOption: {
        color: 'black',
        fontFamily: 'PingFangSC-Regular',
        fontSize: '50px',
        position: 'center'
      },
      searchStyleOption: {
        position: 'top-right'
      },
      searchKey: '',
      searchTerms: ['name', 'address'],
      poiIcons: {
        demo_iravoid: 'infrared',
        demo_fan: 'fan',
        demo_lamp: 'lamp',
        demo_light: 'light',
        demo_pressure: 'pressure',
        demo_smoke: 'smoke',
        demo_video: 'video',
        demo_tmp: 'temp'
      },
      deviceModelList: GLOBAL.deviceModelList,
      text: '自定义文本',
      tradeOpts: [],
      categoryOpts: []
    }
  },
  watch: {
    selectedModelList(val) {
      this.updateDevicePoints()
    }
  },
  methods: {
    initMap: function() {
      this.map = new AMap.Map('map-container', {
        center: this.center,
        zoom: this.zoom,
        viewMode: '3D',
        pitch: 70,
        mapStyle: `amap://styles/${this.mapStyleOption.mapStyle}`,
        features: this.mapStyleOption.features
      })
    },
    initLayers() {
      this.clusterLayer = new AMap.MarkerClusterer(this.map, [], { gridSize: 80, maxZoom: 18 })
    },
    initOverlayGroup() {
    },
    initPoints() {
      this.markers = this.deviceList.map(device => {
        const feature = new AMap.Marker({
          position: device.location,
          offset: new AMap.Pixel(-18, -36),
          icon: this.getModelPoiUrl(device.deviceModel)
        })
        feature.id = device.id
        feature.sn = device.deviceSn
        feature.model = device.deviceModel
        feature.name = device.cname
        feature.location = device.location
        feature.manufacturer = device.manufacturer
        feature.deviceCategory = device.deviceCategory
        feature.trade = device.trade
        feature.description = device.description
        return feature
      })
    },
    addInteraction() {
      this.markers.forEach(marker => {
        marker.on('click', this.showInfoWindow)
      })
    },
    initInfoWindow() {
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true,
        offset: new AMap.Pixel(0, -40)
      })
    },
    showInfoWindow(e) {
      const { sn, name, model } = e.target
      const { manufacturer, deviceCategoryCode, tradeCode, description } = GLOBAL.deviceModelList.find(deviceModelObj => deviceModelObj.deviceModel === model)
      const selectedCategory = this.categoryOpts.find(categoryObj => categoryObj.code === deviceCategoryCode)
      const deviceCategory = selectedCategory ? selectedCategory.name : ''
      const selectedTrade = this.tradeOpts.find(tradeObj => tradeObj.code === tradeCode)
      const trade = selectedTrade ? selectedTrade.name : ''
      const content =
        `<div class='info-win-container'>
          <div class="header-container">
            <div class="title-container">${name}</div>
            <div class="status-btn-container">在线</div>
            <i class="el-icon-close" @click="closeInfoWindow"></i>
          </div>
          <div class="content-container">
            <el-row>
              <el-col :span="12">
                <div class="content-item-container">
                  <div class="item-label">序列号:</div>
                  <div class="item-value">${sn}</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="content-item-container">
                  <div class="item-label">型号:</div>
                  <div class="item-value">${model}</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="content-item-container">
                  <div class="item-label">生产厂商:</div>
                  <div class="item-value">${manufacturer || ''}</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="content-item-container">
                  <div class="item-label">所属类别:</div>
                  <div class="item-value">${deviceCategory || ''}</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="content-item-container">
                  <div class="item-label">所属行业:</div>
                  <div class="item-value">${trade || ''}</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="content-item-container">
                  <div class="item-label">设备描述:</div>
                  <div class="item-value">${description || ''}</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="content-item-container">
                  <div class="item-label">上报数据:</div>
                  <div class="item-value"></div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="content-item-container">
                  <div class="item-label">上报时间:</div>
                  <div class="item-value"></div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" v-if="controlModelList.includes('${model}')">
                <div class="item-controller-container">
                  <div class="item-label">开关控制:</div>
                  <div class="item-value">
                    <el-switch
                      v-model="isOpen"
                      active-text="开"
                      inactive-text="关">
                    </el-switch>
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="chart-container" v-if="'${model}' === 'demo_video' || '${model}' === 'demo_tmp'">
              <img src="/static/assets/map/video_img.png" v-if="'${model}' === 'demo_video'">
              <img src="/static/assets/map/line_chart_img.png" v-if="'${model}' === 'demo_tmp'">
            </div>
          </div>
        </div>`
      const infoWindowComponent = this.createInfoWindowComponent(content)
      this.infoWindow.setContent(infoWindowComponent.$el)
      this.infoWindow.open(this.map, e.target.location)
    },
    createInfoWindowComponent(content) {
      const _this = this
      const InfoWindow = Vue.extend({
        template: content,
        data() {
          return {
            isOpen: true,
            // 包含控制开关的设备模型
            controlModelList: ['demo_lamp', 'demo_fan']
          }
        },
        methods: {
          closeInfoWindow() {
            _this.map.clearInfoWindow()
          }
        }
      })
      return new InfoWindow().$mount()
    },
    closeInfoWindow() {
      this.map.clearInfoWindow()
    },
    updateDevicePoints() {
      this.clusterLayer.clearMarkers()
      this.clusterLayer.addMarkers(this.markers.filter(marker => this.selectedModelList.includes(marker.model)))
    },
    getModelPoiUrl(model) {
      return `/static/assets/map/${this.poiIcons[model] || 'fan'}.png`
    },
    getModelName(model) {
      const res = this.deviceModelList.find(deviceModel => deviceModel.deviceModel === model)
      return res ? res.name : ''
    },
    // 获取trade列表
    async getTradeOptions() {
      try {
        const {
          data: {
            result: { list: list }
          }
        } = await getTradeListOnServe()
        this.tradeOpts = list
      } catch (e) {
        console.log(e)
      }
    },
    // 获取设备类型列表
    async getCategoryOptions() {
      try {
        const {
          data: {
            result: { list: list }
          }
        } = await getDeviceCategoryListOnServe()
        this.categoryOpts = list
      } catch (e) {
        console.log(e)
      }
    },
    getSearchPlaceHolder() {
      let res = ''
      if (this.searchTerms.length === 2) {
        res = '请输入设备名称/设备地址'
      } else if (this.searchTerms.includes('name')) {
        res = '请输入设备名称'
      } else if (this.searchTerms.includes('address')) {
        res = '请输入设备地址'
      }
      return res
    },

    // 地图配置方法，与optionsManager中方法对应
    setMapLnglat(params) {
      this.center = params.split(',')
      this.map.setCenter(this.center)
    },
    setMapZoom(params) {
      this.zoom = params
      this.map.setZoom(this.zoom)
    },
    setMapFeatures() {
      this.map.setFeatures(this.mapStyleOption.features)
    },
    setMapStyle(val) {
      this.mapStyleOption.mapStyle = val
      this.map.setMapStyle(`amap://styles/${val}`)
    },
    setMapIcon(params) {
      const [model, val] = Object.entries(params)[0]
      this.poiIcons[model] = val
      this.initPoints()
      this.addInteraction()
      this.updateDevicePoints()
    },
    setMapFields(params) {

    },
    setLabelPosition(params) {
      this.labelStyleOption.position = params
    },
    setLabelBackgroundColor(params) {
      this.labelStyleOption.backgroundColor = params
    },
    setTextColor(params) {
      this.textStyleOption.color = params
    },
    setTextContent(params) {
      this.text = params
    },
    setTextPosition(params) {
      this.textStyleOption.position = params
    },
    setTextFontSize(params) {
      this.textStyleOption.fontSize = `${params}px`
    },
    setTextFontFamily(params) {
      this.textStyleOption.fontFamily = params
    },
    setSearchPosition(params) {
      this.searchStyleOption.position = params
    },
    setSearchTerms(params) {
      this.searchTerms = params
    }
  },
  mounted() {
    this.initMap()
    this.initLayers()
    this.initPoints()
    this.addInteraction()
    this.initInfoWindow()
    this.updateDevicePoints()
    this.getTradeOptions()
    this.getCategoryOptions()
  }
}
</script>

 <style lang="scss" scoped>
   .map-main-container {
     width: 100%;
     height: 100%;
     position: relative;
   }
   #map-container {
    width: 100%;
    height: 100%;
    /deep/ .amap-logo{
      display: none!important;
    }
    /deep/ .amap-copyright{
      opacity:0;
    }
    /deep/ .info-win-container {
      width: 350px;
      // height: 150px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      padding: 0px 10px;
      border: 1px solid #D0D0D0;
      box-shadow: 0 0 10px 0 rgba(64,158,255,0.70);
      .header-container {
        width: 100%;
        height: 40px;
        // display: flex;
        // justify-content: flex-start;
        // align-items: center;
        .title-container {
          display: inline-block;
          font-family: MicrosoftYaHei;
          font-weight: bold;
          font-size: 14px;
          color: #333333;
          line-height: 40px;
          margin-right: 10px;
        }
        .status-btn-container {
          display: inline-block;
          width: 48px;
          height: 22px;
          background: #E7F3FF;
          border: 1px solid #74B8FF;
          border-radius: 4px;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #4096F0;
          text-align: center;
          line-height: 20px;
        }
        i {
          position: absolute;
          top: 15px;
          right: 15px;
          cursor: pointer;
        }
      }
      .content-container {
        padding: 10px 5px;
        .content-item-container {
          display: flex;
          margin-bottom: 15px;
        }
        .item-label {
          width: 60px;
          text-align: right;
          margin-right: 10px;
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: #333333;
        }
        .item-value {
          flex: 1;
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: #888888;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .item-controller-container {
          display: flex;
          align-items: center;
        }
      }
      .chart-container {
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .text-container {
    width: 100%;
    // height: 100px;
    // background-color: red;
    position: absolute;
    left: 0;
    top:20px;
  }
  .label-container {
    width: 300px;
    // height: 300px;
    position: absolute;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .label-item-container {
      display: flex;
      height: 50px;
      width: 140px;
      align-items: center;
      // .model-poi-container {

      // }
      .model-name-container {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .search-container {
    position: absolute;
  }
  .top-left {
    top: 10px;
    left: 10px;
  }
  .top-right {
    top: 10px;
    right: 10px;
  }
  .bottom-left {
    bottom: 10px;
    left: 10px;
  }
  .bottom-right {
    bottom: 10px;
    right: 10px;
  }
 </style>