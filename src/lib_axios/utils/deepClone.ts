/** 实现一个深拷贝函数
 *  需要处理的类型包含
 *  基本类型 （包括Symbol)
 *  复杂类型
 *    函数
 *    Date Regexp 内置函数
 *    Array
 *    Map
 *    Set
 *    普通对象
 *
 *  需要考虑
 *    循环引用 用weakMap解决
 *    描述符
 *    原型链
 *    获取不可枚举
 */

/** 判断复杂类型
 *  包含两种情况
 *  1. object类型
 *  2. 函数类型
 */
function _isComplexType(value: any) {
  return typeof value === "object" || typeof value === "function";
}

/** 实现deepClone */
function _deepCloneImpl(needCloneValue: any, weakMap: WeakMap<any, any>) {
  /** 先判断是不是简单类型 */
  if (!_isComplexType(needCloneValue)) {
    /** 简单类型直接返回 */
    return needCloneValue;
  }

  /** 复杂类型，进一步处理 */
  /** 判断是不是函数类型，如果是则创建新的函数
   *  考虑到 如果使用eval new Function 在严格模式下的问题 以及 函数对象outer指向全局作用域导致的作用域问题 这里直接引用函数对象
   */
  if (typeof needCloneValue === "function") {
    return needCloneValue;
  }

  /** 处理内置对象 Date 和 RegExp
   *  直接使用对象.constructor判断即可
   */
  if ([Date, RegExp].includes(needCloneValue.constructor)) {
    return new Date(needCloneValue);
  }

  /** 上面情况不会出现循环引用的情况，下面需要考虑到 */
  if (weakMap.has(needCloneValue)) {
    // 循环引用 直接返回
    return weakMap.get(needCloneValue);
  }

  /** 处理Map */
  if (needCloneValue instanceof Map) {
    const newMap = new Map();
    weakMap.set(needCloneValue, newMap);
    needCloneValue.forEach((val, key) => {
      if (_isComplexType(val)) {
        newMap.set(key, _deepCloneImpl(val, weakMap));
      } else {
        newMap.set(key, val);
      }
    });
    return newMap;
  }

  /** 处理Set */
  if (needCloneValue instanceof Set) {
    const newSet = new Set();
    weakMap.set(needCloneValue, newSet);
    needCloneValue.forEach((val) => {
      if (_isComplexType(val)) {
        newSet.add(_deepCloneImpl(val, weakMap));
      } else {
        newSet.add(val);
      }
    });
    return newSet;
  }

  /** 处理Array
   *  需要直接New 一个Array对象
   *  不能直接连接原型
   */
  if (Array.isArray(needCloneValue)) {
   
    const newArray = [];
    weakMap.set(needCloneValue, newArray);
    needCloneValue.forEach((val, index) => {
      if (_isComplexType(val)) {
        newArray[index] = _deepCloneImpl(val, weakMap);
      } else {
        newArray[index] = val;
      }
    });
    return newArray;
  }

  /** 处理普通对象 */
  const needCloneOwnDescriptors =
    Object.getOwnPropertyDescriptors(needCloneValue);
  /** 设置原型和描述符 */
  const newObj = Object.create(
    Object.getPrototypeOf(needCloneValue),
    needCloneOwnDescriptors
  );
  /** 保存对象 */
  weakMap.set(needCloneValue, newObj);
  /** 获取所有自有key 包含不可枚举 */
  const ownKeys = Reflect.ownKeys(needCloneValue);

  ownKeys.forEach((ownKey) => {
    const ownValue = needCloneValue[ownKey];
    if (_isComplexType(ownValue)) {
      newObj[ownKey] = _deepCloneImpl(ownValue, weakMap);
    } else {
      newObj[ownKey] = ownValue;
    }
  });

  return newObj;
}

export default function deepClone<T>(needCloneValue: any): T {
  /** 创建一个weakMap，处理循环引用问题 */
  const weakMap = new WeakMap<any, any>();
  /** 调用impl函数完成复制 */
  return _deepCloneImpl(needCloneValue, weakMap) as T;
}
