import { deepMerge } from "../utils/merge";

class Interceptors {
  handler: {
    onFulfilled: InterceptorsHandler;
    onRejected: InterceptorsHandler;
  }[] = [];
  constructor() {
    this.handler = [];
  }

  use(onFulfilled: InterceptorsHandler, onRejected: InterceptorsHandler) {
    this.handler.push({
      onFulfilled,
      onRejected,
    });
  }
}

type MyAxiosInstance = {
  get: <T>(url: string) => Promise<T>;
  post: <T>(url: string) =>Promise<T>
  interceptors: {
    requests: Interceptors;
    response: Interceptors;
  };
} & { create: (config: Record<string, any>) => MyAxiosInstance };

type InterceptorsHandler = (...args: any[]) => Promise<any>;

class MyAxios {
  defaults: Record<string, any> = {};
  interceptors: {
    requests: Interceptors;
    response: Interceptors;
  };
  constructor(defaultConfig: Record<string, any>) {
    this.defaults = defaultConfig;
    this.interceptors = {
      requests: new Interceptors(),
      response: new Interceptors(),
    };
  }

  _request(config: Record<string, any>) {
    const mergedConfig = deepMerge(this.defaults, config);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = (ev) => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({
              status: xhr.status,
              statusText: xhr.statusText,
              response: JSON.parse(xhr.response),
            });
          } else {
            reject({
              status: xhr.status,
              statusText: xhr.statusText,
              response: xhr.response,
            });
          }
        }
      };
      xhr.onerror = reject;
      xhr.open(
        mergedConfig.method || "get",
        (mergedConfig.baseURL || "/") + (mergedConfig.url || "/")
      );
      const header = mergedConfig.header || {};
      Object.keys(header).forEach((headerName) => {
        xhr.setRequestHeader(headerName, header[headerName]);
      });

      xhr.send();
    });
  }

  request(config: Record<string, any> = {}) {
    const dispatch = this._request.bind(this);

    const promises = [dispatch, undefined];

    /** 组合拦截器 */
    this.interceptors.requests.handler.forEach(
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

  get<DataType>(url: string) {
    return this.request({ method: "get", url }) as DataType;
  }

  post<DataType>(url: string) {
    return this.request({ method: "post", url }) as DataType;
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
  baseURL: "http://10.0.0.9:9000",
  header: {
    "Content-Type": "application/json",
  },
});

export default myAxios;
