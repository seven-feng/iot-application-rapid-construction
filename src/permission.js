import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getRefreshTokenExp } from '@/utils/token' // 验权
import { login } from '@/api/login'

// /* Layout */
// import Layout from '@/views/layout/Layout'

// permission judge function
/* function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
} */
function hasPermission(permissionIds, permissionId) {
  if (!permissionId) return true
  return permissionIds.indexOf(permissionId) >= 0
}
const whiteList = ['/login', '/signup'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  const exp = getRefreshTokenExp()
  // 当refresh存在且refreshToken未失效
  if (exp) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (!store.getters.id) {
        store
          .dispatch('getLoginUser')
          .then(res => {
            const permissionIds = store.getters.permissionIds
            const userType = store.getters.userType
            // 拉取用户信息
            store.dispatch('GenerateRoutes', { permissionIds, userType }).then(() => {
              // 根据permissionIds权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          })
          .catch(err => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || '验证失败，请重新登录！')
              next({ path: '/' })
            })
          })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.permissionIds, to.meta.permissionId) || store.getters.userType === 1) {
          next() //
        } else {
          next({ path: '/401', replace: true })
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 针对门户开放的账户，不用登陆
      if (to.query && to.query['user'] === 'portal') {
        login('admin', '123456').then(() => {
          next({ path: '/' })
        })
      } else {
        next()
      }
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
