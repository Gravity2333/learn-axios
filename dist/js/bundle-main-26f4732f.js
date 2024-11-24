/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === \"function\" ? Iterator : Object).prototype);\n    return g.next = verb(0), g[\"throw\"] = verb(1), g[\"return\"] = verb(2), typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar request_1 = __webpack_require__(/*! ./request/request */ \"./src/request/request.ts\");\nvar MyAxios_1 = __webpack_require__(/*! ./lib/MyAxios */ \"./src/lib/MyAxios.ts\");\nvar table = document.querySelector('#dataContainer table');\nvar queryBtn = document.querySelector('#operateContainer #queryBtn');\nvar cancelBtn = document.querySelector('#operateContainer #cancelBtn');\nvar cleanBtn = document.querySelector('#operateContainer #cleanBtn');\nvar cancelAbortConrtollerBtn = document.querySelector('#operateContainer #cancelAbortConrtollerBtn');\nvar loadingSpin = document.querySelector('#dataContainer #loading');\nvar source = null;\nvar abortController = null;\nfunction setTableData(dataSource) {\n    var _a;\n    var header = ((_a = table.innerHTML) === null || _a === void 0 ? void 0 : _a.split(\"</tr>\")[0]) + \"</tr></tbody>\";\n    var content = \"\";\n    dataSource.forEach(function (userInfo) {\n        content += \"\\n    <tr>\\n        <td>\\n            \".concat(userInfo.name, \"\\n        </td>\\n        <td>\\n             \").concat(userInfo.age, \"\\n        </td>\\n        <td>\\n             \").concat(userInfo.score, \"\\n        </td>\\n    </tr>\\n    \");\n    });\n    table.innerHTML = header + content;\n}\nvar fetch = function () { return __awaiter(void 0, void 0, void 0, function () {\n    var _a, success, userInfos;\n    return __generator(this, function (_b) {\n        switch (_b.label) {\n            case 0:\n                /** 创建cancelToken */\n                source = MyAxios_1.CancelToken.source();\n                abortController = new MyAxios_1.AbortController();\n                loadingSpin.style.display = 'flex';\n                return [4 /*yield*/, request_1.default.get(\"\".concat(request_1.API_PREFIX, \"/users/list\"), {\n                        cancelToken: source.token,\n                        signal: abortController.signal\n                    })];\n            case 1:\n                _a = _b.sent(), success = _a.success, userInfos = _a.data;\n                if (success) {\n                    setTableData(userInfos);\n                }\n                loadingSpin.style.display = 'none';\n                return [2 /*return*/];\n        }\n    });\n}); };\nqueryBtn.addEventListener('click', function () {\n    fetch();\n});\ncancelBtn.addEventListener('click', function () {\n    source === null || source === void 0 ? void 0 : source.cancel('ERR');\n});\ncancelAbortConrtollerBtn.addEventListener('click', function () {\n    abortController === null || abortController === void 0 ? void 0 : abortController.abort();\n});\ncleanBtn.addEventListener('click', function () {\n    setTableData([]);\n});\n\n\n//# sourceURL=webpack://learn_ajax/./src/index.ts?");

/***/ }),

/***/ "./src/lib/Interceptor.ts":
/*!********************************!*\
  !*** ./src/lib/Interceptor.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Interceptor = void 0;\nvar Interceptor = /** @class */ (function () {\n    function Interceptor() {\n        this.handler = [];\n        this.handler = [];\n    }\n    Interceptor.prototype.use = function (onFulfilled, onRejected) {\n        this.handler.push({\n            onFulfilled: onFulfilled,\n            onRejected: onRejected,\n        });\n    };\n    return Interceptor;\n}());\nexports.Interceptor = Interceptor;\n\n\n//# sourceURL=webpack://learn_ajax/./src/lib/Interceptor.ts?");

/***/ }),

