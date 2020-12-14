<template>
    <div class="gold-container">
        <div class="filter-container">
            <el-input size="mini" v-model="listQuery.account" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
                <el-input v-model="listQuery.superior " size="mini" placeholder="上级代理ID/用户名" style="width:150px;margin-left:20px" class="filter-item"  @keyup.enter.native="handleFilter"/>
                 <el-select size="mini" v-model="listQuery.coin" placeholder="币种" clearable   style="width: 120px;margin-left:20px;margin-top:10px;" class="filter-item">
              <el-option v-for="(item,index) in coin" :key="index" :label="item.currency_name" :value="item.currency_name" />
             </el-select>
              <el-select size="mini" v-model="listQuery.order_type" placeholder="订单类型"   style="width: 120px;margin-left:20px;" class="filter-item">
              <el-option v-for="(item,index) in orderTypeOptions" :key="index" :label="item.position_type_name" :value="item.key" />
             </el-select>
             <span style="margin-left:20px;font-size:12px;">成交时间</span>
            <el-date-picker
            style="width:220px;margin-top:10px;"
              v-model="filterTime"
              size="mini"
              type="daterange"
              range-separator="-"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              @change='filterTimeTransform'
              >
            </el-date-picker>
            <el-button  class="filter-item" size="mini" style="margin-left:10px;" type="primary" @click="handleFilter">
                搜索
            </el-button>
            <el-button class="filter-item" :loading="downloadLoading" @click="handleDownload" size="mini" type="success" >
                导出
            </el-button>
        </div>
          <el-table
            v-loading="listLoading"
            :data="goldList"
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
      <el-table-column label="币种" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.coin}}</span>
        </template>
      </el-table-column>
         <el-table-column label="金额" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.amount}}</span>
            </template>
      </el-table-column>
       <el-table-column label="总账户权益" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.total_rights}}</span>
            </template>
      </el-table-column>
      <el-table-column label="订单类型" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span v-if="row.order_type == '1'">充币</span>
            <span v-else-if="row.order_type == '2'">提币</span>
            <span v-else-if="row.order_type == '64'">法币入金</span>
        </template>
      </el-table-column>
      <el-table-column label="成交时间" align="center" min-width="120px">
        <template slot-scope="{row}">
            <span>{{row.trade_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
    </el-table>
      <pagina-tion :total="total" :page.sync="page.size" :limit.sync="page.count" @pagination="getList" /> 
    </div>
</template>
<script>
import {goldList , goldExport} from '@/api/fundQuery'
// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'
import { start } from 'nprogress'
import Cookies from 'js-cookie'
   const orderTypeOptions = [
      {key:0,position_type_name:'全部订单'},
      {key:1, position_type_name:'充币'},
      {key:2, position_type_name:'提币'},
      {key:64, position_type_name:'法币入金'},
    ]
export default {
    name:'goldquery',
 data () {
  return {
        //表格下载
      downloadLoading:false,
      orderTypeOptions,
        //表格加载中效果
          listLoading:false,
      //页数页码以及搜索
        listQuery: {
          account: '',//UID/手机/邮箱
          superior:'',
          coin:'',//币种
          order_type:0,//交易类型 -1-不筛选 0: 市价单 1：计划单 2：止盈单 4：止损单 5：强平单
          trade_time:{
            start:undefined,
            end:undefined
          },//成交时间
        },
        page:{//分页参数
            size:1,//页码(从0开始)
            count:10//单页数据量(最大100)
          },
        filterTime:[],
        goldList:null,
        total:0,
        coin:[]
      };
 },
 components: {},
 computed: {},
 mounted(){
     this.getList();
     this.coin = JSON.parse(Cookies.get('currency_list'))
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
            coin:that.listQuery.coin,
            order_type:that.listQuery.order_type,
            trade_time:{
              start:that.listQuery.trade_time.start,
              end:that.listQuery.trade_time.end
            }
        }
        goldList({data}).then(response=>{
          if(response.ret ==0){
               that.goldList = response.data.list
               if(that.page.size==1){
                  that.total = response.data.total_count
               }
                    this.listLoading = false
          }else{
             that.$message.error('数据未请求到!!')
          }
      })
    },
         // 搜索事件
     handleFilter() {
        this.getList()
    },
        //表格导出功能
       handleDownload() {
       var that = this
        that.downloadLoading = true
              var data = {
                  account:that.listQuery.account,
                  superior:that.listQuery.superior,
                  coin:that.listQuery.coin,
                  order_type:this.listQuery.order_type,
                  trade_time:{
                    start:that.listQuery.trade_time.start,
                    end:that.listQuery.trade_time.end
                  }
              }
        goldExport({data}).then(res=>{
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
     filterTimeTransform(val) {
      this.listQuery.trade_time.start = val && val[0]/1000 || undefined
      this.listQuery.trade_time.end= val && (val[1]+86399000)/1000 || undefined;
    },
 }
}
</script>
<style lang="scss" scoped>

</style>