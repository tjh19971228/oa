<template>
  <div class="container d-flex pos-absolute">
    <div class="leftBox p-20 align-center">
      <el-select
        v-model="searchApartmentValue"
        filterable
        remote
        reserve-keyword
        clearable
        placeholder="输入要搜索的部门"
        class="m-center mt-20 w-80per"
        prefix-icon="el-icon-search"
      ></el-select>
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
        <span class="custom-tree-node" slot-scope="{ data }">
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
              ></el-option>
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
                  @click="editUser(scope.row)"
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
          ></el-pagination>
        </div>
      </div>
    </div>

    <!-- 添加表格弹窗 -->
    <show-table-data
      :isShowTableData="isShowTableData"
      :title="tableDataTitle"
      @closeShowTableData="closeShowTableData"
      :tableData="form"
    ></show-table-data>

    <!-- 编辑表格弹窗 -->
    <oa-dialog
      :title="'编辑用户资料'"
      :width="'520'"
      :visible="isEdit"
      @closed="isEdit = false"
    >
      <el-form :label-position="'top'" :label-width="'110'">
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://47.100.25.217:9001/api/file/add"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="editForm.avatar" :src="editForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="editForm.sex" label="男">男</el-radio>
          <el-radio v-model="editForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="出生日期" required>
          <el-date-picker
            v-model="editForm.birthday"
            type="date"
            placeholder="选择出生日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证" required>
          <el-input v-model="editForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="手机号" required>
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="editForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="微信" required>
          <el-input v-model="editForm.wechat"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="width:100%;text-align:right;">
        <el-button type="info" icon="el-icon-close" @click="closeEdit"
          >取消</el-button
        >
        <el-button type="primary" icon="el-icon-check" @click="confirmEdit"
          >确定</el-button
        >
      </div>
    </oa-dialog>

    <!-- 查看用户 -->
    <oa-dialog
      :title="'查看用户详情'"
      :width="'520'"
      :visible="isCheck"
      @closed="isCheck = false"
    >
      <el-form label-position="top">
        <el-form-item
          v-for="(value, key,index) in checkForm"
          :key="index"
          :label="checkLabel[index]"
        >
          <el-input v-model="checkForm[key]" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="danger" @click="closeCheck" icon="el-icon-close">关闭</el-button>
      </div>
    </oa-dialog>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
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
