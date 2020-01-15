import request from '@/utils/request'

var updateMixin = {
  data: function() {
    return {
      dialogUpdate: {
        visible: false
      },
      emptyUpdate: {}
    }
  },
  computed: {
    formUpdate() {
      return this.modelUpdate
    },
    preventReUpdateSubmitFn() {
      return this.lodash.throttle(this.updateSubmitFn, 3000, {
        leading: true,
        trailing: false
      })
    }
  },
  methods: {
    async initInsertUpdateDialog() {
      return null
    },
    async handleUpdate(row, id) {
      const args = [...arguments]
      const params = args.filter(arg => {
        return typeof arg !== 'function'
      })
      args.forEach(arg => {
        typeof arg === 'function' && arg.apply(this, params)
      })
      await this.initInsertUpdateDialog()
      const form = this.$refs['formUpdate']
      form && form.resetFields()
      let res = null
      if (!this.updateURL && this.api.resourceLocation) {
        const response = await request({
          method: 'get',
          url: this.api.resourceLocation + '/' + id
        })
        res = response.data.result
      } else {
        res = row
      }
      this.modelUpdateInit(res)
      this.dialogUpdate.visible = true
    },
    async updateSubmitFn() {
      try {
        await this.$refs['formUpdate'].validate()
      } catch (e) {
        return
      }
      this.operationLock = true
      request({
        method: 'put',
        url: this.updateURL || this.api.resourceLocation + (this.formUpdate.id ? '/' + this.formUpdate.id : ''),
        data: this.formUpdate
      }).then(res => {
        this.tableReload()
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.operationLock = false
        this.dialogUpdate.visible = false
        this.modelUpdate = this.lodash.cloneDeep(this.emptyUpdate)
      }).catch(e => {
        this.operationLock = false
      })
    },
    updateSubmit() {
      this.preventReUpdateSubmitFn()
    },
    updateCancel() {
      this.operationLock = false
      this.dialogUpdate.visible = false
      this.modelUpdate = this.lodash.cloneDeep(this.emptyUpdate)
    },
    modelUpdateInit(object) {
      this.modelUpdate = this.lodash.cloneDeep(this.emptyUpdate)
      this.lodash.pick(object, this.lodash.keys(this.modelUpdate))
      this.lodash.merge(this.modelUpdate, object)
    }
  },
  mounted() {
    this.emptyUpdate = this.lodash.cloneDeep(this.modelUpdate)
  }
}
export default updateMixin
