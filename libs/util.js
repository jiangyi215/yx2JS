import Cookies from "js-cookie";
import config from "@/config";

// cookie 的保存天数
export const setToken = (key, token) => {
  Cookies.set(key, token, { expires: config.cookieExpires || 1 });
};

export const getToken = key => {
  const token = Cookies.get(key);
  if (token) return token;
  else return false;
};

export const removeToken = key => {
  Cookies.remove(key);
};
