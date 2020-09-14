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
        :table-data="table"
        :is-edit="isEdit"
        @confirmTable="confirmTable"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import formTable from "./form.vue";
import { registerUser } from "@/api/system";

@Component({
  components: {
    formTable
  }
})
export default class Index extends Vue {
  @Prop({ default: false }) readonly "isShowTableData": boolean;
  @Prop({ default: Object }) readonly "tableData": object;
  @Prop({ default: "" }) readonly "title": string;
  @Prop({ default: false }) readonly "isEdit": boolean;

  private table: object = {};
  private apartmentList: Array<Object> = [];
  @Watch("tableData")
  onTableDataChanged(newVal: Object, oldVal: Object) {
    this.table = newVal;
  }

  public handleClose() {
    this.$emit("closeShowTableData");
  }

  public async confirmTable(data: Object) {
    console.log(data);
    const res = await registerUser(data);
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
