<template>
  <div>
    <el-form
      :inline="true"
      :label-position="'right'"
      class="w-80per m-auto lh-45"
      :rules="rules"
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
      <el-form-item label="* 身份证：" prop="idcard">
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
      <el-form-item label="* 部门id：" prop="dept_id">
        <el-input
          placeholder="部门id"
          v-model="form.dept_id"
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
      </el-form-item>
      <el-form-item label="* 手机号：" prop="phone">
        <el-input
          placeholder="手机号"
          v-model="form.phone"
          :disabled="judge(isEdit)"
          class="w-400"
        ></el-input>
      </el-form-item>
      <el-form-item label="* 地址：" prop="address">
        <el-input
          placeholder="地址"
          v-model="form.address"
          :disabled="judge(isEdit)"
          class="w-400"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmTable" class="ml-90per"
        >确 定</el-button
      >
    </span>
  </div>
</template>

<script>
export default {
  props: ["tableData", "isEdit"],
  data() {
    return {
      form: {
        username: "",
        password: "",
        idcard: "",
        qq: "",
        weixin: "",
        dept_id: "",
        sex: "",
        avatar: "",
        age: "",
        phone: "",
        address: ""
      },
      rules: {
        username: [{ requried: true }]
      }
    };
  },
  methods: {
    judge(flag) {
      return !flag;
    },
    confirmTable(data) {
      let flag = true;
      for(let key in this.form){
        if(!this.form[key]){
          this.$message.error(`${key}不能为空`)
          return
        }
      }
      if (flag) {
        this.$emit("confirmTable", this.form);
      }
    }
  },
  watch: {
    tableData(newVal, oldVal) {
      this.form = newVal;
    }
  },
  mounted() {
    if (Object.keys(this.tableData).length) {
      this.form = this.tableData;
    }
  }
};
</script>

<style lang="scss" scoped>
>>> .el-form-item__label {
  color: crimson;
}
</style>
