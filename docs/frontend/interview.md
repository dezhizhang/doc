# inverview


<!-- # 面试视频https://www.bilibili.com/video/BV1sN411974w/?spm_id_from=333.337.search-card.all.click&vd_source=10257e657caa8b54111087a9329462e8 -->

### Promise

1. await 相当于 Promise.then 处理不了 Promise.reject
2.

```js
!(async function () {
  const p4 = Promise.reject('err1');
  const d = await p4;
  console.log('data', d);
})();
```

### 微任务执行时机比宏任务时机早

1. 宏任务 setInterval,setTimeout,Ajax,Dom
2. 微任务 async/await

```js
console.log(100);

setTimeout(() => {
  console.log(200);
});

Promise.resolve().then(() => {
  console.log(300);
});

console.log(400);
```

### 进程 process 和线程 thread

```js
// 进程, OS进行资源分配和调度的最小单位，有独立内存空间
// 线程, OS进行运算调度的最小单位，共享进程内存空间
```

### 手写 promise TODO 回来重点看

```js
class MyPromise {
  state = 'pending';
  value = undefined;
  reason = undefined;

  resolveCallbacks = [];
  rejectCallbacks = [];

  constructor(fn) {
    const resolveHandler = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.resolveCallbacks.forEach((fn) => fn(this.value));
      }
    };
    const rejectHandler = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.resolveCallbacks.forEach((fn) => fn(this.reason));
      }
    };
    try {
      fn(resolveHandler, rejectHandler);
    } catch (err) {
      rejectHandler(err);
    }
  }
  then(fn1, fn2) {
    fn1 = typeof fn1 === 'function' ? fn1 : (v) => v;
    fn2 = typeof fn2 === 'function' ? fn2 : (e) => e;

    if (this.state === 'pending') {
      const p1 = new MyPromise((resolve, reject) => {
        this.resolveCallbacks.push(() => {
          try {
            const newValue = fn1(this.value);
            resolve(newValue);
          } catch (err) {
            reject(err);
          }
        });

        this.rejectCallbacks.push(() => {
          try {
            const newReason = fn2(this.reason);
            reject(newReason);
          } catch (err) {
            reject(err);
          }
        });
      });
      return p1;
    }

    // fulfilled状态
    if (this.state === 'fulfilled') {
      const p1 = new MyPromise((resolve, reject) => {
        try {
          const newValue = fn1(this.value);
          resolve(newValue);
        } catch (err) {
          reject(err);
        }
      });
      return p1;
    }

    // rejcted
    if (this.state === 'rejcted') {
      const p1 = new MyPromise((resolve, reject) => {
        try {
          const newReason = fn2(this.reason);
          reject(newReason);
        } catch (err) {
          reject(err);
        }
      });
      return p1;
    }
  }
  catch(fn) {
    return this.then(null, fn);
  }
}

MyPromise.resolve = function (value) {
  return new MyPromise((resolve) => resolve(value));
};

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => reject(reason));
};

MyPromise.all = function (promiseList = []) {
  const p1 = new Promise((resolve, reject) => {
    const result = [];
    const length = promiseList.length;
    let resolveCount = 0;
    promiseList.forEach((p) => {
      p.then((data) => {
        result.push(data);
        resolveCount++;
        if (resolveCount === length) {
          resolve(result);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  });
  return p1;
};

MyPromise.race = function (promiseList) {
  let resolved = false;
  const p1 = new MyPromise((resolve, reject) => {
    promiseList.forEach((p) => {
      p.then((data) => {
        if (!resolved) {
          resolve(data);
          resolved = true;
        }
      }).catch((err) => {
        reject(err);
      });
    });
  });
  return p1;
};
```

### 深拷贝

```js
function deepClone(obj = {}) {
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }

  let result;
  if (obj instanceof Array) {
    result = [];
  } else {
    result = {};
  }

  for (let key in obj) {
    // 保证key 不是原型的属性
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }

  return result;
}
```

###

```js
const obj = {
  x: 100,
};

if (obj.a == null) {
}

// 相当于
// if(obj.a === null || obj.a === undefined) {}
```

### 闭包

