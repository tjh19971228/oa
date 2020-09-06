import myTable from "../components/table/index"
import myDialog from "@/components/dialog/index"
import Vue from "vue"
export const oaTable = {
  install: function (val) {
    Vue.component('oaTable', myTable)
  }
}

export const oaDialog = {
  install: function (val) {
    Vue.component('oaDialog', myDialog)
  }
}

