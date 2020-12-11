<template>
    <div class="open-cantainer">
            <div class="filter-container">
             <el-input size="mini" v-model="listQuery.account" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
             <el-input v-model="listQuery.trade_id" size="mini" placeholder="交易编号" style="width:130px;margin-left:20px" class="filter-item" @keyup.enter.native="handleFilter" />
              <el-input v-model="listQuery.superior " size="mini" placeholder="上级代理ID/用户名" style="width:150px;margin-left:20px;margin-top:10px;" class="filter-item"  @keyup.enter.native="handleFilter"/>
          <!--  -->
         <!-- <div class="block"> -->
            <el-select size="mini" v-model="listQuery.contract_code" placeholder="合约" clearable   style="width: 120px;margin-left:20px;" class="filter-item">
              <el-option v-for="(item,index) in contractCodeOptions" :key="index" :label="item.contract_type_name" :value="item.key" />
            </el-select>
             <el-select size="mini" v-model="listQuery.account_type" placeholder="仓位类型" clearable   style="width: 120px;margin-left:20px;margin-top:10px;" class="filter-item">
              <el-option v-for="(item,index) in accountTypeOptions" :key="index" :label="item.position_type_name" :value="item.key" />
             </el-select>
             <el-select size="mini" v-model="listQuery.side" placeholder="方向" clearable   style="width: 120px;margin-left:20px;margin-top:10px;" class="filter-item">
              <el-option v-for="(item,index) in sideOptions" :key="index" :label="item.position_type_name" :value="item.key" />
             </el-select>
              <el-select size="mini" v-model="listQuery.order_type" placeholder="交易类型" clearable   style="width: 120px;margin-left:20px;" class="filter-item">
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
         
           <el-button  class="filter-item" size="mini" type="primary"  @click="handleFilter">
            搜索
        </el-button>
        <el-button class="filter-item" :loading="downloadLoading" @click="handleDownload" size="mini" type="success" >
            导出
        </el-button>
        </div>

         <el-table
            v-loading="listLoading"
            :data="openList"
            border
            fit
            highlight-current-row
            style="width: 100%;margin-top:20px;"
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
      <el-table-column label="交易编号" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.trade_id}}</span>
        </template>
      </el-table-column>
         <el-table-column label="合约" min-width="90px" align="center">
            <template slot-scope="{row}">
              <!-- <span v-if="row.contract_code == 'BTCUSDT'">BTCUSDT</span> -->
              <span>{{row.contract_code}}</span>
            </template>
      </el-table-column>
      <el-table-column label="仓位类型" min-width="90px" align="center">
            <template slot-scope="{row}">
            <span v-if="row.account_type == '1'">全仓</span>
            <span v-else-if="row.account_type == '2'">逐仓</span>
            </template>
      </el-table-column>
      <el-table-column label="方向" min-width="90px" align="center">
            <template slot-scope="{row}">
            <span v-if="row.side == 'B'">做多</span>
            <span v-else-if="row.side == 'S'">做空</span>
            </template>
      </el-table-column>
      <el-table-column label="杠杆" align="center" min-width="60px">
        <template slot-scope="{row}">
            <span>{{row.lever}}</span>
        </template>
      </el-table-column>
      <el-table-column label="张数" align="center" min-width="60px">
        <template slot-scope="{row}">
            <span>{{row.volume}}</span>
        </template>
      </el-table-column>
      <el-table-column label="委托时间" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.create_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="委托价格" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手续费" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.commission}}</span>
        </template>
      </el-table-column>
       <el-table-column label="交易类型" min-width="90px" align="center">
            <template slot-scope="{row}">
                <span v-if="row.order_type == '0'">市价单</span>
                <span v-else-if="row.order_type == '1'">计划单</span>
                <span v-else-if="row.order_type == '2'">止盈单</span>
                <span v-else-if="row.order_type == '4'">止损单</span>
                <span v-else-if="row.order_type == '5'">强平单</span>
            </template>
      </el-table-column>
      
       <el-table-column label="IP地址" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.ip_address}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.trade_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
    </el-table>

   <pagina-tion  :total="total" :page.sync="page.size" :limit.sync="page.count" @pagination="getList" />


    </div>