```js
function create() {
  let a = 100;
  return function () {
    console.log(a);
  };
}

const fn = create();

const a = 200;
fn(); // 100
```

### 闭包函数作为参数

```js
function print(fn) {
  const a = 200;
  fn();
}

const a = 100;
function fn() {
  console.log(a);
}

print(fn);
```

### 异步处理

```js
import $ from 'jQuery';

console.log('start');

$.get('https://cnodejs.org/api/v1/topics', function (data) {
  console.log('data', data);
});

console.log('end');
```

### promise 加载图片

```js
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error('图片加载失败'));
    };
    img.src = url;
  });
}
```

### 事件代理

```js
<div id="div1">
  <a href="#">aaa</a>
  <a href="#">bbb</a>
  <a href="#">ccc</a>
</div>;

const div1 = document.getElementById('div1');

div1.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(event.target);
});
```

### 代理函数

```ts
function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector;
    selector = null;
  }

  elem.addEventListender(type, (event) => {
    const target = event.target;
    if (selector) {
      // 代理邦定
      if (target.matches(selector)) {
        fn.call(target, event);
      }
      return;
    }
    fn.call(target, event);
  });
}
```

### ajax

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://cnodejs.org/api/v1/topics', false);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
};

xhr.send(null);
```

### Promise 版 ajax

```js
function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else if (xhr.status === 400) {
        reject(new Error('请求出错'));
      }
    };
    xhr.send(null);
  });
}
```

### http 和 https

1. http 是明文传输，敏感信息容易被中间劫持
2. https = http + 加密 劫持了也无法解密

### 加密方式

1. 对称加密： 一个 key 同负责加密，解密
2. 非对称加密： 一对 key,A 加密之后只能用 B 来解密 https 同时用到对称加密和非对称加密

### 防抖函数

```js
const oInput = document.getElementById('input');

function debounce(fn, delay = 500) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

oInput.addEventListener(
  'keyup',
  debounce(() => {
    console.log(oInput.value);
  }),
);
```

### 节流函数

```js
const div1 = document.getElementById('div1');

