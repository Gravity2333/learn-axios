const IsXHRExist = !!XMLHttpRequest

export default IsXHRExist && function XHRRequest(config: Record<string, any>) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = (ev) => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {

                    resolve({
                        status: xhr.status,
                        statusText: xhr.statusText,
                        data: JSON.parse(xhr.response),
                    });
                } else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText,
                        data: xhr.response,
                    });
                }
            }
        };
        xhr.onabort = reject
        xhr.onerror = reject;
        xhr.open(
            config.method || "get",
            (config.baseURL || "/") + (config.url || "/")
        );
        const header = config.header || {};
        Object.keys(header).forEach((headerName) => {
            xhr.setRequestHeader(headerName, header[headerName]);
        });
        /** 处理cancelToken */
        if (config.cancelToken) {
            config.cancelToken.subscribe((cancelReason: string) => {
                reject(cancelReason)
                xhr.abort()
            })
        }

        xhr.send(config.method == 'post' ? config.data : undefined);
    });
}