import { gtCaptcha } from "@/api/user" // 路径取决于你放置的位置 @在vue.config.js中配置src别名
export default {
  state: {},
  mutations: {},
  actions: {
    getCaptcha() {
      return new Promise((resolve, reject) => {
        gtCaptcha()
          .then(res => {
            if (res.status === 200) {
              const data = res.data;
              window.initGeetest(
                {
                  gt: data.gt,
                  challenge: data.challenge,
                  offline: !data.success,
                  new_captcha: data.new_captcha,
                  product: "bind", // 绑定用法, 点击登录按钮弹出绑定验证, 显示普通滑动极验验证 参见login.vue
                  width: "100%"
                },
                captchaObj => {
                  resolve(captchaObj);
                }
              );
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
}