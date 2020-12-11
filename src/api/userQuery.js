import request from '@/utils/request'

//用户列表接口
export function userList(data) {
    return request({
      url: '/crm/v1/agent/inferior/list',
      method: 'post',
      data
      // baseURL: process.env.VUE_APP_BASE_API
    })
  }
  // 点击查看跳转详情页
  export function userQueryDetail(data) {
    return request({
      url: '/crm/v1/agent/inferior/detail',
      method: 'post',
      data,
    })
  }

//备注对话框点击确定
  export function userQueryRemarksUpdata(data) {
    return request({
      url: '/crm/v1/agent/inferior/remark/set',
      method: 'post',
      data,
    })
  }
  
  //kfc首页table列表
export function kfcList(query) {
  return request({
    url: '/vue-element-admin/userQuery/kfcTableList',
    method: 'get',
     params:query,
     baseURL: process.env.VUE_APP_BASE_API
  })
}

//审核后点击确定
export function userQueryKfcUpdate(data) {
  return request({
    url: '/vue-element-admin/userQuery/update',
    method: 'post',
    data,
      baseURL: process.env.VUE_APP_BASE_API
  })
}