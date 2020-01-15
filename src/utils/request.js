import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getAccessTokenExp, removeRefreshTokenExp } from '@/utils/token'
import { renew } from '@/api/login'

// 新建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000 // 请求超时时间
})

// 刷新token的promise
let pendingPromise
let isPending = false
// 授权API，无需accessToken
const whiteList = ['/iot/login', '/iot/renew', '/iot/logout']

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    //   /* 专门针对IE11 get请求自动取缓存的bug */
    //   config.headers['Cache-Control'] = 'no-cache'
    //   config.headers['Pragma'] = 'no-cache'
    // }
    if (whiteList.indexOf(config.url) === -1) {
      // 如果在续签token，则等token续签完成后进行访问
      if (isPending) {
        return new Promise(resolve => {
          pendingPromise.then(() => {
            resolve(config)
          })
        })
      } else {
        // 如果未续签，则判断accessToken是否失效
        const exp = getAccessTokenExp()
        if (!exp) {
          // token失效，则进行续签
          // console.log('续签', config)
          isPending = true
          pendingPromise = new Promise(resolve => {
            renew().then(res => {
              isPending = false
              resolve(config)
            }).catch(e => { // 异常出现,清除refreshToken,刷新页面
              isPending = false
              removeRefreshTokenExp()
              location.reload()
            })
          })
          return pendingPromise
        }
      }
      if (config.method === 'get' && config.params) {
        const keys = Object.keys(config.params)
        for (const key of keys) {
          if (Object.prototype.toString.call(config.params[key]) === '[object String]' && config.params[key].indexOf('+') !== -1) {
            config.params[key] = encodeURIComponent(config.params[key])
          }
        }
      }
    }
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非0是抛错 可结合自己业务进行修改
     */
    if (response.config.url === '/api/platform/device/upload') return response
    const res = response.data
    if (res.code === 0) return response
    if (res.code === 31224 || res.code === 31303) return response // 物模型及脚本校验错误自定义处理response

    if (res.code !== 9003) {
      Message({
        message: res.msg || res.message,
        type: 'error',
        duration: 5 * 1000
      })
    }

    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了; 9003:非法访问；80004011：refreshToken为空；80004004：Jwt认证失败；1023 当前登录用户不存在
    const errorCode = [80004011, 80004004, 50012, 9003, 1023]
    if (errorCode.includes(res.code)) {
      MessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }

    return Promise.reject('error')
  },
  error => {
    console.log('err' + error) // for debug
    if (error.message.includes('timeout')) {
      error.message = '网络超时'
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
