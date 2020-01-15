<template>
  <div class="options-container">
    <div class="option-container" v-if="selectedOption === 'list'">
      <div class="option-header-container">自定义列表</div>
      <div class="option-content-container">
        <el-form ref="form" :model="options.list" label-width="100px">
          <el-form-item label="表头颜色：">
            <el-color-picker v-model="options.list.headerColor" @change="setTableHeaderColor"></el-color-picker>
          </el-form-item>
          <!-- <el-form-item label="初始层级：">
            <el-input-number v-model="options.map.zoom" controls-position="right" @change="setMapZoom" :min="3" :max="18" size="small"></el-input-number>
          </el-form-item>
          <el-form-item label="地图样式：">
            <el-select v-model="options.map.mapStyle" size="small" placeholder="请选地图样式" @change="setMapStype">
              <el-option v-for="styleOption in styleOptions" :label="styleOption.name" :key="styleOption.value" :value="styleOption.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显示要素：">
            <el-checkbox-group v-model="options.map.features" @change="setMapFeatures">
              <el-checkbox v-for="feature in featureTypes" :label="feature.value" :key="feature.value">{{feature.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->
        </el-form>
      </div>
    </div>
    <!-- <div class="option-container" v-if="selectedOption === 'searchBar'">
      <div class="option-header-container">{{`自定义搜索框样式`}}</div>
      <div class="option-content-container">
        <el-form ref="form" :model="options.label" label-width="100px">
        </el-form>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    selectedOption: {
      type: String,
      default: 'list'
    }
  },
  data() {
    return {
      options: {
        list: {
          headerColor: '#fff'
        }
      }
    }
  },
  methods: {
    setTableHeaderColor() {
      this.$emit('updateTable', 'setTableHeaderColor', this.options.list.headerColor)
    }
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