/***/ "./src/lib/MyAxios.ts":
/*!****************************!*\
  !*** ./src/lib/MyAxios.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar merge_1 = __webpack_require__(/*! ../utils/merge */ \"./src/utils/merge.ts\");\nvar diapatchRequest_1 = __webpack_require__(/*! ./diapatchRequest */ \"./src/lib/diapatchRequest.ts\");\nvar Interceptor_1 = __webpack_require__(/*! ./Interceptor */ \"./src/lib/Interceptor.ts\");\nvar MyAxios = /** @class */ (function () {\n    function MyAxios(defaultConfig) {\n        if (defaultConfig === void 0) { defaultConfig = {}; }\n        this.defaults = {};\n        this.defaults = __assign(__assign({}, defaultConfig), { \n            /** 设置默认适配器 */\n            adapters: ['xhr', 'fetch', 'http'] });\n        this.interceptors = {\n            request: new Interceptor_1.Interceptor(),\n            response: new Interceptor_1.Interceptor(),\n        };\n    }\n    MyAxios.prototype.request = function (config) {\n        if (config === void 0) { config = {}; }\n        var mergedConfig = (0, merge_1.deepMerge)(this.defaults, config);\n        var promises = [diapatchRequest_1.default, undefined];\n        /** 组合拦截器 */\n        this.interceptors.request.handler.forEach(function (_a) {\n            var onFulfilled = _a.onFulfilled, onRejected = _a.onRejected;\n            promises.unshift(onRejected);\n            promises.unshift(onFulfilled);\n        });\n        this.interceptors.response.handler.forEach(function (_a) {\n            var onFulfilled = _a.onFulfilled, onRejected = _a.onRejected;\n            promises.push(onFulfilled);\n            promises.push(onRejected);\n        });\n        // 构造调用链\n        var currentPromise = Promise.resolve(mergedConfig);\n        while ((promises === null || promises === void 0 ? void 0 : promises.length) > 0) {\n            currentPromise = currentPromise.then(promises.shift(), promises.shift());\n        }\n        return currentPromise;\n    };\n    MyAxios.prototype.get = function (url, config) {\n        if (config === void 0) { config = {}; }\n        return this.request(__assign({ method: \"get\", url: url }, config));\n    };\n    MyAxios.prototype.post = function (url, data, config) {\n        if (config === void 0) { config = {}; }\n        return this.request(__assign({ method: \"post\", url: url, data: data }, config));\n    };\n    MyAxios.prototype.put = function (url, data, config) {\n        if (config === void 0) { config = {}; }\n        return this.request(__assign({ method: \"put\", url: url, data: data }, config));\n    };\n    MyAxios.prototype.delete = function (url, data, config) {\n        if (config === void 0) { config = {}; }\n        return this.request(__assign({ method: \"delete\", url: url, data: data }, config));\n    };\n    return MyAxios;\n}());\nfunction createInstance(defaultConfig) {\n    var context = new MyAxios(defaultConfig);\n    var instance = MyAxios.prototype.request.bind(context);\n    for (var key in MyAxios.prototype) {\n        instance[key] = MyAxios.prototype[key].bind(context);\n    }\n    for (var key in context) {\n        instance[key] = context[key];\n    }\n    instance.create = function (config) {\n        return createInstance(Object.assign({}, defaultConfig, config));\n    };\n    return instance;\n}\nvar myAxios = createInstance({\n    baseURL: \"http://0.0.0.0:9000\",\n    header: {\n        \"Content-Type\": \"application/json\",\n    },\n});\nexports[\"default\"] = myAxios;\n__exportStar(__webpack_require__(/*! ./abort/AbortControler */ \"./src/lib/abort/AbortControler.ts\"), exports);\n__exportStar(__webpack_require__(/*! ./abort/CancelToken */ \"./src/lib/abort/CancelToken.ts\"), exports);\n\n\n//# sourceURL=webpack://learn_ajax/./src/lib/MyAxios.ts?");

/***/ }),

