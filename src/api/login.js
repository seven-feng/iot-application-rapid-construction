import request from '@/utils/request'
import { MD5 } from '@/utils/auth'
var qs = require('qs')

export function getLoginUser() {
  return request({
    url: '/iot/platform/user/me',
    method: 'get'
  })
}

export function updateLoginUser(form) {
  return request({
    url: '/iot/platform/user',
    method: 'put',
    data: form
  })
}
// 更新个人资料
export function updatePersonalInfo(form) {
  return request({
    url: '/iot/platform/user/personal',
    method: 'put',
    data: form
  })
}

export function logout() {
  return request({
    url: '/iot/logout',
    method: 'post'
  })
}

export function signup(form) {
  return request({
    url: '/iot/register',
    method: 'post',
    data: qs.stringify({
      roleId: form.roleId,
      username: form.userName,
      phone: form.phone,
      password: MD5(form.password), // 密码md5加密,
      rePassword: MD5(form.rePassword),
      email: form.email,
      method: 'register'
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

// 更新用户密码
export function updatePassword(form) {
  return request({
    url: '/iot/platform/user/password',
    method: 'post',
    data: {
      oldPwd: MD5(form.oldPassword),
      newPwd: MD5(form.newPassword),
      reNewPwd: MD5(form.checkPassword)
    }
  })
}
export function login(username, password) {
  password = MD5(password)
  return request({
    url: '/iot/login',
    method: 'post',
    data: qs.stringify({
      username: username,
      password: password,
      method: 'login'
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

export function renew() {
  return request({
    url: '/iot/renew',
    method: 'get'
  })
}