function throttle(fn, delay = 200) {
  let timer = null;
  return function () {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

div1.addEventListener(
  'drag',
  throttle((event) => {
    console.log(event.offsetX);
  }),
);
```

### 判断两个对像是否相等

```js
function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

function isEqual(obj1, obj2) {
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2;
  }

  if (obj1 === obj2) {
    return true;
  }

  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (let key in obj1) {
    const result = isEqual(obj1[key], obj2[key]);
    if (!result) {
      return false;
    }
  }
  return true;
}

const obj1 = {
  a: 100,
  b: {
    x: 100,
    y: 200,
  },
};

const obj2 = {
  a: 100,
  b: {
    x: 100,
    y: 200,
  },
};
```

### splice 的用法

```js
const arr = [10, 20, 30, 40, 50];
const result = arr.splice(1, 2, 'a', 'b', 'c');

console.log('arr', arr);
console.log('result', result);
```

### map 操作

```js
const arr = [10, 20, 30].map((num, index) => {
  return parseInt(num, index);
});

console.log(arr);
```

### 函数场明函数提升

```js
const result = sum(10, 20);

function sum(x, y) {
  return x + y;
}
```

### 函数表过式不会变量提升

```js
const result = sum(10, 20);
console.log('result', result);

const sum = function (x, y) {
  return x + y;
};
```

### this 的场影题

```js
const User = {
  count: 1,
  getCount: function () {
    return this.count;
  },
};

console.log(User.getCount());
const func = User.getCount;

console.log(func());
```

### trim 方法

```js
String.prototype.trim = function () {
  return this.replace(/^\s+/, '').replace('/s+$', '');
};
```

### 数组拍平

```js
function flatten(arr) {
  const isDeep = arr.some((item) => item instanceof Array);
  if (!isDeep) {
    return arr;
  }

  const result = Array.prototype.concat.apply([], arr);
  return flatten(result);
}

const result = flatten([
  [1, 2],
  [3, 4],
]);
```

### map 类型有序类型

```js
const m = new Map([
  ['k1', 'hello'],
  ['k2', 100],
]);

m.set('name', 'hello');

m.forEach((key, value) => console.log({ key, value }));
```

### set 无序速度快

```js
const set = new Set([10, 20, 30, 40]);
set.forEach((val) => console.log(val));
```

### WeakMap

```js
const vMap = new WeakMap();

const userInfo = {
  name: 'hello',
};

const cityInfo = {
  name: 'world',
};

vMap.set(userInfo, cityInfo);

console.log(vMap.get(userInfo));
```

### reduce 求和函数

```js
const arr = [10, 20, 30, 40, 50];

const sum = arr.reduce((sum, curVal, index, arr) => {
  console.log({ sum, curVal, index, arr });
  return sum + curVal;
}, 0);

console.log('sun', sum);
```

## 算法与数据结构

### 旋转数组 key 步 pop 和 unshift

```js
function rotate1(arr, k) {
  const length = arr.length;
  if (!k || length === 0) return arr;

  const step = Math.abs(k % length);

  for (let i = 0; i < step; i++) {
    const n = arr.pop();
    if (n) {
      arr.unshift(n);
    }
  }
  return arr;
}

const arr = [1, 2, 3, 4, 5, 6, 7];
const arr1 = rotate1(arr, 3);
console.log(arr1);
```

### 旋转数组 key 步 slice 和 concat

```js
function rotate2(arr, k) {
  const length = arr.length;
  if (!k || length === 0) return arr;

  const step = Math.abs(k % length);

  const part1 = arr.slice(-step);
  const part2 = arr.slice(0, length - step);

  return part1.concat(part2);
}

const arr = [1, 2, 3, 4, 5, 6, 7];

const arr1 = rotate2(arr, 3);
console.log(arr1);
```

### 微任务与宏任务

```js
console.log('start');

setTimeout(() => {
  console.log('timeout');
});

Promise.resolve().then(() => {
  console.log('promise then');
});

console.log('end');
```

### for 和 forEach 那个更快

```js
// for更快
// forEeach每次都要创建一个函数来调用，而for不会创建函数
// 函数需要独立的作用域，会有额外的开销
const arr = [];

for (let i = 0; i < 10000 * 10000; i++) {
  arr.push(i);
}

const length = arr.length;

console.time('for');
let n = 0;

for (let i = 0; i < length; i++) {
  n++;
}

console.timeEnd('for'); // 2.36 for更快

console.time('forEach');
let n1 = 0;
arr.forEach(() => {
  n1++;
});
console.timeEnd('forEach'); //8.78
```

### 判断括号是否匹配

```js
function isMatch(left, right) {
  if (left === '{' && right === '}') return true;
  if (left === '[' && right === ']') return true;
  if (left === '(' && right === ')') return true;

  return false;
}

function matchBracket(str) {
  const length = str.length;

  if (length === 0) return true;

  const stack = [];

  const leftSymbols = '([{';
  const rightSymbols = '}])';

  for (let i = 0; i < length; i++) {
    const s = str[i];
    if (leftSymbols.includes(s)) {
      stack.push(s);
    } else if (rightSymbols.includes(s)) {
      const top = stack[stack.length - 1];
      if (isMatch(top, s)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}

const str = '([{}])';

console.log(matchBracket(str));
```

### 栈模拟队列

```js
class Queue {
  stack1 = [];
  stack2 = [];
  constructor() {}

  add(n) {
    this.stack1.push(n);
  }

  delete() {
    let result;
    const stack1 = this.stack1;
    const stack2 = this.stack2;

    while (stack1.length) {
      const n = stack1.pop();
      if (n != null) {
        stack2.push(n);
      }
    }

    // 执行stack pop
    result = stack2.pop();
    while (stack2.length) {
      const n = stack2.pop();
      if (n != null) {
        stack1.push(n);
      }
    }

    return result || null;
  }

  get length() {
    return this.stack1.length;
  }
}
```

### 链表反转

```js
// 链表反转
function reverseLinkList(listNode) {
  let prevNode;
  let curNode;
  let nextNode = listNode;

  while (nextNode) {
    if (curNode && !prevNode) {
      delete curNode.next;
    }

    if (curNode && prevNode) {
      curNode.next = prevNode;
    }

    prevNode = curNode;
    curNode = nextNode;
    nextNode = nextNode.next;
  }

  curNode.next = prevNode;

  return curNode;
}

function createLinkList(arr) {
  const length = arr.length;

  if (length === 0) throw new Error('数组为空');

  let curNode = {
    value: arr[length - 1],
  };

  if (length === 1) return curNode;

  for (let i = length - 2; i >= 0; i--) {
    curNode = {
      value: arr[i],
      next: curNode,
    };
  }

  return curNode;
}

const n = createLinkList([1, 2, 3, 4]);

console.log(reverseLinkList(n));
```

### 同域多 tab 数据共享

```js
let btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  let obj = {
    id: Math.random(),
    name: 'hello',
  };
  console.log('hello');
  localStorage.setItem('info', JSON.stringify(obj));
});

window.addEventListener('storage', (event) => {
  console.log('key', event.key);
  console.log('value', event.newValue);
});
```

### kao2 洋葱圈模型

```js
const Koa = require('koa2');

const app = new Koa();

app.use(async (ctx, next) => {
  await next();

  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();

  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx) => {
  ctx.body = 'hello world';
});

app.listen(3000);
```

### parseInt 进制转换

```js
// [1,NaN,NaN]
let arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

console.log(arr.map(parseInt));
```

### 数组转树

```js
let arr = [
  {
    id: 1,
    name: '部门A',
    parentId: 0,
  },
  {
    id: 2,
    name: '部门B',
    parentId: 1,
  },
  {
    id: 3,
    name: '部门C',
    parentId: 1,
  },
  {
    id: 4,
    name: '部门D',
    parentId: 2,
  },
  {
    id: 5,
    name: '部门E',
    parentId: 2,
  },
  {
    id: 6,
    name: '部门F',
    parentId: 3,
  },
];

function convert(arr) {
  const map = new Map();

  let root = null;

  let length = arr.length;
  for (let i = 0; i < length; i++) {
    const { id, name, parentId } = arr[i];

    let treeNode = {
      id,
      name,
    };
    map.set(id, treeNode);

    let parentNode = map.get(parentId);
    if (parentNode) {
      if (parentNode.children == null) parentNode.children = [];
      parentNode.children.push(treeNode);
    }
    if (parentId === 0) root = treeNode;
  }

  return root;
}

console.log(convert(arr));
```

### 树转树组

```js
let obj = {
  id: 1,
  name: '部门A',
  children: [
    {
      id: 2,
      name: '部门B',
      children: [
        {
          id: 4,
          name: '部门D',
        },
        {
          id: 5,
          name: '部门E',
        },
      ],
    },
    {
      id: 3,
      name: '部门C',
    },
  ],
};

function convert(root) {
  const map = new Map();

  const arr = [];

  // 广度优先遍历
  const queue = [];
  queue.unshift(root);

  while (queue.length > 0) {
    const curNode = queue.pop();
    if (!curNode) break;

    const { id, name, children = [] } = curNode;

    const parentNode = map.get(curNode);
    const parentId = (parentNode && parentNode.id) || 0;
    const item = { id, name, parentId };
    arr.push(item);

    // 子节点入队
    children.forEach((child) => {
      map.set(child, curNode);
      queue.unshift(child);
    });
  }
  return arr;
}

console.log(convert(obj));
```

### 原型

```js
function Foo() {
  Foo.a = function () {
    console.log(1);
  };
  this.a = function () {
    console.log(2);
  };
}

Foo.prototype.a = function () {
  console.log(3);
};

Foo.a = function () {
  console.log(4);
};

Foo.a(); // 4

let obj = new Foo();

obj.a(); // 2;

Foo.a(); // 1
```

### then 交替执行

```js
Promise.resolve()
  .then(() => {
    console.log(0);
    // then中返回promise实例 ‘慢两拍’
    return Promise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });
```

### 连续赋值

```js
// undefined {n:2}
let a = {
  n: 1,
};

let b = a;

a.x = a = { n: 2 };

console.log(a.x);
console.log(b.x);
```

### 对像 key 只能是字符串和 Symbol 其它类型都会调用 toString()

```js
let a = {},
  b = '123',
  c = 123;
a[b] = 'b';
a[c] = 'c';

console.log(a[b]); //c

let a = {},
  b = Symbol('123'),
  c = Symbol('123');
a[b] = 'b';
a[c] = 'c';

console.log(a[b]); // b

let a = {},
  b = { key: '123' },
  c = { key: '123' };
a[b] = 'b';
a[c] = 'c';

console.log(a[b]);
```

### 数组偏平化

```js
export function flatten(arr) {
  const result = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item);
    }
  });
  return result;
}

