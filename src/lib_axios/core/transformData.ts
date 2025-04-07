import { AxiosRequestConfig, AxiosResponse, TransformFn } from "../typings";

/** 处理转换逻辑 */
export default function transformData(
  transformFns: TransformFn[] = [],
  config: AxiosRequestConfig,
  response?: AxiosResponse<any>
) {
  const headers = config.headers || {};
  let data = response ? response.data : config.data;
  transformFns.forEach((transformFn) => {
    data = transformFn.call(
      config,
      data,
      headers,
      response ? response.status : void 0
    );
  });

  return data
}
