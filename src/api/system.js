import request from '@/utils/request'

export function getUserTableData(data) {
  return request({
    url: "/mock",
    method: "get",
    data: data
  })
}
