/******/ var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var request_1 = __webpack_require__(1);
var MyAxios_1 = __webpack_require__(2);
var table = document.querySelector('#dataContainer table');
var queryBtn = document.querySelector('#operateContainer #queryBtn');
var cancelBtn = document.querySelector('#operateContainer #cancelBtn');
var cleanBtn = document.querySelector('#operateContainer #cleanBtn');
var cancelAbortConrtollerBtn = document.querySelector('#operateContainer #cancelAbortConrtollerBtn');
var loadingSpin = document.querySelector('#dataContainer #loading');
var source = null;
var abortController = null;
function setTableData(dataSource) {
    var _a;
    var header = ((_a = table.innerHTML) === null || _a === void 0 ? void 0 : _a.split("</tr>")[0]) + "</tr></tbody>";
    var content = "";
    dataSource.forEach(function (userInfo) {
        content += "\n    <tr>\n        <td>\n            ".concat(userInfo.name, "\n        </td>\n        <td>\n             ").concat(userInfo.age, "\n        </td>\n        <td>\n             ").concat(userInfo.score, "\n        </td>\n    </tr>\n    ");
    });
    table.innerHTML = header + content;
}
var fetch = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, success, userInfos;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                /** 创建cancelToken */
                source = MyAxios_1.CancelToken.source();
                abortController = new MyAxios_1.AbortController();
                loadingSpin.style.display = 'flex';
                return [4 /*yield*/, request_1.default.get("".concat(request_1.API_PREFIX, "/users/list"), {
                        cancelToken: source.token,
                        signal: abortController.signal
                    })];
            case 1:
                _a = _b.sent(), success = _a.success, userInfos = _a.data;
                if (success) {
                    setTableData(userInfos);
                }
                loadingSpin.style.display = 'none';
                return [2 /*return*/];
        }
    });
}); };
queryBtn.addEventListener('click', function () {
    fetch();
});
cancelBtn.addEventListener('click', function () {
    source === null || source === void 0 ? void 0 : source.cancel('ERR');
});
cancelAbortConrtollerBtn.addEventListener('click', function () {
    abortController === null || abortController === void 0 ? void 0 : abortController.abort();
});
cleanBtn.addEventListener('click', function () {
    setTableData([]);
});


/***/ }),
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.requestWithType = exports.API_PREFIX = void 0;
var MyAxios_1 = __webpack_require__(2);
exports.API_PREFIX = "/api";
var _AUTH_TOKEN_ITEM_NAME_ = "AUTH_TOKEN_ITEM_NAME_";
/**
 * 基础配置
 * baseURL
 * timeout
 * headers
 * withCredengtials： 携带cookie
 * responseType
 */
var config = {
    baseURL: "http://localhost:9000",
    timeout: 30 * 1000,
    responseType: "json",
    headers: {
    // TODO 设置一些公用的header 可选
    },
};
/** 不需要token验证的白名单 */
var whiteListApis = ["/download"];
var request = MyAxios_1.default.create(config);
/** 设置请求拦截器
 * 设置token 等等
 */
