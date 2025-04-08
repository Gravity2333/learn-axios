import InterceptorManager from "./core/interceptorManager";

/** 转换函数 */
export interface TransformFn {
  (data: any, headers: AxiosRequestConfig["headers"], status: number);
}

// types.ts
export interface AxiosRequestConfig {
  url?: string;
  method?: "get" | "post" | "put" | "delete" | "patch" | "head" | "options";
  baseURL?: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
  withCredentials?: boolean;
  responseType?: "json" | "text" | "blob" | "arraybuffer";
  adaptors?: string[];
  signal?: AbortSignal;

  transformRequest?: TransformFn[];
  transformResponse?: TransformFn[];
  validateStatus?: (status: any) => boolean
}

export interface AxiosResponse<T> {
  status: number;
  statusText: string;
  data?: T;
  request: any;
  headers: AxiosRequestConfig["headers"];
}

export interface AxiosError<T> {
  status: number;
  statusText: string;
  data?: T;
  request: any;
  headers: AxiosRequestConfig["headers"];
  response?: AxiosResponse<T>;
  message?: string;
}

export type Adaptor = <T>(
  config: AxiosRequestConfig
) => Promise<AxiosResponse<T>>;

/** 使用请求体的方法 */
export const RequestBodyMethod = ["post", "put"];

export type OnInterceptorFilfilled<T> = (value: T) => T | Promise<T>;
export type OnInterceptorRejected<T> = (reason: any) => T | Promise<T>;

/** 中间件方法 */
export type Interceptor<T> = {
  onfilfilled?: OnInterceptorFilfilled<T>;
  onRejected?: OnInterceptorRejected<T>;
};

interface Axios {
  defaults: AxiosRequestConfig;
  interceptors: {
    request: InterceptorManager<AxiosRequestConfig>;
    response: InterceptorManager<AxiosResponse<any>>;
  };
  request: <T>(
    configOrUrl: string | AxiosRequestConfig,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  equest<T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig
  ): Promise<R>;
  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>;
  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>;
  head<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>;
  options<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>;
  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R>;
  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R>;
  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R>;
  postForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R>;
  putForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R>;
  patchForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R>;
}

/** 静态axios对象  */
export interface AxiosStatic extends Axios {
  <T>(
    configOrUrl: string | AxiosRequestConfig,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>;
  Axios: Axios;
  create: (config?: AxiosRequestConfig) => AxiosStatic;
}
