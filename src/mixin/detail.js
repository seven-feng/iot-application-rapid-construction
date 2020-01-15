import request from '@/utils/request'
const DetailItem = () => import('@/components/detail')
var detailMixin = {
  components: {
    DetailItem
  },
  data: function() {
    return {
      dialogDetail: {
        visible: false
      },
      emptyDetail: null
    }
  },
  methods: {
    async handleDetail(row, event, column) {
      if ((column && column.columnKey !== 'operation') || !column) {
        // 当drag时，column可能为空
        let res = null
        let resourceLocation = null
        if (this.api && this.api.resourceLocation) {
          resourceLocation = this.api.resourceLocation
        } else if (this.api && this.api.detailUrl) {
          resourceLocation = this.api.detailUrl
        }
        if (resourceLocation) {
          const response = await request({
            method: 'get',
            url: `${resourceLocation}/${row.id}`
          })
          res = response.data.result
        } else {
          res = row
        }
        this.modelDetailInit(res)
        this.dialogDetail.visible = true
      }
    },
    modelDetailInit(object) {
      this.lodash.pick(object, this.lodash.keys(this.modelDetail))
      this.modelDetail = this.lodash.cloneDeep(this.emptyDetail)
      this.lodash.merge(this.modelDetail, object)
    },
    closeDialog() {
      this.dialogDetail.visible = false
    }
  },
  mounted() {
    this.emptyDetail = this.lodash.cloneDeep(this.modelDetail)
  }
}

export default detailMixin
