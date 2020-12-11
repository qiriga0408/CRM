<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container"  trigger="click">
      
            <span>{{username}}</span>
          <i class="el-icon-caret-bottom" />
         
        <el-dropdown-menu slot="dropdown" style="width:240px;position:absolute;left:1656px">
        <!--  <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link> -->
          <el-dropdown-item>
            我的邀请
          </el-dropdown-item>
          <el-dropdown-item style="display:flex;">
              <div>邀请码</div>
              <div style="margin-left:20px;">
                  <span>{{inviteCode}}</span>
                  <i class="el-icon-document-copy" @click="doCopy()" style="margin-left:50px;"></i>
               
              </div> 
          </el-dropdown-item>
          <el-dropdown-item>
              <div>二维码</div>
               <canvas ref="ewm" id="picture" :style="{width:canvasWidth+'px',height:canvasHeight+'px'}"></canvas>
              <!-- <i class="el-icon-download" @click="downloadQrcode" style="margin-left:15px;"></i> -->
               
          </el-dropdown-item>
           <el-dropdown-item>
              <div>
                  <span>邀请注册地址</span>
                  <i class="el-icon-document-copy" @click="doCopys()" style="margin-left:80px;"></i>
              </div>
              <div style="width:100%;overflow: hidden">
                {{inviteAddr}}
              </div>
          </el-dropdown-item>
          
           
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Cookies from 'js-cookie'
import {userinfo} from '@/api/user'
let QRCode = require("qrcode");
let canvas = "";
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      //从vuex传过来用户名
      'name'
    ])
  },
  data(){
    return{
      inviteAddr: "",
      inviteCode: "",
      username:'',
      canvasWidth:120,
      canvasHeight:120
    }
  },
  mounted(){
    // console.log(this.$store.state.name)
    this.Info()
    this.username = Cookies.get('username')
  },
  methods: {
   
     doCopy() {
      this.$copyText(this.inviteCode).then(
        e => {
          this.$message({ title: "成功", message: "复制成功", type: "success" });
          // console.log(e);
        },
        e => {
          this.$message({ title: "错误", message: "复制失败", type: "success" });
          // console.log(e);
        }
      );
    },
     doCopys() {
      this.$copyText(this.inviteAddr).then(
        e => {
          this.$message({ title: "成功", message: "复制成功", type: "success" });
          // console.log(e);
        },
        e => {
          this.$message({ title: "错误", message: "复制失败", type: "success" });
          // console.log(e);
        }
      );
    },
      Info(){
        var data = {}
        userinfo({data}).then(res=>{
          // console.log(res)
          this.inviteAddr = res.data.website + "?invite=" + res.data.code
          this.inviteCode = res.data.code
          this.createCode();
        })
      },
      createCode() {
      let url = this.inviteAddr;
      this.$nextTick(function() {
        canvas = this.$refs.ewm;
        this.createQrc(url); //"otpauth://totp/sugar?secret="+
      });
    },
      createQrc(val) {
        QRCode.toCanvas(this.$refs.ewm, val, error => {
          if (error) {
            console.log(error);
          }
        });
      },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      Cookies.remove('crm_token');
      Cookies.remove('currency_list')
      Cookies.remove('contract_list')
      Cookies.remove('username')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    //  downloadQrcode() {
    //       console.log('下载功能')
    //       //找到canvas标签
    //         let myCanvas = document.getElementById('picture').getElementsByTagName('canvas');
    //       //创建一个a标签节点
    //         let a = document.createElement("a")
    //       //设置a标签的href属性（将canvas变成png图片）
    //         a.href = myCanvas[0].toDataURL()
    //         console.log(myCanvas[0])
    //       //设置下载文件的名字
    //         a.download = "二维码"
    //       //点击
    //         a.click()
    //       //弹出提示
    //         this.$message({message:'亲，正在进行下载保存',type:'warning'})
    //     },
  }
}
</script>

<style lang="scss" scoped>

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 80%;
    // line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      cursor: pointer;
      margin-top: 20px;
      .avatar-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 40px;
        margin-top: 10px;
        // position: relative;
        
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-dropdown-menu{
          width: 200px;
          height: 500px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
