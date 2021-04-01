import request from '@/utils/request'
export default {
  /**
   * 该函数用于获取用户的个人体温账户的信息
   * @returns
   */
  getUserInfo() {
    return request({
      url: `/temperature/getUserInfo`,
      method: 'get'
    })
  },
  /**
   * 该函数用于添加用户的个人体温账户信息
   * @param {用户的个人信息} userForm
   * @returns
   */
  addUserInfo(userForm) {
    return request({
      url: `/temperature/addOrEditUserInfo`,
      method: 'post',
      data: userForm
    })
  },
  /**
   * 该函数用于修改用户的个人体温账户的信息
   * @param {用户的个人信息} userForm
   * @returns
   */
  editUserInfo(userForm) {
    return request({
      url: `/temperature/addOrEditUserInfo`,
      method: 'post',
      data: userForm
    })
  },
  /**
   * 该函数用于请求用户的体温填报的信息
   * @param {当前页} currentPage
   * @param {当前页的信息条数} pageSize
   * @returns
   */
  getList(currentPage, pageSize) {
    return request({
      url: `/temperature/pageRecordList?currentPage=${currentPage}&pageSize=${pageSize}`,
      method: 'get'
    })
  }
}
