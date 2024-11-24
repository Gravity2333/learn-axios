export type InterceptorHandler = (...args: any[]) => Promise<any>;

export class Interceptor {
    handler: {
        onFulfilled: InterceptorHandler;
        onRejected: InterceptorHandler;
    }[] = [];
    constructor() {
        this.handler = [];
    }

    use(onFulfilled: InterceptorHandler, onRejected: InterceptorHandler) {
        this.handler.push({
            onFulfilled,
            onRejected,
        });
    }
}