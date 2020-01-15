import formatters from '@/utils/formatters'
import request from '@/utils/request'

var tableMixin = {
  data: function() {
    return {
      // pagination
      pagination: {
        total: 0,
        current: 1,
        size: 10,
        sizes: [10, 20, 30, 40]
      },
      tableData: [],
      delVisualData: [],
      loading: false,
      operationLock: false
    }
  },
  computed: {
    formSearch() {
      return this.modelSearch
    }
  },
  methods: {
    tableHeaderStyle({ row, column, rowIndex, columnIndex }) {
      return rowIndex === 0 ? 'background-color: #FAFAFA;font-size: 14px;color: #4B4B4B;font-family: PingFangSC-Medium;' : ''
    },
    tableCellStyle({ row, rowIndex }) {
      return 'font-size: 12px;color: #4B4B4B;'
    },
    async handleSearch() {
      try {
        await this.$refs['formSearch'].validate()
      } catch (e) {
        return
      }
      this.pagination.current = 1
      this.tableReload(this.formSearch)
    },
    handleReset() {
      const form = this.$refs['formSearch']
      if (form) {
        form.resetFields()
      }
      this.pagination.current = 1
      this.tableReload(this.formSearch)
    },
    handleCurrentChange(current) {
      this.pagination.current = current
      this.tableReload(this.formSearch)
    },
    handleSizeChange(size) {
      this.pagination.size = size
      this.tableReload(this.formSearch)
    },
    async tableReload(condition = this.formSearch) {
      this.loading = true
      let res = null
      let resourceLocation = null
      if (this.api && this.api.resourceLocation) {
        resourceLocation = this.api.resourceLocation
      } else if (this.api && this.api.listUrl) {
        resourceLocation = this.api.listUrl
      }
      try {
        res = await request({
          method: 'get',
          url: resourceLocation,
          params: this.lodash.merge({}, condition, {
            pageNum: this.pagination.current,
            pageSize: this.pagination.size
          })
        })
      } catch (e) {
        this.loading = false
      }
      this.tableData = res.data.result.list
      this.pagination.total = res.data.result.total
      this.loading = false
      this.addVisual(res.data.result.list)
    },
    // 手动控制tooltip，避免MessageBox关闭导致tooltip自动触发
    addVisual: function(dataList) {
      this.delVisualData = []
      for (let i = 0; i < dataList.length; i++) {
        this.delVisualData.push({ visible: false })
      }
    },
    // formatter
    dateFormatter: (row, column, cellValue) => {
      return cellValue ? formatters.dateFormatter(cellValue, 'yyyy-MM-dd') : ''
    },
    booleanFormatter: (row, column, cellValue) => {
      // eslint-disable-next-line eqeqeq
      if (cellValue == 1) {
        return '是'
      // eslint-disable-next-line eqeqeq
      } else if (cellValue == 0) {
        return '否'
      }
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      this.tableReload(this.formSearch)
    })
  }
}
export default tableMixin
