import axios from "axios";
import { createLocalStore } from "@/util/LocalStore";

const localStore = createLocalStore();

if (localStore.get("SECRET_KEY")) {
  axios.interceptors.request.use(
    (config) => {
      //config.data = JSON.stringify(config.data);
      config.headers["Authorization"] = `Bearer ${localStore.get(
        "SECRET_KEY"
      )}`;
      return config;
    },
    (error) => {
      return Promise.reject(error.response);
    }
  );
}
export default axios;
