# promise

### 从入门到精通

### 常觉的内置错误

1. ##### 错误类型

- Error： 所有错误的父类型
- ReferenceError：引用的变量不存在
- TypeError： 数据类型不正确的错误
- RangeError：数据值不在其所允许的范围内
- SyntaxError： 语法错误

2. ##### 错误处理

- 捕获错误：try ...catch
- 抛出错误：throw error

3. ##### 错误对像

- message 属性：错误相关信息
- stack 属性：函数调用栈记录信息

### Promise 的理解

1. ##### Promise 是什么

- Promise 是 js 中进行异步编程的新的解决方案

2. ##### 具体表达

- 从语法上来说：Promise 是一个构造函数
- 从功能上来说：Promise 对像用来封装一个异步操作并可以获取其结果

3. ##### Promise 状态改变

- pending 变为 resolved
- pending 变为 rejected
  说明：只有这 2 种，且一个 promise 对像只能改变一次，无论变为成功还是失败，都会有一个结果数据
  成功的结果数据一搬称为 value,失败的结果数据一搬为 reason

4. ##### Promise 的基本流程

![alt text](../../public/promise/flow.png)

5. ##### Promise 的基本使用

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    const time = Date.now();
    if (time % 2 == 0) {
      resolve('ok');
    } else {
      reject('error');
    }
  }, 1000);
});

p.then(
  (value) => {
    // 接收到成功的数据
    console.log('value', value);
  },
  (reson) => {
    // 接收到失败的数据
    console.log('reson', reson);
  },
);
```

### 为什么要用 Promise

- 指定回调函数的方法更加灵活
- 支持链式调用，可以解决回调地狱问题

```js
const p = new Promise((resolve, reject) => {
  console.log('执行excutor');
  setTimeout(() => {
    const time = Date.now();
    if (time % 2 === 0) {
      resolve('ok');
    } else {
      reject('error');
    }
  }, 1000);
});

setTimeout(() => {
  p.then(
    (value) => {
      console.log('value', value);
    },
    (reson) => {
      console.log('reson', reson);
    },
  );
}, 2000);

console.log('new Promise之后');
```

### Promise API 说明

- excutor 函数：同步执行（resolve,reject） => {}
- resolve 函数：执行器内部定义成功时的调用函数
- reject 函数：内部定义失败时调用的函数

1. ##### Promise 正常调用

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功时的数据');
  }, 1000);
})
  .then(
    (value) => {
      console.log('value', value);
    },
    (reson) => {
      console.log('reson', reson);
    },
  )
  .catch((reson) => {
    console.log('onRejected', reson);
  });
```

2. ##### Promise 静态方法

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('失败的数据');
  }, 1000);
});

const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);

p1.then((value) => console.log('p1', value));
p2.then((value) => console.log('p2', value));
p2.catch((reson) => console.log('p2', reson));
```

### Promise 状态改变

1. ##### Promise 正常调用

```js
const p = new Promise((resolve, reject) => {
  throw 3;
});

p.then(
  (value) => {},
  (reason) => {
    console.log('reason', reason);
  },
);

p.then(
  (value) => {},
  (reason) => {
    console.log('reason2', reason);
  },
);
```

2. ##### Promise 如何先改状态，后指定回调函数

```js
new Promise((resolve, reject) => {
  resolve(1);
}).then(
  (value) => console.log('value2', value),
  (reason) => console.log('reason', reason),
);

console.log('---------');
```

3. ##### Promise 如何先改状态，后指定回调函数

```js
new Promise((resolve, reject) => {
  resolve(1);
})
  .then(
    (value) => console.log('onResolved1', value),
    (reason) => console.log('onRejected1', reason),
  )
  .then(
    (value) => console.log('onResolved2', value),
    (reason) => console.log('onRejected2', reason),
  );
```

4. ##### Promise 异常穿透
```js
new Promise((resolve, reject) => {
  resolve(1);
})
  .then((value) => {
    console.log("onResolved()", value);
    return 2;
  })
  .then(
    (value) => {
      console.log("onResolved()", value);
      return 3;
    },
    (reason) => Promise.reject(reason)
  )
  .then((value) => {
    console.log("onResolved3()", value);
  })
  .catch((reason) => {
    console.log("onRejected1()", reason);
  });

```
5. ##### 中断promise链
```js
new Promise((resolve,reject) => {
  resolve(1)
}).then(
  value => console.log('value1',value),
  reason => Promise.reject('reason1',reason)
).then(value => {
  value => console.log('onResolved2',value),
  reson => Promise.reject(reson)
}).catch((reson) => {
  // 中断promise链
  return new Promise(() => {})
}).then(
  value => console.log('onResolved3',value),
  reson => {
    console.log('onRejected3',reson)
  }
)
```

<!-- [last](https://www.bilibili.com/video/BV1MJ41197Eu/?p=4&spm_id_from=pageDriver&vd_source=10257e657caa8b54111087a9329462e8) -->
