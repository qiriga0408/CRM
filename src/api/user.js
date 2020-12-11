import request from '@/utils/request'

//登录
export function login(data) {
    return request({
        url: '/crm/v1/account/login',
        method: 'post',
        data: { data }
    })
}

//获取币种列表
export function currency_list(data) {
    return request({
        url: '/crm/v1/common/coin/list',
        method: 'post',
        data
    })
}

//获取合约列表
export function contract_list(data) {
    return request({
        url: '/crm/v1/common/contract/list',
        method: 'post',
        data: { data }
    })
}

//获取代理邀请配置
export function userinfo(data) {
    return request({
        url: '/crm/v1/agent/invite/conf',
        method: 'post',
        data
    })
}



export function getInfo(){
    return request({
        url: '/crm/v1/agent/invite/conf',
        method: 'post',
    })
}

export function logout() {
    return request({
        url: '/vue-admin-template/user/logout',
        method: 'post'
    })
}