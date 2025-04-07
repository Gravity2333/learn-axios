import xhrAdaptor from "./xhr";
import { Adaptor } from "../typings";

/** 内置的适配器 */
const knownAdapatorsMap: Record<string, Adaptor> = {
  xhr: xhrAdaptor,
};

/** 获取适配器
 * @param adaptors 传入适配器名称 ｜ 适配器函数
 */
export default function getAdapter(adaptors: (string | Adaptor)[] | Adaptor): Adaptor {
  /** 归一化 */
  if (!Array.isArray(adaptors)) {
    adaptors = [adaptors];
  }

  for (const adaptor of adaptors) {
    if (typeof adaptor === "function") {
      /** 自定义适配器 */
      return adaptor;
    } else {
      if (knownAdapatorsMap[adaptor]) {
        return knownAdapatorsMap[adaptor];
      }
    }
  }

  throw new Error("指定的适配器不存在！");
}
