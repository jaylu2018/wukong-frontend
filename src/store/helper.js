import api from '@/api'
import { basePermissions } from '@/settings'

export async function getUserInfo() {
  const res = await api.getUser()
  const { id, username, profile, roles, currentRole } = res.data || {}
  return {
    id,
    username,
    avatar: profile?.avatar,
    nickName: profile?.nickName,
    gender: profile?.gender,
    address: profile?.address,
    email: profile?.email,
    roles,
    currentRole,
  }
}

export async function getPermissions(roleIds) {
  let asyncPermissions = []
  try {
    // 对每个角色id请求权限
    const permissionPromises = roleIds.map(roleId => api.getRoleMenu(roleId))
    const permissionResponses = await Promise.all(permissionPromises)
    // 合并所有权限
    const permissionsList = permissionResponses.map(res => res.data || [])
    asyncPermissions = permissionsList.flat()
  }
  catch (error) {
    console.error(error)
  }
  return basePermissions.concat(asyncPermissions)
}