/***/ "./src/lib/abort/AbortControler.ts":
/*!*****************************************!*\
  !*** ./src/lib/abort/AbortControler.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AbortController = void 0;\nvar AbortController = /** @class */ (function () {\n    function AbortController() {\n        this.signal = new EventTarget();\n        this.aborted = false;\n    }\n    AbortController.prototype.abort = function () {\n        if (this.aborted)\n            return;\n        this.signal.dispatchEvent(new Event('abort'));\n        this.aborted = true;\n    };\n    return AbortController;\n}());\nexports.AbortController = AbortController;\n\n\n//# sourceURL=webpack://learn_ajax/./src/lib/abort/AbortControler.ts?");

/***/ }),

/***/ "./src/lib/abort/CancelToken.ts":
/*!**************************************!*\
  !*** ./src/lib/abort/CancelToken.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CancelToken = void 0;\nvar CancelToken = /** @class */ (function () {\n    function CancelToken(executor) {\n        var _this = this;\n        this.listeners = [];\n        this.subscribe = function (listener) {\n            if (_this.reason) {\n                return;\n            }\n            if (_this.listeners && Array.isArray(_this.listeners)) {\n                _this.listeners.push(listener);\n            }\n            else {\n                _this.listeners = [listener];\n            }\n        };\n        this.unsubscribe = function (listener) {\n            var index = _this.listeners.indexOf(listener);\n            if (index >= 0) {\n                _this.listeners.splice(index, 1);\n            }\n        };\n        var token = this;\n        var resolvePromise = null;\n        this.reason = void 0;\n        this.promise = new Promise(function (resolve) {\n            resolvePromise = resolve;\n        });\n        this.promise.then(function (cancelReason) {\n            _this.listeners.forEach(function (listener) {\n                listener(cancelReason);\n            });\n        });\n        function cancel(message) {\n            if (token.reason) {\n                // 已经终止过了\n                return;\n            }\n            token.reason = message;\n            resolvePromise(message);\n        }\n        executor(cancel);\n    }\n    CancelToken.source = function () {\n        var cancel = null;\n        var token = new CancelToken(function (_cancel) {\n            cancel = _cancel;\n        });\n        return { cancel: cancel, token: token };\n    };\n    return CancelToken;\n}());\nexports.CancelToken = CancelToken;\n\n\n//# sourceURL=webpack://learn_ajax/./src/lib/abort/CancelToken.ts?");

/***/ }),

/***/ "./src/lib/adapters/Adapter.ts":
/*!*************************************!*\
  !*** ./src/lib/adapters/Adapter.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar _a;\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.adapterMap = void 0;\nexports[\"default\"] = getAdapter;\nvar typings_1 = __webpack_require__(/*! ../typings */ \"./src/lib/typings.ts\");\nvar xhr_1 = __webpack_require__(/*! ./xhr */ \"./src/lib/adapters/xhr.ts\");\nexports.adapterMap = (_a = {},\n    _a[typings_1.EAdaptor.XHR] = xhr_1.default,\n    _a[typings_1.EAdaptor.FETCH] = undefined,\n    _a[typings_1.EAdaptor.HTTP] = undefined,\n    _a);\nfunction getAdapter(adapters) {\n    // 归一化\n    if (!Array.isArray(adapters)) {\n        adapters = [adapters];\n    }\n    for (var _i = 0, adapters_1 = adapters; _i < adapters_1.length; _i++) {\n        var adapter = adapters_1[_i];\n        if (typeof adapter === 'function') {\n            return adapter;\n        }\n        else {\n            return exports.adapterMap[adapter];\n        }\n    }\n    return undefined;\n}\n\n\n//# sourceURL=webpack://learn_ajax/./src/lib/adapters/Adapter.ts?");

/***/ }),