request.interceptors.request.use(function (config) {
    var authToken = localStorage.getItem(_AUTH_TOKEN_ITEM_NAME_);
    if (whiteListApis.indexOf(config.url) >= 0 && authToken) {
        /** 需要token */
        config.headers.Authorization = "Bearer ".concat(authToken);
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});
/** 设置响应拦截
 * 统一封装响应格式 {success: boolean,data: any}
 */
request.interceptors.response.use(
// 在200范围内的请求
function (response) {
    return Promise.resolve({
        success: true,
        data: response.data,
    });
}, 
// 任何不在200范围内的请求
function (error) {
    var _a;
    // alert(error.response.statusText);
    return Promise.resolve({
        success: false,
        message: (_a = error.response) === null || _a === void 0 ? void 0 : _a.statusText,
    });
});
exports.requestWithType = __assign(__assign({}, request), { get: function (url, config) {
        return request.get(url, config).then(function (res) { return res; });
    }, post: function (url, data, config) {
        return request
            .post(url, data, config)
            .then(function (res) { return res; });
    }, put: function (url, data, config) {
        return request
            .put(url, data, config)
            .then(function (res) { return res; });
    }, delete: function (url, config) {
        return request
            .delete(url, config)
            .then(function (res) { return res; });
    } });
exports["default"] = exports.requestWithType;


/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var merge_1 = __webpack_require__(3);
var diapatchRequest_1 = __webpack_require__(4);
var Interceptor_1 = __webpack_require__(8);
var MyAxios = /** @class */ (function () {
    function MyAxios(defaultConfig) {
        if (defaultConfig === void 0) { defaultConfig = {}; }
        this.defaults = {};
        this.defaults = __assign(__assign({}, defaultConfig), { 
            /** 设置默认适配器 */
            adapters: ['xhr', 'fetch', 'http'] });
        this.interceptors = {
            request: new Interceptor_1.Interceptor(),
            response: new Interceptor_1.Interceptor(),
        };
    }
    MyAxios.prototype.request = function (config) {
        if (config === void 0) { config = {}; }
        var mergedConfig = (0, merge_1.deepMerge)(this.defaults, config);
        var promises = [diapatchRequest_1.default, undefined];
        /** 组合拦截器 */
        this.interceptors.request.handler.forEach(function (_a) {
            var onFulfilled = _a.onFulfilled, onRejected = _a.onRejected;
            promises.unshift(onRejected);
            promises.unshift(onFulfilled);
        });
        this.interceptors.response.handler.forEach(function (_a) {
            var onFulfilled = _a.onFulfilled, onRejected = _a.onRejected;
            promises.push(onFulfilled);
            promises.push(onRejected);
        });
        // 构造调用链
        var currentPromise = Promise.resolve(mergedConfig);
        while ((promises === null || promises === void 0 ? void 0 : promises.length) > 0) {
            currentPromise = currentPromise.then(promises.shift(), promises.shift());
        }
        return currentPromise;
    };
    MyAxios.prototype.get = function (url, config) {
        if (config === void 0) { config = {}; }
        return this.request(__assign({ method: "get", url: url }, config));
    };
    MyAxios.prototype.post = function (url, data, config) {
        if (config === void 0) { config = {}; }
        return this.request(__assign({ method: "post", url: url, data: data }, config));
    };
    MyAxios.prototype.put = function (url, data, config) {
        if (config === void 0) { config = {}; }
        return this.request(__assign({ method: "put", url: url, data: data }, config));
    };
    MyAxios.prototype.delete = function (url, data, config) {
        if (config === void 0) { config = {}; }
        return this.request(__assign({ method: "delete", url: url, data: data }, config));
    };
    return MyAxios;
}());
function createInstance(defaultConfig) {
    var context = new MyAxios(defaultConfig);
    var instance = MyAxios.prototype.request.bind(context);
    for (var key in MyAxios.prototype) {
        instance[key] = MyAxios.prototype[key].bind(context);
    }
    for (var key in context) {
        instance[key] = context[key];
    }
    instance.create = function (config) {
        return createInstance(Object.assign({}, defaultConfig, config));
    };
    return instance;
}
var myAxios = createInstance({
    baseURL: "http://0.0.0.0:9000",
    header: {
        "Content-Type": "application/json",
    },
});
exports["default"] = myAxios;
__exportStar(__webpack_require__(9), exports);
__exportStar(__webpack_require__(10), exports);


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deepMerge = deepMerge;
function isComplexType(obj) {
    return (typeof obj === 'object' && obj !== null) || typeof obj === 'function';
}
function isFunction(obj) {
    return typeof obj === 'function';
}
function isArray(obj) {
    return Array.isArray(obj);
}
function deepMerge() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    /** 处理简单类型 */
    if (objects[0] && (!isComplexType(objects[0]) || isFunction(objects[0]) || isArray(objects[0]))) {
        /** 以第一个参数为准，如果是简单类型，直接return */
        return objects[objects.length - 1];
    }
    var result = {};
    for (var _a = 0, _b = objects || []; _a < _b.length; _a++) {
        var obj = _b[_a];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                /** 处理array的情况 */
                if (typeof obj[key] === 'object' && Array.isArray(obj[key])) {
                    /** 待合并的列表 */
                    var needMergeArr = obj[key] || [];
                    /** 当前列表 */
                    if (!Array.isArray(result[key])) {
                        /** 类型不同，直接替换 */
                        result[key] = obj[key];
                        continue;
                    }
                    var currentArr = result[key] || [];
                    /** 长度不相同时，直接覆盖 */
                    if (needMergeArr.length !== currentArr.length) {
                        result[key] = needMergeArr;
                        continue;
                    }
                    /** 长度相同时，合并内容 */
                    var arrLen = currentArr.length;
                    var mergedArr = [];
                    for (var i = 0; i < arrLen; i++) {
                        var needMergeItem = needMergeArr[i];
                        var currentItem = currentArr[i];
                        mergedArr[i] = deepMerge(currentItem || {}, needMergeItem || {});
                    }
                    result[key] = mergedArr;
                }
                else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    // 如果值是对象，则递归合并
                    if (!result[key]) {
                        result[key] = obj[key];
                    }
                    else {
                        result[key] = deepMerge(result[key] || {}, obj[key]);
                    }
                }
                else {
                    // 如果值不是对象，直接赋值
                    result[key] = obj[key];
                }
            }
        }
    }
    return result;
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = dispatchRequest;
var Adapter_1 = __webpack_require__(5);
function dispatchRequest(config) {
    return (0, Adapter_1.default)(config.adapters)(config);
}


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.adapterMap = void 0;
exports["default"] = getAdapter;
var typings_1 = __webpack_require__(6);
var xhr_1 = __webpack_require__(7);
exports.adapterMap = (_a = {},
    _a[typings_1.EAdaptor.XHR] = xhr_1.default,
    _a[typings_1.EAdaptor.FETCH] = undefined,
    _a[typings_1.EAdaptor.HTTP] = undefined,
    _a);
