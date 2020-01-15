<template>
  <div class="options-container">
    <div class="option-container" v-if="selectedOption === 'map'">
      <div class="option-header-container">自定义地图</div>
      <div class="option-content-container">
        <el-form ref="form" :model="options.map" label-width="100px">
          <el-form-item label="初始中心点：">
            <el-input v-model="options.map.lnglat" placeholder="经纬度" size="small" @change="setMapLnglat"></el-input>
          </el-form-item>
          <el-form-item label="初始层级：">
            <el-input-number v-model="options.map.zoom" controls-position="right" @change="setMapZoom" :min="3" :max="18" size="small"></el-input-number>
          </el-form-item>
          <el-form-item label="地图样式：">
            <el-select v-model="options.map.mapStyle" size="small" placeholder="请选地图样式" @change="setMapStyle">
              <el-option v-for="styleOption in styleOptions" :label="styleOption.name" :key="styleOption.value" :value="styleOption.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显示要素：">
            <el-checkbox-group v-model="options.map.features" @change="setMapFeatures">
              <el-checkbox v-for="feature in featureTypes" :label="feature.value" :key="feature.value">{{feature.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="option-container" v-if="selectedModel">
      <div class="option-header-container">{{`自定义点位样式（${this.selectedModel}）`}}</div>
      <div class="option-content-container">
        <el-form ref="form" :model="options.model" label-width="110px">
          <el-form-item label="设备图标：">
            <el-dropdown>
              <div class="dropdown-icon-container">
                <img :src="`/static/assets/map/${this.poiIcons[selectedModel] || 'fan'}.png`" alt="">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="[model, val] in Object.entries(this.poiIcons)" :key="model" v-if="model !== selectedModel">
                  <img :src="`/static/assets/map/${val}.png`" alt="" @click="setMapIcon(val)">
                </el-dropdown-item>
              </el-dropdown-menu> 
            </el-dropdown>
          </el-form-item>
          <el-form-item label="弹窗显示字段：">
            <el-checkbox-group v-model="options.model.fields" @change="setMapFields">
              <el-checkbox v-for="field in fieldTypes" :label="field.value" :key="field.value">{{field.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="弹窗样式：">
            <el-select v-model="options.model.windowStyle" size="small">
              <el-option label="标准" value="normal"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="option-container" v-if="selectedOption === 'label'">
      <div class="option-header-container">{{`自定义Label样式`}}</div>
      <div class="option-content-container">
        <el-form ref="form" :model="options.label" label-width="100px">
          <el-form-item label="位置：">
            <el-select v-model="options.label.position" size="small" @change="setLabelPosition">
              <el-option label="左上" value="top-left"></el-option>
              <el-option label="右上" value="top-right"></el-option>
              <el-option label="右下" value="bottom-right"></el-option>
              <el-option label="左下" value="bottom-left"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="背景色：">
            <el-select v-model="options.label.backgroundColor" size="small" @change="setLabelBackgroundColor">
              <el-option label="白色" value="white"></el-option>
              <el-option label="透明" value="transparent"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="option-container" v-if="selectedOption === 'search'">
      <div class="option-header-container">{{`自定义搜索框`}}</div>
      <div class="option-content-container">
        <el-form ref="form" :model="options.search" label-width="100px">
          <el-form-item label="位置：">
            <el-select v-model="options.search.position" size="small" @change="setSearchPosition">
              <el-option label="左上" value="top-left"></el-option>
              <el-option label="右上" value="top-right"></el-option>
              <el-option label="右下" value="bottom-right"></el-option>
              <el-option label="左下" value="bottom-left"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="搜索条件：">
            <el-checkbox-group v-model="options.search.terms" @change="setSearchTerms">
              <el-checkbox v-for="term in searchTerms" :label="term.value" :key="term.value">{{term.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="option-container" v-if="selectedOption === 'text'">
      <div class="option-header-container">{{`自定义文本框样式`}}</div>
      <div class="option-content-container">
        <el-form ref="form" :model="options.text" label-width="100px">
          <el-form-item label="文本内容：">
            <el-input v-model="options.text.content" size="small" placeholder="请输入文本内容" @input="setTextContent"></el-input>
            <!-- <el-color-picker v-model="options.text.color" @change="setTextColor"></el-color-picker> -->
          </el-form-item>
          <el-form-item label="文字颜色：">
            <el-color-picker v-model="options.text.color" @change="setTextColor"></el-color-picker>
          </el-form-item>
          <el-form-item label="文字大小：">
            <el-input-number v-model="options.text.fontSize" controls-position="right" @change="setTextFontSize" :min="10" size="small"></el-input-number>
            <span>px</span>
          </el-form-item>
          <el-form-item label="字体：">
            <el-select v-model="options.text.fontFamily" size="small" @change="setTextFontFamily">
              <el-option label="宋体" value="SimSun"></el-option>
              <el-option label="黑体" value="SimHei"></el-option>
              <el-option label="微软雅黑" value="Microsoft YaHei"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="对齐方式：">
            <el-select v-model="options.text.position" size="small" @change="setTextPosition">
              <el-option label="居中" value="center"></el-option>
              <el-option label="左对齐" value="left"></el-option>
              <el-option label="右对齐" value="right"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="背景色：">
            <el-select v-model="options.text.backgroundColor" size="small" @change="setTextBackgroundColor">
              <el-option label="白色" value="white"></el-option>
              <el-option label="透明" value="transparent"></el-option>
            </el-select>
          </!-->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { styleOptions, featureTypes, poiIconsFilter } from '../constant'
export default {
  props: {
    selectedOption: {
      type: String,
      default: 'map'
    },
    poiIconsProp: {
      type: Object,
      default: {}
    }
  },
  watch: {
    selectedOption(val) {
      if (!val.startsWith('model')) {
        this.selectedModel = ''
        return
      }
      this.selectedModel = val.split(':')[1]
    }
  },
  computed: {
    poiIcons: {
      get() {
        return this.poiIconsProp
      },
      set(val) {
        this.$emit('update:poiIconsProp', val)
      }
    }
  },
  data() {
    return {
      options: {
        map: {
          lnglat: '120.017511,30.281435',
          zoom: 18,
          mapStyle: '7a65cbe533522671222d57dfeb0bb877',
          features: ['bg', 'road', 'building', 'point']
        },
        model: {
          fields: ['sn', 'model', 'manufacturer', 'deviceCategory', 'trade', 'description'],
          windowStyle: 'normal'
        },
        label: {
          position: 'bottom-right',
          backgroundColor: 'white'
        },
        search: {
          position: 'top-right',
          terms: ['name', 'address']
        },
        text: {
          content: '自定义文本',
          fontSize: 50,
          fontFamily: 'SimSun',
          color: '#000000',
          position: 'center'
        }
      },
      styleOptions,
      featureTypes,
      selectedModel: '',
      fieldTypes: [
        {
          value: 'sn',
          name: '序列号'
        },
        {
          value: 'model',
          name: '型号'
        },
        {
          value: 'manufacturer',
          name: '生产厂商'
        },
        {
          value: 'deviceCategory',
          name: '所属类别'
        },
        {
          value: 'trade',
          name: '所属行业'
        },
        {
          value: 'description',
          name: '设备描述'
        }
      ],
      searchTerms: [
        {
          value: 'name',
          name: '设备名称'
        },
        {
          value: 'address',
          name: '设备地址'
        }
      ]
    }
  },
  methods: {
    setMapLnglat() {
      this.$emit('updateMap', 'setMapLnglat', this.options.map.lnglat)
    },
    setMapZoom() {
      this.$emit('updateMap', 'setMapZoom', this.options.map.zoom)
    },
    setMapStyle() {
      this.$emit('updateMap', 'setMapStyle', this.options.map.mapStyle)
    },
    setMapFeatures() {
      this.$emit('updateMap', 'setMapFeatures', this.options.map.features)
    },
    setMapIcon(value) {
      this.$emit('updateMap', 'setMapIcon', { [this.selectedModel]: value })
    },
    setMapFields() {
      this.$emit('updateMap', 'setMapFeatures', this.options.model.fields)
    },
    setLabelPosition() {
      this.$emit('updateMap', 'setLabelPosition', this.options.label.position)
    },
    setLabelBackgroundColor() {
      this.$emit('updateMap', 'setLabelBackgroundColor', this.options.label.backgroundColor)
    },
    setTextPosition() {
      this.$emit('updateMap', 'setTextPosition', this.options.text.position)
    },
    setTextBackgroundColor() {
      this.$emit('updateMap', 'setTextBackgroundColor', this.options.text.backgroundColor)
    },
    setTextColor() {
      this.$emit('updateMap', 'setTextColor', this.options.text.color)
    },
    setTextContent() {
      this.$emit('updateMap', 'setTextContent', this.options.text.content)
    },
    setTextFontSize() {
      this.$emit('updateMap', 'setTextFontSize', this.options.text.fontSize)
    },
    setTextFontFamily() {
      this.$emit('updateMap', 'setTextFontFamily', this.options.text.fontFamily)
    },
    setSearchPosition() {
      this.$emit('updateMap', 'setSearchPosition', this.options.search.position)
    },
    setSearchTerms() {
      if (this.options.search.terms.length === 0) {
        this.$message({
          type: 'warning',
          message: '至少选择一类搜索条件'
        })
        return
      }
      this.$emit('updateMap', 'setSearchTerms', this.options.search.terms)
    }
  },
  filters: {
    poiIconsFilter
  }
}
</script>

<style lang="scss" scoped>
  .options-container {
    width: 100%;
    height: 100%;
    .option-container {
      display: flex;
      flex-direction: column;
      .option-header-container {
        height: 48px;
        width: 100%;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #2B2B2B;
        line-height: 48px;
        padding-left: 16px;
        border-bottom: 1px solid #DDDDDD;
      }
      .option-content-container {
        flex: 1;
        padding: 18px 10px;
        .dropdown-icon-container {
          height: 36px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>