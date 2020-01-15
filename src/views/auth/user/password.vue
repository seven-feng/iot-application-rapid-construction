<template>
  <div class="container">
    <el-card>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="userInf-ruleForm">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model.trim="ruleForm.oldPassword" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model.trim="ruleForm.newPassword" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPassword">
          <el-input type="password" v-model.trim="ruleForm.checkPassword" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click.native.prevent="handleEditor()" :disabled="operationLock">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import IotFooter from '@/views/layout/components/IoTFooter'
import { updatePassword } from '@/api/login'
export default {
  name: 'userInf',
  components: {
    IotFooter
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    }
    var validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value === this.ruleForm.oldPassword) {
        callback(new Error('新密码不能和原密码完全相同'))
      } else {
        if (this.ruleForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      operationLock: false,
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6到20个字符' }
        ],
        newPassword: [
          { required: true, validator: validateNewPass, trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6到20个字符' }
        ],
        checkPassword: [
          { required: true, validator: validateCheckPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleEditor() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.operationLock = true
          updatePassword(this.ruleForm).then(response => {
            Message({
              message: '密码修改成功',
              type: 'success'
            })
            this.operationLock = false
            this.lodash.keys(this.ruleForm).forEach(key => { this.ruleForm[key] = '' })
            this.$router.push({ path: '/dashboard' })
          }).catch(e => {
            this.operationLock = false
          })
          this.$refs['ruleForm'].resetFields()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.userInf-ruleForm{
  width:50%;
  margin:0 auto;
}
</style>