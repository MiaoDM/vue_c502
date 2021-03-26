import request from '@/utils/request'
export default {
  getUserInfo() {
    return request({
      url: `/temperature/getUserInfo`,
      method: 'get'
    })
  },
  addUserInfo(userForm) {
    return request({
      url: `/temperature/addOrEditUserInfo`,
      method: 'post',
      data: userForm
    })
  },
  editUserInfo(userForm) {
    return request({
      url: `/temperature/addOrEditUserInfo`,
      method: 'post',
      data: userForm
    })
  },
  getList(currentPage, pageSize) {
    return request({
      url: `/temperature/pageUserList?currentPage=${currentPage}&pageSize=${pageSize}`,
      method: 'get'
    })
  }
}
