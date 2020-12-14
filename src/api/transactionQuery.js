import request from '@/utils/request'

//持仓查询接口
export function holdList(data) {
    return request({
      url: '/crm/v1/trade/position/list',
      method: 'post',
      data,
    })
  }
  //持仓查询数据导出
export function holdExport(data) {
  return request({
    url: '/crm/v1/trade/position/list/export',
    method: 'post',
    data,
  })
}

  //平仓查询接口
export function levelList(data) {
    return request({
      url: '/crm/v1/trade/close/list',
      method: 'post',
      data,
    })
  }
   //平仓查询数据导出
export function levelExport(data) {
  return request({
    url: '/crm/v1/trade/close/list/export',
    method: 'post',
    data,
  })
}

    //开仓查询接口
export function openList(data) {
  return request({
    url: '/crm/v1/trade/open/list',
    method: 'post',
    data,
    // baseURL: process.env.VUE_APP_BASE_API
  })
}
  //开仓查询数据导出
  export function openExport(data) {
    return request({
      url: '/crm/v1/trade/open/list/export',
      method: 'post',
      data,
    })
  }