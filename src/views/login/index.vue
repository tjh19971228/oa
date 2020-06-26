<template>
  <div class="login-container">
    <div ref="loginForm" class="login-form" label-position="left">
      <div class="leftBox">
        <p class="login-title">人生&nbsp;每一个清晨<br />都该努力。</p>
        <p class="sub-title">看见初升的太阳</p>
      </div>
      <div class="rightBox">
        <img src="./logo.png" alt="" srcset="" class="logo" />
        <el-form class="form" :rules="rules" :model="form" ref="form">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              placeholder="用户名"
              class="form-item"
              prefix-icon="el-icon-user-solid"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="密码"
              class="form-item"
              prefix-icon="el-icon-lock"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input
              v-model="form.captcha"
              placeholder="验证码"
              class="form-item form-item-captcha"
              prefix-icon="el-icon-key"
              clearable
            ></el-input>
            <img
              src="http://47.100.25.217:9001/captcha.jpg"
              class="captcha"
              @click="changeCaptcha"
              ref="captcha"
            />
          </el-form-item>
        </el-form>
        <el-button type="primary" class="loginBtn" @click="handleLogin"
          >登录</el-button
        >
        <el-button type="text" class="forgetPwdBtn">忘记密码?</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCaptcha, login } from "@/api/login";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        captcha: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    changeCaptcha() {
      // 刷新验证码
      this.$refs.captcha.src = "http://47.100.25.217:9001/captcha.jpg";
    },
    handleLogin() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let data = this.form;
          this.$store.dispatch("user/login", data).then(res => {
            if (res.code === 200) {
              this.$message.success("登录成功");
              this.$router.push({ path: "/index" });
            }
            else{
              this.$message.error("登录失败")
            }
          });
        } else {
          this.$message.error("请检查输入的表单是否正确");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url("./timg.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 840px;
    height: 580px;
    max-width: 100%;
    margin: 0 auto;
    top: 150px;
    overflow: hidden;
    // border: 1px solid #B5A37B;
    box-shadow: 0 0 10px #000;
    display: flex;

    .leftBox {
      width: 510px;
      height: 100%;
      // filter:alpha(Opacity=60);
      background: rgba(255, 255, 255, 0.1);

      .login-title {
        margin: 30px;
        font-size: 48px;
        font-family: "Arial";
        font-weight: bold;
        color: #454545;
        line-height: 60px;
      }

      .sub-title {
        margin-left: 30px;
        margin-top: -20px;
        font-size: 20px;
        font-weight: bold;
        color: #454545;
      }
    }

    .rightBox {
      position: relative;
      width: calc(100% - 510px);
      height: 100%;
      background: #fff;
      text-align: center;

      .logo {
        position: relative;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        border: 1px solid #666;
        box-shadow: 0 0 10px #666;
        top: 50px;
        margin: 0 auto;
      }

      .form {
        width: 80%;
        margin: 0 auto;
        margin-top: 100px;
      }

      .form-item {
        >>> .el-input__inner {
          height: 50px;
          font-size: 18px;
          color: #adadad;
        }
        >>> .el-input__icon {
          font-size: 18px;
          line-height: 50px;
        }
      }

      .form-item-captcha {
        width: 50%;
        float: left;
      }

      .captcha {
        width: 45%;
        height: 50px;
        // object-fit: co;
      }

      .loginBtn {
        width: 255px;
        height: 50px;
        margin-top: 20px;
        background: #1c558c;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 24px;
        letter-spacing: 2px;
        border: 0;
        border-radius: 0;
      }

      .forgetPwdBtn {
        color: #5198d0;
        margin-top: 20px;
        font-size: 18px;
        font-family: Arial, Helvetica, sans-serif;
      }
    }
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
    width: 30px;
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

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
