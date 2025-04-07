import Axios from "./core/Axios";
import defaultConfig from "./defaults/defaultConfig";
import { AxiosRequestConfig, AxiosStatic } from "./typings";
import mergeConfig from "./utils/mergeConfig";



/** 创建默认的axios对象 */
function createInstance(config: AxiosRequestConfig = {}): AxiosStatic {
  const instance = new Axios(config);
  const request = (instance.request as any).bind(instance);

  /** 设置自有属性 */
  Reflect.ownKeys(instance).forEach((ownPropertyName) => {
    request[ownPropertyName] = instance[ownPropertyName];
  });

  /** 设置原型属性 */
  Reflect.ownKeys(Object.getPrototypeOf(instance)).forEach(
    (prototypePropertyName) => {
      request[prototypePropertyName] = instance[prototypePropertyName];
    }
  );

  // 设置Axios类
  request.Axios = Axios;

  /** 增加create方法 */
  request.create = (instanceCofig: AxiosRequestConfig = {}) => {
    return createInstance(mergeConfig(this.defaults, instanceCofig));
  };

  return request;
}

// 创建全局实例
const axios = createInstance(defaultConfig);

export default axios;
