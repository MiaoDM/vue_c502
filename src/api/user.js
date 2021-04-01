import request from '@/utils/request'

export default {
  /**
   * 该函数用于获取所有用户的用户名，用于注册时防止用户名重复
   * @returns
   */
  getAllName() {
    return request({
      url: '/user/getAllName',
      method: 'get'
    })
  }
}
