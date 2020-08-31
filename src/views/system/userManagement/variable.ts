const LABELLIST: object[] = [
  {
    label: "id",
    prop: "id"
  },
  {
    label: "用户名",
    prop: "username"
  },
  {
    label: "身份证",
    prop: "idCard"
  },
  {
    label: "qq",
    prop: "qq"
  },
  {
    label: "微信",
    prop: "wechat"
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
    label: "邮箱",
    prop: "email"
  },
  {
    label: "年龄",
    prop: "age"
  },
  {
    label: "手机号",
    prop: "mobile"
  }
];

const SELECTOPTIONS = [
  {
    label: "部门ID",
    value: 0
  },
  {
    label: "邮箱",
    value: 1
  },
  {
    label: "身份证",
    value: 2
  },
  {
    label: "手机号",
    value: 3
  },
  {
    label: "qq",
    value: 4
  },
  {
    label: "sex",
    value: 5
  },
  {
    label: "用户名",
    value: 6
  },

  {
    label: "微信",
    value: 7
  }
];

const SEARCHTYPE = [
  "deptId",
  "email",
  "idCard",
  "mobile",
  "qq",
  "sex",
  "username",
  "wechat"
];
module.exports = {
  LABELLIST,
  SELECTOPTIONS,
  SEARCHTYPE
};
