<template>
    <div class="rebate-container">
       <div class="filter-container">
            <el-input size="mini" v-model="listQuery.account" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
                <el-input v-model="listQuery.superior " size="mini" placeholder="上级代理ID/用户名" style="width:150px;margin-left:20px" class="filter-item"  @keyup.enter.native="handleFilter"/>
              <el-select size="mini" v-model="listQuery.state" placeholder="状态" clearable   style="width: 120px;margin-left:20px;" class="filter-item">
              <el-option v-for="(item,index) in stateOptions" :key="index" :label="item.order_type_name" :value="item.key" />
             </el-select>
             <span style="margin-left:20px;font-size:12px;">统计时间</span>
            <el-date-picker
            style="width:220px;margin-top:10px;"
              v-model="listQuery.count_time"
              size="mini"
              type="daterange"
              range-separator="-"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              >
            </el-date-picker>
             <span style="margin-left:20px;font-size:12px;">发放时间</span>
            <el-date-picker
            style="width:220px;margin-top:10px;"
              v-model="listQuery.grant_time"
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
            :data="rebateList"
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
         <el-table-column label="用户交易金额" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.trade_amount}}</span>
            </template>
      </el-table-column>
       <el-table-column label="用户手续费" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.trade_commission}}</span>
            </template>
      </el-table-column>
        <el-table-column label="返佣金额" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.rebate_amount}}</span>
            </template>
      </el-table-column>
        <el-table-column label="返佣期限" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.rebate_interval}}</span><span>天</span>
            </template>
      </el-table-column>
      <el-table-column label="状态" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span v-if="row.state == '1'">待发放</span>
            <span v-else-if="row.state == '2'">已发放</span>
        </template>
      </el-table-column>
      <el-table-column label="统计时间" align="center" min-width="120px">
        <template slot-scope="{row}">
            <span>{{row.count_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="发放时间" align="center" min-width="120px">
        <template slot-scope="{row}">
            <span v-if="row.grant_time=='0'">-</span>
            <span v-else>{{row.grant_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作" align="center" min-width="120px">
        <template slot-scope="{row}">
           <el-button size="mini" @click="DetailClick(row)">查看</el-button>
        </template>
      </el-table-column>
     
    </el-table>

 
       
<pagina-tion :total="total" :page.sync="page.size" :limit.sync="page.count" @pagination="getList" />


    </div>
</template>

<script>
// import Page from '@/components/Pagination'

import {rebateList,rebateExport} from '@/api/rebateQuery'

// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'

const CurrencyOptions = [
    {key:'USBT',Currency_name:'USBT'},
     {key:'PT',Currency_name:'普通'}
]
const stateOptions = [
     {key:0,order_type_name:'全部状态'},
     {key:1,order_type_name:'待发放'},
     {key:2,order_type_name:'已发放'}
]
export default {
    name:'rebatelist',
      // components: { Page:Page },
 data () {
 return {
 
      //表格下载
     downloadLoading:false,
     stateOptions,
     CurrencyOptions,
    //表格加载中效果
    listLoading:false,
     //页数页码以及搜索
       listQuery: {
         superior:'',
        account: '',//UID/手机/邮箱
        state:0,//发放状态 1-待发放 2-已发放
        count_time:[],//统计时间
        grant_time:[],//发放时间
      },
       page:{//分页参数
          size:1,//页码(从0开始)
          count:10//单页数据量(最大100)
        },
      rebateList:null,
      total:0,
    };
 },

 components: {},

 computed: {},

 mounted(){
     this.getList();
 },

 methods: {
 
        //  渲染table列表
       getList(){
        var that = this
        //开始有加载中效果
        that.listLoading = true
         let starttime = null,stoptime = null
            if (that.listQuery.count_time) {
              if (that.listQuery.count_time.length === 2) {
                starttime = that.listQuery.count_time[0];
                stoptime = that.listQuery.count_time[1];
              } else if (that.listQuery.count_time.length === 1) {
                starttime = that.listQuery.count_time[0];
              }
              // console.log(that.listQuery.register_time.length);
            } else {
              console.log("没有选择任何时间");
            }
             let starttimes = null,stoptimes = null
              if (that.listQuery.grant_time) {
                if (that.listQuery.grant_time.length === 2) {
                  starttimes = that.listQuery.grant_time[0];
                  stoptimes = that.listQuery.grant_time[1];
                } else if (that.listQuery.grant_time.length === 1) {
                  starttimes = that.listQuery.grant_time[0];
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
            state:that.listQuery.state,
            count_time:{
              start:starttime/1000,
              end:stoptime/1000
            },
            grant_time:{
              start:starttimes/1000,
              end:stoptimes/1000
            }
        }
        rebateList({data}).then(response=>{
          if(response.ret == 0){
             that.rebateList = response.data.list
             if(that.page.size==1){
               that.total = response.data.total_count
             }
             
            //  console.log(that.rebateList)
            // 过了1.5秒就关闭
               setTimeout(() => {
                    this.listLoading = false
                    }, 1.5 * 1000)
               
          }else{
            that.$message.error('数据未请求到!!')
          }
       }) 
    },
    //跳转详情页
    DetailClick(row){
        console.log(row)
        this.$router.push({
            path:'/rebateQuery/rebateListDetail',
            query:{row}
        })
    },
        // 搜索事件
     handleFilter() {
       this.getList()
    },
        //表格导出功能
    handleDownload() {
         var that = this
        //开始有加载中效果
         this.downloadLoading = true
         let starttime = null,stoptime = null
            if (that.listQuery.count_time) {
              if (that.listQuery.count_time.length === 2) {
                starttime = that.listQuery.count_time[0];
                stoptime = that.listQuery.count_time[1];
              } else if (that.listQuery.count_time.length === 1) {
                starttime = that.listQuery.count_time[0];
              }
              // console.log(that.listQuery.register_time.length);
            } else {
              console.log("没有选择任何时间");
            }
             let starttimes = null,stoptimes = null
              if (that.listQuery.grant_time) {
                if (that.listQuery.grant_time.length === 2) {
                  starttimes = that.listQuery.grant_time[0];
                  stoptimes = that.listQuery.grant_time[1];
                } else if (that.listQuery.grant_time.length === 1) {
                  starttimes = that.listQuery.grant_time[0];
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
            state:that.listQuery.state,
            count_time:{
              start:starttime/1000,
              end:stoptime/1000
            },
            grant_time:{
              start:starttimes/1000,
              end:stoptimes/1000
            }
        }
     
       rebateExport({data}).then(res=>{
          // console.log(res)
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