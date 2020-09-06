import { getUserTableData, getOrganzitionTree ,editUser} from "@/api/system.ts";
import { LABELLIST, SELECTOPTIONS, SEARCHTYPE } from "./variable";
import showTableData from "./components/dialog/index";
const INITPARAMS = () => ({
  cursor: 0,
  deptId: 1282333239024947200,
  email: "",
  idCard: "",
  limit: 0,
  mobile: "",
  qq: "",
  sex: "",
  username: "",
  wechat: ""
});
const EDITFORM = () => ({
  avatar: "",
  birthday: "",
  email: "",
  idCard: "",
  mobile: "",
  qq: "",
  sex: "",
  userId: "",
  wechat: ""
});
export default {
  components: {
    showTableData
  },
  data() {
    return {
      searchApartmentValue: "",
      apartmentList: [],
      defaultProps: {
        children: "children",
        label: "deptName"
      },
      //   当前选中的部门标题
      apartmentTitle: "组织机构",
      currentKey: "组织机构",
      // 搜索的类型
      searchType: 0,
      // 搜索的表格ID/用户名
      searchVal: "",
      // 表格数据
      tableData: [],
      // 表格表头列表
      labelList: LABELLIST,
      selectOptions: SELECTOPTIONS,
      // 数据加载中
      loading: false,
      // 是否显示表格弹窗
      isShowTableData: false,
      // 表格弹窗标题
      tableDataTitle: "",
      // 传输的表格数据
      form: INITPARAMS(),
      // 是否可以编辑表格数据
      isEdit: false,
      // 当前编辑的ID
      editID:0,
      // 编辑的表单数据
      editForm:EDITFORM(),
      // 当前表格处于第几页
      page: 1,
      //   总共的数据数
      total: 0
      //
    };
  },
  methods: {
    handleNodeClick(data) {
      let deptName = data.deptName;
      this.apartmentTitle = deptName;
      this.form.deptId = data.id;
      this.getTableData();
    },
    getClass(node) {
      return node.data.icon;
    },
    // 头像处理
    imgCut(url) {
      if (url) {
        url = url.replace(/#/g, "");
        url = url.replace(/ /g, "");
        return url;
      }
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
    editUser(item) {
      this.isEdit = true;
      this.editID=item.id;
      Object.keys(item).forEach(key=>{
        if(this.editForm.hasOwnProperty(key)){
          this.editForm[key]=item[key]
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.editForm.avatar = URL.createObjectURL(file.raw);
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
    closeShowTableData(refresh = false) {
      this.isShowTableData = false;
      this.isEdit = false;
      if (refresh) {
        this.getTableData();
      }
    },
    // 关闭编辑
    closeEdit(){
      this.isEdit=false;
      this.editForm=EDITFORM();
    },
    // 确认编辑
    confirmEdit(){
      this.editForm.userId=this.editID;
      editUser(this.editForm).then(res=>{
        if(!res.errcode){
          this.$message.success("修改成功")
          this.isEdit=false
          this.editForm=EDITFORM();
        }
      })
    },
    // 获取列表数据
    async getTableData() {
      this.loading = true;
      this.form = INITPARAMS();
      await getUserTableData(JSON.stringify(this.form)).then(res => {
        this.total = res.result.total;
        setTimeout(() => {
          this.loading = false;
          this.tableData = res.result.records;
        }, 2000);
      });
    },
    // 获取机构树
    async getOrganzitionTree() {
      let res = await getOrganzitionTree();
      this.apartmentList = res.result;
    },
    // 数据分页方法
    pageChange(val) {
      this.page = val;
      this.getTableData();
    },
    // 搜索用户
    search() {
      // 重置页数
      this.form.cursor = 1;
      this.form[SEARCHTYPE[this.searchType]] = this.searchVal;
      this.getTableData();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.treeBox.setCurrentKey("1282333239024947200");
      this.getTableData();
      this.getOrganzitionTree();
    });
  }
};
