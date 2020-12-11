import request from '@/utils/request'
//手续费返佣列表接口
export function rebateList(data) {
    return request({
      url: '/crm/v1/brokerage/commission/list',
      method: 'post',
      data
      // baseURL: process.env.VUE_APP_BASE_API
    })
  }
  //手续费返佣列表导出接口
export function rebateExport(data) {
  return request({
    url: '/crm/v1/brokerage/commission/list/export',
    method: 'post',
    data
    // baseURL: process.env.VUE_APP_BASE_API
  })
}
  //获取手续费返佣详情
  export function rebateDetail(data) {
    return request({
      url: '/crm/v1/brokerage/commission/detail',
      method: 'post',
      data
      // baseURL: process.env.VUE_APP_BASE_API
    })
  }
   //获取手续费返佣详情数据导出
   export function rebateDetailExport(data) {
    return request({
      url: '/crm/v1/brokerage/commission/detail/export',
      method: 'post',
      data
      // baseURL: process.env.VUE_APP_BASE_API
    })
  }

   //获取手续费返佣详情数据导出
   export function rebateDetailView(data) {
    return request({
      url: '/crm/v1/brokerage/commission/detail/order',
      method: 'post',
      data
      // baseURL: process.env.VUE_APP_BASE_API
    })
  }
