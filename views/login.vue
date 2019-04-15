<!-- 登录页使用极验验证 演示 -->
<template>
  <div class="login">
    <!-- #captcha 显示极验验证 -->
    <div id="captcha"></div>
    <div v-show="waitShow" id="wait">正在加载极验...</div>
    <!-- Form布局可参见iview的Form表单及其验证 此处为简单演示-->
    <div>
      <p>用户名: <Input v-model="form.name" type="text" placeholder="输入用户名"></Input></p>
      <p>密码：<Input v-model="form.password" type="password" placeholder="输入密码"></Input></p>
    </div>
    <div @click="loginBtn">登录</div>
  </div>
</template>
<script>
/** 在需要进行请求接口的页面 使用axios
 *  极验验证demo列表: https://www.geetest.com/demo/
 * 极验验证接口↓↓↓: 
 * https://www.geetest.com/demo/gt/register-click 更多详情参见极验官网 https://www.geetest.com/
 * 有后端的接口直接改成相应后端接口 即可
 * 请求返回的res 根据具体返回数据操作获取极验所必不可少的返回参数值(gt, challenge,new_captcha,success)
 * t=(new Date()).getTime()  // 加随机数防止缓存
 */
import gtInit from "@/gt/gt-1"; // 可将gt-1改名为gt
export default {
  name: "login",
  data() {
    return {
      waitShow: true,
      form: {}, // 表单
      captchaObj: {},
      result: {} // 是否已验证极验
    }
  },
  created() {
    this.getInitGtTest()
  },
  methods: {
    getInitGtTest() {
      this.$http.get("https://www.geetest.com/demo/gt/register-click?t="+ (new Date()).getTime())
      .then(res => {
        if (res.status === 200) {
          const data = res.data
          window.initGeetest({
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success, // 用户后台检测极验服务器是否宕机
            new_captcha: data.new_captcha, // 用于宕机时表示新验证码的宕机是
            product: "float", // 产品形式, float, popup
            width: "100%" //  width: "300px" 极验显示宽度
          }, captchaObj => { // 箭头函数 若使用function 使用this报错
            this.captchaObj = captchaObj
            captchaObj.appendTo("#captcha");
            captchaObj.onReady(() => {
              this.waitShow = false // 隐藏等待提示
            });
            captchaObj.onSuccess(() => {
              /**
               * 将极验结果赋值给result 便于在点击登录按钮时做判断 是否已经完成极验
               */
              this.result = captchaObj.getValidate(); 
            });
            captchaObj.onError(() => {
              this.$Message.error("出错啦, 请稍后重试!");
            })
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    loginBtn() {
      // 1.点击登录按钮判断是否已完成极验 及其他 相关参数 如 用户名或者密码
      // 2. 加上验证用户名和密码验证的方式，若是使用iveiw 详见iview官网Form表单的validate验证 或者其他验证方式 此处只是极验 演示
      if (!this.result) {
        // 使用iview 方可使用此写法  可用alert("...") 或者console.log("...") 或者elementUI的错误提示方式
        return this.$Message.error("请完成极验验证!")
      } else {
        let form = {
          name: this.form.name,
          password: this.form.password,
          geetest_challenge: this.result.geetest_challenge,
          geetest_validate: this.result.geetest_validate,
          geetest_seccode: this.geetest_seccode
        }
        this.$http.post("登录接口", form).then(res => {
          console.log(res)
          if ("如果登录成功") {
            // ...
          } else {
            // 登录失败
            this.captchaObj.reset() // 极验重置 此方法楼主未用到  想试试的小伙伴可以这样用试试哈
          }
        }).catch(err => {
          console.log(err)
        })
      }
      
    }
  }
}
</script>