console.log(flatten([1, 2, [3, 4]]));
```

### 数组深度扁平化

```js
export function flattenDeep1(arr) {
  const result = [];
  (arr || []).forEach((item) => {
    if (Array.isArray(item)) {
      const flatItem = flattenDeep1(item);
      result.push(...flatItem);
    } else {
      result.push(item);
    }
  });

  return result;
}

export function flattenDeep2(arr) {
  let result = [];
  (arr || []).forEach((item) => {
    if (Array.isArray(item)) {
      const flatItem = flattenDeep2(item);
      result = result.concat(flatItem);
    } else {
      result = result.concat(item);
    }
  });

  return result;
}

console.log(flattenDeep2([1, 2, [3, [4, [5, [6, ['a', 'b']]]]]]));
```

### 获取数据类型

```js
export function getType(x) {
  const originType = Object.prototype.toString.call(x);

  const spaceIndex = originType.indexOf(' ');
  return originType.slice(spaceIndex + 1, -1).toLowerCase();
}

console.log(getType('123'));
```

### 函数柯里化

```js
export function curry(fn) {
  const fnArgsLength = fn.length;
  let args = [];

  return function calc(...newArgs) {
    args = [...args, ...newArgs];
    if (args.length < fnArgsLength) {
      return calc;
    } else {
      return fn.apply(this, args.slice(0, fnArgsLength));
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curryAdd = curry(add);
console.log(curryAdd(10)(20)(30));
```

### LazyMan 任务队列

```js
class LazyMan {
  tasks = [];
  constructor(name) {
    this.name = name;
    setTimeout(() => {
      this.next();
    });
  }
  next() {
    const task = this.tasks.shift();
    if (task) task();
  }
  eat(food) {
    const task = () => {
      console.log(`${this.name} eat ${food}`);
      this.next();
    };
    this.tasks.push(task);
    return this;
  }

  sleep(seconds) {
    const task = () => {
      setTimeout(() => {
        console.log(`${this.name} 已经睡完了 ${seconds}s`);
        this.next();
      }, seconds * 1000);
    };
    this.tasks.push(task);
    return this;
  }
}

const m = new LazyMan('tom');
m.eat('苹果').eat('香蕉').sleep(2).eat('葡萄').sleep(1).eat('西瓜');
```

### 自定义 InstanceOf

```js
export function MyInstance(instance, origin) {
  if (instance == null) return false; // null undefined

  if (typeof instance !== 'object' && typeof instance !== 'function') {
    return false;
  }

  let tempInstance = instance;
  while (tempInstance) {
    if (tempInstance.__proto__ === origin.prototype) {
      return true;
    }
    tempInstance = tempInstance.__proto__;
  }
  return false;
}

console.log(MyInstance({}, Object));
console.log(MyInstance([], Object));
console.log(MyInstance([], Array));
console.log(MyInstance('123', Number));
```

### 自定义bind

```js
Function.prototype.mybind = function (context, ...bindArgs) {
  const self = this;

  return function (...args) {
    const newAargs = bindArgs.concat(args);
    return self.apply(context, newAargs);
  };
};

function fn(a, b, c) {
  console.log({ a, b, c });
}

const fn1 = fn.mybind({ x: 100 }, 10);
fn1(20, 30);
```
### 自定义call
```js
Function.prototype.myCall = function(context,...args) {
  if(context == null) context = globalThis;

  if(typeof context !== 'object') context = new Object(context);

  const fnKey = Symbol();
  context[fnKey] = this;

  const result = context[fnKey](...args);
  delete context[fnKey];

  return result;
}


function fn(a,b,c) {
  console.log(a,b,c);
}

fn.myCall({x:123},1,2,3);

```
### 自定义EventBus事件总线
```js
class EventBus {
  constructor() {
    this.events = {};
  }

  on(type, fn, isOnce = false) {
    const events = this.events;
    if (events[type] == null) {
      events[type] = [];
    }
    events[type].push({ fn, isOnce });
  }

  once(type, fn) {
    this.on(type, fn, true);
  }

  off(type, fn) {
    if (!fn) {
      // 解邦所有type的函数
      this.events[type] = [];
    } else {
      // 解绑单个fn
      const fnList = this.events[type];
      if (fnList) {
        this.events[type] = fnList.filter((item) => item.fn !== fn);
      }
    }
  }
  emit(type, ...args) {
    const fnList = this.events[type];
    if (fnList == null) return;

    this.events[type] = fnList.filter((item) => {
      const { fn, isOnce } = item;
      fn(...args);

      if (!isOnce) return true;
      return false;
    });
  }
}

const events = new EventBus();

function fn1(a,b) {
  console.log('fn1',a,b);
}

function fn2(a,b) {
  console.log('fn2',a,b);
}

function fn3(a,b) {
  console.log('fn3',a,b);
}


events.on('key1',fn1);
events.on('key1',fn2);
events.once('key1',fn3);

events.emit('key1',10,20);

events.off('key1',fn1);
events.emit('key1',10,20);
// events.emit('key1',10,20);

```

### LRU缓存
```js
class LRUCache {
  constructor(length) {
    if (length < 1) throw new Error('无效的length');
    this.length = length;
    this.data = new Map();
  }

  set(key, value) {
    const data = this.data;
    if (data.has(key)) {
      data.delete(key);
    }

    data.set(key, value);

    if (data.size > this.length) {
      const delKey = data.keys().next().value;
      data.delete(delKey);
    }
  }

  get(key) {
    const data = this.data;
    if(!data.has(key)) return null;
    const value = data.get(key);

    data.delete(key);

    data.set(key,value);

    return value;
  }
}

const lruCache = new LRUCache(2);
lruCache.set(1,1);
lruCache.set(2,2);

console.log(lruCache.get(1));
lruCache.set(3,3);

console.log(lruCache.get(2));

lruCache.set(4,4);
console.log(lruCache.get(1));
console.log(lruCache.get(3));
console.log(lruCache.get(4));

```
### 统计sdk
```js
class MyStatis {
  constructor(productId) {
    this.productId = productId;

    //
    this.performance();
  }

  // 发送统计数据
  send(url, params = {}) {
    params.productId = this.productId;

    const paramsArr = [];
    for (let key in params) {
      const value = params[key];

      paramsArr.push(`${key}=${value}`);

      const newUrl = `${url}?${paramsArr.join('&')}`;

      // 用<img> 发送1. 可跨域;2.兼容性非常好
      const img = document.createElement('img');
      img.src = newUrl;
    }
  }

  // 初始化性能统计
  initPerformance() {
    const url = 'xxxx';
    this.send(url, performance.timing);
  }

  // 初始化错误监控
  initError() {
    // js错误
    window.addEventListener('error', (event) => {
      const { error, lineno, colno } = event;
      this.error(error, { lineno, colno });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.error(new Error(event.reason), { type: 'unhandledrejection' });
    });
  }

  pv() {
    this.event('pv');
  }

  event(key, value) {
    const url = 'xxx';
    this.send(url, { key, value });
  }

  error(err, info) {
    const url = 'xxx';
    const { message, stack } = err;
    this.send(url, { message, stack, ...info });
  }
}

```

### 请说明Ajax Fetch Axios 三者的区别

- 三者都用于网络请求，但是不同维度
- Ajax(Asynchorous javascript and xml) 一种技术统称
- Fetch 浏览器原生api
- Axios，是一个http第三方库

### 节流和防抖
- 防抖：防止抖动，“你先抖动着，啥时”
```js
function debounce(fn,delay = 200) {
    let timer = 0;
    return function() {
        if(timer) clearTimeout(timer);

        timer = setTimeout(() =>{
            fn.applay(this,arguments);
            timer = 0;
        },delay)
    }
}
```









