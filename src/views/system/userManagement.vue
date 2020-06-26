<template>
  <div class="container d-flex pos-absolute">
    <div class="leftBox  p-20 align-center">
      <el-select
        v-model="searchApartmentValue"
        filterable
        remote
        reserve-keyword
        clearable
        placeholder="输入要搜索的部门"
        class="m-center mt-20  w-80per"
        prefix-icon="el-icon-search"
      >
      </el-select>
      <el-tree
        :data="apartmentList"
        default-expand-all
        node-key="id"
        @node-click="handleNodeClick"
        :props="defaultProps"
        :current-node-key="currentKey"
        :highlight-current="true"
        :expand-on-click-node="false"
        class="m-25"
        ref="treeBox"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span
            ><i class="icon" :class="getClass(node)"></i>{{ node.label }}</span
          >
        </span>
      </el-tree>
    </div>
    <div class="rightBox">
      <p class="apartmentTitle">{{ apartmentTitle }}</p>
      <div class="tableArea mt-80 w-100per">
        <div class="searchArea w-100per">
          <el-select v-model="searchType" placeholder="请选择" class="w-10per">
            <el-option :key="item.key" :label="item.label" :value="item.label" v-for="(item,index) in selectOptions" > </el-option>
          </el-select>
          <el-input
            placeholder="请输入搜索内容"
            v-model="searchVal"
            clearable
            class="w-15per"
          >
          </el-input>
          <el-button type="primary" icon="el-icon-search" class="ml-10"
            >搜索</el-button
          >
          <el-button type="success" icon="el-icon-plus" class="fr mr-20" @click="newUser">新建</el-button>
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            height="700"
            max-height="100%"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
          >
            <el-table-column
              :prop="item.prop"
              :label="item.label"
              v-for="(item, index) in labelList"
              :key="index"
              min-width="120"
              align="center"
              fit
            >
            </el-table-column>
            <el-table-column
              fixed="left"
              label="操作"
              width="360"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="success" icon="el-icon-view"  size="small" @click="check(scope.row)">查看</el-button>
                <el-button type="primary" icon="el-icon-edit" size="small"  @click="edit(scope.row,scope.$index)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="small"  @click="deleteUser(scope.row,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- 表格弹窗 -->
    <show-table-data :isShowTableData="isShowTableData" :title="tableDataTitle" @closeShowTableData="closeShowTableData" :tableData="form" :isEdit="isEdit"></show-table-data>
  </div>
</template>

<script>
import { getUserTableData } from "@/api/system";
import { getToken } from "../../utils/auth";
import showTableData from "../../components/dialog/index"
export default {
  components:{
    showTableData,
  },
  data() {
    return {
      searchApartmentValue: "",
      apartmentList: [
        {
          id: "1",
          label: "监事",
          icon: "iconfont iconkx-jianshihui",
          children: [
            {
              id: "1-1",
              label: "总经理",
              icon: "iconfont iconOffice"
            },
            {
              id: "1-2",
              label: "部门经理/总管",
              icon: "iconfont iconzhuguan"
            }
          ]
        },
        {
          id: "2",
          label: "人事部",
          icon: "iconfont iconrenshibu",
          children: [
            {
              id: "2-1",
              label: "行政",
              icon: "iconfont iconxingzheng"
            },
            {
              id: "2-2",
              label: "人事",
              icon: "iconfont iconrenshi"
            }
          ]
        },
        {
          id: "3",
          label: "财务部",
          icon: "iconfont iconhuiji",
          children: [
            {
              id: "3-1",
              label: "会计",
              icon: "iconfont iconhuiji"
            }
          ]
        },
        {
          id: "4",
          label: "销售部",
          icon: "iconfont iconxiaoshou",
          children: [
            {
              id: "4-1",
              label: "电话销售",
              icon: "iconfont icondianhuaxiaoshou"
            },
            {
              id: "4-2",
              label: "直销",
              icon: "iconfont iconzhixiaoxiangmu"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      //   当前选中的部门标题
      apartmentTitle: "总经理",
      currentKey: "总经理",
      // 搜索的类型
      searchType: "ID",
      // 搜索的表格ID/用户名
      searchVal: "",
      // 表格数据
      tableData: [],
      // 表格表头列表
      labelList: [
        {
          label: "id",
          prop: "key"
        },
        {
          label: "用户名",
          prop: "username"
        },
        {
          label: "密码",
          prop: "password"
        },
        {
          label: "身份证",
          prop: "idcard"
        },
        {
          label: "qq",
          prop: "qq"
        },
        {
          label: "微信",
          prop: "weixin"
        },
        {
          label: "部门id",
          prop: "dept_id"
        },
        {
          label: "性别",
          prop: "sex"
        },
        {
          label: "头像",
          prop: "avatar"
        },
        {
          label: "年龄",
          prop: "age"
        },
        {
          label: "手机号",
          prop: "phone"
        },
        {
          label: "地址",
          prop: "address"
        },
        {
          label: "创建者",
          prop: "create_by"
        },
        {
          label: "创建时间",
          prop: "create_time"
        },
        {
          label: "上次更新者",
          prop: "last_update_by"
        },
        {
          label: "上次更新时间",
          prop: "last_update_time"
        },
        {
          label: "是否已删除",
          prop: "del_flag"
        }
      ],
      selectOptions:[{
        label:"ID",
        value:"id"
      },{
        label:"用户名",
        value:"username"
      },{
        label:"身份证",
        value:"idcards"
      },{
        label:"qq",
        value:"qq"
      },{
        label:"微信",
        value:"weixin"
      },{
        label:"部门ID",
        value:"apartmentId"
      },{
        label:"手机号",
        value:"phone"
      }],
      // 数据加载中
      loading: false,
      // 是否显示表格弹窗
      isShowTableData:false,
      // 表格弹窗标题
      tableDataTitle:"",
      // 传输的表格数据
      form:{},
      // 是否可以编辑表格数据
      isEdit:false
    };
  },
  methods: {
    handleNodeClick(data) {
      let label = data.label;
      switch (label) {
        case "监事":
          this.apartmentTitle = "总经理";
          break;
        case "人事部":
          this.apartmentTitle = "行政";
          break;
        case "财务部":
          this.apartmentTitle = "会计";
          break;
        case "销售部":
          this.apartmentTitle = "电话销售";
          break;
        default:
          this.apartmentTitle = label;
      }
      this.getTableData();
    },
    getClass(node) {
      return node.data.icon;
    },
    // 查看用户
    check(item) {
      console.log("item",item)
      this.isShowTableData=true
      this.tableDataTitle="查看用户"
      this.form=item
      console.log("this.form",this.form)
    },
    // 编辑用户
    edit(item,index){
      this.isShowTableData=true
      this.tableDataTitle="编辑用户"
      this.form=item
      this.isEdit=true
    },
    // 删除用户
    deleteUser(item,index){
       this.$confirm('是否确定删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
                this.tableData.splice(index,1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },
    //新建用户 
    newUser(){
      this.isShowTableData=true
      this.form={}
      this.tableDataTitle="新建用户"
      this.isEdit=true
    },
    // 关闭表格弹窗
    closeShowTableData(data=undefined){
      this.isShowTableData=false
      this.isEdit=false
      // 如果有传递的数据，说明是新增操作
      if(data){
        this.tableData.unshift(data)
      }
    },
    async getTableData() {
      this.loading = true;
      await getUserTableData().then(res => {
        setTimeout(() => {
          this.loading = false;
          this.tableData = res.data;
        }, 2000);
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.treeBox.setCurrentKey("1-1");
      let { apartmentTitle } = this;
      this.getTableData();
    });
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
.leftBox {
  width: 20%;
  height: 100%;

  >>> .el-tree-node {
    margin-top: 20px;
  }
  .icon {
    margin-right: 10px;
    font-size: 24px !important;
    line-height: 26px;
  }
}

.rightBox {
  width: 80%;
  height: 100%;

  .apartmentTitle {
    font-weight: bold;
    font-size: 36px;
    margin-top: 40px;
  }

  .tableArea {
    .searchArea {
      height: 80px;
    }
    >>> .el-table__body-wrapper::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      /**/
    }
    >>> .el-table__body-wrapper::-webkit-scrollbar-track {
      background: rgba(239, 239, 239, 0);
      border-radius: 2px;
    }
    >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
      background: #9873b9;
      border-radius: 10px;
    }
    >>> .el-table__fixed-right {
      height: 100% !important;
    }
    >>> .el-table--scrollable-y {
      .el-table__fixed-body-wrapper {
        bottom: 1px;
        max-height: none !important;
      }
    }
    // >>> .el-table--scrollable-x {
    //   .el-table__fixed-body-wrapper {
    //     bottom: 8px;
    //     max-height: none !important;
    //   }
    // }
  }
}
</style>
