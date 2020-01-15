import request from '@/utils/request'
var deleteMixin = {
  methods: {
    async handleDelete(id) {
      try {
        await this.$confirm('是否删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        })
      } catch (e) {
        return
      }
      await request({
        method: 'delete',
        url: (this.deleteURL || this.api.resourceLocation) + '/' + id
      })
      this.tableReload()
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    }
  }
}
export default deleteMixin
