import request from '@/utils/request'

//用户资产查询接口
export function assetList(data) {
    return request({
      url: '/crm/v1/asset/user/list',
      method: 'post',
      data
      // baseURL: process.env.VUE_APP_BASE_API
    })
  }
  //用户资产数据导出接口
export function assetExport(data) {
  return request({
    url: '/crm/v1/asset/user/list/export',
    method: 'post',
    data
    // baseURL: process.env.VUE_APP_BASE_API
  })
}
  //用户出入金查询接口
export function goldList(data) {
    return request({
      url: '/crm/v1/asset/chain/record/list',
      method: 'post',
       data
    })
  }
    //用户出入金数据导出接口
export function goldExport(data) {
  return request({
    url: '/crm/v1/asset/chain/record/list/export',
    method: 'post',
    data
    // baseURL: process.env.VUE_APP_BASE_API
  })
}

    //用户财务记录钱包账户财务记录接口
export function financiaList(data) {
    return request({
      url: '/crm/v1/asset/finance/wallet/list',
      method: 'post',
      data
    })
  }
    //用户财务记录钱包账户财务记录导出
export function financiaExport(data){
  return request({
    url: '/crm/v1/asset/finance/wallet/list/export',
    method: 'post',
    data
    // baseURL: process.env.VUE_APP_BASE_API
  })
}
 
      //用户财务记录合约账户财务记录接口
export function contractList(data) {
    return request({
      url: '/crm/v1/asset/finance/contract/list',
      method: 'post',
      data
      //  baseURL: process.env.VUE_APP_BASE_API
    })
  }
    //用户财务记录合约账户财务记录导出
export function contractExport(data){
  return request({
    url: '/crm/v1/asset/finance/contract/list/export',
    method: 'post',
    data
    // baseURL: process.env.VUE_APP_BASE_API
  })
}

  //用户提币管理通过后点击确定
  export function updateTG(data) {
    return request({
      url: '/vue-element-admin/fundQuery/updateTG',
      method: 'post',
      data,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }
    //用户提币管理拒绝后点击确定
    export function updateJJ(data) {
        return request({
          url: '/vue-element-admin/fundQuery/updateJJ',
          method: 'post',
          data,
          baseURL: process.env.VUE_APP_BASE_API
        })
      }