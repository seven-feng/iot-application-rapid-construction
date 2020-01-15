import { logout, getLoginUser } from '@/api/login'
import { removeAccessTokenExp, removeRefreshTokenExp } from '@/utils/token'

const user = {
  state: {
    name: '',
    realName: '',
    id: '',
    avatar: '',
    userType: '',
    roles: [],
    permissionIds: [],
    phone: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_REALNAME: (state, realName) => {
      state.realName = realName
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_USER_TYPE: (state, userType) => {
      state.userType = userType
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSION_IDS: (state, permissionIds) => {
      state.permissionIds = permissionIds
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    }
  },

  actions: {
    // 获取用户信息
    getLoginUser({ commit, state }) {
      return new Promise((resolve, reject) => {
        getLoginUser().then(response => {
          const data = response.data.result
          let roles = []
          let permissionIds = []
          if (data.roleCodes) {
            roles = data.roleCodes.split(',')
          }
          if (data.menus) {
            permissionIds = data.menus.split(',')
          }
          commit('SET_ROLES', roles)
          commit('SET_PERMISSION_IDS', permissionIds)
          commit('SET_NAME', data.username)
          commit('SET_REALNAME', data.realName)
          commit('SET_ID', data.userId)
          commit('SET_USER_TYPE', data.userType)
          commit('SET_PHONE', data.phone)
          resolve(response)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(response => {
          removeAccessTokenExp()
          removeRefreshTokenExp()
          resolve()
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeAccessTokenExp()
        removeRefreshTokenExp()
        resolve()
      })
    }

    // // 更新个人信息
    // UpdateUser({ commit, form }) {
    //   return new Promise((resolve, reject) => {
    //   })
    // }
  }
}

export default user
