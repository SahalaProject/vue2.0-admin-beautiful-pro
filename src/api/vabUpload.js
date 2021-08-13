import request from '@/utils/request'
import axios from 'axios'
import store from '@/store'

// 文件上传
export function uploadFile(params) {
  return axios.post('/api/api/stl/file/?token=' + store.getters['user/accessToken'], params, {'Content-Type':'multipart/form-data'})
}
