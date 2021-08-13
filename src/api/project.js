import request from '@/utils/request'
import axios from 'axios'
import store from '@/store'

export function getList(data) {
  return request({
    url: '/userManagement/getList',
    method: 'post',
    data,
  })
}

// 文件上传
export function doEdit(params) {
  return axios.post('/api/api/stl/file/?token=' + store.getters['user/accessToken'], params, {'Content-Type':'multipart/form-data'})
}

export function doDelete(data) {
  return request({
    url: '/userManagement/doDelete',
    method: 'post',
    data,
  })
}

export function getProjectList(params) {
  console.log('ggggggggggggggggggggggggggg')
  console.log(params)
  return request({
    url: '/api/stl/project/',
    method: 'get',
    params,
  })
}
