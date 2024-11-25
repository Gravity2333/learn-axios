const isFetchExist = !!window.fetch

export default isFetchExist && function fetchRequest(config: Record<string, any>) {
    return fetch((config.baseURL || "/") + (config.url || "/"), {
        ...config,
        method: config.method,
    }).then(res => {
        if (res.status >= 200 && res.status < 300) {
            return res.json()
        }
        return Promise.reject(res)
    })
}