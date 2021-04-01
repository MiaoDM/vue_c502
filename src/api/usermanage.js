import request from '@/utils/request'

export default {
  /**
   * 该函数用于请求用户的列表信息，并提供用户名搜索功能
   * @param {当前页} currentPage
   * @param {当前页的信息条数} pageSize
   * @param {搜索的关键字} userQuery
   * @returns
   */
  getUserList(currentPage, pageSize, userQuery) {
    return request({
      url: `/user/pageUserList?currentPage=${currentPage}&pageSize=${pageSize}`,
      method: 'post',
      data: userQuery
    })
  },
  /**
   * 该函数用于禁用用户
   * @param {用户的ID} userId
   * @returns
   */
  disableUser(userId) {
    return request({
      url: `/user/disableUser?userId=${userId}`,
      method: 'get'
    })
  },
  /**
   * 该函数用于获取管理员的个人信息
   * @returns
   */
  getAdminInfo() {
    return request({
      url: `/user/getAdminInfo`,
      method: 'get'
    })
  },
  /**
   * 该函数用于修改管理员的个人信息
   * @param {管理员的个人信息} adminForm
   * @returns
   */
  editAdminInfo(adminForm) {
    return request({
      url: `/user/editAdminInfo`,
      method: 'post',
      data: adminForm
    })
  },
  /**
   * 该函数用于审核时通过注册的请求
   * @param {用户的ID} userId
   * @returns
   */
  passUser(userId) {
    return request({
      url: `/user/passUser?userId=${userId}`,
      method: 'get'
    })
  },
  /**
   * 该函数用于启用已经禁用的用户
   * @param {用户ID} userId
   * @returns
   */
  enableUser(userId) {
    return request({
      url: `/user/enableUser?userId=${userId}`,
      method: 'get'
    })
  }
}
