import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'

export async function login(data) {
  // if (loginRSA) {
  //   data = await encryptedData(data) // mock中登录
  // }
  const resp = request({
    // url: '/login',
    url: '/api/user/login/',
    method: 'post',
    data,
  })
  return resp
}

// {"code":200,"msg":"success","data":{"mockServer":true,"publicKey":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBT2vr+dhZElF73FJ6xiP181txKWUSNLPQQlid6DUJhGAOZblluafIdLmnUyKE8mMHhT3R+Ib3ssZcJku6Hn72yHYj/qPkCGFv0eFo7G+GJfDIUeDyalBN0QsuiE/XzPHJBuJDfRArOiWvH0BXOv5kpeXSXM8yTt5Na1jAYSiQ/wIDAQAB"}}
// {"code":200,"msg":"success","data":{"accessToken":"admin-accessToken"}}

export function getUserInfo(accessToken) {
  return request({
    // url: '/userInfo',
    url: '/api/stl/project/',
    // method: 'post',
    method: 'get',
    data: {
      [tokenName]: accessToken,
    },
  })
}

// 无需发送登出请求，清理前端token和权限即可
export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}
