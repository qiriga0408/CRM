<template>
    <div class="hold-cantainer">
        <div class="filter-container">
             <el-input size="mini" v-model="listQuery.account" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
         <el-input v-model="listQuery.superior" size="mini" placeholder="上级代理ID/用户名" style="width:150px;margin-left:20px" class="filter-item" @keyup.enter.native="handleFilter" />
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
         
          <el-button  class="filter-item" size="mini" type="primary"  @click="handleFilter">
           <!-- @click="handleFilter" -->
            搜索
        </el-button>
        <el-button class="filter-item" :loading="downloadLoading" @click="handleDownload" size="mini" type="success" >
            导出
        </el-button>
        </div>


         <el-table
      v-loading="listLoading"
      :data="holdList"
      border
      fit
      highlight-current-row
      style="width: 100%; margin-top:20px;"
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
      <el-table-column label="上级用户id" align="center" min-width="95px">
        <template slot-scope="{row}">
          <span>{{row.superior_uid}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级用户名" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.superior_account}}</span>
        </template>
      </el-table-column>
         <el-table-column label="合约" min-width="90px" align="center">
            <template slot-scope="{row}">
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
      <el-table-column label="开仓均价" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手续费" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.commission}}</span>
        </template>
      </el-table-column>
      <el-table-column label="强平价格" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.force_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="止盈价" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span v-if="row.limit == '0'">-</span>
            <span v-else>{{row.limit}}</span>
        </template>
      </el-table-column>
      <el-table-column label="止损价" align="center" min-width="90px">
        <template slot-scope="{row}">
             <span v-if="row.stop == '0'">-</span>
            <span v-else>{{row.limit}}</span>
        </template>
      </el-table-column>
       <el-table-column label="浮动盈亏" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.float}}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagina-tion  :total="total" :page.sync="page.size" :limit.sync="page.count" @pagination="getList" />



    </div>
</template>

<script>
// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'
//引入的自定义指令
import waves from '@/directive/waves'
//引入封装接口
import {holdList,holdExport} from '@/api/transactionQuery'

    const contractCodeOptions = [
        {key:'BTCUSDT',contract_type_name:'BTCUSDT'},
        {key:'ETHUSDT',contract_type_name:'ETHUSDT'},
    ]

    const accountTypeOptions = [
        {key:0, position_type_name:'全部类型'},
        {key:1, position_type_name:'全仓'},
        {key:2, position_type_name:'逐仓'}
    ]
    const sideOptions = [
       {key:'B', position_type_name:'做多'},
       {key:'S', position_type_name:'做空'}
    ]

export default {
    name:'holdquery',
 data () {
 return {
     //导出加载中效果
      downloadLoading:false,
     //合约类型
     contractCodeOptions,
     //仓位类型
     accountTypeOptions,
     //方向
     sideOptions,
         //页数页码以及搜索
      listQuery: {
        //方向
        side:'',
          //仓位类型
        account_type:0,
        //合约
        contract_code:'',
         user_id:'',
        account: '',//UID/手机/邮箱
        user_type:'',//用户类型 0-不过滤 1-代理用户 2-直推用户
        superior:'',//上级代理ID/用户名
       
      },
        page:{//分页参数
          size:1,//页码(从0开始)
          count:10//单页数据量(最大100)
        },
      //表格加载中效果
      listLoading:false,
      //table表格总数据
      holdList:null,
      //总条数，默认为0
      total:0,
    };
 },

 components: {},

 computed: {},

 mounted(){
     this.getList()
 },

 methods: {
    //  请求表格数据
    getList(){
        var that = this
        //开始有加载中效果
        that.listLoading = true
        holdList(
          {
            data:{
              page:{
                  page:that.page.size-1,
                  count:that.page.count
                },
                account:this.listQuery.account,
                superior:this.listQuery.superior,
                contract_code:this.listQuery.contract_code,
                account_type:this.listQuery.account_type,
                side:this.listQuery.side
            }
      }
        ).then(response=>{
           if(response.ret == 0){
              that.holdList = response.data.list
              if(that.page.size==1){
                 that.total = response.data.total_count
              }
              setTimeout(() => {
              // 过了1.5秒就关闭
              that.listLoading = false
            }, 1500);
          }else{
          this.$message.error('请求不到数据');
          }
          console.log(that.holdList)
            
        })
    },
      // 搜索事件
     handleFilter(){
       this.getList()
    },
    //表格导出功能
       handleDownload() {
      this.downloadLoading = true
          var data = {
            account:this.listQuery.account,
            superior:this.listQuery.superior,
            contract_code:this.listQuery.contract_code,
            side:this.listQuery.side,
            account_type:this.listQuery.account_type
          }
          holdExport({data}).then(res=>{
              // console.log(res)
              //请求成功以后让他跳转下载页面
                 if(res.ret == 0){
                    open(res.data.download_url,"");
                     this.downloadLoading = false
                  }else{
                    this.$message.error('导出失败')
                  }
          })
       
      
    },
 
 }
}

</script>
<style lang="scss" scoped>
</style>