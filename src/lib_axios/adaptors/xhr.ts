import {
  Adaptor,
  AxiosError,
  AxiosRequestConfig,
  RequestBodyMethod,
} from "../typings";
import parseHeaders from "../utils/parseHeaders";

/** xhr适配器 */
const xhr: Adaptor = function <T>(config: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = (ev: Event) => {
      if (xmlHttpRequest.readyState === XMLHttpRequest.DONE) {
        const response = {
          status: xmlHttpRequest.status,
          statusText: xmlHttpRequest.statusText,
          data: xmlHttpRequest.response,
          headers: parseHeaders(xmlHttpRequest.getAllResponseHeaders()),
          request: xmlHttpRequest,
        };
        if (xmlHttpRequest.status >= 200 && xmlHttpRequest.status < 400) {
          // 接受成功
          resolve(response);
        } else {
          reject({
            ...response,
            message: xmlHttpRequest.statusText,
            response: response,
          } as AxiosError<T>);
        }
      }
    };

    // 设置取消reject
    xmlHttpRequest.onabort = reject;
    // 设置error reject
    xmlHttpRequest.onerror = reject;

    /** 获得请求方法 */
    const method = (config.method || "get").toLocaleLowerCase();
    /** 拼接url */
    const url = (config.baseURL || "/") + (config.url || "/");
    /** 打开请求 */
    xmlHttpRequest.open(method, url);
    /** 设置请求头 */
    Object.keys(config.headers || {}).forEach((headerPropName) => {
      xmlHttpRequest.setRequestHeader(
        headerPropName,
        (config.headers || {})[headerPropName]
      );
    });
    /** 设置abortController */
    if (config.signal) {
      config.signal.addEventListener("abort", () => {
        if(xmlHttpRequest.readyState !== XMLHttpRequest.DONE){
          xmlHttpRequest.abort();
        }
      });
    }
    /** 发送请求 */
    xmlHttpRequest.send(
      RequestBodyMethod.includes(method) ? config.data : void 0
    );
  });
};

export default xhr;
