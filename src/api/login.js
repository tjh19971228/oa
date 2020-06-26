import request from "@/utils/request";
import { data } from "autoprefixer";

export function getCaptcha() {
  return request({
    url: "/captcha.jpg",
    responseType: "arraybuffer",
    method: "get"
  });
}
export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data: data
  })
}
