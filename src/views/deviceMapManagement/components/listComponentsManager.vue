<template>
  <div class="collapse-container">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-checkbox-group v-model="checkList">
        <el-collapse-item title="基础组件" name="basic">
          <div class="collapse-item-container">
            <el-checkbox label="list" disabled>列表</el-checkbox>
            <el-button size="mini" @click="selectedOption = 'list'" :type="selectedOption === 'list'? 'primary' : 'default'">自定义</el-button>
          </div>
          <div class="collapse-item-container">
            <div class="dropdown-item-container" @click="showModel = !showModel">
              <i :class="{'el-icon-arrow-right': true, 'dropdown': showModel}"></i>
              <div>设备型号</div>
            </div>
            <el-collapse-transition>
              <div class="dropdown-options-container" v-show="showModel">
                <el-checkbox-group v-model="selectedModelList">
                  <div class="collapse-item-container" v-for="deviceModel in deviceModelList" :key="deviceModel.deviceModel">
                    <el-checkbox :label="deviceModel.deviceModel">{{ deviceModel.cname }}</el-checkbox>
                    <!-- <el-button size="mini" @click="selectedOption = `model:${deviceModel.deviceModel}`" :type="selectedOption === `model:${deviceModel.deviceModel}`? 'primary' : 'default'">自定义</el-button> -->
                  </div>
                </el-checkbox-group>
              </div>
            </el-collapse-transition>
          </div>
        </el-collapse-item>
        <el-collapse-item title="更多组件" name="more">
          <div class="collapse-item-container">
            <el-checkbox label="searchBar" @change="toggleSearchBarShow">搜索栏</el-checkbox>
            <!-- <el-button size="mini" @click="selectedOption = 'searchBar'" :type="selectedOption === 'searchBar'? 'primary' : 'default'">自定义</el-button> -->
          </div>
          <div class="collapse-item-container">
            <el-checkbox label="pagination" @change="togglePaginationShow">分页</el-checkbox>
            <!-- <el-button size="mini" @click="selectedOption = 'searchBar'" :type="selectedOption === 'searchBar'? 'primary' : 'default'">自定义</el-button> -->
          </div>
        </el-collapse-item>
      </el-checkbox-group>
    </el-collapse>
  </div>
</template>

<script>
export default {
  props: {
    deviceModelList: {
      type: Array,
      default: () => []
    },
    selectedModelListProp: {
      type: Array,
      default: () => []
    },
    selectedOptionProp: {
      type: String,
      default: 'list'
    }
  },
  data() {
    return {
      activeNames: ['basic'],
      checkList: ['list', 'searchBar', 'pagination'],
      showModel: false
    }
  },
  computed: {
    selectedModelList: {
      get() {
        return this.selectedModelListProp
      },
      set(val) {
        this.$emit('update:selectedModelListProp', val)
      }
    },
    selectedOption: {
      get() {
        return this.selectedOptionProp
      },
      set(val) {
        this.$emit('update:selectedOptionProp', val)
      }
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    toggleSearchBarShow() {
      this.$emit('toggleSearchBarShow', !!this.checkList.includes('searchBar'))
    },
    togglePaginationShow() {
      this.$emit('togglePaginationShow', !!this.checkList.includes('pagination'))
    }
  }
}
</script>

<style lang="scss" scoped>
  .collapse-container {
    /deep/ .el-collapse-item__header {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #2B2B2B;
      padding-left: 16px;
    }
    /deep/ .el-collapse-item__header.is-active {
      border-bottom-color: #EBEEF5;
    }
    /deep/ .el-collapse-item__content {
      padding: 16px;
    }
    .collapse-item-container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 10px;
      i {
        margin-right: 12px;
      }
      .dropdown-item-container {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
      }
      .dropdown {
        transform: rotate(90deg);
        transition: transform 0.3s ease;
      }
      .dropdown-options-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 16px 0px 16px 25px;
        .el-checkbox-group {
          width: 100%;
        }
      }
    }
  }
</style>