/***/ "./src/lib/adapters/xhr.ts":
/*!*********************************!*\
  !*** ./src/lib/adapters/xhr.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar IsXHRExist = !!XMLHttpRequest;\nexports[\"default\"] = IsXHRExist && function XHRRequest(config) {\n    return new Promise(function (resolve, reject) {\n        var xhr = new XMLHttpRequest();\n        xhr.onreadystatechange = function (ev) {\n            if (xhr.readyState === 4) {\n                if (xhr.status >= 200 && xhr.status < 300) {\n                    resolve({\n                        status: xhr.status,\n                        statusText: xhr.statusText,\n                        data: JSON.parse(xhr.response),\n                    });\n                }\n                else {\n                    reject({\n                        status: xhr.status,\n                        statusText: xhr.statusText,\n                        data: xhr.response,\n                    });\n                }\n            }\n        };\n        xhr.onabort = reject;\n        xhr.onerror = reject;\n        xhr.open(config.method || \"get\", (config.baseURL || \"/\") + (config.url || \"/\"));\n        var header = config.header || {};\n        Object.keys(header).forEach(function (headerName) {\n            xhr.setRequestHeader(headerName, header[headerName]);\n        });\n        /** 处理cancelToken */\n        if (config.cancelToken) {\n            config.cancelToken.subscribe(function (cancelReason) {\n                reject(cancelReason);\n                xhr.abort();\n            });\n        }\n        /** 处理abortController */\n        if (config.signal) {\n            config.signal.addEventListener('abort', function (e) {\n                reject(e);\n                xhr.abort();\n            });\n        }\n        xhr.send(config.method == 'post' ? config.data : undefined);\n    });\n};\n\n\n//# sourceURL=webpack://learn_ajax/./src/lib/adapters/xhr.ts?");

/***/ }),

/***/ "./src/lib/diapatchRequest.ts":
/*!************************************!*\
  !*** ./src/lib/diapatchRequest.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = dispatchRequest;\nvar Adapter_1 = __webpack_require__(/*! ./adapters/Adapter */ \"./src/lib/adapters/Adapter.ts\");\nfunction dispatchRequest(config) {\n    return (0, Adapter_1.default)(config.adapters)(config);\n}\n\n\n//# sourceURL=webpack://learn_ajax/./src/lib/diapatchRequest.ts?");

/***/ }),

/***/ "./src/lib/typings.ts":
/*!****************************!*\
  !*** ./src/lib/typings.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EAdaptor = void 0;\nvar EAdaptor;\n(function (EAdaptor) {\n    EAdaptor[\"XHR\"] = \"xhr\";\n    EAdaptor[\"FETCH\"] = \"fetch\";\n    // NODE ENV\n    EAdaptor[\"HTTP\"] = \"http\";\n})(EAdaptor || (exports.EAdaptor = EAdaptor = {}));\n\n\n//# sourceURL=webpack://learn_ajax/./src/lib/typings.ts?");

/***/ }),

/***/ "./src/request/request.ts":
/*!********************************!*\
  !*** ./src/request/request.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.requestWithType = exports.API_PREFIX = void 0;\nvar MyAxios_1 = __webpack_require__(/*! MyAxios */ \"./src/lib/MyAxios.ts\");\nexports.API_PREFIX = \"/api\";\nvar _AUTH_TOKEN_ITEM_NAME_ = \"AUTH_TOKEN_ITEM_NAME_\";\n/**\n * 基础配置\n * baseURL\n * timeout\n * headers\n * withCredengtials： 携带cookie\n * responseType\n */\nvar config = {\n    baseURL: \"http://localhost:9000\",\n    timeout: 30 * 1000,\n    responseType: \"json\",\n    headers: {\n    // TODO 设置一些公用的header 可选\n    },\n};\n/** 不需要token验证的白名单 */\nvar whiteListApis = [\"/download\"];\nvar request = MyAxios_1.default.create(config);\n/** 设置请求拦截器\n * 设置token 等等\n */\nrequest.interceptors.request.use(function (config) {\n    var authToken = localStorage.getItem(_AUTH_TOKEN_ITEM_NAME_);\n    if (whiteListApis.indexOf(config.url) >= 0 && authToken) {\n        /** 需要token */\n        config.headers.Authorization = \"Bearer \".concat(authToken);\n    }\n    return config;\n}, function (err) {\n    return Promise.reject(err);\n});\n/** 设置响应拦截\n * 统一封装响应格式 {success: boolean,data: any}\n */\nrequest.interceptors.response.use(\n// 在200范围内的请求\nfunction (response) {\n    return Promise.resolve({\n        success: true,\n        data: response.data,\n    });\n}, \n// 任何不在200范围内的请求\nfunction (error) {\n    var _a;\n    // alert(error.response.statusText);\n    return Promise.resolve({\n        success: false,\n        message: (_a = error.response) === null || _a === void 0 ? void 0 : _a.statusText,\n    });\n});\nexports.requestWithType = __assign(__assign({}, request), { get: function (url, config) {\n        return request.get(url, config).then(function (res) { return res; });\n    }, post: function (url, data, config) {\n        return request\n            .post(url, data, config)\n            .then(function (res) { return res; });\n    }, put: function (url, data, config) {\n        return request\n            .put(url, data, config)\n            .then(function (res) { return res; });\n    }, delete: function (url, config) {\n        return request\n            .delete(url, config)\n            .then(function (res) { return res; });\n    } });\nexports[\"default\"] = exports.requestWithType;\n\n\n//# sourceURL=webpack://learn_ajax/./src/request/request.ts?");

