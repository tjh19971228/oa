import request from '@/utils/request'

export function getUserTableData(data) {
  return request({
    url: "/mock",
    method: "post",
    data: data
  })
}
