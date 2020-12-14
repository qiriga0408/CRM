<template>
 <div class="rebatelistdetail">
     <table>
      <tr>
        <th>UID</th>
        <th>用户名</th>
        <th>用户交易金额</th>
        <th>返佣金额</th>
        <th>状态</th>
        <th>统计时间</th>
        <th>发放时间</th>
      </tr>
      <tr>
        <td>{{rebateList.user_id}}</td>
        <td>{{rebateList.account}}</td>
        <td>{{rebateList.trade_amount}}</td>
        <td>{{rebateList.rebate_amount}}</td>
        <td>
           <span v-if="rebateList.state == '1'">待发放</span>
           <span v-else-if="rebateList.state == '2'">已发放</span>
        </td>
        <td>{{rebateList.count_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</td>
        <td>
          <span v-if="rebateList.grant_time == '0'">-</span>
          <span v-else>{{rebateList.grant_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </td>
      </tr>
      
    </table>

     <div class="filter-container">
            <el-input size="mini" v-model="listQuery.account" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
            <el-input v-model="listQuery.superior" size="mini" placeholder="上级代理ID/用户名" style="width:160px;margin-left:20px" class="filter-item" @keyup.enter.native="handleFilter" />
           
            <el-button  class="filter-item" style="margin-left:10px;" size="mini" type="primary" @click="handleFilter">
                搜索
            </el-button>
            <el-button class="filter-item" :loading="downloadLoading" @click="handleDownload" size="mini" type="success" >
                导出
            </el-button>
        </div>
        <el-table
            v-loading="listLoading"
            :data="rebateDetailList"
            border
            fit
            highlight-current-row
            style="width: 100%;margin-top:30px;"
            :header-cell-style="{'background':'#F0F8FF'}"
            >
      <el-table-column label="交易者UID"  align="center" min-width="90px" >
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
      <el-table-column label="交易金额" align="center" min-width="95px">
        <template slot-scope="{row}">
          <span>{{row.trade_amount}}</span> 
        </template>
      </el-table-column>
      <el-table-column label="手续费" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.trade_commission}}</span> 
        </template>
      </el-table-column>
       <el-table-column label="返佣比例" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.rebate_rate}}%</span>
        </template>
      </el-table-column>
       <el-table-column label="返佣金额" align="center" min-width="100px">
        <template slot-scope="{row}">
           <span>{{row.rebate_amount}}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作" align="center" min-width="120px">
        <template slot-scope="{row}">
           <el-button size="mini" @click="viewClick(row.user_id)">查看</el-button>
        </template>
      </el-table-column> 
    </el-table> 
    <pagina-tion :total="total" :page.sync="page.size" :limit.sync="page.count" @pagination="rebatelistDetail" />
    <el-dialog
      v-dialogDrag
      :visible.sync="viewDialogVisible"
      width="65%"
      >
        <el-table
            v-loading="viewlistLoading"
            :data="viewList"
            border
            fit
            highlight-current-row
            style="width: 100%;margin-top:30px;"
            :header-cell-style="{'background':'#F0F8FF'}"
            >
      <el-table-column label="成交编号" prop="trade_id"  align="center" min-width="120" >
        <template slot-scope="{row}">
          <span>{{ row.trade_id }}</span> 
        </template>
      </el-table-column>
      <el-table-column label="合约" align="center" min-width="90px">
        <template slot-scope="{row}">
          <span>{{row.contract_code}}</span>  
        </template>
      </el-table-column>
       <el-table-column label="仓位类型" align="center" min-width="95px">
        <template slot-scope="{row}">
          <span v-if="row.account_type == '0'">-</span> 
          <span v-else-if="row.account_type == '1'">全仓</span>
          <span v-else-if="row.account_type == '2'">逐仓</span>
        </template>
      </el-table-column>
      <el-table-column label="杠杆" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.lever}}</span> 
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center" min-width="95px">
        <template slot-scope="{row}">
          <span>{{row.volume}}张</span><span>/{{row.amount}}{{row.base_name}}</span>
        </template>
      </el-table-column>
       <el-table-column label="成交价" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.price}}</span>
        </template>
      </el-table-column>
       <el-table-column label="手续费" align="center" min-width="100px">
        <template slot-scope="{row}">
           <span>{{row.commission}}</span>
        </template>
      </el-table-column>
       <el-table-column label="交易类型" align="center" min-width="120px">
        <template slot-scope="{row}">
            <span v-if="row.order_type=='0'">市价单</span>
            <span v-else-if="row.order_type=='1'">计划单</span>
            <span v-else-if="row.order_type=='2'">止盈单</span>
            <span v-else-if="row.order_type=='4'">止损单</span>
            <span v-else-if="row.order_type=='5'">强平单</span>
        </template>
      </el-table-column> 
      <el-table-column label="成交时间" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span v-if="row.trade_time=='0'">-</span>
            <span v-else>{{row.trade_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span> 
        </template>
      </el-table-column>
    </el-table> 
    <pagina-tion :total="viewtotal" :page.sync="viewpage.size" :limit.sync="viewpage.count" @pagination="viewClicks" /> 
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
 </div>
</template>

<script>
import {rebateDetail,rebateDetailExport,rebateDetailView} from '@/api/rebateQuery'
// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'
const CurrencyOptions = [
    {key:'USBT',Currency_name:'USBT'},
     {key:'PT',Currency_name:'普通'}
]
const orderTypeOptions = [
     {key:'YKF',order_type_name:'已开放'},
     {key:'DKF',order_type_name:'待开放'}
]
export default {
    name:'rebatalistdetail',
 data (){
   return {
     listLoading:false,
        //表格下载
     downloadLoading:false,
     //接受详情数据
      rebateDetailList:null,
      //详情带进来的数据
      rebateList:null,
       //页数页码以及搜索
       listQuery: {
         grant_time:'',
        account: '',//UID/手机/邮箱
        superior:'',//币种         
      },
        page:{//分页参数
          size:0,//页码(从0开始)
          count:10//单页数据量(最大100)
        },
        id:'',
        total:0,
      //控制查看对话框
      viewDialogVisible:false,
      viewList:[],
      viewtotal:0,
      // viewPage:0,
      // viewCount:10,
      viewlistLoading:false,
      viewpage:{
        size:1,
        count:10
      },
      user_id:''
   };
 },

 components: {},

 computed: {},

 mounted(){
     this.rebateList = this.$route.query.row
     this.id = this.$route.query.row.id
     this.rebatelistDetail();
 },

 methods: {
     rebatelistDetail(){
       var that = this
       that.listLoading = true
      var data = {
        own_id:that.id,
        page:{
          page:that.page.size-1,
          count:that.page.count
        },
        account:that.listQuery.account,
        superior:that.listQuery.superior
      }
      rebateDetail({data}).then(res=>{
        if(res.ret==0){
          that.rebateDetailList = res.data.list
          if(that.page.size==1){
             that.total = res.data.total_count
          }
              that.listLoading = false
        }else{
          that.$message.error('数据未请求到!!')
        }
      })
    },
      // 搜索事件
     handleFilter() {
      this.rebatelistDetail()
    },
       //表格导出功能
    handleDownload() {
      this.downloadLoading = true
        var data = {
        own_id:this.id,
        page:{
          page:this.page.size-1,
          count:this.page.count
        },
        account:this.listQuery.account,
        superior:this.listQuery.superior
      }
       rebateDetailExport({data}).then(res=>{
          // console.log(res)
          if(res.ret == 0){
             open(res.data.download_url,"");
             this.downloadLoading = false
          }else if(res.ret== -10007){
            this.$message.error('未找到数据')
          }
          else{
             this.$message.error('导出失败')
          }
        })
    },
    //查看对话框
    viewClick(user_id){
      // console.log(user_id)
      this.user_id = user_id
      this.viewDialogVisible = true
      this.viewClicks()
    },
    viewClicks(){
      this.viewlistLoading = true
      var data = {
        own_id:this.id,
        user_id:this.user_id,
        page:{
          page:this.viewpage.size-1,
          count:this.viewpage.count
        }
      }
      rebateDetailView({data}).then(res=>{
          if(res.ret==0){
          this.viewList = res.data.list
          if(this.viewpage.size==1){
            this.viewtotal = res.data.total_count
          }
             this.viewlistLoading = false
        }else{
          this.$message.error('数据未请求到!!')
        }
      })
    }
 }
}

</script>
<style lang="scss" scoped>
  table {
      width: 95%;
      border: 1px solid #c0c4cc;
      border-collapse: collapse;
      margin-bottom: 15px;
      font-size: 14px;
      margin:  20px auto;
      background: #f7f9fc;
      tr {
        width: 100%;
        text-align: center;
        height: 50px;
        th {
          width: 10%;
          border: 1px solid #c0c4cc;
          font-size: 16px;
          height: 40px;
        }
        td {
          width: 10%;
          border: 1px solid #c0c4cc;
        }
      }
     
    }
</style>