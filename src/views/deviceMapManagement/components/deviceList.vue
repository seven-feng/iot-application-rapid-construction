<template>
  <div>
    <div class="serachbar-container" v-show="showSearchBar">
      <el-form v-model="modelSearch" label-width="90px">
        <el-row>
          <el-col :span="7">
            <el-form-item label="设备序列号">
              <el-input v-model="modelSearch.sn" placeholder="请输入设备序列号" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="设备型号">
              <el-input v-model="modelSearch.model" placeholder="请输入设备型号" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="设备名称">
              <el-input v-model="modelSearch.name" placeholder="请输入设备名称" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <div class="btns-container">
              <el-button type="primary" size="mini">搜索</el-button>
              <el-button size="mini">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-container">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :header-cell-style="tableHeaderStyle" :cell-style="tableCellStyle">
        <el-table-column prop="deviceModel" label="设备型号" min-width="120"/>
        <el-table-column prop="cname" label="设备名称" min-width="120"/>
        <el-table-column prop="deviceSn" label="设备序列号" min-width="120"/>
      </el-table>
      <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total='this.tableData.length'
          :page-size="10"
          :current-page="1" 
          class="pagination"
          :page-sizes="[10, 20, 30, 40]"
          v-show="showPagination"
        ></el-pagination>
    </div>
  </div>
</template>

<script>
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
    showSearchBar: {
      type: Boolean,
      default: true
    },
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    tableData() {
      return this.deviceList.filter(device => this.selectedModelList.includes(device.deviceModel))
    },
    tableHeaderStyle() {
      return ({ row, column, rowIndex, columnIndex }) => {
        return rowIndex === 0 ? `background-color: ${this.options.list.headerColor};font-size: 14px;` : ''
      }
    },
    tableCellStyle() {
      return ({ row, rowIndex }) => {
        return 'font-size: 12px;color: #4B4B4B;'
      }
    }
  },
  data() {
    return {
      options: {
        list: {
          headerColor: '#fff'
        }
      },
      modelSearch: {
        model: '',
        name: '',
        sn: ''
      }
    }
  },
  methods: {
    setTableHeaderColor(params) {
      this.$refs.multipleTable
      this.options.list.headerColor = params
    }

  }
}
</script>

<style lang="scss" scoped>
  .serachbar-container {
    margin-top: 15px;
    /deep/ .el-form-item {
      margin-bottom: 0px;
    }
    .btns-container {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 20px;
    }
  }
</style>