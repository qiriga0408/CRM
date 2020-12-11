<template>
    <div class="gold-container">
        <div class="filter-container">
            <el-input size="mini" v-model="listQuery.account" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
                <el-input v-model="listQuery.superior " size="mini" placeholder="上级代理ID/用户名" style="width:150px;margin-left:20px" class="filter-item"  @keyup.enter.native="handleFilter"/>
                 <el-select size="mini" v-model="listQuery.coin" placeholder="币种" clearable   style="width: 120px;margin-left:20px;margin-top:10px;" class="filter-item">
              <el-option v-for="(item,index) in coinOptions" :key="index" :label="item.Currency_name" :value="item.key" />
             </el-select>
              <el-select size="mini" v-model="listQuery.order_type" placeholder="订单类型" clearable   style="width: 120px;margin-left:20px;" class="filter-item">
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
            :data="goldList"
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

const coinOptions = [
    {key:'USDT',Currency_name:'USDT'},
     {key:'BTC',Currency_name:'BTC'}
]
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
     coinOptions,
     orderTypeOptions,
       //表格加载中效果
        listLoading:false,
     //页数页码以及搜索
       listQuery: {
        account: '',//UID/手机/邮箱
        superior:'',
        coin:'',//币种
        order_type:0,//交易类型 -1-不筛选 0: 市价单 1：计划单 2：止盈单 4：止损单 5：强平单
        trade_time:[],//成交时间
        
      },
       page:{//分页参数
          size:1,//页码(从0开始)
          count:10//单页数据量(最大100)
        },
      goldList:null,
      total:0,
      newList:[]
    };
 },

 components: {},

 computed: {},

 mounted(){
     this.getList();
 },

 methods: {
    //监听页数改变的事件
      handleSizeChange(newSize){
        //   console.log(newSize)
          this.listQuery.page.count+=newSize
          this.getList();
      },
      //监听页码值改变的事件
      handleCurrentChange(newPage){
          this.listQuery.page._page=newPage
          this.getList();
        //   console.log(newPage)
      },
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
        goldList({data}).then(response=>{
          if(response.ret ==0){
               that.goldList = response.data.list
               if(that.page.size==1){
                  that.total = response.data.total_count
               }
              
              // console.log(that.goldList)
            // 过了1.5秒就关闭
               setTimeout(() => {
                    this.listLoading = false
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
                  order_type:this.listQuery.order_type,
                  trade_time:{
                    start:starttime/1000,
                    end:stoptime/1000
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
 }
}

</script>
<style lang="scss" scoped>

</style>