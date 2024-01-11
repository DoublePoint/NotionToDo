import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import './assets/stylesheets/main.less'

// import './assets/stylesheets/_variables.less'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

// axios.interceptors.request.use(
//   config => {
//     //config.data = JSON.stringify(config.data);  
//     config.headers['Notion-Version'] = '2022-06-28';
//     config.headers['Authorization'] = 'Bearer secret_JyUmwx8aJ3tnUKQKPwzslMOqnqoYdBOVHH8DiPGq9XN';
//     //判断是否存在ticket，如果存在的话，则每个http header都加上ticket
//     // 原帖这里是 放开的
//     //  if (cookie.get("token")) {
//     //      //用户每次操作，都将cookie设置成2小时
//     //      cookie.set("token",cookie.get("token") ,1/12)    
//     //      cookie.set("name",cookie.get("name") ,1/12)　　　
//     //      　 config.headers.token = cookie.get("token");　　
//     //      　　 config.headers.name= cookie.get("name");
//     //  }
//     return config;
//   },
//   error => {
//     return Promise.reject(error.response);
//   });
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
