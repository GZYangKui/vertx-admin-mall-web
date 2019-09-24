import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/productAttribute/list',
    method:'get',
    params:params
  })
}

export function deleteProductAttr(data) {
  return request({
    url:'/productAttribute/delete',
    method:'post',
    data:data
  })
}

export function createProductAttr(data) {
  return request({
    url:'/productAttribute/create',
    method:'post',
    data:data
  })
}

export function updateProductAttr(id,data) {
  return request({
    url:'/productAttribute/update?id='+id,
    method:'post',
    data:data
  })
}
export function getProductAttr(id) {
  return request({
    url:'/productAttribute/detail?attrId='+id,
    method:'get'
  })
}

export function getProductAttrInfo(productCategoryId) {
  return request({
    url:'/productAttribute/attrInfo/'+productCategoryId,
    method:'get'
  })
}
