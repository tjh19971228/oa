import request from "@/utils/request";
import { data } from "autoprefixer";


export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data: data
  })
}
export function getCaptcha() {
  return request({
    url: "/captcha.jpg",
    responseType: 'arraybuffer',
    method: "get"
  })
}
