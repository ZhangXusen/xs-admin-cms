import { localCache } from "@/utils/local";
import { BASE_URL, TIME_OUT } from "./config";
import HYRequest from "./request";

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCatch("token");
      if (config.headers && token) {
        typeof config.headers.set === "function" &&
          config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
    },
  },
});

export default hyRequest;