/***/ }),

/***/ "./src/utils/merge.ts":
/*!****************************!*\
  !*** ./src/utils/merge.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.deepMerge = deepMerge;\nfunction isComplexType(obj) {\n    return (typeof obj === 'object' && obj !== null) || typeof obj === 'function';\n}\nfunction isFunction(obj) {\n    return typeof obj === 'function';\n}\nfunction isArray(obj) {\n    return Array.isArray(obj);\n}\nfunction deepMerge() {\n    var objects = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        objects[_i] = arguments[_i];\n    }\n    /** 处理简单类型 */\n    if (objects[0] && (!isComplexType(objects[0]) || isFunction(objects[0]) || isArray(objects[0]))) {\n        /** 以第一个参数为准，如果是简单类型，直接return */\n        return objects[objects.length - 1];\n    }\n    var result = {};\n    for (var _a = 0, _b = objects || []; _a < _b.length; _a++) {\n        var obj = _b[_a];\n        for (var key in obj) {\n            if (obj.hasOwnProperty(key)) {\n                /** 处理array的情况 */\n                if (typeof obj[key] === 'object' && Array.isArray(obj[key])) {\n                    /** 待合并的列表 */\n                    var needMergeArr = obj[key] || [];\n                    /** 当前列表 */\n                    if (!Array.isArray(result[key])) {\n                        /** 类型不同，直接替换 */\n                        result[key] = obj[key];\n                        continue;\n                    }\n                    var currentArr = result[key] || [];\n                    /** 长度不相同时，直接覆盖 */\n                    if (needMergeArr.length !== currentArr.length) {\n                        result[key] = needMergeArr;\n                        continue;\n                    }\n                    /** 长度相同时，合并内容 */\n                    var arrLen = currentArr.length;\n                    var mergedArr = [];\n                    for (var i = 0; i < arrLen; i++) {\n                        var needMergeItem = needMergeArr[i];\n                        var currentItem = currentArr[i];\n                        mergedArr[i] = deepMerge(currentItem || {}, needMergeItem || {});\n                    }\n                    result[key] = mergedArr;\n                }\n                else if (typeof obj[key] === 'object' && obj[key] !== null) {\n                    // 如果值是对象，则递归合并\n                    if (!result[key]) {\n                        result[key] = obj[key];\n                    }\n                    else {\n                        result[key] = deepMerge(result[key] || {}, obj[key]);\n                    }\n                }\n                else {\n                    // 如果值不是对象，直接赋值\n                    result[key] = obj[key];\n                }\n            }\n        }\n    }\n    return result;\n}\n\n\n//# sourceURL=webpack://learn_ajax/./src/utils/merge.ts?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 
