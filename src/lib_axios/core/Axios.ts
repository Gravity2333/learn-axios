import dispatchRequest from "./dispatchRequest";
import InterceptorManager from "./interceptorManager";
import { AxiosResponse, AxiosRequestConfig } from "../typings";
import deepClone from "../utils/deepClone";
import mergeConfig from "../utils/mergeConfig";

class Axios implements Axios {
  /** 默认配置，默认合并 */
  public defaults: AxiosRequestConfig;
  public interceptors;
  /** 构造方法 */
  constructor(instanceConifg: AxiosRequestConfig) {
    // 深拷贝一份 保证传入的参数修改不会导致内部defaults修改
    this.defaults = deepClone(instanceConifg);
    // 初始化 interceptors
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse<any>>(),
    };
  }

  /** 真正发送请求的函数，支持重载
   * @param configOrUrl 可以传入url 或者 配置对象，传入配置对象 第二个参数不用传递
   * @param config 配置对象，在第一个参数出入url时生效
   */
  public async request<T>(
    configOrUrl: string | AxiosRequestConfig,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    /** 参数归一化 */
    if (typeof configOrUrl === "string") {
      config = {
        ...config,
        url: configOrUrl,
      };
    } else {
      config = configOrUrl;
    }

    /** 合并config和defaults */
    config = mergeConfig(this.defaults, config);

    /** 创建拦截器链 */
    let promise = Promise.resolve(config);

    // 设置请求拦截器
    this.interceptors.request.handlers.forEach((requestInterceptorHandler) => {
      promise = promise.then(
        requestInterceptorHandler.onfilfilled,
        requestInterceptorHandler.onRejected
      );
    });
    // 设置dispatch函数
    promise = promise.then(dispatchRequest, void 0);
    // 设置响应拦截器
    this.interceptors.response.handlers.forEach(
      (responseInterceptorHandler) => {
        promise = (promise as Promise<AxiosResponse<T>>).then(
          responseInterceptorHandler.onfilfilled,
          responseInterceptorHandler.onRejected
        );
      }
    );

    return promise as Promise<AxiosResponse<T>>;
  }
}

function addMethod(isForm: boolean = false, method: string) {
  Axios.prototype[method] = function (
    url: string,
    config: AxiosRequestConfig = {}
  ) {
    return this.request({
      ...config,
      method,
      url,
      headers: {
        "Content-type": isForm ? "multipart/form-data" : void 0,
      },
    });
  };
}

/** 设置Axios原型上的方法 */
["delete", "get", "head", "options"].forEach(addMethod.bind(this, false));

["post", "put", "patch"].forEach(addMethod.bind(this, false));
/** 绑定 xxxForm */
["post", "put", "patch"].forEach(addMethod.bind(this, true));

export default Axios;
