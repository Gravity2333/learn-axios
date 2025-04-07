// defaultConfig.ts
import type { AxiosRequestConfig } from "../typings";

/** 默认配置项  */
const defaultConfig: AxiosRequestConfig = {
  baseURL: "", // 根据环境切换 baseURL 可以动态设置
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // 'Authorization': `Bearer ${token}`, // 你可以在请求拦截器里动态加上
    // 'Accept-Language': 'en-US', // 国际化支持
  },
  withCredentials: true, // 如果你的接口需要带 cookie
  responseType: "json",
  // validateStatus: (status) => {
  //   return status >= 200 && status < 300; // 默认处理 2xx 作为成功
  // },
  // 默认的适配器
  adaptors: ["xhr", "fetch", "http"],
  transformResponse: [
    function (data, headers, statusText) {
      if (statusText >= 200 && statusText < 400) {
        if (
          headers["Content-Type"] === "application/json" &&
          this.responseType === "json"
        ) {
          try {
            return JSON.parse(data);
          } catch (err) {
            throw new Error("响应结果解析错误！");
          }
        }
      }
      return data;
    },
  ],
};

export default defaultConfig;
