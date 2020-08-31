import request from "@/utils/request";

// 获取用户数据列表
export function getUserTableData(data: object): any {
  return request({
    url: "/api/user/list",
    method: "post",
    data
  });
}

// 获取机构树
export function getOrganzitionTree(): any {
  return (request as any)({
    url: "/api/dept/get-tree",
    methods: "get"
  });
}

// 注册用户
export function registerUser(data: object): any {
  return request({
    url: "/api/user/add",
    method: "post",
    data
  });
}