function getAdapter(adapters) {
    // 归一化
    if (!Array.isArray(adapters)) {
        adapters = [adapters];
    }
    for (var _i = 0, adapters_1 = adapters; _i < adapters_1.length; _i++) {
        var adapter = adapters_1[_i];
        if (typeof adapter === 'function') {
            return adapter;
        }
        else {
            return exports.adapterMap[adapter];
        }
    }
    return undefined;
}


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EAdaptor = void 0;
var EAdaptor;
(function (EAdaptor) {
    EAdaptor["XHR"] = "xhr";
    EAdaptor["FETCH"] = "fetch";
    // NODE ENV
    EAdaptor["HTTP"] = "http";
})(EAdaptor || (exports.EAdaptor = EAdaptor = {}));


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var IsXHRExist = !!XMLHttpRequest;
exports["default"] = IsXHRExist && function XHRRequest(config) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (ev) {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({
                        status: xhr.status,
                        statusText: xhr.statusText,
                        data: JSON.parse(xhr.response),
                    });
                }
                else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText,
                        data: xhr.response,
                    });
                }
            }
        };
        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.open(config.method || "get", (config.baseURL || "/") + (config.url || "/"));
        var header = config.header || {};
        Object.keys(header).forEach(function (headerName) {
            xhr.setRequestHeader(headerName, header[headerName]);
        });
        /** 处理cancelToken */
        if (config.cancelToken) {
            config.cancelToken.subscribe(function (cancelReason) {
                reject(cancelReason);
                xhr.abort();
            });
        }
        /** 处理abortController */
        if (config.signal) {
            config.signal.addEventListener('abort', function (e) {
                reject(e);
                xhr.abort();
            });
        }
        xhr.send(config.method == 'post' ? config.data : undefined);
    });
};


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Interceptor = void 0;
var Interceptor = /** @class */ (function () {
    function Interceptor() {
        this.handler = [];
        this.handler = [];
    }
    Interceptor.prototype.use = function (onFulfilled, onRejected) {
        this.handler.push({
            onFulfilled: onFulfilled,
            onRejected: onRejected,
        });
    };
    return Interceptor;
}());
exports.Interceptor = Interceptor;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbortController = void 0;
var AbortController = /** @class */ (function () {
    function AbortController() {
        this.signal = new EventTarget();
        this.aborted = false;
    }
    AbortController.prototype.abort = function () {
        if (this.aborted)
            return;
        this.signal.dispatchEvent(new Event('abort'));
        this.aborted = true;
    };
    return AbortController;
}());
exports.AbortController = AbortController;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CancelToken = void 0;
var CancelToken = /** @class */ (function () {
    function CancelToken(executor) {
        var _this = this;
        this.listeners = [];
        this.subscribe = function (listener) {
            if (_this.reason) {
                return;
            }
            if (_this.listeners && Array.isArray(_this.listeners)) {
                _this.listeners.push(listener);
            }
            else {
                _this.listeners = [listener];
            }
        };
        this.unsubscribe = function (listener) {
            var index = _this.listeners.indexOf(listener);
            if (index >= 0) {
                _this.listeners.splice(index, 1);
            }
        };
        var token = this;
        var resolvePromise = null;
        this.reason = void 0;
        this.promise = new Promise(function (resolve) {
            resolvePromise = resolve;
        });
        this.promise.then(function (cancelReason) {
            _this.listeners.forEach(function (listener) {
                listener(cancelReason);
            });
        });
        function cancel(message) {
            if (token.reason) {
                // 已经终止过了
                return;
            }
            token.reason = message;
            resolvePromise(message);
        }
        executor(cancel);
    }
    CancelToken.source = function () {
        var cancel = null;
        var token = new CancelToken(function (_cancel) {
            cancel = _cancel;
        });
        return { cancel: cancel, token: token };
    };
    return CancelToken;
}());
exports.CancelToken = CancelToken;


/***/ })
/******/ ]);
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
/******/ var __webpack_exports__ = __webpack_require__(0);
/******/ 
