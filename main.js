import Vue from "vue";
import axios from "axios";

Vue.prototype.$http = axios; // $http 为自己定义的名字,随你喜欢
// or Vue.prototype.$axios = axios;  
// or Vue.prototype.axios = axios;


