<template>
  <div class="dialog">
    <el-dialog
      :title="title"
      :visible.sync="isShowTableData"
      width="60%"
      height="400"
      :before-close="handleClose"
    >
      <form-table
        :tableData="table"
        :isEdit="isEdit"
        @confirmTable="confirmTable"
      ></form-table>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";
import formTable from "./form.vue";
import { registerUser } from "@/api/system";
@Component({
  components: {
    formTable
  }
})
export default class Index extends Vue {
  @Prop(Boolean) readonly "isShowTableData": boolean | false;
  @Prop(Object) readonly "tableData": Object | {};
  @Prop(String) readonly "title": string | "";
  @Prop(Boolean) readonly "isEdit": boolean | false;

  private table: object = {};
  private apartmentList: Array<Object> = [];
  @Watch("tableData")
  onTableDataChanged(newVal: Object, oldVal: Object) {
    this.table = newVal;
  }

  public handleClose() {
    this.$emit("closeShowTableData");
  }
  public async confirmTable(data) {
    console.log(data);
    let res = await registerUser(data);
    if (!res.errcode) {
      this.$message.success("添加成功");
    }
    this.$emit("closeShowTableData", true);
  }
}

// import formTable from "./form.vue";
// export default {
//   props: ["isShowTableData", "title", "tableData","isEdit"],
//   components: {
//     formTable
//   },
//   data() {
//     return {
//       table: {},
//     };
//   },
//   watch: {
//     tableData(newVal, oldVal) {
//       this.table = newVal;
//       console.log("newVal",newVal)
//     }
//   },
//   methods: {
//     handleClose() {
//       this.$emit("closeShowTableData");
//     },
//     confirmTable(data) {
//       console.log("data",data)
//       // 新增数据
//       this.$emit("closeShowTableData",data);
//     }
//   }
// };
</script>

<style lang="scss" scoped>
.dialog {
  >>> .el-dialog__title {
    font-size: 28px;
    font-weight: bold;
    margin: 20px;
    display: block;
  }
}
</style>
