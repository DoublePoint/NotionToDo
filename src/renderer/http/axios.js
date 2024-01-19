import axios from "axios";
import { createLocalStore } from "@/util/LocalStore";
import { logger } from "../util/logger";
const localStore = createLocalStore();

if (localStore.get("SECRET_KEY")) {
  axios.interceptors.request.use(
    (config) => {
      //config.data = JSON.stringify(config.data);
      config.headers["Authorization"] = `Bearer ${localStore.get(
        "SECRET_KEY"
      )}`;
      config.headers["Notion-Version"] = "2022-06-28";
      return config;
    },
    (error) => {
      return Promise.reject(error.response);
    }
  );
}

axios.interceptors.response.use(
  (response) => {
    // debugger
    const code = response.status;
    if (code < 200 || code > 300) {
      logger.error(response);
      return Promise.reject(response);
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://api.notion.com/';
}

export default axios;
