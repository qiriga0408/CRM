<template>
  <div class="userlistdetail-container">
    
  <el-row :gutter="6" style="border:1px solid grey;width:99.5%;margin:20px auto"> 
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"> 
        <div class="grid-content">
            <span class="grid-content-left">UID:</span>
            <span class="grid-content-right">{{ListDetails.user_id}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">用户类型:</span>
            <span class="grid-content-right" v-if="ListDetails.user_type == '1'">代理用户</span>
            <span class="grid-content-right" v-else-if="ListDetails.user_type == '2'">直推用户</span>
        </div>
           <div class="grid-content">
            <span class="grid-content-left">注册时间:</span>
            <span class="grid-content-right">{{ListDetails.register_time| parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </div>
      </el-col> 
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
            <span class="grid-content-left">用户名:</span>
            <span class="grid-content-right">{{ListDetails.user_name}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">邀请码:</span>
            <span class="grid-content-right">{{ListDetails.invite_code}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">最后登录时间:</span>
            <span class="grid-content-right">{{ListDetails.login_time| parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </div>
     </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content"></div>
        <div class="grid-content"></div>
        <div class="grid-content">
            <span class="grid-content-left">最后登录IP:</span>
            <span class="grid-content-right">{{ListDetails.login_ip}}</span>
        </div>
      </el-col>
    </el-row>
    
     


     <el-row :gutter="6" style="border:1px solid grey;width:99.5%;margin:20px auto">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
            <span class="grid-content-left">上级代理ID:</span>
            <span class="grid-content-right">{{ListDetails.superior_uid}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">邀请人数:</span>
            <span class="grid-content-right">{{ListDetails.inferior_all_count}}</span>
          
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
            <span class="grid-content-left">下级代理人数:</span>
            <span class="grid-content-right">{{ListDetails.inferior_agent_count}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">手续费返佣比例:</span>
            <span class="grid-content-right">{{ListDetails.rebate_rate}}%</span>
        </div>
       
     </el-col>
    
    </el-row>


     <el-row :gutter="6" style="width:99.5%;margin:30px auto ">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
            <span class="grid-content-left">资产</span>
        </div>
         <div class="grid-content">
            <span class="font">钱包账户资产(USDT):</span>
        </div>
         <div class="grid-content" style="border-bottom:1px solid grey;">
            <span >{{ListDetails.asset.wallet.total}}</span>
        </div>
        <el-row>
            <el-col :span="12">
                <div class="grid-content">
                    <span class="font">可用余额</span>
                </div>
                 <div class="grid-content">
                     <span >{{ListDetails.asset.wallet.available}}</span>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content">
                    <span class="font">冻结数量</span>
                </div>
                 <div class="grid-content">
                     <span >{{ListDetails.asset.wallet.frozen}}</span>
                </div>
            </el-col>
        </el-row>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" style="border-left:1px solid grey;">
         <div class="grid-content">
           
        </div>
         <div class="grid-content">
            <span class="font">合约账户资产(USDT):</span>
        </div>
         <div class="grid-content" style="border-bottom:1px solid grey;">
            <span >{{ListDetails.asset.contract.total}}</span>
        </div>
        <el-row>
            <el-col :span="12">
                <div class="grid-content">
                    <span class="font">账户权益</span>
                </div>
                 <div class="grid-content">
                     <span >{{ListDetails.asset.contract.rights}}</span>
                </div>
                  <div class="grid-content">
                    <span class="font">初始保证金</span>
                </div>
                 <div class="grid-content">
                     <span >{{ListDetails.asset.contract.margin}}</span>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content">
                    <span class="font">可用余额</span>
                </div>
                 <div class="grid-content">
                     <span >{{ListDetails.asset.contract.available}}</span>
                </div>
                  <div class="grid-content">
                    <span class="font">未实现盈亏</span>
                </div>
                 <div class="grid-content">
                     <span >{{ListDetails.asset.contract.float}}</span>
                </div>
            </el-col>
        </el-row>
        
     </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
          
        </div>
       
      </el-col>
    </el-row>


  </div>
</template>

<script>
//时间的转换
import { parseTime } from '@/utils'
const userTypeOptions = [
  {key:'DJDL',usertype_name:'顶级代理'},
  {key:'DL',usertype_name:'代理'},
  {key:'ZTYH',usertype_name:'直推用户'},
  {key:'PTYH',usertype_name:'普通用户'}
]
import { userQueryDetail } from "@/api/userQuery";
export default {
  name: "userListDetail",
  data() {
    return {
        ListDetails:null,
        //用户类型
        userTypeOptions,
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.ListDetail();
    // console.log(this.ListDetail)
  },

  methods: {
    ListDetail() {
      var user_id = this.$route.query.row;
      // console.log(id);
      userQueryDetail({
        data:{user_id:user_id}
      }).then((response) => {
        if(response.ret==0){
          this.ListDetails = response.data
        }else{
           this.$message.error('数据请求不到');
        }
        console.log(this.ListDetails);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wc_1{
  width: 99.7%;
  height: 100px;
  // background: firebrick;
  border: 1px solid grey;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  // flex-direction: column;
  align-items: center;
  // justify-content: space-around;
  
  .wc_1-one{
    width:45%;
    // background: firebrick;
    padding-left: 10%;
    box-sizing: border-box;
  }

}
.grid-content {
  border-radius: 4px;
 // background: firebrick;
  min-height: 38px;
  display: flex;
  //justify-content: space-around;
  margin-left: 15px;
  align-items: center;
  .grid-content-right{
      //margin-left: 30px;
  }
  .grid-content-left{
      width: 150px;
      //border: 1px solid red;
  }
}
.font{
    font-size: 15px;
    color: gray;
}
</style>