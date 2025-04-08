import { EAdaptor } from "../typings";
import XHRRequest from "./xhr";

export  const adapterMap = {
    [EAdaptor.XHR]: XHRRequest,
    [EAdaptor.FETCH]: undefined,
    [EAdaptor.HTTP]: undefined
}

export default function getAdapter(adapters) {
    // 归一化
    if (!Array.isArray(adapters)) {
        adapters = [adapters]
    }
    for (const adapter of adapters) {
        if (typeof adapter === 'function') {
            return adapter
        } else {
            return adapterMap[adapter]
        }
    }
    return undefined
}