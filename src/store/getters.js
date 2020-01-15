const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  id: state => state.user.id,
  name: state => state.user.name,
  realName: state => state.user.realName,
  userType: state => state.user.userType,
  roles: state => state.user.roles,
  phone: state => state.user.phone,
  permissionIds: state => state.user.permissionIds,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
