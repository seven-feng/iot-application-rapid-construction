import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.permissionIds判断是否与当前用户权限匹配
 * @param permissionIds
 * @param route
 */
function hasPermission(permissionIds, route) {
  if (route.meta && route.meta.permissionId) {
    return permissionIds.indexOf(route.meta.permissionId) >= 0
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合菜单权限的路由表
 * @param asyncRouterMap
 * @param permissionIds
 */
function filterAsyncRouter(asyncRouterMap, permissionIds) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(permissionIds, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, permissionIds)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { permissionIds, userType } = data
        let accessedRouters
        if (userType === 1) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, permissionIds)
        }
        // 根据children菜单状态，决定父菜单状态显示与否，只针对二级菜单
        accessedRouters.forEach((item) => {
          item.hidden = false
          if (item.children && item.children.length === 0) {
            item.hidden = true
          } else if (item.children && item.children.length > 0) {
            const hiddenChildrens = item.children.filter(item => item.hidden === true)
            if (hiddenChildrens.length === item.children.length) {
              item.hidden = true
            } else if (item.children.length - hiddenChildrens.length === 1) {
              // 当只有1个子菜单时，采用父菜单图标
              item.children.forEach(elem => {
                if (elem.hidden !== true) {
                  elem.meta.icon = item.meta.icon
                } else {
                  for (const key of Object.keys(elem.meta)) {
                    if (key === 'icon') {
                      delete elem.meta[key]
                    }
                  }
                }
              })
            }
          }
        })
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
