import request from '@/utils/request'

export default {
  getUserList(currentPage, pageSize, userQuery) {
    return request({
      url: `/user/pageUserList?currentPage=${currentPage}&pageSize=${pageSize}`,
      method: 'post',
      data: userQuery
    })
  },
  disableUser(userId) {
    return request({
      url: `/user/disableUser?userId=${userId}`,
      method: 'get'
    })
  },
  getAdminInfo() {
    return request({
      url: `/user/getAdminInfo`,
      method: 'get'
    })
  },
  editAdminInfo(adminForm) {
    return request({
      url: `/user/editAdminInfo`,
      method: 'post',
      data: adminForm
    })
  },
  passUser(userId) {
    return request({
      url: `/user/passUser?userId=${userId}`,
      method: 'get'
    })
  },
  enableUser(userId) {
    return request({
      url: `/user/passUser?userId=${userId}`,
      method: 'get'
    })
  }
}
