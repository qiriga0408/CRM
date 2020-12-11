<template>
  <div class="userquery-container">
    <div class="filter-container">

         <el-input size="mini" v-model="listQuery.account" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter" />
          <el-select size="mini" v-model="listQuery.user_type" placeholder="用户类型" clearable   style="width: 120px;margin-left:20px;" class="filter-item">
              <el-option v-for="(item,index) in userTypeOptions" :key="index" :label="item.usertype_name" :value="item.key" />
         </el-select>
         <el-input v-model="listQuery.superior" size="mini" placeholder="上级代理ID" style="width:130px;margin-left:20px;margin-top:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
         <!-- <div class="block"> -->
            <span style="margin-left:20px;font-size:15px;">注册时间</span>
            <el-date-picker
            style="width:220px;margin-top:10px;"
            class="picker"
              v-model="listQuery.register_time"
              size="mini"
              type="daterange"
              range-separator="-"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              >
            </el-date-picker>
             <span style="margin-left:20px;font-size:12px;">最后登录时间</span>
            <el-date-picker
            style="width:220px;margin-top:10px;"
              v-model="listQuery.login_time"
              size="mini"
              type="daterange"
              range-separator="-"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              >
            </el-date-picker>
          <el-button v-waves class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
        </el-button>
        <!-- </div> -->
    </div>
    <!-- :key="tableKey" -->
    <!-- @sort-change="sortChange" -->
    <el-table
      v-loading="listLoading"
      :data="userList"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top:20px;"
       :header-cell-style="{'background':'#F0F8FF'}"
    >
      <el-table-column label="UID" prop="user_id"  align="center" width="80" >
      <!-- sortable="custom" :class-name="getSortClass('id')" -->
        <template slot-scope="{row}">
          <span>{{ row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="user_name" align="center" min-width="100px">
        <template slot-scope="{row}">
          <span>{{row.user_name}}</span>
          <!-- <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
          <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="用户类型" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.user_type=='1'">代理用户</span>
          <span v-else-if="row.user_type=='2'">直推用户</span>
        </template>
      </el-table-column>
      <el-table-column label="邀请码" min-width="80px">
        <template slot-scope="{row}">
            <span>{{row.invite_code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级代理ID" align="center" min-width="95px">
        <template slot-scope="{row}">
          <span>{{row.superior_uid}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级代理用户名" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.superior_account}}</span>
        </template>
      </el-table-column>
     
     
      <el-table-column label="注册时间" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.register_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后登录时间" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.login_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
       <el-table-column label="最后登录IP" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.login_ip}}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" min-width="60px">
        <template slot-scope="{row}">
             <span>{{row.remark}}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作" align="center" min-width="230px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">

        <el-button plain size="mini" @click="Remarks(row.user_id)">备注</el-button>
         <!-- <el-button plain size="mini" @click="handleUpdate(row)">
            编辑
          </el-button> -->
         
          <el-button size="mini" type="warning" @click="handleCK(row.user_id,$index)">
            查看
          </el-button>
        </template>
      </el-table-column>
     
    </el-table>

  <!-- 引入封装分页组件 -->
   
   <pagina-tion  :total="total" :page.sync="page.size" :limit.sync="page.count" @pagination="getList" />

   <!-- <el-pagination
    		@size-change="handleSizeChange"  
        	@current-change="handleCurrentChange" 
        	:current-page="listQuery.page._page" 
        	:page-sizes="[10, 20, 50, 100]" 
        	:page-size="listQuery.page.count" 
        	layout="total, sizes, prev, pager, next, jumper"
        	:total="total" 
		></el-pagination> -->
    
 

   <!-- 备注 -->
    <el-dialog  v-dialogDrag :visible.sync="RemarksDialogPvVisible"  width="70%" title="编辑">
    <!-- 分割线 -->
      <el-divider></el-divider>
           <el-form ref="remarksform"  :model="temp" label-position="left" label-width="25%" style="width:90%">
             <el-form-item  label="备注" prop="remarks">
                <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="temp.remarks"/>
                 </el-form-item>
              </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="RemarksDialogClick">确定</el-button>
      </span>
    </el-dialog>



  </div>
</template>

<script>
import {userList,userQueryUpdate,userQueryRemarksUpdata} from '@/api/userQuery'


import axios from 'axios'

// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'

//引入的自定义指令
import waves from '@/directive/waves'

const userTypeOptions = [
   {key:0,usertype_name:'全部用户'},
  {key:1,usertype_name:'代理用户'},
  {key:2,usertype_name:'直推用户'},
 
]

const tradingStatusOptions = [
  {key:'0',tradingsatus_name:'允许交易'},
  {key:'1',tradingsatus_name:'禁止交易'}
]

const loginStatusOptions = [
  
  {key:'0',loginstatus_name:'禁止登陆'},
  {key:'1',loginstatus_name:'允许登陆'},
]

const withdrawalStatusOptions = [
  {key:'0',withdrawalstatus_name:'允许提币'},
  {key:'1',withdrawalstatus_name:'禁止提币'}
]
export default {
  name: "userList",
   directives: { waves },
  data() {
    return {
      
      //表格数据
      userList:null,
      //分页的数量
      total: 0,
      //页数页码以及搜索
      listQuery: {
        user_id:'',
        account: '',//UID/手机/邮箱
        user_type:0,//用户类型 0-不过滤 1-代理用户 2-直推用户
        superior:'',//上级代理ID/用户名
        register_time:[],//注册时间区间          
       
        login_time:[],//最后登录时间区间
       
      },
        page:{//分页参数
          size:1,//页码(从0开始)
          count:10//单页数据量(最大100)
        },
      //做筛选用
      newList:[],
      //表格加载中效果
      listLoading: true,
      //控制点击备注出现的弹框
      RemarksDialogPvVisible:false,
      //备注弹框文本绑定
      textarea:'',
      //编辑后的数据
       temp: {
          user_id:'',
        // 备注
        remarks:''
      },
      //新增还是编辑弹框显示和隐藏
      dialogFormVisible:false,
    
      //用户类型
      userTypeOptions,
      //交易状态
      tradingStatusOptions,
     
      rules:{
        uid:[
          { required: true, message: 'uid不能为空', trigger: 'blur' }
        ],
        username:[
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        formalities_proportion:[
          { required: true, message: '手续费分佣比例不能为空', trigger: 'blur' }
        ],
        issue:[
          { required: true, message: '发放期限不能为空', trigger: 'blur' }
        ],
      }
    };
  },
  // 过滤器
   filters: {
 
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },

  components: {},

  computed: {},

  mounted(){
    this.getList()
    // this.userInfo()
  },

  methods: {
    //请求表格数据
    getList(){
      var that = this
      //开始有加载中效果
      that.listLoading = true
      let starttime = null,stoptime = null
       if (that.listQuery.register_time) {
        if (that.listQuery.register_time.length === 2) {
          starttime = that.listQuery.register_time[0];
          stoptime = that.listQuery.register_time[1];
        } else if (that.listQuery.register_time.length === 1) {
          starttime = that.listQuery.register_time[0];
        }
        // console.log(that.listQuery.register_time.length);
      } else {
        console.log("没有选择任何时间");
      }
        if (that.listQuery.login_time) {
          if (that.listQuery.login_time.length === 2) {
            starttime = that.listQuery.login_time[0];
            stoptime = that.listQuery.login_time[1];
          } else if (that.listQuery.login_time.length === 1) {
            starttime = that.listQuery.login_time[0];
          }
        // console.log(that.listQuery.register_time.length);
      } else {
        console.log("没有选择任何时间");
      }
      console.log(that.page.size)
      userList({
        data:{
          page:{
            page:that.page.size-1,
            count:that.page.count
          },
          account:this.listQuery.account,
          superior:this.listQuery.superior,
          user_type:this.listQuery.user_type,
          register_time:{
            start:starttime/1000,
            end:stoptime/1000
          },
          login_time:{
             start:starttime/1000,
             end:stoptime/1000
          }
        }
      }).then((response)=>{
        if(response.ret == 0){
          that.userList = response.data.list
          console.log(that.page.size)
          //因为只有第一次加载时候才会返回，所以等于1的时候就要留住
          if(that.page.size==1){
            that.total = response.data.total_count
          }
          
          // that.page.size++
          console.log
           setTimeout(() => {
          // 过了1.5秒就关闭
          that.listLoading = false
        }, 1500);
        }else{
          this.$message.error('请求不到数据');
        }
        console.log(that.userList)
        
       
      })
    },
  
    //点击备注按钮
    Remarks(row){
      let that = this
      // console.log(row)
      that.temp.user_id = row
      that.RemarksDialogPvVisible=true
       that.$nextTick(() => {
        that.$refs['remarksform'].clearValidate()
      })
      
    },
    //备注对话框里面确定按钮
    RemarksDialogClick(){
      var that = this
      //  const tempData = Object.assign({}, that.temp.remarks)
      //  console.log(tempData)
      var data = {
        user_id:that.temp.user_id,
        remark:that.temp.remarks
      }
       userQueryRemarksUpdata({data}).then(() => {
            that.RemarksDialogPvVisible = false
            this.getList();
            that.$notify({
              title: '备注修改成功',
              type: 'success',
              duration: 2000
            })
          })
          // this.getList()

    },
 

  
    //点击查看跳转详情页
      handleCK(row) {
        // console.log(row)
        this.$router.push({
          path:'/userQuery/userListDetail',
          query:{row}
        })
      
    },
    // 回车搜索事件
     handleFilter() {
        // this.listQuery.page=1
        this.getList()
         //没有输入内容的情况下
      // if (this.listQuery.user_id||this.listQuery.user_type||this.listQuery.superior) {
      //    this.newList = this.userList.filter(
      //     item =>
      //       item.user_id.indexOf(this.listQuery.user_id) !== -1 ||
      //        item.user_type.indexOf(this.listQuery.user_type) !== -1 ||
      //         item.superior_uid.indexOf(this.listQuery.superior) !==-1
      //       )
      //       // if(this.newList){
      //         this.userList = this.newList
      //       // }
      //   return;
      // }
      //  this.listQuery.acccount = userList.user_id
      // this.listQuery.page.page = 1
      
    },
  },
};
</script>
<style lang="scss" scoped>
.block{
  display: flex;
}


</style>