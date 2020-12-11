<template>
    <div class="financial-container">
     <el-tabs v-model="activeName" >
        <el-tab-pane label="钱包账户财务记录" name="second">
               <div class="filter-container">
                    <el-input size="mini" v-model="listQuery.account" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
                    <el-input v-model="listQuery.superior " size="mini" placeholder="上级代理ID/用户名" style="width:150px;margin-left:20px" class="filter-item"  @keyup.enter.native="handleFilter"/>
                     <el-select size="mini" v-model="listQuery.coin" placeholder="币种" clearable   style="width: 120px;margin-left:20px;margin-top:10px;" class="filter-item">
                      <el-option v-for="(item,index) in coinOptions" :key="index" :label="item.Currency_name" :value="item.key" />
                    </el-select>
                      <el-select size="mini" v-model="listQuery.order_type" placeholder="订单类型" clearable   style="width: 160px;margin-left:20px;" class="filter-item">
                      <el-option v-for="(item,index) in orderTypeOptions" :key="index" :label="item.position_type_name" :value="item.key" />
                    </el-select>
                    <span style="margin-left:20px;font-size:12px;">成交时间</span>
                    <el-date-picker
                    style="width:220px;margin-top:10px;"
                      v-model="listQuery.trade_time"
                      size="mini"
                      type="daterange"
                      range-separator="-"
                      start-placeholder="起始日期"
                      end-placeholder="结束日期"
                      value-format="timestamp"
                      >
                    </el-date-picker>
                  
                    <el-button  class="filter-item" size="mini" type="primary" @click="handleFilter">
                        搜索
                    </el-button>
                    <el-button class="filter-item" :loading="downloadLoading" @click="handleDownload" size="mini" type="success" >
                        导出
                    </el-button>
                </div>

                <el-table
                    v-loading="listLoading"
                    :data="financiaList"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%;margin-top:30px;"
                    :header-cell-style="{'background':'#F0F8FF'}"
                    >
              <el-table-column label="UID" prop="uid"  align="center" min-width="60" >
              <!-- sortable="custom" :class-name="getSortClass('id')" -->
                <template slot-scope="{row}">
                  <span>{{ row.user_id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="用户名" align="center" min-width="90px">
                <template slot-scope="{row}">
                  <span>{{row.account}}</span>
                </template>
              </el-table-column>
              <el-table-column label="上级代理ID" align="center" min-width="95px">
                <template slot-scope="{row}">
                  <span>{{row.superior_uid}}</span>
                </template>
              </el-table-column>
              <el-table-column label="上级代理用户名" align="center" min-width="90px">
                <template slot-scope="{row}">
                    <span>{{row.superior_account}}</span>
                </template>
              </el-table-column>
              <el-table-column label="币种" align="center" min-width="100px">
                <template slot-scope="{row}">
                     <span v-if="row.coin == 'USDT'">USDT</span>
                     <span v-else-if="row.coin == 'BTC'">BTC</span>
                </template>
              </el-table-column>
                <el-table-column label="金额" min-width="90px" align="center">
                    <template slot-scope="{row}">
                        <span>{{row.amount}}</span>
                    </template>
              </el-table-column>
              <el-table-column label="账户余额" min-width="90px" align="center">
                    <template slot-scope="{row}">
                        <span>{{row.balance}}</span>
                    </template>
              </el-table-column>
                 <el-table-column label="冻结金额" min-width="90px" align="center">
                    <template slot-scope="{row}">
                        <span style="color:blue">{{row.frozen}}</span>
                    </template>
              </el-table-column>
              <el-table-column label="订单类型" align="center" min-width="120px">
                <template slot-scope="{row}">
                     <span v-if="row.order_type == '1'">充币</span>
                    <span v-else-if="row.order_type == '2'">提币</span>
                    <span v-else-if="row.order_type == '4'">钱包账户划转到合约账户</span>
                    <span v-else-if="row.order_type == '8'">合约账户划转到钱包账户</span>
                    <span v-else-if="row.order_type == '16'">邀请佣金奖励</span>
                    <span v-else-if="row.order_type == '32'">代理佣金奖励</span>
                    <span v-else-if="row.order_type == '64'">法币入金</span>
                    <span v-else-if="row.order_type == '128'">空投奖励</span>
                </template>
              </el-table-column>
              <el-table-column label="时间" align="center" min-width="120px">
                <template slot-scope="{row}">
                    <span>{{row.create_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
              </el-table-column>
            
            </el-table>

          <pagina-tion  :total="total" :page.sync="page.size" :limit.sync="page.count" @pagination="getList" />
        </el-tab-pane>
        <el-tab-pane label="合约账户财务记录" name="first">
                <div class="filter-container">
                      <el-input size="mini" v-model="listQuerys.account" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilters"/>
                      <el-input v-model="listQuerys.superior " size="mini" placeholder="上级代理ID/用户名" style="width:150px;margin-left:20px" class="filter-item"  @keyup.enter.native="handleFilters"/>
                      <el-select size="mini" v-model="listQuerys.coin" placeholder="币种" clearable   style="width: 120px;margin-left:20px;margin-top:10px;" class="filter-item">
                        <el-option v-for="(item,index) in coinOptions" :key="index" :label="item.Currency_name" :value="item.key" />
                      </el-select>
                        <el-select size="mini" v-model="listQuerys.order_type" placeholder="订单类型" clearable   style="width:120px;margin-left:20px;" class="filter-item">
                        <el-option v-for="(item,index) in orderTypeOption" :key="index" :label="item.position_type_name" :value="item.key" />
                      </el-select>
                      <span style="margin-left:20px;font-size:12px;">成交时间</span>
                      <el-date-picker
                      style="width:220px;margin-top:10px;"
                        v-model="listQuerys.trade_time"
                        size="mini"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="起始日期"
                        end-placeholder="结束日期"
                         value-format="timestamp"
                        >
                      </el-date-picker>
                    
                      <el-button  class="filter-item" size="mini" type="primary" @click="handleFilters">
                          搜索
                      </el-button>
                      <el-button class="filter-item" :loading="downloadLoadings" @click="handleDownloads" size="mini" type="success" >
                          导出
                      </el-button>
                  </div>

                  <el-table
                      v-loading="listLoadings"
                      :data="financiaLists"
                      border
                      fit
                      highlight-current-row
                      style="width: 100%;margin-top:30px;"
                      :header-cell-style="{'background':'#F0F8FF'}"
                      >
                <el-table-column label="UID" prop="uid"  align="center" min-width="60" >
                <!-- sortable="custom" :class-name="getSortClass('id')" -->
                  <template slot-scope="{row}">
                    <span>{{ row.user_id }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="用户名" align="center" min-width="90px">
                  <template slot-scope="{row}">
                    <span>{{row.account}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="上级代理ID" align="center" min-width="95px">
                  <template slot-scope="{row}">
                    <span>{{row.superior_uid}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="上级代理用户名" align="center" min-width="90px">
                  <template slot-scope="{row}">
                      <span>{{row.superior_account}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="币种" align="center" min-width="100px">
                  <template slot-scope="{row}">
                      <span>{{row.coin}}</span>
                      <!-- <span v-if="row.coin == 'USDT'">USDT</span>
                      <span v-else-if="row.coin == 'BTC'">BTC</span> -->
                  </template>
                </el-table-column>
                  <el-table-column label="金额" min-width="90px" align="center">
                      <template slot-scope="{row}">
                          <span>{{row.amount}}</span>
                      </template>
                </el-table-column>
                <el-table-column label="账户余额" min-width="90px" align="center">
                      <template slot-scope="{row}">
                          <span>{{row.available}}</span>
                      </template>
                </el-table-column>
                  <el-table-column label="冻结金额" min-width="90px" align="center">
                      <template slot-scope="{row}">
                          <span style="color:blue">{{row.frozen}}</span>
                      </template>
                </el-table-column>
                <el-table-column label="订单类型" align="center" min-width="100px">
                  <template slot-scope="{row}">
                      <span v-if="row.order_type == '1'">开仓手续费</span>
                      <span v-else-if="row.order_type == '2'">资金费用</span>
                      <span v-else-if="row.order_type == '4'">钱包账户划转到合约账户</span>
                      <span v-else-if="row.order_type == '8'">合约账户划转到钱包账户</span>
                      <span v-else-if="row.order_type == '16'">平仓盈亏</span>
                      <span v-else-if="row.order_type == '32'">平仓手续费</span>
                      <span v-else-if="row.order_type == '64'">模拟盘补充资产</span>
                      <span v-else-if="row.order_type == '128'">调整保证金</span>
                  </template>
                </el-table-column>
                <el-table-column label="时间" align="center" min-width="120px">
                  <template slot-scope="{row}">
                      <span>{{row.create_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                  </template>
                </el-table-column>
              
              </el-table>

            <pagina-tion  :total="totals" :page.sync="pages.size" :limit.sync="pages.count" @pagination="getLists" />
        </el-tab-pane>
      </el-tabs>
       



    </div>
</template>

<script>

import {financiaList,financiaExport,contractList,contractExport} from '@/api/fundQuery'

// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'

const coinOptions = [
    {key:'USDT',Currency_name:'USDT'},
     {key:'BTC',Currency_name:'BTC'}
]
  //钱包账户的订单类型
   const orderTypeOptions = [
      {key:0,position_type_name:'全部订单'},
      {key:1, position_type_name:'充币'},
      {key:2, position_type_name:'提币'},
       {key:4, position_type_name:'钱包账户划转到合约账户'},
      {key:8, position_type_name:'合约账户划转到钱包账户'},
      {key:16, position_type_name:'邀请佣金奖励'},
      {key:32, position_type_name:'代理佣金奖励'},
      {key:64, position_type_name:'法币入金'},
      {key:128, position_type_name:'空投奖励'},
    ]
    //合约账户的订单类型
   const orderTypeOption = [
      {key:0,position_type_name:'全部订单'},
      {key:1, position_type_name:'开仓手续费'},
      {key:2, position_type_name:'资金费用'},
       {key:4, position_type_name:'钱包账户转入到合约账户'},
      {key:8, position_type_name:'合约账户划转到钱包账户'},
      {key:16, position_type_name:'平仓盈亏'},
      {key:32, position_type_name:'平仓手续费'},
      {key:64, position_type_name:'模拟盘补充资产'},
      {key:128, position_type_name:'调整保证金'},
    ]
export default {
    name:'financialrecords',
 data () {
 return {
      activeName: 'second',
          //钱包账户表格下载
     downloadLoading:false,
      //合约账户表格下载
     downloadLoadings:false,
     coinOptions,
     orderTypeOptions,
     orderTypeOption,
    //钱包账户表格加载中效果
    listLoading:false,
     //合约账户表格加载中效果
    listLoadings:false,
    //钱包账户页数页码以及搜索
       listQuery: {
         superior:'',//上级代理ID/用户名
        account: '',//UID/手机/邮箱
        coin:'',//币种
        order_type:0,//交易类型 -1-不筛选 0: 市价单 1：计划单 2：止盈单 4：止损单 5：强平单
        trade_time:[],//成交时间 
      },
        page:{//分页参数
          size:1,//页码(从0开始)
          count:10//单页数据量(最大100)
        },
      //合约账户页数页码以及搜索
       listQuerys: {
         superior:'',//上级代理ID/用户名
        account: '',//UID/手机/邮箱
        coin:'',//币种
        order_type:0,//交易类型 -1-不筛选 0: 市价单 1：计划单 2：止盈单 4：止损单 5：强平单
        trade_time:[],//成交时间
      },
        pages:{//分页参数
          size:1,//页码(从0开始)
          count:10//单页数据量(最大100)
        },
      //钱包账户总数据接受
       financiaList:null,
        //合约账户总数据接受
       financiaLists:null,
       //钱包账户总条数
      total:0,
      //合约账户总条数
      totals:0,
    };
 },

 components: {},

 computed: {},

 mounted(){
     this.getList()
     this.getLists()
 },

 methods: {
      //  渲染table列表
       getList(){
        var that = this
        //开始有加载中效果
        that.listLoading = true
         let starttime = null,stoptime = null
            if (that.listQuery.trade_time) {
              if (that.listQuery.trade_time.length === 2) {
                starttime = that.listQuery.trade_time[0];
                stoptime = that.listQuery.trade_time[1];
              } else if (that.listQuery.trade_time.length === 1) {
                starttime = that.listQuery.trade_time[0];
              }
              // console.log(that.listQuery.register_time.length);
            } else {
              console.log("没有选择任何时间");
            }
        var data = {
            page:{
              page:that.page.size-1,
              count:that.page.count
            },
            account:that.listQuery.account,
            superior:that.listQuery.superior,
            coin:that.listQuery.coin,
            order_type:that.listQuery.order_type,
            trade_time:{
              start:starttime/1000,
              end:stoptime/1000
            }
        }
        financiaList({data}).then(response=>{
          if(response.ret == 0){
            that.financiaList = response.data.list
            if(that.page.size==1){
              that.total = response.data.total_count
            }

            //  console.log(that.financiaList)
            // 过了1.5秒就关闭
               setTimeout(() => {
                    this.listLoading = false
                    }, 1.5 * 1000)
               
          }else{
            that.$message.error('数据未请求到!!')
          }
        })
    },
    getLists(){
        var that = this
        //开始有加载中效果
        that.listLoadings = true
        let starttime = null,stoptime = null
            if (that.listQuerys.trade_time) {
              if (that.listQuerys.trade_time.length === 2) {
                starttime = that.listQuerys.trade_time[0];
                stoptime = that.listQuerys.trade_time[1];
              } else if (that.listQuerys.trade_time.length === 1) {
                starttime = that.listQuerys.trade_time[0];
              }
              // console.log(that.listQuery.register_time.length);
            } else {
              console.log("没有选择任何时间");
            }
        var data = {
            page:{
              page:that.pages.size-1,
              count:that.pages.count
            },
            account:that.listQuerys.account,
            superior:that.listQuerys.superior,
            coin:that.listQuerys.coin,
            order_type:that.listQuerys.order_type,
            trade_time:{
              start:starttime/1000,
              end:stoptime/1000
            }
        }
        contractList({data}).then(response=>{
          if(response.ret == 0){
            that.financiaLists = response.data.list
            if(that.pages.size==1){
              that.totals = response.data.total_count
            }
            //  console.log(that.financiaLists)
            // 过了1.5秒就关闭
               setTimeout(() => {
                    this.listLoadings = false
                    }, 1.5 * 1000)
               
          }else{
            that.$message.error('数据未请求到!!')
          }
        })
    },
       // 搜索事件
     handleFilter() {
       this.getList()
    },
        // 搜索事件
     handleFilters() {
        this.getLists()
    },
        //表格导出功能
       handleDownload() {
        var that = this
          that.downloadLoading = true
          let starttime = 0,stoptime = 0
                if (that.listQuery.trade_time) {
                  if (that.listQuery.trade_time.length === 2) {
                    starttime = that.listQuery.trade_time[0];
                    stoptime = that.listQuery.trade_time[1];
                  } else if (that.listQuery.trade_time.length === 1) {
                    starttime = that.listQuery.trade_time[0];
                  }
                  // console.log(that.listQuery.register_time.length);
                } else {
                  console.log("没有选择任何时间");
                }
                var data = {
                    account:that.listQuery.account,
                    superior:that.listQuery.superior,
                    coin:that.listQuery.coin,
                    order_type:that.listQuery.order_type,
                    trade_time:{
                      start:starttime/1000,
                      end:stoptime/1000
                    }
                }
      financiaExport({data}).then(res=>{
          console.log(res)
          if(res.ret == 0){
             open(res.data.download_url,"");
             this.downloadLoading = false
          }else if(res.ret==-10007){
             that.$message.error('未找到数据')
             that.downloadLoading = false
          }
          else{
             that.$message.error('最多导出3周数据')
             that.downloadLoading = false
          }
        })

    },
        //表格导出功能
       handleDownloads() {
         var that = this
          that.downloadLoading = true
          let starttime = 0,stoptime = 0
                if (that.listQuerys.trade_time) {
                  if (that.listQuerys.trade_time.length === 2) {
                    starttime = that.listQuerys.trade_time[0];
                    stoptime = that.listQuerys.trade_time[1];
                  } else if (that.listQuerys.trade_time.length === 1) {
                    starttime = that.listQuerys.trade_time[0];
                  }
                  // console.log(that.listQuery.register_time.length);
                } else {
                  console.log("没有选择任何时间");
                }
                var data = {
                    account:that.listQuerys.account,
                    superior:that.listQuerys.superior,
                    coin:that.listQuerys.coin,
                    order_type:that.listQuerys.order_type,
                    trade_time:{
                      start:starttime/1000,
                      end:stoptime/1000
                    }
                }
      contractExport({data}).then(res=>{
          console.log(res)
          if(res.ret == 0){
             open(res.data.download_url,"");
             this.downloadLoading = false
          }else if(res.ret==-10007){
             that.$message.error('未找到数据')
             that.downloadLoading = false
          }
          else{
             that.$message.error('最多导出3周数据')
             that.downloadLoading = false
          }
        })

    },
 
 }
}

</script>
<style lang="scss" scoped>

</style>