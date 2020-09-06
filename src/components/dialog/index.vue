<template>
  <el-dialog
    :visible.sync="showDialog"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :append-to-body="appendToBody"
    :show-close="showClose"
    :center="center"
    :top="top"
    @closed="onClosed"
  >
    <div slot="title">
      <slot name="title" v-if="$slots.title"></slot>
      <template v-else>{{ title }}</template>
    </div>
    <div>
      <slot></slot>
    </div>
    <div slot="footer" v-if="$slots.footer" style="width:100%;text-align:right;"> 
      <slot name="footer"></slot>
    </div>
    <div slot="footer" v-else>
      <el-button type="danger" @click="onClickCancel" icon="el-icon-close">{{
        cancelText
      }}</el-button>
      <el-button type="primary" @click="onClickConfirm" icon="el-icon-check">{{
        confirmText
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
@Component
export default class oaDialog extends Vue {
  @Prop({ default: "弹窗", required: true }) readonly "title": string;
  @Prop({ default: true }) readonly "center": boolean;
  @Prop({ default: "520" }) readonly "width": string;
  @Prop({ default: "确认" }) readonly "confirmText": string;
  @Prop({ default: "取消" }) readonly "cancelText": string;
  @Prop({ default: "100px" }) readonly "top": string;
  @Prop({ default: false }) readonly "visible": boolean;
  @Prop({ default: false }) readonly "appendToBody": boolean;
  @Prop({ default: true }) readonly "closeOnClickModal": boolean;
  @Prop({ default: true }) readonly "showClose": boolean;
  // @Prop(Function) readonly "onClose" :Function;
  private showDialog: boolean = false;

  @Watch("visible")
  onChangeVisible(newVal: boolean, oldVal: boolean) {
    console.log(newVal);
    this.showDialog = newVal;
  }

  @Emit("click-cancel")
  public onClickCancel() {}

  @Emit("click-confirm")
  public onClickConfirm() {}
  @Emit("closed")
  public onClosed() {
    this.showDialog=false
  }


}
</script>

<style></style>
