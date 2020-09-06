<template>
  <div>
    <el-form
      :inline="true"
      :label-position="'top'"
      class="w-80per m-auto lh-45"
      ref="ruleForm"
      v-model="form"
    >
      <el-form-item label="* 用户名：" prop="username">
        <el-input
          placeholder="用户名"
          v-model="form.username"
          class="w-400"
        ></el-input>
      </el-form-item>
      <el-form-item label="* 密码：" prop="password">
        <el-input
          placeholder="密码"
          v-model="form.password"
          class="w-400"
        ></el-input>
      </el-form-item>
      <el-form-item label="* 部门：" prop="dept_id">
        <el-select
          class="w-400"
          :value="deptName"
          collapse-tags
          @change="selectChange"
        >
          <el-option :value="deptName" style="height: auto">
            <el-tree
              :data="apartmentList"
              default-expand-all
              node-key="id"
              @node-click="handleDeptClick"
              placeholder="请选择"
              :highlight-current="true"
              :expand-on-click-node="false"
              ref="treeBox"
            >
              <span class="custom-tree-node" slot-scope="{ data }">
                <span>{{ data.deptName }}</span>
              </span>
            </el-tree>
          </el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="* 身份证：" prop="idcard">
        <el-input
          placeholder="身份证"
          v-model="form.idcard"
          class="w-400"
        ></el-input>
      </el-form-item>
      <el-form-item label="* qq：" prop="qq">
        <el-input
          placeholder="qq"
          v-model="form.qq"
          class="w-400"
        ></el-input>
      </el-form-item>
      <el-form-item label="* 微信：" prop="weixin">
        <el-input
          placeholder="微信"
          v-model="form.weixin"
          class="w-400"
        ></el-input>
      </el-form-item>

      <el-form-item label="* 性别：" prop="sex">
        <el-input
          placeholder="性别"
          v-model="form.sex"
          class="w-400"
        ></el-input>
      </el-form-item>
      <el-form-item label="* 头像：" prop="avatar">
        <el-input
          placeholder="头像"
          v-model="form.avatar"
          class="w-400"
        ></el-input>
      </el-form-item>
      <el-form-item label="* 年龄：" prop="age">
        <el-input
          placeholder="年龄"
          v-model="form.age"
          class="w-400"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="* 手机号：" prop="phone">
        <el-input
          placeholder="手机号"
          v-model="form.mobile"
          class="w-400"
        ></el-input>
      </el-form-item>
      <el-form-item label="* 角色" prop="role_id">
        <el-select
          class="w-400"
          :value="roleName"
          collapse-tags
          @change="selectChange"
        >
          <el-option
            v-for="(item, index) in roleList"
            :key="index"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="* 地址：" prop="address">
        <el-input
          placeholder="地址"
          v-model="form.address"
          class="w-400"
        ></el-input>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmTable" class="ml-90per"
        >确 定</el-button
      >
    </span>
  </div>
</template>

<script lang="ts">
import { getOrganzitionTree, getRoleList } from "@/api/system";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

class FORM {
  username: string;
  password: string;
  deptId: string;
  mobile: string;
  roleId: string;
  [key: string]: string;
  constructor() {
    this.username = "";
    this.password = "";
    this.deptId = "";
    this.mobile = "";
    this.roleId = "";
  }
}
const TIPS: Array<String> = ["用户名", "密码", "部门", "手机号", "角色"];
interface RULES {
  username: Array<Object>;
}
@Component
export default class Form extends Vue {
  @Prop(Object) readonly "tableData": FORM;
  private form: FORM = {
    username: "",
    password: "",
    deptId: "",
    mobile: "",
    roleId: ""
  };
  private apartmentList: Array<Object> = [];
  private roleList: Array<Object> = [];
  private deptName: String = "";
  private roleName: String = "";
  public confirmTable() {
    let flag = true;
    try {
      Object.keys(this.form).forEach((item, index) => {
        if (!this.form[item]&&(item!=='cursor'&&item!=='limit')) {
          this.$message.error(`${item}不能为空`);
          throw new Error();
        }
      });
    } catch (e) {
      return;
    }
    if (flag) {
      this.$emit("confirmTable", this.form);
    }
  }
  public handleDeptClick(data: any) {
    console.log(data);
    this.deptName = data.deptName;
    this.form.deptId = data.id;
  }
  public selectChange(val: any) {
    this.form.roleId=val;
    this.roleList.forEach((item:any)=>{
      if(item.id===val){
        this.roleName=item.roleName;
      }
    })

  }
  @Watch("tableData")
  OnTableDataChanged(newVal: FORM, oldVal: FORM) {
    this.form = newVal;
  }
  mounted() {
    if (Object.keys(this.tableData).length) {
      this.form = this.tableData;
    }
    console.log(this.tableData)
    getOrganzitionTree().then((res: any) => {
      this.apartmentList = res.result;
      // console.log(this.apartmentList);
    });
    let params = { cursor: 0, limit: 0, remark: "", roleName: "" };
    getRoleList(params).then((res: any) => {
      this.roleList = res.result.records;
    });
  }
}
// export default {
//   props: ["tableData", "isEdit"],
//   data() {
//     return {
//       form: {
//         username: "",
//         password: "",
//         // idcard: "",
//         // qq: "",
//         // weixin: "",
//         // dept_id: "",
//         // sex: "",
//         // avatar: "",
//         // age: "",
//         phone: ""
//         // address: ""
//       },
//       rules: {
//         username: [{ requried: true }]
//       },
//       apartmentList: [],
//       deptName: ""
//     };
//   },
</script>

<style lang="scss" scoped>
>>> .el-form-item__label {
  color: crimson;
}
</style>
