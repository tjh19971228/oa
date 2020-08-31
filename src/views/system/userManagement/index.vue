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
          <span>{{ data.deptName }}</span>
        </span>
      </el-tree>
    </div>
    <div class="rightBox">
      <p class="apartmentTitle">{{ apartmentTitle }}</p>
      <div class="tableArea mt-80 w-100per">
        <div class="searchArea w-100per">
          <el-input
            placeholder="请输入搜索内容"
            v-model="searchVal"
            clearable
            class="w-400"
          >
            <el-select
              v-model="searchType"
              placeholder="请选择"
              class="w-110"
              slot="prepend"
            >
              <el-option
                :key="item.key"
                :label="item.label"
                :value="item.value"
                v-for="item in selectOptions"
              >
              </el-option>
            </el-select>
          </el-input>
          <el-button
            type="primary"
            icon="el-icon-search"
            class="ml-10"
            @click="search"
            >搜索</el-button
          >
          <el-button
            type="success"
            icon="el-icon-plus"
            class="fr mr-20"
            @click="newUser"
            >新建</el-button
          >
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            height="600"
            max-height="100%"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
          >
            <el-table-column
              :label="item.label"
              v-for="(item, index) in labelList"
              :key="index"
              min-width="120"
              align="center"
              fit
            >
              <template slot-scope="scope">
                <p v-if="item.prop != 'avatar'">{{ scope.row[item.prop] }}</p>
                <img :src="imgCut(scope.row[item.prop])" v-else class="round" />
              </template>
            </el-table-column>
            <el-table-column
              fixed="left"
              label="操作"
              width="360"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  type="success"
                  icon="el-icon-view"
                  size="small"
                  @click="check(scope.row)"
                  >查看</el-button
                >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="small"
                  @click="edit(scope.row, scope.$index)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  @click="deleteUser(scope.row, scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            layout="total,prev, pager, next,jumper"
            :total="total"
            background
            class="talign-r mt-20 mr-20"
            @current-change="pageChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- 表格弹窗 -->
    <show-table-data
      :isShowTableData="isShowTableData"
      :title="tableDataTitle"
      @closeShowTableData="closeShowTableData"
      :tableData="form"
      :isEdit="isEdit"
    ></show-table-data>
  </div>
</template>

<script src="./index.js"></script>

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
  width: 78%;
  height: 100%;
  overflow-y: auto;

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
