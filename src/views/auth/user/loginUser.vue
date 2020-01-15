<template>
  <div class="container">
    <el-card>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" :disabled="disable">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="ruleForm.username" auto-complete="off" disabled />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model.trim="ruleForm.realName" auto-complete="off" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="ruleForm.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model.trim="ruleForm.phone" auto-complete="off" />
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model.trim="ruleForm.email" auto-complete="off" />
        </el-form-item>
      </el-form>
      <div style="margin-left: 100px">
        <el-button size="small" class="editor" type="primary" @click.native.prevent="handleEditor()" :disabled="operationLock">{{ this.disable ? '编辑' : '保存' }}</el-button>
        <el-button size="small" v-if="!disable" class="editor" @click.native.prevent="handleCancel()">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { getLoginUser, updatePersonalInfo } from '@/api/login'
import { validateMobile, validateEmail } from '@/utils/validate'
export default {
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
      commonFields: ['phone', 'email'],
      ruleForm: {
        userId: '',
        username: '',
        realName: '',
        gender: '',
        phone: '',
        email: ''
      },
      userData: {},
      disable: true,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 30, message: '长度不超过30个字符', trigger: 'blur' }
        ],
        realName: [
          { min: 0, max: 30, message: '长度在不超过30个字符', trigger: 'blur' }
        ],
        phone: [
          { validator: validateMobileFunc, trigger: 'blur' },
          { max: 20, message: '长度不超过20个字符', trigger: 'blur' }
        ],
        email: [
          { max: 50, message: '长度不超过50个字符', trigger: 'blur' },
          { validator: validateEmailFunc, trigger: 'change' }
        ]
      },
      operationLock: false
    }
  },
  methods: {
    handleEditor() {
      if (this.disable) {
        this.disable = !this.disable
        return
      } else {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            const uploadForm = { ...this.ruleForm }
            this.commonFields.forEach(field => {
              if (uploadForm[field] === this.userData[field]) {
                delete uploadForm[field]
              }
            })
            this.operationLock = true
            updatePersonalInfo(uploadForm).then(() => {
              this.disable = !this.disable
              Message({
                message: '修改成功',
                type: 'success'
              })
              this.operationLock = false
            }).catch(e => {
              this.operationLock = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    async handleCancel() {
      await this.setForm()
      this.disable = true
    },
    async setForm() {
      getLoginUser().then(response => {
        const userData = response.data.result
        userData.phone = Number.parseInt(userData.phone).toString() || ''
        this.ruleForm = this.lodash.pick(userData, Object.keys(this.ruleForm))
        // 后端更新逻辑有问题，更新个人信息时，还会报手机号码已注册错误，
        // 目前只能前端处理，该部分后端接口需要修改
        this.userData = userData
      })
    }
  },
  created() {
    this.setForm()
  }
}
</script>
