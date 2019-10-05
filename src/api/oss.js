import request from '@/utils/request'
export function policy() {
  return request({
    url:'/oss/policy',
    method:'get',
  })
}
