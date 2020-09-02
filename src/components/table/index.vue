<template>
  <div v-loading="isLoading">
    <el-table
      :data="dataList"
      stripe
      :highlight-current-row="false"
      :width="width"
      :border="border"
    >
      <slot></slot>
    </el-table>
    <div class="page-bar">
      <div class="fl" slot="footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
      <el-pagination
        v-else
        class="fr mt-80"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pg"
        :page-sizes="pageSizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
interface PAGE {
  pg: number;
  size: number;
  total: number;
}
class PARAMS {
  cursor: number;
  limit: number;
  [key: string]: number | string;
  constructor() {
    this.cursor = 1;
    this.limit = 10;
  }
}
import { Vue, Component, Prop } from "vue-property-decorator";
import request from "@/utils/request";
@Component
export default class oaTable extends Vue {
  @Prop({ default: "" }) readonly "url": string;
  @Prop({ default: [] }) readonly "queryArray": Array<Object>;
  @Prop({ default: false }) readonly "autoFetch": boolean;
  @Prop({ default: "暂无数据" }) readonly "emptyText": string;
  @Prop({ default: 20 }) readonly "defaultPageSize": number;
  @Prop({ default: 520 }) readonly "width": number;
  @Prop({ default: true }) readonly "border": boolean;

  private isLoading: boolean = false;
  private pageSizes: Array<Number> = [10, 20, 30, 50, 100, 200, 300, 500, 1000];
  private dataList: Array<any> = [];
  private page: PAGE = {
    pg: 1,
    size: 20,
    total: 0
  };

  public setSearchForm() {
    if (this.url) {
      this.requestTableData();
    }
  }

  public requestTableData() {
    this.isLoading = true;
    const params = new PARAMS();
    params.cursor = this.page.pg;
    params.limit = this.page.size;
    this.queryArray.forEach((item: any) => {
      Object.keys(item).forEach((i: any) => {
        params[i] = item[i];
      });
    });
    request({
      url: this.url,
      data: params,
      method: "post"
    }).then((res: any) => {
      this.dataList = res.result.records;
      this.isLoading = false;
      this.page.total = res.result.total;
    });
  }

  public handleSizeChange(size: number) {
    this.page.size = size;
    this.requestTableData();
  }

  public handleCurrentChange(pg: number) {
    this.requestTableData();
  }

  public $getTableData() {
    this.setSearchForm();
  }

  mounted() {
    if (this.defaultPageSize) {
      this.page.size = this.defaultPageSize;
    }
    if (this.autoFetch) {
      this.setSearchForm();
    }
  }
}
</script>

<style></style>
