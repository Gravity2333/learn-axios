import XHRRequest from "./xhr";

enum EAdaptor {
    'XHR' = 'xhr',
    'FETCH' = 'fetch',
    // NODE ENV
    "HTTP" = "http"
}

const adapterMap = {
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