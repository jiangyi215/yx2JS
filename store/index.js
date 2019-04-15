import Vue from "vue"
import Vuex from "vuex"

import Gt from "./plugin/gt"
import user from "./module/user"

Vue.use(Vuex)
Vue.use(Gt)

export default new Vue.Store({
  state: {},
  mutations: {},
  actions: {},
  module: {
    user
  }
})