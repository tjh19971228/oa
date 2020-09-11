<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            src="https://i.pinimg.com/564x/30/31/d0/3031d0df7a9fe9f18ccfccba64ed16fa.jpg"
            class="user-avatar"
          />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            <span @click="changePassword">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="out">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <oa-dialog
      :title="'修改密码'"
      :width="'520'"
      :visible.sync="showChangePassword"
      @closed="showChangePassword = false"
    >
      <el-form label-position="top" :rules="rules">
        <el-form-item
          v-for="(item, index) in labelList"
          :key="index"
          required
          :label="item.label"
          :prop="item.value"
        >
          <el-input v-model="editForm[item.value]"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button
          type="danger"
          @click="closeChangePassword"
          icon="el-icon-close"
          >关闭</el-button
        >
        <el-button type="primary" @click="confirmEdit" icon="el-icon-check">
          确定
        </el-button>
      </div>
    </oa-dialog>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import Breadcrumb from "../../components//Breadcrumb/index.vue";
import Hamburger from "../../components/Hamburger/index.vue";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
class LABEL {
  label: string;
  value: string;
  constructor() {
    this.label = "";
    this.value = "";
  }
}
class EDITFORM {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  constructor() {
    this.oldPassword = "";
    this.newPassword = "";
    this.confirmPassword = "";
  }
}
const LABELLIST: Array<LABEL> = [
  { label: "旧密码", value: "oldPassword" },
  { label: "新密码", value: "newPassword" },
  { label: "确认新密码", value: "confirmPassword" }
];
@Component({
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: mapGetters(["sidebar"])
})
export default class Navbar extends Vue {
  // data
  private showChangePassword: boolean = false;
  private editForm: EDITFORM = new EDITFORM();
  private labelList = LABELLIST;
  private rules = {
    oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
    newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
    confirmPassword: [{ validator: this.checkConfirmPassword, trigger: "blur" }]
  };
  public toggleSideBar() {
    this.$store.dispatch("app/toggleSideBar");
  }
  public out() {
    this.$store.dispatch("user/logout");
    this.$router.push({ path: "/login" });
  }

  public changePassword() {
    this.showChangePassword = true;
  }

  public closeChangePassword() {
    this.showChangePassword = false;
  }
  public confirmEdit() {}
  public checkConfirmPassword(rule: any, value: any, callback: any) {
    if (!value) {
      return callback(new Error("确认密码不能为空"));
    }
    setTimeout(() => {
      if (this.editForm.newPassword !== value) {
        return callback(new Error("确认密码和输入的新密码不一致"));
      }
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

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
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
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
