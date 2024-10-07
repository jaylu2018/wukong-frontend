import { request } from '@/utils'

export default {
  // 获取用户信息
  getUser: () => request.get('v1/auth/getUserInfo'),
  // 刷新token
  refreshToken: () => request.get('/auth/refresh/token'),
  // 登出
  logout: () => request.post('/auth/logout', {}, { needTip: false }),
  // 切换当前角色
  switchCurrentRole: role => request.post(`/auth/current-role/switch/${role}`),
  // 获取角色菜单
  getRoleMenu: roleId => request.get(`v1/system/menus/tree/?roleId=${roleId}`),
  // 验证菜单路径
  validateMenuPath: path => request.get(`/permission/menu/validate?path=${path}`),
}
