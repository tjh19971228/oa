import { getUserTableData } from "@/api/system";
import { getToken } from "@/utils/auth";
import showTableData from "@/components/dialog/index";
export default {
  components: {
    showTableData
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
      selectOptions: [
        {
          label: "ID",
          value: "id"
        },
        {
          label: "用户名",
          value: "username"
        },
        {
          label: "身份证",
          value: "idcards"
        },
        {
          label: "qq",
          value: "qq"
        },
        {
          label: "微信",
          value: "weixin"
        },
        {
          label: "部门ID",
          value: "apartmentId"
        },
        {
          label: "手机号",
          value: "phone"
        }
      ],
      // 数据加载中
      loading: false,
      // 是否显示表格弹窗
      isShowTableData: false,
      // 表格弹窗标题
      tableDataTitle: "",
      // 传输的表格数据
      form: {},
      // 是否可以编辑表格数据
      isEdit: false,
      // 当前表格处于第几页
      page: 1,
      //   总共的数据数
      total: 0,
    //   
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
    // 头像处理
    imgCut(url){
        url=url.replace(/#/g,"")
        url=url.replace(/ /g,"")
        return url
    },
    // 查看用户
    check(item) {
      console.log("item", item);
      this.isShowTableData = true;
      this.tableDataTitle = "查看用户";
      this.form = item;
      console.log("this.form", this.form);
    },
    // 编辑用户
    edit(item, index) {
      this.isShowTableData = true;
      this.tableDataTitle = "编辑用户";
      this.form = item;
      this.isEdit = true;
    },
    // 删除用户
    deleteUser(item, index) {
      this.$confirm("是否确定删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.tableData.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //新建用户
    newUser() {
      this.isShowTableData = true;
      this.form = {};
      this.tableDataTitle = "新建用户";
      this.isEdit = true;
    },
    // 关闭表格弹窗
    closeShowTableData(data = undefined) {
      this.isShowTableData = false;
      this.isEdit = false;
      // 如果有传递的数据，说明是新增操作
      if (data) {
        this.tableData.unshift(data);
      }
    },
    async getTableData() {
      this.loading = true;
      let {page}=this
      console.log({page})
      await getUserTableData(JSON.stringify({page})).then(res => {
        this.total=res.total
        setTimeout(() => {
          this.loading = false;
          this.tableData = res.data;
        }, 2000);
      });
    },
    // 数据分页方法
    pageChange(val) {
      this.page = val;
      this.getTableData();
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
