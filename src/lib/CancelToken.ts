export default class CancelToken {
    promise: Promise<any>
    reason: string
    listeners: ((cancelReason: string) => void)[] = []
    constructor(executor) {
        const token = this
        let resolvePromise = null
        this.reason = void 0
        this.promise = new Promise((resolve) => {
            resolvePromise = resolve
        })
        this.promise.then((cancelReason) => {
            this.listeners.forEach(listener => {
                listener(cancelReason)
            })
        })

        function cancel(message) {
            if (token.reason) {
                // 已经终止过了
                return
            }

            token.reason = message
            resolvePromise(message)
        }

        executor(cancel)
    }

    subscribe(listener) {
        if (this.reason) {
            return
        }

        if (this.listeners && Array.isArray(this.listeners)) {
            this.listeners.push(listener)
        } else {
            this.listeners = [listener]
        }
    }

    unsubscribe(listener) {
        const index = this.listeners.indexOf(listener)

        if (index >= 0) {
            this.listeners.splice(index, 1)
        }
    }

    static source() {
        let cancel = null
        const token = new CancelToken(_cancel => {
            cancel = _cancel
        })

        return { cancel, token }
    }
}