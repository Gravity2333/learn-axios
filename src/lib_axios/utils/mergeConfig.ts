import { AxiosRequestConfig } from "../typings";

/**
 * 需要进行“新增合并”的配置字段
 *
 * - 如果是这些字段，合并时应进行对象合并（而不是直接覆盖）
 * - 其他字段（如 url、method、timeout 等）默认直接覆盖即可
 */
const needAppendKeys = [
  /**
   * 请求头信息
   * - 默认 headers 和单次请求的 headers 需要合并
   * - 比如：默认有 Authorization，单次请求添加 Content-Type
   */
  "headers",

  /**
   * URL 查询参数
   * - 默认 params 和单次请求 params 需要合并
   * - 比如：默认 locale=en，单次请求添加 page=1
   */
  "params",

  /**
   * 参数序列化方法
   * - 合并处理，可以默认提供一个序列化逻辑，也允许单次请求自定义
   */
  "paramsSerializer",

  /**
   * HTTP Basic Auth 认证信息
   * - 默认账号密码和单次请求认证信息合并
   */
  "auth",

  /**
   * 代理服务器配置
   * - 默认代理和单次请求代理需要合并
   */
  "proxy",
];

function _mergeImpl(
  originConfig: AxiosRequestConfig,
  newConfig: AxiosRequestConfig
) {
  return Object.keys(newConfig).reduce((mergedConfig, needMergeKey) => {
    if (
      needAppendKeys?.includes(needMergeKey) &&
      !Array.isArray(mergedConfig[needMergeKey])
    ) {
      // 新增属性
      mergedConfig[needMergeKey] = Object.assign(
        mergedConfig[needMergeKey] || {},
        newConfig[needMergeKey] || {}
      );
    } else {
      // 替换属性
      mergedConfig[needMergeKey] = newConfig[needMergeKey];
    }
    return mergedConfig;
  }, originConfig);
}

/** 合并属性 */
export default function mergeConfig(...configs: AxiosRequestConfig[]) {
  return configs.reduce(_mergeImpl, {});
}
