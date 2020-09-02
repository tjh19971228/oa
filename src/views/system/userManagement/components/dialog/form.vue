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
          :disabled="judge(isEdit)"
          class="w-400"
        ></el-input>
      </el-form-item>
      <el-form-item label="* 密码：" prop="password">
        <el-input
          placeholder="密码"
          v-model="form.password"
          :disabled="judge(isEdit)"
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
              @node-click="handleNodeClick"
              placeholder="请选择"
              :highlight-current="true"
              :expand-on-click-node="false"
              ref="treeBox"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
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
          :disabled="judge(isEdit)"
          class="w-400"
        ></el-input>
      </el-form-item>
      <el-form-item label="* qq：" prop="qq">
        <el-input
          placeholder="qq"
          v-model="form.qq"
          :disabled="judge(isEdit)"
          class="w-400"
        ></el-input>
      </el-form-item>
      <el-form-item label="* 微信：" prop="weixin">
        <el-input
          placeholder="微信"
          v-model="form.weixin"
          :disabled="judge(isEdit)"
          class="w-400"
        ></el-input>
      </el-form-item>

      <el-form-item label="* 性别：" prop="sex">
        <el-input
          placeholder="性别"
          v-model="form.sex"
          :disabled="judge(isEdit)"
          class="w-400"
        ></el-input>
      </el-form-item>
      <el-form-item label="* 头像：" prop="avatar">
        <el-input
          placeholder="头像"
          v-model="form.avatar"
          :disabled="judge(isEdit)"
          class="w-400"
        ></el-input>
      </el-form-item>
      <el-form-item label="* 年龄：" prop="age">
        <el-input
          placeholder="年龄"
          v-model="form.age"
          :disabled="judge(isEdit)"
          class="w-400"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="* 手机号：" prop="phone">
        <el-input
          placeholder="手机号"
          v-model="form.phone"
          :disabled="judge(isEdit)"
          class="w-400"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="* 地址：" prop="address">
        <el-input
          placeholder="地址"
          v-model="form.address"
          :disabled="judge(isEdit)"
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
import { getOrganzitionTree } from "@/api/system";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

class FORM {
  username: string;
  password: string;
  deptId: string;
  phone: string;
  [key: string]: string;
  constructor() {
    this.username = "";
    this.password = "";
    this.deptId = "";
    this.phone = "";
  }
}
const TIPS: Array<String> = ["用户名", "密码", "部门", "手机号"];
interface RULES {
  username: Array<Object>;
}
@Component
export default class Form extends Vue {
  @Prop(Object) readonly "tableData": FORM;
  @Prop({ default: false }) readonly "isEdit": Boolean | false;
  private form: FORM = {
    username: "",
    password: "",
    deptId: "",
    phone: ""
  };
  private apartmentList: Array<Object> = [];
  private deptName: String = "";

  public judge(flag: boolean) {
    return !flag;
  }
  public confirmTable() {
    let flag = true;
    try {
      Object.keys(this.form).forEach((item, index) => {
        if (!this.form[item]) {
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
  public handleNodeClick(data: any) {
    console.log(data);
    this.deptName = data.deptName;
    this.form.deptId = data.id;
  }
  public selectChange(val: any) {
    // console.log(val);
  }
  @Watch("tableData")
  OnTableDataChanged(newVal: FORM, oldVal: FORM) {
    this.form = newVal;
  }
  mounted() {
    if (Object.keys(this.tableData).length) {
      this.form = this.tableData;
    }
    getOrganzitionTree().then((res: any) => {
      this.apartmentList = res.result;
      // console.log(this.apartmentList);
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
