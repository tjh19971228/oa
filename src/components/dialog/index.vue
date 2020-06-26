<template>
  <div class="dialog">
    <el-dialog
      :title="title"
      :visible.sync="isShowTableData"
      width="60%"
      height="400"
      :before-close="handleClose"
    >
      <form-table :tableData="table" :isEdit="isEdit" @confirmTable="confirmTable"></form-table>
    </el-dialog>
  </div>
</template>

<script>
import formTable from "./form.vue";
export default {
  props: ["isShowTableData", "title", "tableData","isEdit"],
  components: {
    formTable
  },
  data() {
    return {
      table: {},
    };
  },
  watch: {
    tableData(newVal, oldVal) {
      this.table = newVal;
      console.log("newVal",newVal)
    }
  },
  methods: {
    handleClose() {
      this.$emit("closeShowTableData");
    },
    confirmTable(data) {
      console.log("data",data)
      // 新增数据
      this.$emit("closeShowTableData",data);
    }
  }
};
</script>

<style lang="scss" scoped>
    .dialog{
        >>> .el-dialog__title{
            font-size: 28px;
            font-weight: bold;
            margin: 20px;
            display: block;
        }
    }
</style>
