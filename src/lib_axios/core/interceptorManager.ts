import {
  Interceptor,
  OnInterceptorFilfilled,
  OnInterceptorRejected,
} from "../typings";

/** 中间价管理 */
export default class InterceptorManager<T> {
  public handlers: Interceptor<T>[] = [];
  constructor() {
    this.handlers = [];
  }

  use(
    onfilfilled?: OnInterceptorFilfilled<T>,
    onRejected?: OnInterceptorRejected<T>
  ) {
    this.handlers.push({
      onfilfilled,
      onRejected,
    });
  }
}
