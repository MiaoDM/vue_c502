import request from '@/utils/request'

export default {
  getUserList(currentPage, pageSize, userQuery) {
    return request({
      url: `/user/pageUserList?currentPage=${currentPage}&pageSize=${pageSize}`,
      method: 'post',
      data: userQuery
    })
  },
  deleteUser(userId) {
    return request({
      url: `/user/deleteUser?userId=${userId}`,
      method: 'get'
    })
  }
}
