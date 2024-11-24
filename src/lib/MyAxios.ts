import { deepMerge } from "../utils/merge";
import dispatchRequest from "./diapatchRequest";
import { Interceptor } from "./Interceptor";
import { MyAxiosInstance } from "./typings";

class MyAxios {
  defaults: Record<string, any> = {};
  interceptors: {
    request: Interceptor;
    response: Interceptor;
  };
  constructor(defaultConfig: Record<string, any> = {}) {
    this.defaults = {
      ...defaultConfig,
      /** 设置默认适配器 */
      adapters: ['xhr', 'fetch', 'http']
    };
    this.interceptors = {
      request: new Interceptor(),
      response: new Interceptor(),
    };
  }

  request(config: Record<string, any> = {}) {
    const mergedConfig = deepMerge(this.defaults,config)
    const promises = [dispatchRequest, undefined];

    /** 组合拦截器 */
    this.interceptors.request.handler.forEach(
      ({ onFulfilled, onRejected }) => {
        promises.unshift(onRejected);
        promises.unshift(onFulfilled);
      }
    );

    this.interceptors.response.handler.forEach(
      ({ onFulfilled, onRejected }) => {
        promises.push(onFulfilled);
        promises.push(onRejected);
      }
    );

    // 构造调用链
    let currentPromise = Promise.resolve(mergedConfig);

    while (promises?.length > 0) {
      currentPromise = currentPromise.then(promises.shift(), promises.shift());
    }
    return currentPromise;
  }

  get<DataType>(url: string, config: Record<string, any> = {}) {
    return this.request({ method: "get", url, ...config }) as DataType;
  }

  post<DataType>(url: string, data: any, config: Record<string, any> = {}) {
    return this.request({ method: "post", url, data, ...config, }) as DataType;
  }

  put<DataType>(url: string, data: any, config: Record<string, any> = {}) {
    return this.request({ method: "put", url, data, ...config, }) as DataType;
  }

  delete<DataType>(url: string, data: any, config: Record<string, any> = {}) {
    return this.request({ method: "delete", url, data, ...config, }) as DataType;
  }
}

function createInstance(defaultConfig: Record<string, any>): MyAxiosInstance {
  const context = new MyAxios(defaultConfig);
  const instance: MyAxiosInstance = MyAxios.prototype.request.bind(context);
  for (const key in MyAxios.prototype) {
    instance[key] = MyAxios.prototype[key].bind(context);
  }

  for (const key in context) {
    instance[key] = context[key];
  }

  instance.create = (config: Record<string, any>) => {
    return createInstance(Object.assign({}, defaultConfig, config));
  };

  return instance;
}

const myAxios = createInstance({
  baseURL: "http://0.0.0.0:9000",
  header: {
    "Content-Type": "application/json",
  },
});

export default myAxios;
export * from './abort/AbortControler'
export * from './abort/CancelToken'