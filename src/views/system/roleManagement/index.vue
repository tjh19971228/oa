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
          <el-button type="success" class="fr" @click="showDialog"
            >新建角色</el-button
          >
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
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="editRole(scope.row.id)"
                  >编辑</el-button
                >
                <el-button type="text" @click="delRole(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </oa-table>
        </el-col>
      </el-row>
    </el-container>
    <oa-dialog
      :title="isEdit ? '编辑角色' : '新建角色'"
      :visible.sync="visible"
      @closed="closeEdit"
      ref="editForm"
    >
      <div>
        <el-form :form="editForm" :rules="rules">
          <el-form-item
            v-for="(item, index) in labelList"
            :key="index"
            :label="item.label"
            required
          >
            <el-input v-model.lazy="editForm[item.value]"></el-input>
          </el-form-item>
          <p>
            <span style="color:#ff0113;">* </span
            ><span style="font-weight:bold;">菜单权限</span>
          </p>
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            @check-change="handleCheckChange"
          >
            <span slot-scope="{ data }">
              <span>{{ MENUS[data.menuName] }}</span>
            </span>
          </el-tree>
        </el-form>
      </div>
      <div slot="footer">
        <el-button icon="el-icon-check" type="primary" @click="confirmAdd"
          >确认</el-button
        >
      </div>
    </oa-dialog>
  </div>
</template>

<script lang="ts">
import {
  addRole,
  getRoleDetail,
  editRole,
  removeRole,
  getMenuList
} from "../../../api/system";
import { MENUS } from "./variable";
class FORM {
  roleName: string;
  remark: string;
  menuIds: Array<string>;
  [key: string]: String | Array<string>;
  constructor() {
    this.roleName = "";
    this.remark = "";
    this.menuIds = [];
  }
}
class LABEL {
  label: string;
  value: string;
  constructor() {
    this.label = "";
    this.value = "";
  }
}
const LABELLIST: Array<LABEL> = [
  { label: "角色名", value: "roleName" },
  { label: "备注", value: "remark" }
];

interface RULE {
  required: boolean;
  message: string;
  trigger: string;
  validator?: Function;
}
class RULES {
  [key: string]: Array<RULE>;
}
import { Vue, Component } from "vue-property-decorator";
@Component
export default class roleManagement extends Vue {
  private query: Array<Object> = [];
  private roleName: string = "";
  private visible: boolean = false;
  private form: FORM = new FORM();
  private editForm: FORM = new FORM();
  private labelList = LABELLIST;
  private isEdit: boolean = false;
  private MENUS = MENUS;
  private defaultProps: object = {
    children: "children",
    label: "label"
  };
  private menuList: Array<Object> = [];
  private rules: RULES = {
    roleName: [
      {
        required: true,
        message: "请输入角色名",
        trigger: "blur"
      }
    ],
    remark: [
      {
        required: true,
        message: "请输入角色备注",
        trigger: "blur"
      }
    ]
  };
  public searchRole() {
    this.query = [];
    this.query = this.query.concat([{ roleName: this.roleName }]);
    this.$nextTick(() => {
      (this.$refs.oaTable as any).$getTableData();
    });
  }
  public showDialog() {
    this.visible = true;
  }
  /**
   *  onClosed
   */
  public closeEdit() {
    this.visible = false;
    this.editForm = new FORM();
  }
  public confirmAdd() {
    try {
      Object.keys(this.editForm).forEach((item, index) => {
        if (!this.editForm[item]) {
          let message = ["角色名", "备注","部门"][index];
          this.$message.error(`${message}不能为空`);
          throw new Error();
        }
      });
    } catch (e) {
      return;
    }
    if (!this.isEdit) {
      addRole(this.editForm).then((res: any) => {
        if (!res.errcode) {
          this.$message.success("新建成功");
          this.visible = false;
          this.form=new FORM();
          this.$nextTick(() => {
            (this.$refs.oaTable as any).$getTableData();
          });
        }
      });
    } else {
      editRole(this.editForm).then((res: any) => {
        if (!res.errcode) {
          this.$message.success("编辑成功");
          this.editForm=new FORM();
          this.visible = false;
          this.$nextTick(() => {
            (this.$refs.oaTable as any).$getTableData();
          });
        }
      });
    }
  }
  public editRole(id: string) {
    this.isEdit = true;
    this.visible = true;
    getRoleDetail(id).then((res: any) => {
      this.editForm.remark = res.result.remark;
      this.editForm.roleName = res.result.roleName;
      this.editForm.id = res.result.id;
    });
  }
  public delRole(id: string) {
    removeRole(id).then((res: any) => {
      if (!res.errcode) {
        this.$message.success("删除成功");
        this.$nextTick(() => {
          (this.$refs.oaTable as any).$getTableData();
        });
      }
    });
  }
  public handleCheckChange(data: any, checked: any, indeterminate: any) {
    let getId = (data: any) => {
      if(!this.editForm.menuIds.includes(data.id)){
        this.editForm.menuIds.push(data.id);
      }
      if (data.children && data.children.length) {
        data.children.forEach((item: any) => {
          getId(item);
        });
      }
    };
    if (data && !indeterminate) {
      getId(data);
    }

  }
  mounted() {
    (this.$refs.oaTable as any).$getTableData();
    getMenuList().then((res: any) => {
      this.menuList = res.result;
    });
  }
}
</script>

<style></style>
