import { request } from '@/service/request';

/**
 * get all roles
 *
 * these roles are all enabled
 */
export function fetchGetAllRoles() {
  return request<Api.SystemManage.AllRole[]>({
    url: '/system/roles',
    method: 'get'
  });
}

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/system/users',
    method: 'get',
    params
  });
}

/** 查询用户 */
export function fetchGetUser(id: number) {
  return request<Api.SystemManage.User>({
    url: `/system/users/${id}`,
    method: 'get'
  });
}

/** 创建用户 */
export function fetchCreateUser(data: Api.SystemManage.CreateUserParams) {
  return request<Api.SystemManage.User>({
    url: '/system/users',
    method: 'post',
    data
  });
}

/** 更新用户 */
export function fetchUpdateUser(id: number, data: Api.SystemManage.UpdateUserParams) {
  return request<Api.SystemManage.User>({
    url: `/system/users/${id}`,
    method: 'put',
    data
  });
}

/** 删除用户 */
export function fetchDeleteUser(id: number) {
  return request({
    url: `/system/users/${id}`,
    method: 'delete'
  });
}

/** 批量删除用户 */
export function fetchBatchDeleteUsers(ids: number[]) {
  return request({
    url: '/system/users',
    method: 'delete',
    data: { ids }
  });
}
