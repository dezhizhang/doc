# node 高级全栈之路

1. ##### 演示地址 [演示地址](https://www.shuqin.cc/market/design-component)
2. ##### 源码地址 [源码地址](https://github.com/starfruitcloud/shuqin)
3. ##### 获取更多 [获取更多](https://www.xiaozhi.shop/)

### nodejs 架构图

![nodejs](../../public/nodejs/1.jpeg)

### 常见全局变量

1. ##### \_\_dirname

- 表示当前执行的脚本所在目录的绝对路径。

```js
console.log(__dirname);
```

2. ##### \_\_filename

- 表示当前执行的脚本文件的绝对路径。

```js
console.log(__filename);
```

3. ##### global

- global 是 Node.js 的全局对象，类似于浏览器中的 window 对象。
- 任何挂载到 global 的属性或方法都可以在整个应用中访问。

```js
global.myVar = 'Hello, World!';
console.log(global.myVar); // 输出: Hello, World!
```

4. ##### process

- process 对象提供有关当前 Node.js 进程的信息以及控制进程的方法。它包含关于环境、命令行参数、标准输入输出流等信息。

```js
console.log(process.version); // Node.js 的版本
console.log(process.env); // 环境变量
console.log(process.argv); // 命令行参数
```

5. ##### Buffer

- Buffer 对象用于处理二进制数据流，特别是在处理文件或网络数据时非常有用。

```js
const buf = Buffer.from('Hello, World!');
console.log(buf.toString()); // 输出: Hello, World!
```

6. ##### setTimeout()

- 用于延迟执行代码。与浏览器中的 setTimeout 一样，但在 Node.js 中，这是全局函数，不需要引入任何模块。

```js
setTimeout(() => {
  console.log('Executed after 1 second');
}, 1000);
```

7. ##### setInterval

- 用于定时执行代码。与 setTimeout() 类似，但它会以固定的时间间隔重复执行。

```js
setInterval(() => {
  console.log('Repeated every 2 seconds');
}, 2000);
```

8. ##### clearTimeout

- 用于取消由 setTimeout() 创建的定时器。

```js
const timer = setTimeout(() => {
  console.log('This will not be logged');
}, 5000);

clearTimeout(timer);
```

9. ##### clearInterval

- 用于取消由 setInterval() 创建的定时器。

```js
const interval = setInterval(() => {
  console.log('This will not repeat');
}, 2000);

clearInterval(interval);
```

10. ##### require()

- require() 函数用于引入模块。它是 CommonJS 模块系统的一部分。

```js
const fs = require('fs');
```

11. ##### module

- module 对象表示当前模块本身。它包含关于模块的信息，比如 module.exports 属性，它用于导出模块的内容。

```js
console.log(module.exports); // 打印导出的内容
```

12. ##### exports

- exports 是 module.exports 的快捷方式，用于导出模块的属性或方法。

```js
exports.myFunction = function () {
  return 'Hello!';
};
```

13. ##### console

- 提供与控制台输出相关的方法，如 console.log()、console.error()、console.warn() 等。

```js
console.log('This is a log message');
console.error('This is an error message');
```

<!-- [last](https://www.bilibili.com/video/BV1gM411W7ex/?spm_id_from=333.337.search-card.all.click&vd_source=10257e657caa8b54111087a9329462e8)
[高级](https://www.bilibili.com/video/BV1sA41137qw/?spm_id_from=333.337.search-card.all.click&vd_source=10257e657caa8b54111087a9329462e8) -->
