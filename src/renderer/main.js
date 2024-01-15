import Vue from "vue";

import App from "./App";
import router from "./router";
import store from "./store";
import axios from "@/http/axios";
import "./assets/stylesheets/main.less";

// import './assets/stylesheets/_variables.less'
if (!process.env.IS_WEB) Vue.use(require("vue-electron"));

Vue.http = Vue.prototype.$http = axios;

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>",
}).$mount("#app");
