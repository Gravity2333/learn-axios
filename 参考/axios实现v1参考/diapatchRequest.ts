import getAdapter from "./adapters/Adapter";


export default function dispatchRequest(config: Record<string, any>) {
    return getAdapter(config.adapters)(config)
}