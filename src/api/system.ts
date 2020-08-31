import request from '@/utils/request'

export function getUserTableData(data):any{
  return request({
    url: "/api/user/list",
    method: "post",
    data: data
  })
}

export function getOrganzitionTree():any{
  return request({
    url:"/api/dept/get-tree",
    methods:"get"
  })
}
