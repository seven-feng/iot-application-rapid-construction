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
          <el-col :span="12">
            <el-form-item label="起止时间">
              <el-date-picker
                v-model="modelSearch.time"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']"
                size="mini"
                style="width: 330px">
              </el-date-picker>
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
        <el-table-column prop="deviceSn" label="设备序列号" min-width="120"/>
        <el-table-column prop="deviceModelName" label="设备型号" min-width="120"/>
        <!-- <el-table-column prop="deviceSn" label="报警类型" min-width="120"/> -->
        <!-- <el-table-column prop="deviceModel" label="报警字段" min-width="120"/> -->
        <!-- <el-table-column prop="cname" label="报警条件" min-width="120"/> -->
        <!-- <el-table-column prop="deviceSn" label="当前值" min-width="120"/> -->
        <el-table-column prop="alarm" label="报警内容" min-width="120"/>
        <el-table-column label="报警等级" min-width="120">
          <template slot-scope="scope">
            <el-tag
              :type="Number(scope.row.alarmLevel) | tagFilter"
            >{{Number(scope.row.alarmLevel) | statusFilter}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="报警时间" min-width="120"/>
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
import { alarmList } from '../constant'
const alarmLevelOptions = ['一般', '紧急', '特等']
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
      const deviceSnList = this.deviceList.map(device => device.deviceSn)
      return alarmList.filter(alarm => deviceSnList.includes(alarm.deviceSn))
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
        sn: '',
        time: ''
      }
    }
  },
  methods: {
    setTableHeaderColor(params) {
      this.$refs.multipleTable
      this.options.list.headerColor = params
    }
  },
  filters: {
    tagFilter(status) {
      const statusMap = {
        0: 'primary',
        1: 'warning',
        2: 'danger'
      }
      return statusMap[status]
    },
    statusFilter(status) {
      return alarmLevelOptions[status]
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