## API文档

00.[请求说明](#00-请求说明)
01.[登录](#01-登录)
02.[验证谷歌令牌](#02-验证谷歌令牌)
03.[获取代理邀请配置](#03-获取代理邀请配置)
04.[获取下级用户列表](#04-获取下级用户列表)
05.[下级用户详情](#05-下级用户详情)
06.[调整分佣比例](#06-调整分佣比例)
07.[持仓查询](#07-持仓查询)
08.[持仓数据导出](#08-持仓数据导出)
09.[平仓查询](#09-平仓查询)
10.[平仓数据导出](#10-平仓数据导出)
11.[开仓查询](#11-开仓查询)
12.[开仓数据导出](#12-开仓数据导出)
13.[用户资产查询](#13-用户资产查询)
14.[用户资产数据导出](#14-用户资产数据导出)
15.[用户出入金查询](#15-用户出入金查询)
16.[用户出入金数据导出](#16-用户出入金数据导出)
17.[用户资产账户财务记录](#17-用户资产账户财务记录)
18.[用户资产账户财务记录数据导出](#18-用户资产账户财务记录数据导出)
19.[用户合约账户财务记录](#19-用户合约账户财务记录)
20.[用户合约账户财务记录数据导出](#20-用户合约账户财务记录数据导出)
21.[获取手续费返佣列表](#21-获取手续费返佣列表)
22.[手续费返佣列表数据导出](#22-手续费返佣列表数据导出)
23.[获取手续费返佣详情](#23-获取手续费返佣详情)
24.[手续费返佣详情数据导出](#24-手续费返佣详情数据导出)
25.[手续费返佣订单明细](#25-手续费返佣订单明细)
26.[获取币种列表](#26-获取币种列表)
27.[获取合约列表](#27-获取合约列表)
28.[设置下级备注](#28-设置下级备注)


### 00 请求说明
- 请求参数中选填项不传或者传类型默认值,不能是undefined
- 请求参数中时间参数皆为秒级10位时间戳
- 请求参数中-开头的参数说明为上一个object对象内内容
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|data|否|object|请求主参数(根据各个接口传对应参数)|
|ts|是|string|请求时间戳(秒级10位)|
|sign|是|string|签名(md5(md5(secretKey)+string(ts)))|
```json
{
    "data": {},
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b"
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|ret|integer|响应码|
|msg|string|响应消息|
|data|object or array|响应数据|
```json
{
  "ret": 0,
  "msg": "",
  "data": {}
}
```

### 01 登录
- URL: http://{host_addr}/crm/v1/account/login
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|是|string|账户|
|password|是|string|密码(加密后)|
```json
{
    "data": {
        "account": "10001@test.cn",
        "password": "ID2vm2k3vKE32k34EJdf12jei132nf1=="
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|vkey|string|谷歌验证序号(如果返回不为空字符串说明用户还未绑定过,走绑定逻辑)|
|token|string|登录token(放入之后请求header中的token字段中)|
|login_time|integer|登录时间戳(秒级10位)|
```json
{
  "ret": 0,
  "msg": "",
  "data": {
     "vkey": "FE3R5GDW3IVW3MF5",
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzE2NTMxMCIsIm5hbWUiOiIxNzYxMTI2NjAzMyIsImlwIjoiMTI3LjAuMC4xIiwic2VjcmV0X2tleSI6IjQ3M2U4NzM5NDFmM2EwMWQ2OTYyY2NiZjhiNDRiMDM4IiwiYXVkIjoibWFuYWdlciIsImlhdCI6MTYwNjU0MzY1NH0.DS1AKHBrQ9H8Hccea6PZ_U31xWg938K85dWRDrJXmgs",
     "login_time": 1606543654
  }
}
```

### 02 验证谷歌令牌
- URL: http://{host_addr}/crm/v1/account/vkey/check
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|vkey|否|string|谷歌验证序号(绑定时传登录时返回的序号)|
|code|是|string|验证码|
```json
{
    "data": {
        "vkey": "FE3R5GDW3IVW3MF5",
        "code": "236543"
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

```json
{
  "ret": 0,
  "msg": "",
  "data": null
}
```

### 03 获取代理邀请配置
- URL: http://{host_addr}/crm/v1/agent/invite/conf
- Method: POST
- Request Body:

```json
{
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|code|string|邀请码|
|website|string|邀请注册地址|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "code": "GL2Uxh",
        "website": "https://www.officeqb.com/register/"
    }
}
```

### 04 获取下级用户列表
- URL: http://{host_addr}/crm/v1/agent/inferior/list
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|user_type|否|integer|用户类型 0-不过滤 1-代理用户 2-直推用户|
|superior|否|string|上级代理ID/用户名|
|register_time|否|object|注册时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
|login_time|否|string|最后登录时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
|page|是|object|分页参数|
|-page|是|integer|页码(从0开始)|
|-count|是|integer|单页数据量(最大100)|
```json
{
    "data": {
        "account": "7823412",
        "user_type": 0,
        "superior": "7864412",
        "register_time": {
            "start": 1506544161,
            "end": 1606544161      
        },
        "login_time": {
            "start": 1506544161,
            "end": 1606544161      
        },
        "page": {
            "page": 0,
            "count": 10
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|total_count|integer|总条数(只会在第一页请求时返回)|
|list|array|数据列表|
|-user_id|string|用户id|
|-user_name|string|用户名|
|-user_type|integer|用户类型 1-代理用户 2-直推用户|
|-invite_code|string|邀请码|
|-register_time|integer|注册时间|
|-login_time|integer|最后登录时间|
|-login_ip|string|最后登录ip|
|-remark|string|备注|
|-superior_uid|string|上级用户id|
|-superior_account|string|上级用户名|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "total_count": 0,
        "list": [
            {
                "user_id": "7823141",
                "user_name": "10002@test.cn",
                "user_type": 1,
                "invite_code": "N4FE91",
                "register_time": 1506544161,
                "login_time": 1606544161,
                "login_ip": "127.0.0.1",
                "remark": "没有闪,大意了",
                "superior_uid": "7423141",
                "superior_account": "10001@test.cn"
            }
        ]
    }
}
```

### 05 下级用户详情
- URL: http://{host_addr}/crm/v1/agent/inferior/detail
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|user_id|是|string|用户id|
```json
{
    "data": {
        "user_id": "7823412"
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|user_id|string|用户id|
|user_name|string|用户名|
|user_type|integer|用户类型 1-代理用户 2-直推用户|
|invite_code|string|邀请码|
|register_time|integer|注册时间|
|login_time|integer|最后登录时间|
|login_ip|string|最后登录ip|
|remark|string|备注|
|superior_uid|string|上级用户id|
|superior_account|string|上级用户名|
|inferior_agent_count|integer|下级代理人数|
|inferior_all_count|integer|下级所有人数|
|rebate_rate|decimal|分佣比例|
|asset|object|资产数据|
|-wallet|object|资产账户|
|--total|decimal|总资产|
|--available|decimal|可用|
|--frozen|decimal|冻结|
|-contract|object|合约账户|
|--total|decimal|总资产|
|--rights|decimal|总权益|
|--available|decimal|可用|
|--margin|decimal|初始保证金|
|--float|decimal|浮动盈亏|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "user_id": "7823141",
        "user_name": "10002@test.cn",
        "user_type": 0,
        "invite_code": "N4FE91",
        "register_time": 1506544161,
        "login_time": 1606544161,
        "login_ip": "127.0.0.1",
        "remark": "没有闪,大意了",
        "superior_uid": "7423141",
        "superior_account": "10001@test.cn",
        "inferior_agent_count": 0,  
        "inferior_all_count": 0,
        "rebate_rate": "30",
        "asset": {
            "wallet": {
                "total": "1230.141",
                "available": "30.14",
                "frozen": "1200.001"
            },
            "contract": {
                "total": "1230.141",
                "rights": "1230.888",
                "available": "23.121",
                "margin": "1200.13",
                "float": "0.345"
            }
        }
    }
}
```

### 06 调整分佣比例
- URL: http://{host_addr}/crm/v1/agent/inferior/rebate/update
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|user_id|是|string|用户id|
|new_rate|是|decimal|新比例(10.2%就传10.2)|
```json
{
    "data": {
        "user_id": "123456",
        "new_rate": "12.12"
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

```json
{
  "ret": 0,
  "msg": "",
  "data": null
}
```

### 07 持仓查询
- URL: http://{host_addr}/crm/v1/trade/position/list
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|superior|否|string|上级代理ID/用户名|
|contract_code|否|string|合约代码|
|side|否|string|多空方向 B-做多 S-做空|
|account_type|否|integer|仓位类型 0-不筛选 1-全仓 2-逐仓|
|page|是|object|分页参数|
|-page|是|integer|页码(从0开始)|
|-count|是|integer|单页数据量(最大100)|
```json
{
    "data": {
        "account": "7823412",
        "superior": "7864412",
        "contract_code": "BTCUSDT",
        "side": "B",
        "account_type": 0,
        "page": {
            "page": 0,
            "count": 10
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|total_count|integer|总条数(只会在第一页请求时返回)|
|list|array|数据列表|
|-user_id|string|用户id|
|-account|string|用户名|
|-superior_uid|string|上级用户id|
|-superior_account|string|上级用户名|
|-contract_code|string|合约代码|
|-side|string|方向 B-做多 S-做空|
|-account_type|integer|仓位类型 1-全仓 2-逐仓|
|-lever|integer|杠杆|
|-volume|integer|张数|
|-price|decimal|开仓均价|
|-commission|decimal|手续费|
|-force_price|decimal|强平价|
|-limit|decimal|止盈价(0为未设置)|
|-stop|decimal|止损价(0为未设置)|
|-float|decimal|浮动盈亏|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "total_count": 1,
        "list": [
            {
                "user_id": "1232412",
                "account": "1001@test.cn",
                "superior_uid": "3243111",
                "superior_account": "10003@test.cn",
                "contract_code": "BTCUSDT",
                "side": "B",
                "account_type": 2,
                "lever": 100,
                "volume": 20,
                "price": "17233.2",
                "commission": "13.23",
                "force_price": "15999.12",
                "limit": "123.4",
                "stop": "0",
                "float": "100.23"
            }
        ]
    }
}
```

### 08 持仓数据导出
- URL: http://{host_addr}/crm/v1/trade/position/list/export
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|superior|否|string|上级代理ID/用户名|
|contract_code|否|string|合约代码|
|side|否|string|多空方向 B-做多 S-做空|
|account_type|否|integer|仓位类型 0-不筛选 1-全仓 2-逐仓|
```json
{
    "data": {
        "account": "7823412",
        "superior": "7864412",
        "contract_code": "BTCUSDT",
        "side": "B",
        "account_type": 0
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|download_url|string|下载地址|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "download_url": "https://xx.share.cn/123_234.xlsx"
    }
}
```

### 09 平仓查询
- URL: http://{host_addr}/crm/v1/trade/close/list
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|trade_id|否|string|交易编号|
|superior|否|string|上级代理ID/用户名|
|contract_code|否|string|合约代码|
|side|否|string|多空方向 B-平空 S-平多|
|account_type|否|integer|仓位类型 0-不筛选 1-全仓 2-逐仓|
|order_type|是|integer|交易类型 -1-不筛选 0: 市价单 1：计划单 2：止盈单 4：止损单 5：强平单|
|trade_time|否|object|成交时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
|page|是|object|分页参数|
|-page|是|integer|页码(从0开始)|
|-count|是|integer|单页数据量(最大100)|
```json
{
    "data": {
        "account": "7823412",
        "trade_id": "234325232432135",
        "superior": "7864412",
        "contract_code": "BTCUSDT",
        "side": "B",
        "account_type": 0,
        "order_type": 0,
        "trade_time": {
            "start": 1506544161,
            "end": 1606544161      
        },
        "page": {
            "page": 0,
            "count": 10
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|total_count|integer|总条数(只会在第一页请求时返回)|
|total_net_pnl|decimal|总净平仓PNL(只会在第一页请求时返回)|
|total_pnl|decimal|总平仓PNL(只会在第一页请求时返回)|
|total_commission|decimal|总手续费(只会在第一页请求时返回)|
|list|array|数据列表|
|-user_id|string|用户id|
|-account|string|用户名|
|-superior_uid|string|上级用户id|
|-superior_account|string|上级用户名|
|-trade_id|string|交易编号|
|-contract_code|string|合约代码|
|-side|string|方向 B-做多 S-做空|
|-account_type|integer|仓位类型 1-全仓 2-逐仓|
|-lever|integer|杠杆|
|-volume|integer|张数|
|-open_price|decimal|开仓价|
|-close_price|decimal|平仓价|
|-commission|decimal|手续费|
|-net_pnl|decimal|净PNL|
|-pnl|decimal|PNL|
|-order_type|integer|交易类型 0: 市价单 1：计划单 2：止盈单 4：止损单 5：强平单|
|-close_time|integer|平仓时间|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "total_count": 0,
        "total_net_pnl": "123.14",
        "total_pnl": "123.412",
        "total_commission": "1.23",
        "list": [
            {
                "user_id": "124124",
                "account": "1001@test.cn",
                "superior_uid": "12341",
                "superior_account": "1000@test.cn",
                "trade_id": "23415135123124",
                "contract_code": "BTCUSDT",
                "side": "B",
                "account_type": 1,
                "lever": 50,
                "volume": 100,
                "open_price": "18432.1",
                "close_price": "19121.14",
                "commission": "23.124",
                "net_pnl": "1000.123",
                "pnl": "888.23",
                "order_type": 1,
                "close_time": 1606544161
            }
        ]
    }
}
```

### 10 平仓数据导出
- URL: http://{host_addr}/crm/v1/trade/close/list/export
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|trade_id|否|string|交易编号|
|superior|否|string|上级代理ID/用户名|
|contract_code|否|string|合约代码|
|side|否|string|多空方向 B-做多 S-做空|
|account_type|否|integer|仓位类型 0-不筛选 1-全仓 2-逐仓|
|order_type|是|integer|交易类型 交易类型 -1-不筛选 0: 市价单 1：计划单 2：止盈单 4：止损单 5：强平单|
|trade_time|否|object|成交时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
```json
{
    "data": {
        "account": "7823412",
        "trade_id": "234325232432135",
        "superior": "7864412",
        "contract_code": "BTCUSDT",
        "side": "B",
        "account_type": 0,
        "close_type": 0,
        "trade_time": {
            "start": 1506544161,
            "end": 1606544161      
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|download_url|string|下载地址|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "download_url": "https://xx.share.cn/123_234.xlsx"
    }
}
```

### 11 开仓查询
- URL: http://{host_addr}/crm/v1/trade/open/list
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|trade_id|否|string|交易编号|
|superior|否|string|上级代理ID/用户名|
|contract_code|否|string|合约代码|
|side|否|string|多空方向 B-做多 S-做空|
|account_type|否|integer|仓位类型 0-不筛选 1-全仓 2-逐仓|
|order_type|是|integer|交易类型 -1-不筛选 0: 市价单 1：计划单 2：止盈单 4：止损单 5：强平单|
|trade_time|否|object|成交时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
|page|是|object|分页参数|
|-page|是|integer|页码(从0开始)|
|-count|是|integer|单页数据量(最大100)|
```json
{
    "data": {
        "account": "7823412",
        "trade_id": "234325232432135",
        "superior": "7864412",
        "contract_code": "BTCUSDT",
        "side": "B",
        "account_type": 0,
        "order_type": 0,
        "trade_time": {
            "start": 1506544161,
            "end": 1606544161      
        },
        "page": {
            "page": 0,
            "count": 10
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|total_count|integer|总条数(只会在第一页请求时返回)|
|list|array|数据列表|
|-user_id|string|用户id|
|-account|string|用户名|
|-superior_uid|string|上级用户id|
|-superior_account|string|上级用户名|
|-trade_id|string|交易编号|
|-contract_code|string|合约代码|
|-side|string|方向 B-做多 S-做空|
|-account_type|integer|仓位类型 1-全仓 2-逐仓|
|-lever|integer|杠杆|
|-volume|integer|张数|
|-price|decimal|委托|
|-commission|decimal|手续费|
|-order_type|integer|交易类型 0: 市价单 1：计划单 2：止盈单 4：止损单 5：强平单|
|-ip_address|string|IP地址|
|-create_time|integer|委托时间|
|-trade_time|integer|成交时间|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "total_count": 0,
        "list": [
            {
                "user_id": "124124",
                "account": "1001@test.cn",
                "superior_uid": "12341",
                "superior_account": "1000@test.cn",
                "trade_id": "23415135123124",
                "contract_code": "BTCUSDT",
                "side": "B",
                "account_type": 1,
                "lever": 50,
                "volume": 100,
                "price": "18923.1",
                "commission": "22.253",
                "order_type": 1,
                "ip_address": "127.0.0.1",
                "create_time": 1506544161,
                "trade_time": 1606544161
            }
        ]
    }
}
```

### 12 开仓数据导出
- URL: http://{host_addr}/crm/v1/trade/open/list/export
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|trade_id|否|string|交易编号|
|superior|否|string|上级代理ID/用户名|
|contract_code|否|string|合约代码|
|side|否|string|多空方向 B-做多 S-做空|
|account_type|否|integer|仓位类型 0-不筛选 1-全仓 2-逐仓|
|order_type|是|integer|交易类型 -1-不筛选 0: 市价单 1：计划单 2：止盈单 4：止损单 5：强平单|
|trade_time|否|object|成交时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
```json
{
    "data": {
        "account": "7823412",
        "trade_id": "234325232432135",
        "superior": "7864412",
        "contract_code": "BTCUSDT",
        "side": "B",
        "account_type": 0,
        "order_type": 0,
        "trade_time": {
            "start": 1506544161,
            "end": 1606544161      
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|download_url|string|下载地址|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "download_url": "https://xx.share.cn/123_234.xlsx"
    }
}
```

### 13 用户资产查询
- URL: http://{host_addr}/crm/v1/asset/user/list
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|superior|否|string|上级代理ID/用户名|
|page|是|object|分页参数|
|-page|是|integer|页码(从0开始)|
|-count|是|integer|单页数据量(最大100)|
```json
{
    "data": {
        "account": "7823412",
        "superior": "7864412",
        "page": {
            "page": 0,
            "count": 10
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|total_count|integer|总条数(只会在第一页请求时返回)|
|list|array|数据列表|
|-user_id|string|用户id|
|-account|string|用户名|
|-superior_uid|string|上级用户id|
|-superior_account|string|上级用户名|
|-close_order_count|integer|平仓次数|
|-total_recharge|decimal|总入金|
|-total_withdraw|decimal|总出金|
|-net_recharge|decimal|净入金|
|-balance|decimal|可用|
|-frozen_margin|decimal|冻结保证金|
|-account_rights|decimal|账户权益|
|-commission|decimal|手续费|
|-float_pnl|decimal|浮动PNL|
|-close_pnl|decimal|平仓PNL|
|-net_pnl|decimal|净PNL|
|-risk|decimal|风险率|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "total_count": 0,
        "list": [
            {
                "user_id": "123124",
                "account": "1001@test.cn",
                "superior_uid": "125112",
                "superior_account": "1000@test.cn",
                "close_order_count": 10,
                "total_recharge": "123.12412",
                "total_withdraw": "231.2412",
                "net_recharge": "125.2512",
                "balance": "123.12",
                "frozen_margin": "12.111",
                "account_rights": "123.12512",
                "commission": "12.125",
                "float_pnl": "12.12512",
                "close_pnl": "125.1252",
                "net_pnl": "25.1251",
                "risk": "12.15"
            }
        ]
    }
}
```

### 14 用户资产数据导出
- URL: http://{host_addr}/crm/v1/asset/user/list/export
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|superior|否|string|上级代理ID/用户名|
```json
{
    "data": {
        "account": "7823412",
        "superior": "7864412"
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|download_url|string|下载地址|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "download_url": "https://xx.share.cn/123_234.xlsx"
    }
}
```

### 15 用户出入金查询
- URL: http://{host_addr}/crm/v1/asset/chain/record/list
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|superior|否|string|上级代理ID/用户名|
|coin|否|string|币种|
|order_type|否|integer|订单类型 1-充币 2-提币 64-法币入金|
|trade_time|否|object|成交时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
|page|是|object|分页参数|
|-page|是|integer|页码(从0开始)|
|-count|是|integer|单页数据量(最大100)|
```json
{
    "data": {
        "account": "7823412",
        "superior": "7864412",
        "coin": "BTC",
        "order_type": 0,
        "trade_time": {
            "start": 1506544161,
            "end": 1606544161      
        },
        "page": {
            "page": 0,
            "count": 10
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|total_count|integer|总条数(只会在第一页请求时返回)|
|list|array|数据列表|
|-user_id|string|用户id|
|-account|string|用户名|
|-superior_uid|string|上级用户id|
|-superior_account|string|上级用户名|
|-coin|string|币种名|
|-amount|decimal|金额|
|-total_rights|decimal|总账户权益|
|-order_type|integer|订单类型 1-充币 2-提币 64-法币入金|
|-trade_time|integer|成交时间|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "total_count": 0,
        "list": [
            {
                "user_id": "123124",
                "account": "1001@test.cn",
                "superior_uid": "125112",
                "superior_account": "1000@test.cn",
                "coin": "BTC",
                "amount": "232.12",
                "total_rights": "1231.1541",
                "order_type": 0,
                "trade_time": 1606544161
            }
        ]
    }
}
```

### 16 用户出入金数据导出
- URL: http://{host_addr}/crm/v1/asset/chain/record/list/export
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|superior|否|string|上级代理ID/用户名|
|coin|否|string|币种|
|order_type|否|integer|订单类型 1-充币 2-提币 64-法币入金|
|trade_time|否|object|成交时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
```json
{
    "data": {
        "account": "7823412",
        "superior": "7864412",
        "coin": "BTC",
        "order_type": 0,
        "trade_time": {
            "start": 1506544161,
            "end": 1606544161      
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|download_url|string|下载地址|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "download_url": "https://xx.share.cn/123_234.xlsx"
    }
}
```

### 17 用户资产账户财务记录
- URL: http://{host_addr}/crm/v1/asset/finance/wallet/list
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|superior|否|string|上级代理ID/用户名|
|coin|否|string|币种|
|order_type|否|integer|订单类型 1-充币 2-提币 4-钱包账户划转到合约账户 8-合约账户划转到钱包账户 16-邀请佣金奖励* 32-代理佣金奖励 64-法币入金 128-空投奖励 256-钱包账户划转到跟单账户* 512-跟单账户划转到钱包账户* 1024-佣金收入*|
|trade_time|否|object|时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
|page|是|object|分页参数|
|-page|是|integer|页码(从0开始)|
|-count|是|integer|单页数据量(最大100)|
```json
{
    "data": {
        "account": "7823412",
        "superior": "7864412",
        "coin": "BTC",
        "order_type": 0,
        "trade_time": {
            "start": 1506544161,
            "end": 1606544161      
        },
        "page": {
            "page": 0,
            "count": 10
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|total_count|integer|总条数(只会在第一页请求时返回)|
|list|array|数据列表|
|-user_id|string|用户id|
|-account|string|用户名|
|-superior_uid|string|上级用户id|
|-superior_account|string|上级用户名|
|-coin|string|币种名|
|-amount|decimal|金额|
|-available|decimal|账户余额|
|-frozen|decimal|冻结|
|-order_type|integer|订单类型 1-充币 2-提币 4-钱包账户划转到合约账户 8-合约账户划转到钱包账户 16-邀请佣金奖励* 32-代理佣金奖励 64-法币入金 128-空投奖励 256-钱包账户划转到跟单账户* 512-跟单账户划转到钱包账户* 1024-佣金收入*|
|-create_time|integer|时间|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "total_count": 0,
        "list": [
            {
                "user_id": "123124",
                "account": "1001@test.cn",
                "superior_uid": "125112",
                "superior_account": "1000@test.cn",
                "coin": "BTC",
                "amount": "232.12",
                "balance": "1231.1541",
                "frozen": "12.1541",
                "order_type": 0,
                "create_time": 1606544161
            }
        ]
    }
}
```

### 18 用户资产账户财务记录数据导出
- URL: http://{host_addr}/crm/v1/asset/finance/wallet/list/export
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|superior|否|string|上级代理ID/用户名|
|coin|否|string|币种|
|order_type|否|integer|订单类型 1-充币 2-提币 4-资产账户划转到合约账户 8-合约账户划转到资产账户 16-邀请佣金奖励* 32-代理佣金奖励 64-法币入金 128-空投奖励 256-钱包账户划转到跟单账户* 512-跟单账户划转到钱包账户* 1024-佣金收入*|
|trade_time|否|object|时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
```json
{
    "data": {
        "account": "7823412",
        "superior": "7864412",
        "coin": "BTC",
        "order_type": 0,
        "trade_time": {
            "start": 1506544161,
            "end": 1606544161      
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|download_url|string|下载地址|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "download_url": "https://xx.share.cn/123_234.xlsx"
    }
}
```

### 19 用户合约账户财务记录
- URL: http://{host_addr}/crm/v1/asset/finance/contract/list
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|superior|否|string|上级代理ID/用户名|
|coin|否|string|币种|
|order_type|否|integer|订单类型 1-开仓手续费 2-资金费用 4-钱包账户转入到合约账户 8-合约账户转出到钱包账户 16-平仓盈亏 32-平仓手续费 64-模拟盘补充资产* 128-调整保证金 256-预扣佣金* 512-佣金退款* 1024-佣金收入* 2048-合约账户转出到跟单账户* 4096-跟单账户划转到合约账户* 8192-钱包账户划转到跟单账户* 16384-跟单账户划转到钱包账户* 36768-强平退回*|
|trade_time|否|object|时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
|page|是|object|分页参数|
|-page|是|integer|页码(从0开始)|
|-count|是|integer|单页数据量(最大100)|
```json
{
    "data": {
        "account": "7823412",
        "superior": "7864412",
        "coin": "BTC",
        "order_type": 0,
        "trade_time": {
            "start": 1506544161,
            "end": 1606544161      
        },
        "page": {
            "page": 0,
            "count": 10
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|total_count|integer|总条数(只会在第一页请求时返回)|
|list|array|数据列表|
|-user_id|string|用户id|
|-account|string|用户名|
|-superior_uid|string|上级用户id|
|-superior_account|string|上级用户名|
|-coin|string|币种名|
|-amount|decimal|金额|
|-available|decimal|账户余额|
|-frozen|decimal|冻结|
|-order_type|integer|订单类型 1-开仓手续费 2-资金费用 4-钱包账户转入到合约账户 8-合约账户转出到钱包账户 16-平仓盈亏 32-平仓手续费 64-模拟盘补充资产* 128-调整保证金 256-预扣佣金* 512-佣金退款* 1024-佣金收入* 2048-合约账户转出到跟单账户* 4096-跟单账户划转到合约账户* 8192-钱包账户划转到跟单账户* 16384-跟单账户划转到钱包账户* 36768-强平退回*|
|-create_time|integer|时间|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "total_count": 0,
        "list": [
            {
                "user_id": "123124",
                "account": "1001@test.cn",
                "superior_uid": "125112",
                "superior_account": "1000@test.cn",
                "coin": "BTC",
                "amount": "232.12",
                "available": "1231.1541",
                "frozen": "12.1541",
                "order_type": 0,
                "create_time": 1606544161
            }
        ]
    }
}
```

### 20 用户合约账户财务记录数据导出
- URL: http://{host_addr}/crm/v1/asset/finance/contract/list/export
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|superior|否|string|上级代理ID/用户名|
|coin|否|string|币种|
|order_type|否|integer|订单类型 1-开仓手续费 2-资金费用 4-钱包账户转入到合约账户 8-合约账户转出到钱包账户 16-平仓盈亏 32-平仓手续费 64-模拟盘补充资产* 128-调整保证金 256-预扣佣金* 512-佣金退款* 1024-佣金收入* 2048-合约账户转出到跟单账户* 4096-跟单账户划转到合约账户* 8192-钱包账户划转到跟单账户* 16384-跟单账户划转到钱包账户* 36768-强平退回*|
|trade_time|否|object|时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
```json
{
    "data": {
        "account": "7823412",
        "superior": "7864412",
        "coin": "BTC",
        "order_type": 0,
        "trade_time": {
            "start": 1506544161,
            "end": 1606544161      
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|download_url|string|下载地址|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "download_url": "https://xx.share.cn/123_234.xlsx"
    }
}
```

### 21 获取手续费返佣列表
- URL: http://{host_addr}/crm/v1/brokerage/commission/list
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|superior|否|string|上级代理ID/用户名|
|state|否|integer|发放状态 1-待发放 2-已发放|
|count_time|否|object|统计时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
|grant_time|否|object|发放时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
|page|是|object|分页参数|
|-page|是|integer|页码(从0开始)|
|-count|是|integer|单页数据量(最大100)|
```json
{
    "data": {
        "account": "7823412",
        "superior": "7864412",
        "state": 0,
        "count_time": {
            "start": 1506544161,
            "end": 1606544161      
        },
        "grant_time": {
            "start": 1506544161,
            "end": 1606544161      
        },
        "page": {
            "page": 0,
            "count": 10
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|total_count|integer|总条数(只会在第一页请求时返回)|
|list|array|数据列表|
|-id|string|统计id|
|-user_id|string|用户id|
|-account|string|用户名|
|-user_type|integer|用户类型|
|-superior_uid|string|上级用户id|
|-superior_account|string|上级用户名|
|-trade_amount|decimal|交易金额|
|-trade_commission|decimal|交易手续费|
|-rebate_amount|decimal|返佣金额|
|-rebate_interval|integer|返佣期限(天)|
|-state|integer|发放状态 1-待发放 2-已发放|
|-count_time|integer|统计时间|
|-grant_time|integer|发放时间(0为未发放)|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "total_count": 0,
        "list": [
            {
                "id": "1231242125",
                "user_id": "123124",
                "account": "1001@test.cn",
                "user_type": 0,
                "superior_uid": "125112",
                "superior_account": "1000@test.cn",
                "trade_amount": "123.123",
                "trade_commission": "123.123",
                "rebate_amount": "123.123",
                "rebate_interval": 7,
                "state": 1,
                "count_time": 1506544161,
                "grant_time": 1506544161
            }
        ]
    }
}
```

### 22 手续费返佣列表数据导出
- URL: http://{host_addr}/crm/v1/brokerage/commission/list/export
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|account|否|string|UID/手机/邮箱|
|superior|否|string|上级代理ID/用户名|
|state|否|integer|发放状态 1-待发放 2-已发放|
|count_time|否|object|统计时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
|grant_time|否|object|发放时间区间|
|-start|否|integer|起始时间|
|-end|否|integer|结束时间|
|page|是|object|分页参数|
|-page|是|integer|页码(从0开始)|
|-count|是|integer|单页数据量(最大100)|
```json
{
    "data": {
        "account": "7823412",
        "superior": "7864412",
        "state": 0,
        "count_time": {
            "start": 1506544161,
            "end": 1606544161      
        },
        "grant_time": {
            "start": 1506544161,
            "end": 1606544161      
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|download_url|string|下载地址|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "download_url": "https://xx.share.cn/123_234.xlsx"
    }
}
```

### 23 获取手续费返佣详情
- URL: http://{host_addr}/crm/v1/brokerage/commission/detail
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|own_id|是|string|归属id(对应返佣列表中的id字段)|
|account|否|string|UID/手机/邮箱|
|superior|否|string|上级代理ID/用户名|
|page|是|object|分页参数凭什么|
|-page|是|integer|页码(从0开始)|
|-count|是|integer|单页数据量(最大100)|
```json
{
    "data": {
        "own_id": "1231241212521213",
        "account": "7823412",
        "superior": "7864412",
        "page": {
            "page": 0,
            "count": 10
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|total_count|integer|总条数(只会在第一页请求时返回)|
|list|array|数据列表|
|-id|string|记录id|
|-user_id|string|用户id|
|-account|string|用户名|
|-superior_uid|string|上级用户id|
|-superior_account|string|上级用户名|
|-trade_amount|decimal|交易金额|
|-trade_commission|decimal|交易手续费|
|-rebate_rate|decimal|返佣比例+%|
|-rebate_amount|decimal|返佣数量|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "total_count": 0,
        "list": [
            {
                "id": "1231241223",
                "user_id": "123124",
                "account": "1001@test.cn",
                "superior_uid": "125112",
                "superior_account": "1000@test.cn",
                "trade_amount": "123.123",
                "trade_commission": "123.123",
                "rebate_rate": "12",
                "rebate_amount": "1.23123"
            }
        ]
    }
}
```

### 24 手续费返佣详情数据导出
- URL: http://{host_addr}/crm/v1/brokerage/commission/detail/export
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|own_id|是|string|归属id(对应返佣列表中的id字段)|
|account|否|string|UID/手机/邮箱|
|superior|否|string|上级代理ID/用户名|
|page|是|object|分页参数|
|-page|是|integer|页码(从0开始)|
|-count|是|integer|单页数据量(最大100)|
```json
{
    "data": {
        "own_id": "1231241212521213",
        "account": "7823412",
        "superior": "7864412"
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|download_url|string|下载地址|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "download_url": "https://xx.share.cn/123_234.xlsx"
    }
}
```

### 25 手续费返佣订单明细
- URL: http://{host_addr}/crm/v1/brokerage/commission/detail/order
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|own_id|是|string|归属id(对应返佣列表中的id字段)|
|user_id|是|string|贡献者id(对应返佣详情中的user_id字段)|
|page|是|object|分页参数|
|-page|是|integer|页码(从0开始)|
|-count|是|integer|单页数据量(最大100)|
```json
{
    "data": {
        "own_id": "1231241212521213",
        "user_id": "2315552",
        "page": {
            "page": 0,
            "count": 10
        }
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|total_count|integer|总条数(只会在第一页请求时返回)|
|list|array|数据列表|
|-trade_id|string|交易编号|
|-contract_code|string|合约代码|
|-account_type|integer|仓位类型|
|-lever|integer|杠杆|
|-volume|integer|张数|
|-price|decimal|成交价|
|-commission|decimal|手续费|
|-order_type|integer|订单类型|
|-trade_time|integer|成交时间|
```json
{
    "ret": 0,
    "msg": "",
    "data": {
        "total_count": 0,
        "list": [
            {
                "trade_id": "1231241",
                "contract_code": "BTCUSDT",
                "account_type": 1,
                "lever": 50,
                "volume": 200,
                "price": "18888.88",
                "commission": "22.323",
                "order_type": 7,
                "trade_time": 1606544161
            }
        ]
    }
}
```

### 26 获取币种列表
- URL: http://{host_addr}/crm/v1/common/coin/list
- Method: POST
- Request Body:

```json
{
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|currency_name|string|币种名|
|tag|string|币种标识|
|wallet_name|string|钱包名称|
```json
{
    "ret": 0,
    "msg": "",
    "data": [
        {
            "name": "BTC"
        },
        {
            "name": "ETH"
        }
    ]
}
```

### 27 获取合约列表
- URL: http://{host_addr}/crm/v1/common/contract/list
- Method: POST
- Request Body:

```json
{
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

|参数名|类型|描述|
|:---|:---|:---|
|contract_code|string|合约代码|
|coin_id|integer|结算币种id|
|coin_name|string|结算币种名称|
|price_coin_name|string|计价币种名称|
|index_precision|integer|合约指数价格精度|
```json
{
    "ret": 0,
    "msg": "",
    "data": [
        {
            "contract_code": "BTCUSDT",
            "coin_id": 36,
            "coin_name": "USDT",
            "price_coin_name": "BTC",
            "index_precision": 2
        },
        {
            "contract_code": "ETHUSDT",
            "coin_id": 36,
            "coin_name": "USDT",
            "price_coin_name": "ETH",
            "index_precision": 4
        }
    ]
}
```

### 28 设置下级备注
- URL: http://{host_addr}/crm/v1/agent/inferior/remark/set
- Method: POST
- Request Body:

|参数名|必选|类型|描述|
|:---|:---|:---|:---|
|user_id|是|string|用户id|
|remark|是|string|新备注|
```json
{
    "data": {
        "user_id": "123456",
        "remark": "耗子尾汁"
    },
    "ts": "1606544161",
    "sign": "d034f44bb27dde4271e779a6134ebe0b" 
}
```
- Response Body:

```json
{
  "ret": 0,
  "msg": "",
  "data": null
}
```

