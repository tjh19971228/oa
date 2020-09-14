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
// 编辑用户
export function editUser(data: object) {
  return request({
    url: "/api/user/update",
    method: "post",
    data
  });
}

//获取用户详情
export function getUserDetail(id: string) {
  return request({
    url: `/api/user/detail?userId=${id}`,
    method: "get"
  });
}

// 获取角色列表
export function getRoleList(data: object): any {
  return request({
    url: "/api/role/list",
    method: "post",
    data
  });
}

// 新建角色
export function addRole(data: object) {
  return request({
    url: "/api/role/add",
    method: "post",
    data
  });
}

// 获取角色详情
export function getRoleDetail(roleId: string) {
  return request({
    url: `/api/role/detail?id=${roleId}`,
    method: "get"
  });
}
// 编辑角色
export function editRole(data: object) {
  return request({
    url: "/api/role/update",
    method: "post",
    data
  });
}

// 删除角色
export function removeRole(roleId: string) {
  return request({
    url: `/api/role/remove?id=${roleId}`,
    method: "get"
  });
}

// 获取菜单树
export function getMenuList(){
  return request({
    url:'/api/menu/get-tree',
    method:"get"
  })
}