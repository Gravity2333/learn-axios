import MyAxios from "MyAxios";
import { MyAxiosInstance } from "../lib/typings";

export const API_PREFIX = "/api";
const _AUTH_TOKEN_ITEM_NAME_ = "AUTH_TOKEN_ITEM_NAME_";
/**
 * 基础配置
 * baseURL
 * timeout
 * headers
 * withCredengtials： 携带cookie
 * responseType
 */
const config = {
  baseURL: "http://localhost:9000",
  timeout: 30 * 1000,
  responseType: "json",
  headers: {
    // TODO 设置一些公用的header 可选
  },
};

/** 不需要token验证的白名单 */
const whiteListApis = ["/download"];

const request = MyAxios.create(config);
/** 设置请求拦截器
 * 设置token 等等
 */
request.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem(_AUTH_TOKEN_ITEM_NAME_);
    if (whiteListApis.indexOf(config.url) >= 0 && authToken) {
      /** 需要token */
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/** 设置响应拦截
 * 统一封装响应格式 {success: boolean,data: any}
 */
request.interceptors.response.use(
  // 在200范围内的请求
  (response) => {
    return Promise.resolve({
      success: true,
      data: response.data,
    }) as any;
  },
  // 任何不在200范围内的请求
  (error) => {
    // alert(error.response.statusText);
    return Promise.resolve({
      success: false,
      message: error.response?.statusText,
    });
  }
);

export interface AJAXResponse<T> {
  success: boolean;
  data: T;
}

export const requestWithType = {
  ...request,
  get: <T>(
    url: string,
    config?: any
  ): Promise<AJAXResponse<T>> =>
    request.get(url, config).then((res) => res as unknown as AJAXResponse<T>),
  post: <T>(
    url: string,
    data?: any,
    config?: any
  ): Promise<AJAXResponse<T>> =>
    request
      .post(url, data, config)
      .then((res) => res as unknown as AJAXResponse<T>),
  put: <T>(
    url: string,
    data?: any,
    config?: any
  ): Promise<AJAXResponse<T>> =>
    request
      .put(url, data, config)
      .then((res) => res as unknown as AJAXResponse<T>),
  delete: <T>(
    url: string,
    config?: any
  ): Promise<AJAXResponse<T>> =>
    request
      .delete(url, config)
      .then((res) => res as unknown as AJAXResponse<T>),
};

export default requestWithType as Omit<MyAxiosInstance,'get'|'put'|'post'|'delete'> & {
  get: <T>(
    url: string,
    config?: any
  ) => Promise<AJAXResponse<T>>,
  post: <T>(
    url: string,
    data?: any,
    config?: any
  ) => Promise<AJAXResponse<T>>,
  put: <T>(
    url: string,
    data?: any,
    config?: any
  ) => Promise<AJAXResponse<T>>,
  delete: <T>(
    url: string,
    config?: any
  ) => Promise<AJAXResponse<T>>
};
