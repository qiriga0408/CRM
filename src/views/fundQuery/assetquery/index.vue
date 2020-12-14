<template>
    <div class="asset-container">
         <div class="filter-container">
              <el-input size="mini" v-model="listQuery.account" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
             <el-input v-model="listQuery.superior" size="mini" placeholder="上级代理ID/用户名" style="width:150px;margin-left:20px;margin-top:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
            <el-button  style="margin-top:10px;margin-left:10px;" class="filter-item" size="mini" type="primary" @click="handleFilter">
                搜索
            </el-button>
            <el-button style="margin-top:10px;" class="filter-item" :loading="downloadLoading" @click="handleDownload" size="mini" type="success" >
                导出
            </el-button>
          </div>
          <el-table
            v-loading="listLoading"
            :data="assetList"
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
      <el-table-column label="平仓次数" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.close_order_count}}</span>
        </template>
      </el-table-column>
         <el-table-column label="总入金" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.total_recharge}}</span>
            </template>
      </el-table-column>
      <el-table-column label="总出金" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.total_withdraw}}</span>
            </template>
      </el-table-column>
       <el-table-column label="净入金" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.net_recharge}}</span>
            </template>
      </el-table-column>
      <el-table-column label="可用" align="center" min-width="60px">
        <template slot-scope="{row}">
            <span>{{row.available}}</span>
        </template>
      </el-table-column>
      <el-table-column label="冻结保证金" align="center" min-width="80px">
        <template slot-scope="{row}">
            <span style="color:blue">{{row.frozen_margin}}</span>
        </template>
      </el-table-column>
       <el-table-column label="账户权益" min-width="90px" align="center">
            <template slot-scope="{row}">
                <span>{{row.account_rights}}</span> 
            </template>
      </el-table-column>
      <el-table-column label="手续费" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.commission}}</span>
        </template>
      </el-table-column>
       <el-table-column label="浮动PNL" align="center" min-width="90px" v-if="pnl_per==true">
        <template slot-scope="{row}">
            <span>{{row.float_pnl}}</span>
        </template>
      </el-table-column>
       <el-table-column label="平仓PNL" align="center" min-width="90px" v-if="pnl_per==true">
        <template slot-scope="{row}">
            <span>{{row.close_pnl}}</span>
        </template>
      </el-table-column>
      <el-table-column label="净PNL" align="center" min-width="90px" v-if="pnl_per==true">
        <template slot-scope="{row}">
            <span>{{row.net_pnl}}</span>
        </template>
      </el-table-column>
        <el-table-column label="风险率" min-width="90px" align="center">
            <template slot-scope="{row}">
                <span v-if="row.risk=='0'">-</span>
                <span v-else>{{row.risk}}%</span>
            </template>
      </el-table-column>
    </el-table>
      <pagina-tion :total="total" :page.sync="page.size" :limit.sync="page.count" @pagination="getList" />
    </div>
</template>

<script>
// 封装api
import { assetList , assetExport} from "@/api/fundQuery";

// 转换时间的在src/utils.index.js
import { parseTime } from "@/utils";
export default {
  name: "assetquery",
  data() {
    return {
      //表格加载中效果
      listLoading: false,
      //  控制高级筛选
      filters: true,
      //表格下载
      downloadLoading: false,
     //页数页码以及搜索
       listQuery: {
        account: '',//UID/手机/邮箱
        superior:'',//上级代理ID/用户名
      },
       page:{//分页参数
          size:1,//页码(从0开始)
          count:10//单页数据量(最大100)
        },
      //table表格接收数据
      assetList: null,
      total: 0,
      pnl_per:''
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.getList();
  },
  methods: {
    //  渲染table列表
    getList() {
      var that = this;
      //开始有加载中效果
      that.listLoading = true;
      var data = {
        page:{
          page:that.page.size-1,
          count:that.page.count
        },
        account:that.listQuery.account,
        superior:that.listQuery.superior
      }
      assetList({data}).then((response) => {
        if(response.ret==0){
            that.assetList = response.data.list;
            that.pnl_per = response.data.pnl_permission
            console.log(that.pnl_per)
            if(that.page.size==1){
              that.total = response.data.total_count;
            }
                this.listLoading = false;
        }else{
          that.$message.error('数据未请求到!!')
        }
      });
    },
    // 搜索事件
    handleFilter() {
       this.getList()
    },
    //表格导出功能
    handleDownload() {
      this.downloadLoading = true;
        var data = {
          account:this.listQuery.account,
          superior:this.listQuery.superior
        }
        assetExport({data}).then(res=>{
          console.log(res)
          if(res.ret == 0){
             open(res.data.download_url,"");
             this.downloadLoading = false
          }else{
             this.$message.error('导出失败')
             this.downloadLoading = false
          }
        })
    },
  },
};
</script>
<style lang="scss" scoped>
.filter {
  width: 100%;
}
</style>