</template>

<script>

//封装的api
import {openList,openExport} from '@/api/transactionQuery'
// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'

 const contractCodeOptions = [
       {key:'BTCUSDT',contract_type_name:'BTCUSDT'},
       {key:'ETHUSDT',contract_type_name:'ETHUSDT'},
    ]

    const accountTypeOptions = [
        {key:0, position_type_name:'全部仓位类型'},
        {key:1, position_type_name:'全仓'},
        {key:2, position_type_name:'逐仓'}
    ]
    const sideOptions = [
       {key:'B', position_type_name:'做多'},
       {key:'S', position_type_name:'做空'}
    ]
    const orderTypeOptions = [
      {key:-1, position_type_name:'全部交易类型'},
      {key:0, position_type_name:'市价单'},
      {key:1, position_type_name:'计划单'},
       {key:2, position_type_name:'止盈单'},
      {key:4, position_type_name:'止损单'},
       {key:5, position_type_name:'强平单'},
    ]

export default {
    name:'openquery',
 data () {
 return {
      //导出加载中效果
      downloadLoading:false,
      //合约类型
     contractCodeOptions,
     //仓位类型
     accountTypeOptions,
    //  方向
    sideOptions,
     //交易类型
     orderTypeOptions,
   //页数页码以及搜索
       listQuery: {
        acccount: '',//UID/手机/邮箱
        trade_id:'',//交易编号
        contract_code:'',//合约代码
        superior:'',//上级代理ID/用户名
        side:'',//多空方向 B-做多 S-做空
        account_type:0,//仓位类型 0-不筛选 1-全仓 2-逐仓
        order_type:-1,//交易类型 -1-不筛选 0: 市价单 1：计划单 2：止盈单 4：止损单 5：强平单
        trade_time:[],//成交时间
      },
          page:{//分页参数
          size:1,//页码(从0开始)
          count:10//单页数据量(最大100)
        },
         //表格加载中效果
      listLoading:false,
      //table表格总数据
      openList:null,
      //总条数，默认为0
      total:0,
      newList:[]
    };
 },

 components: {},

 computed: {},

 mounted(){
      this.getList()
      // console.log(this.listQuery.trade_time)
 },

 methods: {
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
            account:this.listQuery.account,
            trade_id:this.listQuery.trade_id,
            superior:this.listQuery.superior,
            contract_code:this.listQuery.contract_code,
            side:this.listQuery.side,
            account_type:this.listQuery.account_type,
            order_type:this.listQuery.order_type,
            trade_time:{
              start:starttime/1000,
              end:stoptime/1000
            }
        }
        openList({data}).then(response=>{
          if(response.ret == 0){
               that.openList = response.data.list
               if(that.page.size==1){
                  that.total = response.data.total_count
               }
              
              // console.log(that.openList)
              setTimeout(() => {
              // 过了1.5秒就关闭
              that.listLoading = false
              }, 1500);
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
                  trade_id:that.listQuery.trade_id,
                  superior:that.listQuery.superior,
                  contract_code:that.listQuery.contract_code,
                  side:that.listQuery.side,
                  account_type:that.listQuery.account_type,
                  order_type:that.listQuery.order_type,
                  trade_time:{
                    start:starttime/1000,
                    end:stoptime/1000
                  }
              }
        openExport({data}).then(res=>{
          console.log(res)
          if(res.ret == 0){
             open(res.data.download_url,"");
             this.downloadLoading = false
          } else if(res.ret == -10007){
              that.$message.error('未找到数据')
              this.downloadLoading = false
          }
          else{
             that.$message.error('最多导出3周数据')
             this.downloadLoading = false
          }
        })
    },

 }
}

</script>
<style lang="scss" scoped>

</style>