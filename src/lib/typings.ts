import { Interceptor } from "./Interceptor";

export type MyAxiosInstance = {
    get: <T>(url: string, config?: Record<string, any>) => Promise<T>;
    post: <T>(url: string, data?: any, config?: Record<string, any>) => Promise<T>
    put: <T>(url: string, data?: any, config?: Record<string, any>) => Promise<T>
    delete: <T>(url: string, data?: any, config?: Record<string, any>) => Promise<T>
    interceptors: {
      request: Interceptor;
      response: Interceptor;
    };
  } & { create: (config: Record<string, any>) => MyAxiosInstance };
  

export enum EAdaptor {
    'XHR' = 'xhr',
    'FETCH' = 'fetch',
    // NODE ENV
    "HTTP" = "http"
}
