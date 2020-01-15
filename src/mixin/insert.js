import request from '@/utils/request'

var insertMixin = {
  data: function() {
    return {
      dialogInsert: {
        visible: false
      },
      emptyInsert: {}
    }
  },
  computed: {
    formInsert() {
      return this.modelInsert
    },
    preventReInsertSubmitFn() {
      return this.lodash.throttle(this.insertSubmitFn, 3000, {
        leading: true,
        trailing: false
      })
    }
  },
  methods: {
    async initInsertUpdateDialog() {
      return null
    },
    async handleInsert() {
      const args = [...arguments]
      args.forEach(arg => {
        typeof arg === 'function' && arg()
      })
      await this.initInsertUpdateDialog()
      const form = this.$refs['formInsert']
      form && form.resetFields()
      this.dialogInsert.visible = true
    },
    async insertSubmitFn() {
      try {
        await this.$refs['formInsert'].validate()
      } catch (e) {
        return
      }
      this.operationLock = true
      request({
        method: 'post',
        url: this.insertURL || this.api.resourceLocation,
        data: this.formInsert
      }).then(res => {
        this.tableReload()
        this.modelInsert = this.lodash.cloneDeep(this.emptyInsert)
        this.$message({
          message: '新增成功',
          type: 'success'
        })
        this.operationLock = false
        this.dialogInsert.visible = false
      }).catch(e => {
        this.operationLock = false
      })
    },
    insertSubmit() {
      this.preventReInsertSubmitFn()
    },
    insertCancel() {
      this.operationLock = false
      this.modelInsert = this.lodash.cloneDeep(this.emptyInsert)
      this.dialogInsert.visible = false
    }
  },
  mounted() {
    this.emptyInsert = this.lodash.cloneDeep(this.modelInsert)
  }
}
export default insertMixin
