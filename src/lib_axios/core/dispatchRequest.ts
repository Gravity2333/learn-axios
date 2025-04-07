import getAdapter from "../adaptors/adaptors";
import { AxiosResponse, AxiosRequestConfig } from "../typings";
import transformData from "./transformData";

/** 发送请求函数 传入config 根据config.adaptors调用适配器 */
export default function dispatchRequest<T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  const adaptor = getAdapter(config.adaptors || []);
  // 处理transformRequest
  config.data = transformData(config.transformRequest || [], config);
  return adaptor(config).then(
    (response) => {
      response.data = transformData(config.transformResponse||[], config, response);
      return response;
    },
    (errorResponse) => {
      errorResponse.response.data = transformData(
        config.transformResponse||[],
        config,
        errorResponse
      );
      return Promise.reject(errorResponse);
    }
  ) as any;
}
