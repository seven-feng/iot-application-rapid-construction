<template>
  <div class="container">
    <el-card>
      <div class="container-toolbar">
        <el-form class="toolbar-form" ref="formSearch" :inline="true" :model="modelSearch">
          <div class="search_items_container">
            <el-form-item label="用户名/真实姓名" prop="usernameOrRealName">
              <el-input placeholder="请输入用户名/真实姓名" clearable v-model.trim="modelSearch.usernameOrRealName" class="usernameOrRealName-input" />
            </el-form-item>
            <el-form-item label="用户角色" prop="roleIds">
              <el-select v-model="modelSearch.roleIds" multiple collapse-tags clearable placeholder="请选择用户角色">
                <el-option v-for="item in codeMap.role" :key="item.roleId" :label="item.name" :value="item.roleId" />
              </el-select>
            </el-form-item>
            <div class="search_btns_container">
              <el-button @click="handleSearch" class="toolbar_button search_btn" size="mini">搜索</el-button>
              <el-button @click="handleReset" class="toolbar_button" size="mini">重置</el-button>
            </div>
          </div>
          <div class="toolbar_btns_container">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="handleInsert" class="insert_button">新建</el-button>
          </div>
        </el-form>
      </div>

      <el-table :data="tableData" v-loading="loading" element-loading-text="加载中..." fit highlight-current-row :header-cell-style="tableHeaderStyle" :cell-style="tableCellStyle">
        <el-table-column align="left"  prop="username" label="用户名" min-width="40" />
        <el-table-column align="center"  prop="realName" label="真实姓名" min-width="40" />
        <el-table-column align="center"  prop="phone" label="联系电话" min-width="60" />
        <el-table-column align="center"  prop="email" label="邮箱地址" min-width="60" />
        <el-table-column align="center"  prop="gender" label="性别" min-width="40">
          <template slot-scope="scope">
            <span v-if="scope.row.gender == '1'">男</span>
            <span v-if="scope.row.gender == '2'">女</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  prop="roleNames" label="角色" min-width="100" />
        <!-- <el-table-column align="center"  prop="departmentName" label="所属部门" min-width="80" /> -->
        <el-table-column align="center" prop="created_at" label="操作" min-width="60">
          <template slot-scope="scope">
            <el-row>
              <el-tooltip effect="dark" content="编辑" placement="top">
                <el-button size="mini" icon="el-icon-edit" circle @click="handleUpdate(scope.row, scope.row.userId)" />
              </el-tooltip>
              <el-tooltip effect="dark" content="删除" placement="top" manual v-model="delVisualData[scope.$index].visible">
                <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="handleDelete(scope.row.userId)" @mouseenter.native="delVisualData[scope.$index].visible = true" @mouseleave.native="delVisualData[scope.$index].visible = false"/>
              </el-tooltip>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          layout="total, prev, pager, next,sizes,  jumper"
          :total="pagination.total"
          :current-page.sync="pagination.current"
          class="pagination"
          :page-size.sync="pagination.size"
          :page-sizes="pagination.sizes"
          v-on:current-change="handleCurrentChange"
          v-on:size-change="handleSizeChange"
        ></el-pagination>
    </el-card>

    <el-dialog title="新增用户" :visible.sync="dialogInsert.visible" width="600px" :close-on-click-modal="false">
      <el-form :model="modelInsert" :rules="rules" label-width="80px" ref="formInsert">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="modelInsert.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model.trim="modelInsert.realName" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model.trim="modelInsert.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model.trim="modelInsert.email" placeholder="请输入邮箱地址" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="modelInsert.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="modelInsert.roleIds" multiple collapse-tags clearable placeholder="请选择用户角色">
            <el-option v-for="item in codeMap.role" :key="item.roleId" :label="item.name" :value="item.roleId" />
          </el-select>
        </el-form-item>
        <el-form-item label="运维机构" prop="agencyId" v-if="isShowAgency">
          <el-select v-model="modelInsert.agencyId" placeholder="请选择运维机构">
            <el-option v-for="item in codeMap.agency" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size='small' type="primary" @click="insertSubmit" :disabled="operationLock">保存</el-button>
          <el-button size='small' @click="insertCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="dialogUpdate.visible" width="600px" :close-on-click-modal="false">
      <el-form :model="modelUpdate" :rules="rules" label-width="80px" ref="formUpdate">
        <el-form-item label="用户名">
          {{modelUpdate.username}}
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model.trim="modelUpdate.realName" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model.trim="modelUpdate.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model.trim="modelUpdate.email" placeholder="请输入邮箱地址" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="modelUpdate.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="modelUpdate.roleIds" multiple collapse-tags clearable placeholder="请选择用户角色">
            <el-option v-for="item in codeMap.role" :key="String(item.roleId)" :label="item.name" :value="String(item.roleId)" />
          </el-select>
        </el-form-item>
        <el-form-item label="运维机构" prop="agencyId" v-if="isShowAgency">
          <el-select v-model="modelUpdate.agencyId" placeholder="请选择运维机构">
            <el-option v-for="item in codeMap.agency" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size='small' type="primary" @click="updateSubmit" :disabled="operationLock">保存</el-button>
          <el-button size='small' @click="updateCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api'
  import tableMixins from '@/mixin/table'
  import insertMixins from '@/mixin/insert'
  import updateMixins from '@/mixin/update'
  import deleteMixins from '@/mixin/delete'
  import codeMapMixins from '@/views/auth/mixins/codeMap'
  import { validateMobile, validateEmail } from '@/utils/validate'
  import request from '@/utils/request'
  export default {
    mixins: [
      tableMixins,
      insertMixins,
      updateMixins,
      deleteMixins,
      codeMapMixins
    ],
    data() {
      const validateMobileFunc = (rule, value, callback) => {
        if (value) {
          if (!validateMobile(value)) {
            callback(new Error('请输入正确的手机号码'))
          } else {
            callback()
          }
        }
        callback()
      }
      const validateEmailFunc = (rule, value, callback) => {
        if (value) {
          if (!validateEmail(value)) {
            callback(new Error('请输入正确的邮箱地址'))
          } else {
            callback()
          }
        }
        callback()
      }
      return {
        api: {
          resourceLocation: api.userUrl
        },
        commonFields: ['phone', 'email'],
        modelSearch: {
          usernameOrRealName: '',
          roleIds: []
        },
        modelUpdate: {
          username: '',
          realName: '',
          gender: '',
          phone: '',
          email: '',
          roleIds: [],
          agencyId: ''
        },
        modelInsert: {
          username: '',
          realName: '',
          gender: '',
          phone: '',
          email: '',
          roleIds: [],
          agencyId: ''
        },
        loading: true,
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 30, message: '长度不超过30个字符', trigger: 'blur' }
          ],
          realName: [
            { max: 30, message: '长度不超过30个字符', trigger: 'blur' }
          ],
          phone: [
            { max: 20, message: '长度不超过20个字符', trigger: 'blur' },
            { validator: validateMobileFunc, trigger: 'change' }
          ],
          email: [
            { max: 50, message: '长度不超过50个字符', trigger: 'blur' },
            { validator: validateEmailFunc, trigger: 'change' }
          ],
          agencyId: [
            { required: true, message: '请选择运维机构', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      isShowAgency() {
        return (
          (this.modelInsert.roleIds && this.modelInsert.roleIds.includes(419)) ||
          (this.modelInsert.roleIds && this.modelInsert.roleIds.includes(414)) ||
          (this.formUpdate.roleIds && this.formUpdate.roleIds.includes('419')) ||
          (this.formUpdate.roleIds && this.formUpdate.roleIds.includes('414'))
        )
      }
    },
    methods: {
      async updateSubmitFn() {
        try {
          await this.$refs['formUpdate'].validate()
        } catch (e) {
          return
        }
        this.commonFields.forEach(field => {
          if (this.modelUpdate[field] === this.userData[field]) {
            delete this.modelUpdate[field]
          }
        })
        Object.keys(this.modelUpdate).includes('roleCodes') && delete this.modelUpdate['roleCodes']
        this.operationLock = true
        request({
          method: 'put',
          url: this.api.resourceLocation,
          data: this.formUpdate
        }).then(response => {
          this.tableReload()
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          this.operationLock = false
          this.dialogUpdate.visible = false
        }).catch(e => {
          this.operationLock = false
        })
      },

      initInsertUpdateDialog() {
        return Promise.all([this.queryAgencyMap(), this.queryRoleMap()])
      },
      modelUpdateInit(object) {
        this.userData = object
        object.roleIds = object.roleStrIds && object.roleStrIds.split(',')
        this.modelUpdate = this.lodash.cloneDeep(this.emptyUpdate)
        this.lodash.pick(object, this.lodash.keys(this.modelUpdate))
        this.lodash.merge(this.modelUpdate, object)
        for (const key of Object.keys(object)) {
          this.modelUpdate[key] = object[key]
        }
      }
    },
    mounted() {
      this.initInsertUpdateDialog()
    }
  }
</script>
<style src='@/styles/global.scss' lang='scss' type='text/css' scoped></style>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
