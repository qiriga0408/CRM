<!--登录-->
<template>
  <!-- <div class="container"> -->
  <div class="main login-container">
    <el-form
      :model="form"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Welcome</h3>
      </div>
      <el-form-item prop="account" class="el-form-s">
        <span class="svg-container">
          <!-- <i class="el-icon-user-solid"></i> -->
          <img
            src="../../icons/svg/user.svg"
            style="width: 100%; height: 100%"
          />
        </span>
        <el-input
          ref="account"
          v-model="form.account"
          placeholder="用户名"
          name="account"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password" class="el-form-s">
        <span class="svg-container">
          <!-- <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-mima"></use>
          </svg> -->
          <img
            src="../../icons/svg/mima.svg"
            style="width: 100%; height: 100%"
          />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="form.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="loginClick()"
        />
        <span class="show-pwd" @click="showPwd">
          <img
            src="../../icons/svg/chakanmima.svg"
            v-if="passwordType === 'password'"
            style="width: 100%; height: 100%"
          />
          <img
            src="../../icons/svg/chakanmima1.svg"
            v-else
            style="width: 100%; height: 100%"
          />
        </span>
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="loginClick()"
        >登录</el-button
      >
    </el-form>
  </div>

  <!-- </div> -->
</template>
<script>
import Crypto from "@/utils/Crypto";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { login,currency_list,contract_list} from "@/api/user";
import Cookies from 'js-cookie'
var QRCode = require("qrcode");
var canvas = "";
export default {
  data() {
    return {
      loginRules: {
        account: [{ required: true, trigger: "blur", message: "请输入用户名" }],
        password: [
          { required: true, trigger: "blur", message: "请输入密码" },
          { min: 1, max: 12, message: "密码至少6位", trigger: "blur" },
        ],
      },
      passwordType: "password",
      tabActiveIdx: 0, //切换方式
      isChecked: true, //是否已阅读服务条款
      form: {
        account: "", //15600530060
        password: "", //123abc
      },

      accountErr: "",
      passwordErr: "",
    };
  },
  components: {
    // inputMove
  },
  created() {
    window.scrollTo(0, 0);
  },

  mounted() {
    // this.$register(this);
    // this.msg = [LOGINOK, GETDLYZ, LOGINOUT];
  },
  methods: {
    //点击切换是否显示密码还是隐藏
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    closexgmm() {
      this.$refs["ruleForm"].resetFields();
    },
    leaveAccInput(val) {},
    leavePassInput(val) {},
    loginClick() {
      //登录操作
      if (!this.form.account) {
        this.$message({
          title: "警告",
          type: "error",
          message: "请输入手机号/邮箱",
        });
        return false;
      }
      if (!this.form.password) {
        this.$message({
          title: "警告",
          type: "error",
          message: "请输入密码",
        });
        return false;
      }
      var data = {
        account: this.form.account, //15600530060
        password: Crypto(this.form.password), //123abc
      };
      // console.log('哈哈哈哈',this.form.account)
      login(data).then((res) => {
        // console.log(res)

        if(res.ret == 0){
          this.$store.commit("user/SET_TOKEN", res.data.token);
          setToken(this.$store.getters.token);
        //  console.log(data.account)
         Cookies.set('username',data.account)
          this.$router.push({ path: this.redirect || "/" });
           this.$message({
            message: '登陆成功',
            type: 'success'
          });
          //登陆成功以后获取币种列表然后存进cookie
            currency_list(data).then(res=>{
                // var currency_list = {}
                Cookies.set('currency_list',res.data)
                // console.log(res.data)
            })
            //登陆成功以后获取合约列表然后存进cookie
             contract_list(data).then(res=>{
                // var currency_list = {}
                Cookies.set('contract_list',res.data)
            })
             
        }else if(res.ret == -11002){
          this.$message.error('登录过期,请重新打开');
        }
        else if(res.ret == -11004){
          this.$message.error('用户不存在');
        }else if(res.ret == -11006){
          this.$message.error('登录密码不正确');
        }

        // this.$store.commit("user/SET_NAME")
      });
    },
    init() {
      this.$nextTick(function () {
        // console.log('---------','otpauth://totp/sugar?secret='+this.vkey)
        canvas = this.$refs.qrc;
        this.createQrc("otpauth://totp/dxop?secret=" + this.vkey);
      });
    },
    createQrc(val) {
      QRCode.toCanvas(this.$refs.qrc, val, (error) => {
        if (error) {
          console.log(error);
        }
      });
    },
    entrySendewm() {
      this.dialogErWeiMa = false;
      this.dialogFormVisible = true;
    },
  },
  destroyed() {
    document.onkeydown = null;
  },
};
</script>


<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

/* reset element-ui css */
.login-container {
  .login-form {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
  }

  .el-form-s {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 35px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .el-dialog {
    .el-form-item {
      margin-bottom: 0;
    }
    .banner-box {
      text-align: center;
    }
  }
  .show-pwd {
    width: 20px;
    position: absolute;
    right: 15px;
    top: 12px;
    font-size: 15px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

