<template>
  <div>
    <el-container class="m-25 h-800 align-center alignitem-center">
      <el-header class="w-100per ">
        <el-row class="h-100per lh-60">
          <el-input
            v-model="roleName"
            placeholder="请输入想要搜索的角色名"
            class="w-300 fl"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchRole()"
            ></el-button>
          </el-input>
          <el-button type="success" class="fr">新建角色</el-button>
        </el-row>
      </el-header>
      <el-row class="w-100per ">
        <el-col :span="24">
          <oa-table
            :url="'/api/role/list'"
            :queryArray="query"
            ref="oaTable"
            :border="true"
          >
            <el-table-column
              label="角色名"
              align="center"
              prop="roleName"
            ></el-table-column>
            <el-table-column
              label="备注"
              align="center"
              prop="remark"
            ></el-table-column>
          </oa-table>
        </el-col>
      </el-row>
    </el-container>
    <oa-dialog :title="新建角色" :visible="visible">
      <div>
        <el-form :form="form"> </el-form>
      </div>
    </oa-dialog>
  </div>
</template>

<script lang="ts">
class FORM {
  roleName: string;
  remark: string;
  constructor() {
    this.roleName = "";
    this.remark = "";
  }
}
import { Vue, Component } from "vue-property-decorator";
@Component
export default class roleManagement extends Vue {
  private query: Array<Object> = [];
  private roleName: string = "";
  private visible: boolean = false;
  private form: FORM = {
    roleName: "",
    remark: ""
  };
  public searchRole() {
    this.query = [];
    this.query = this.query.concat([{ roleName: this.roleName }]);
    this.$nextTick(() => {
      (this.$refs.oaTable as any).$getTableData();
    });
  }
  mounted() {
    (this.$refs.oaTable as any).$getTableData();
  }
}
</script>

<style></style>
