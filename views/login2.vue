<!-- 登录页使用极验验证 演示2 -->
<template>
  <div class="login">
    <!-- Form布局可参见iview的Form表单及其验证 此处为简单演示-->
    <Form ref="loginForm" :model="form" :rules="rules">
      <FormItem prop="userName">
        <Input
          v-model="form.userName"
          placeholder="用户名/手机号"
          :maxlength="11"
        >
          <Icon slot="prefix" custom="yxi yx-user-name" :size="24"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password" class="login-form-item">
        <Input v-model="form.password" :type="pwdType" placeholder="密码">
          <Icon slot="prefix" :custom="pwdCustom[eyeIndex]" :size="24"></Icon>
          <Icon
            slot="suffix"
            :custom="eyeCustom[eyeIndex]"
            :size="24"
            @click="changeEye(eyeIndex)"
          >
          </Icon>
        </Input>
      </FormItem>
    </Form>
    <div @click="loginBtn('loginForm')">登录</div>
  </div>
</template>
<script>
/** 使用vuex */
import { mapActions } from "vuex"
export default {
  name: "login",
  data() {
    return {
      form: {}, // 表单
      result: {},
      rules: {} // 表单规则验证 详见iview -Form
    }
  },
  created() {},
  methods: {
     ...mapActions(["getGtCaptcha"]),
     // 极验验证
    getInitGtTest() {
      this.getGtCaptcha().then(res => {
        res
          .onReady(() => {
            res.verify(); // 可以调用该接口进行验证
          })
          .onSuccess(() => {
            let result = res.getValidate()
            if (!result) {
              return this.$Message.error("请完成验证!");
            }
            console.log(result.geetest_challenge);
            console.log(res.getValidate().geetest_validate);
            console.log(result.geetest_seccode);
            console.log(this.form);
            // 调用登录接口  传参  form & result 成功后返回
            this.$Message.success("登录成功!");
            this.$router.push({ path: "/home" });
          })
          .onError(() => {
            this.$Message.error("出错啦, 请稍后重试!");
          });
      });
    },
    loginBtn(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getInitGtTest()
        } else {
          this.$Message.error("登录失败!")
        }
      })
    }
  }
}
</script>

