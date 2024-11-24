import { deepMerge } from "../utils/merge";
import { Interceptor } from "./Interceptor";



export type MyAxiosInstance = {
  get: <T>(url: string, config?: Record<string, any>) => Promise<T>;
  post: <T>(url: string, data?: any, config?: Record<string, any>) => Promise<T>
  put: <T>(url: string, data?: any, config?: Record<string, any>) => Promise<T>
  delete: <T>(url: string, data?: any, config?: Record<string, any>) => Promise<T>
  interceptors: {
    request: Interceptor;
    response: Interceptor;
  };
} & { create: (config: Record<string, any>) => MyAxiosInstance };


class MyAxios {
  defaults: Record<string, any> = {};
  interceptors: {
    request: Interceptor;
    response: Interceptor;
  };
  constructor(defaultConfig: Record<string, any>) {
    this.defaults = defaultConfig;
    this.interceptors = {
      request: new Interceptor(),
      response: new Interceptor(),
    };
  }

  _request(config: Record<string, any>, data?: any) {
    const mergedConfig = deepMerge(this.defaults, config);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = (ev) => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({
              status: xhr.status,
              statusText: xhr.statusText,
              data: JSON.parse(xhr.response),
            });
          } else {
            reject({
              status: xhr.status,
              statusText: xhr.statusText,
              data: xhr.response,
            });
          }
        }
      };
      xhr.onabort = reject
      xhr.onerror = reject;
      xhr.open(
        mergedConfig.method || "get",
        (mergedConfig.baseURL || "/") + (mergedConfig.url || "/")
      );
      const header = mergedConfig.header || {};
      Object.keys(header).forEach((headerName) => {
        xhr.setRequestHeader(headerName, header[headerName]);
      });
      /** 处理cancelToken */
      if (config.cancelToken) {
        config.cancelToken.subscribe((cancelReason: string) => {
          reject(cancelReason)
          xhr.abort()
        })
      }
      xhr.send(mergedConfig.method == 'post' ? data : undefined);
    });
  }

  request(config: Record<string, any> = {}, data?: any) {
    const dispatch = ((_config: Record<string, any> = {}) => {
      return this._request(_config, data);
    }).bind(this)

    const promises = [dispatch, undefined];

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
    let currentPromise = Promise.resolve(config);

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
