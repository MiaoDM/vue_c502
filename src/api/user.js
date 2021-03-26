import request from '@/utils/request'

export default {
  getAllName() {
    return request({
      url: '/user/getAllName',
      method: 'get'
    })
  }
}
