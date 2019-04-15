<template>
  <div class="qr-code">
    <div id="qrcode"></div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {}
  },
  methods: {
    // 绘制二维码
    getQrcode() {
      this.$nextTick(() => {
        document.getElementById("qrcode").innerHTML = "";
        new QRCode("qrcode", {
          width: 180,
          height: 180,
          text: "My Name is 钙片",
          render: "canvas", // 渲染方式：table & canvas( 默认)
          colorDark: "#000", // 前景色
          colorLight: "#fff" // 背景色
        });
        /**
         * qrcode.clear(); // clear the code
         * qrcode.makeCode("http://naver.com"); // make another code.
         */
      });
    }
  }
};
</script>
<style lang="less">
 .qr-code {
    margin: auto;
    width: 200px;
    height: 200px;
    padding: 10px;
    background: #f2f2f2;
  }
</style>
