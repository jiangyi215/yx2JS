import axios from "@/libs/api.request"
// 有后端的接口直接改成相应后端接口 即可
// 极验验证demo列表: https://www.geetest.com/demo/
const api = "https://www.geetest.com/demo/gt/register-click"
/**
 * @description 极验验证api
 */
export const getCaptch = () => {
  return axios.request({
    url: api + "?t=" + new Date().getTime(), // t=  随机数防缓存
    method: "get"
  })
}