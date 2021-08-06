import request from '@/utils/request'

export function doEdit(data) {
  return request({
    url: '/userManagement/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(params) {
  return request({
    url: '/api/stl/reports/'+params+'/',
    method: 'delete',
  })
}

export function getReportList(params) {
  console.log('28 getReportList')
  return request({
    url: '/api/stl/reports/',
    method: 'get',
    params,
  })
}
