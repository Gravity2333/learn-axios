# LEARN AXIOS
尝试自己实现封装一个简单的axios库，目的在了解其运行原理

#### 运行DEMO
```sh
打包: npm run build

运行DEMO： npm run dev
```


#### 目录结构
- `src/`  
  项目源代码文件夹
  - `lib`  
    自定义库目录
  - `request`  
    对AXIOS二次封装
  - `utils`  
    工具函数
  - `index.ts`  
    工具函数文件


- `src/lib`  
  库文件
  - `abort`  
    取消请求文件
  - `adapters`  
    适配器文件
  - `MyAxios.ts`  
    自己实现axios主入口
  - `Interceptor.ts`  
    拦截器实现
  - `diapatchRequest.ts`  
    发送请求模块

- `src/lib/abort`  
  取消请求文件
  - `AbortController.ts`  
    实现终止控制器
  - `CancelToken.ts`  
    实现AXIOS自带的abort请求方案 (即将废弃)

- `src/lib/adapters`  
  适配器
  - `Adapters.ts`  
    适配器入口
  - `xhr.ts`  
    XHMHttpRequest适配

- `build/`  
  lib库打包输入目录

- `dist/`  
  DEMO案例输出文件

#### 使用：

 ```javascript
const request = MyAxios.create(config);

/** 设置请求拦截器*/
request.interceptors.request.use(
  (config) => {
    // TODO CONFIG
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/** 设置响应拦截 */
request.interceptors.response.use(
  // 在200范围内的请求
  (response) => {
    return Promise.resolve({
      success: true,
      data: response.data,
    }) as any;
  },
  // 任何不在200范围内的请求
  (error) => {
    // alert(error.response.statusText);
    return Promise.resolve({
      success: false,
      message: error.response?.statusText,
    });
  }
);

export interface AJAXResponse<T> {
  success: boolean;
  data: T;
}

async function query(){
    const {success,data} = await request.get(url, config)
    if(success){
        // TODO HANDLE DATA
    }
}


```