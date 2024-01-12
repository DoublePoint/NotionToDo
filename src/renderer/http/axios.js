import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    //config.data = JSON.stringify(config.data);
    config.headers["Authorization"] =
      "Bearer secret_JyUmwx8aJ3tnUKQKPwzslMOqnqoYdBOVHH8DiPGq9XN";
    //判断是否存在ticket，如果存在的话，则每个http header都加上ticket
    // 原帖这里是 放开的
    //  if (cookie.get("token")) {
    //      //用户每次操作，都将cookie设置成2小时
    //      cookie.set("token",cookie.get("token") ,1/12)
    //      cookie.set("name",cookie.get("name") ,1/12)
    //      　 config.headers.token = cookie.get("token");
    //      　　 config.headers.name= cookie.get("name");
    //  }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export default axios
