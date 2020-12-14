<template>
    <div class="rebate-container">
       <div class="filter-container">
            <el-input size="mini" v-model="listQuery.account" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
                <el-input v-model="listQuery.superior " size="mini" placeholder="上级代理ID/用户名" style="width:150px;margin-left:20px" class="filter-item"  @keyup.enter.native="handleFilter"/>
              <el-select size="mini" v-model="listQuery.state" placeholder="状态"   style="width: 120px;margin-left:20px;" class="filter-item">
              <el-option v-for="(item,index) in stateOptions" :key="index" :label="item.order_type_name" :value="item.key" />
             </el-select>
             <span style="margin-left:20px;font-size:12px;">统计时间</span>
            <el-date-picker
            style="width:220px;margin-top:10px;"
              v-model="filterTime1"
              size="mini"
              type="daterange"
              range-separator="-"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              @change='filterTimeTransform1'
              >
            </el-date-picker>
             <span style="margin-left:20px;font-size:12px;">发放时间</span>
            <el-date-picker
            style="width:220px;margin-top:10px;"
              v-model="filterTime2"
              size="mini"
              type="daterange"
              range-separator="-"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              @change='filterTimeTransform2'
              >
            </el-date-picker>
            <el-button  class="filter-item" style="margin-left:10px;" size="mini" type="primary" @click="handleFilter">
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
            count_time:{
              start:undefined,
              end:undefined
            },//统计时间
            grant_time:{
              start:undefined,
              end:undefined
            },//发放时间
          },
          filterTime1:[],
          filterTime2:[],
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
        var data = {
            page:{
              page:that.page.size-1,
              count:that.page.count
            },
            account:that.listQuery.account,
            superior:that.listQuery.superior,
            state:that.listQuery.state,
            count_time:{
              start:that.listQuery.count_time.start,
              end:that.listQuery.count_time.end
            },
            grant_time:{
              start:that.listQuery.grant_time.start,
              end:that.listQuery.grant_time.end
            }
        }
        rebateList({data}).then(response=>{
          if(response.ret == 0){
             that.rebateList = response.data.list
             if(that.page.size==1){
               that.total = response.data.total_count
             }
                this.listLoading = false
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
        var data = {
            page:{
              page:that.page.size-1,
              count:that.page.count
            },
            account:that.listQuery.account,
            superior:that.listQuery.superior,
            state:that.listQuery.state,
            count_time:{
              start:that.listQuery.count_time.start,
              end:that.listQuery.count_time.end,
            },
            grant_time:{
              start:that.listQuery.grant_time.start,
              end:that.listQuery.grant_time.end,
            }
        }
     
       rebateExport({data}).then(res=>{
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
         filterTimeTransform1(val) {
            this.listQuery.count_time.start = val && val[0]/1000 || undefined
            this.listQuery.count_time.end= val && (val[1]+86399000)/1000 || undefined;
          },
            filterTimeTransform2(val) {
              console.log(val)
            this.listQuery.grant_time.start = val && val[0]/1000 || undefined
            this.listQuery.grant_time.end = val && (val[1]+86399000)/1000 || undefined;
          },
    
 }
}

</script>
<style lang="scss" scoped>

</style>