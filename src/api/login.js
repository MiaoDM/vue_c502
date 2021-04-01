import request from '@/utils/request'
/**
 * 该函数用于用户注册时调用，由store模块中的user.js中的Register调用
 * @param {用户名} username
 * @param {密码} password
 * @returns
 */
export function register(username, password) {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
/**
 * 该函数用于登录时调用，由store模块中的user.js中的Login调用
 * @param {用户名} username
 * @param {用户密码} password
 * @returns 返回用户的token用于唯一标识用户的身份
 */
export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
/**
 * 使用token获取用户的个人信息，由store模块中的user.js中的GetInfo调用
 * @returns 返回用户的头像信息和所属权限
 */
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
/**
 * 该函数用于用户登出时调用，由store模块中的user.js中的LogOut调用
 * @returns
 */
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
