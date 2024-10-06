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

### path 常用方法

- path 模块是 Node.js 的核心模块之一，提供了处理和转换文件路径的实用方法。它能够帮助开发者跨平台地处理文件路径问题，因为不同操作系统的路径分隔符不同（Windows 使用 \，而 POSIX 系统（如 Linux 和 macOS）使用 /）。

1.  ##### path.basename(p[, ext])

- 作用：返回路径的最后一部分，也就是文件名。如果提供了 ext 参数，会从结果中移除这个扩展名。
- 参数：

1. p: 文件路径。
2. ext: 可选，文件扩展名（若提供此参数，会从返回值中移除它）。

```js
const path = require('path');
const filePath = '/user/local/bin/file.txt';
console.log(path.basename(filePath)); // 输出: file.txt
console.log(path.basename(filePath, '.txt')); // 输出: file
```

2.  ##### path.dirname(p)

- 作用：返回路径的目录部分。
- 参数：

- p: 文件路径。

```js
const path = require('path');
const filePath = '/user/local/bin/file.txt';
console.log(path.dirname(filePath)); // 输出: /user/local/bin
```

3. ##### path.extname(p)

- 作用：返回路径中文件的扩展名。
- 参数：
- p: 文件路径。

```js
const path = require('path');
const filePath = '/user/local/bin/file.txt';
console.log(path.extname(filePath)); // 输出: .txt
```

4. ##### path.join([...paths])

- 作用：使用平台特定的分隔符将所有给定的路径片段连接在一起，并规范化生成的路径。

```js
const path = require('path');
const joinedPath = path.join('/user', 'local', 'bin/file.txt');
console.log(joinedPath); // 输出: /user/local/bin/file.txt
```

5. ##### path.resolve([...paths])

- 作用：将路径或路径片段解析为绝对路径。如果没有给定路径片段，则使用当前工作目录。

```js
const path = require('path');

const absolutePath = path.resolve('file.txt');
console.log(absolutePath);

const resolvedPath = path.resolve('/user', 'local', 'bin/file.txt');
console.log(resolvedPath);
```

6. ##### path.normalize(p)

- 作用：规范化给定的路径，解析 .. 和 . 片段，并移除多余的斜杠。
- 参数：
- p: 需要规范化的路径。

```js
const path = require('path');
const normalizedPath = path.normalize('/user//local/../bin/file.txt');
console.log(normalizedPath);
```

7. ##### path.isAbsolute(p)

- 作用：判断给定路径是否为绝对路径。
- 参数：
- p: 文件路径。
- 返回：布尔值，表示路径是否是绝对路径。

```js
const path = require('path');
console.log(path.isAbsolute('/user/local/bin')); // 输出: true
console.log(path.isAbsolute('file.txt')); // 输出: false
```

8. ##### path.relative(from, to)

- 作用：根据两个给定的路径，返回相对路径。
- 参数：
- from: 起始路径。
- to: 目标路径。

```js
const path = require('path');
const fromPath = '/user/local/bin';
const toPath = '/user/local/lib/file.txt';
console.log(path.relative(fromPath, toPath)); // 输出: ../lib/file.txt
```

9. ##### path.parse(p)

- 作用：将路径解析为一个对象，包含 root、dir、base、ext 和 name 属性。
- 参数：
- p: 文件路径。
- 返回：一个对象，包含路径的各个部分。

```js
const path = require('path');
const filePath = '/user/local/bin/file.txt';
const parsedPath = path.parse(filePath);
console.log(parsedPath);
//-------------------------------------
{
  root: '/',
  dir: '/user/local/bin',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
```

9. ##### path.format(pathObject)

- 作用：将 path.parse() 返回的对象重新组合为路径。
- 参数：
- pathObject: 包含路径信息的对象，类似 path.parse() 的输出。

```js
const path = require('path');
const pathObject = {
  root: '/',
  dir: '/user/local/bin',
  base: 'file.txt',
  ext: '.txt',
  name: 'file',
};
const formattedPath = path.format(pathObject);
console.log(formattedPath); // 输出: /user/local/bin/file.txt
```

### Buffer 模块

- 在 Node.js 中，Buffer 是处理二进制数据的核心模块。它在网络通信、文件读写等场景中非常常用，特别是在处理像 TCP 数据流、文件 I/O 以及其他没有明确编码的原始数据时。
- 与浏览器 JavaScript 不同，Node.js 中的 Buffer 类可以直接处理和存储二进制数据，且在引入了 TypedArray 之前，这是 Node.js 中唯一可用的处理原始字节的方式。

1. ##### Buffer.alloc(size[, fill[, encoding]])

- 作用：分配一个大小为 size 的缓冲区，并用 fill 填充该缓冲区。encoding 是填充时的编码，默认为 'utf8'。

```js
const buf = Buffer.alloc(10);
const bufFilled = Buffer.alloc(10, 'a');
console.log(bufFilled.toString());
```

2. ##### Buffer.from(array)

- 作用：将数组、字符串或其他对象转换为 Buffer。

```js
const bufFromArray = Buffer.from([1, 2, 3]);
console.log(bufFromArray); // 输出: <Buffer 01 02 03>

const bufFromString = Buffer.from('Hello, World!', 'utf8');
console.log(bufFromString); // 输出: <Buffer
```

- 作用：将 Buffer 中的数据解码为字符串。默认使用 utf8 编码，可以指定起始和结束位置。

```js
const buf = Buffer.from('Hello, World!', 'utf8');
console.log(buf.toString()); // 输出: Hello, World!
console.log(buf.toString('utf8', 0, 5)); // 输出: Hello
```

4. ##### buf.write(string[, offset[, length]][, encoding])

- 作用：将 string 写入 Buffer。offset 是从 Buffer 的哪个位置开始写入，length 是写入的字节数，encoding 是编码格式，默认是 'utf8'。

```js
const buf = Buffer.alloc(10);
buf.write('Hello', 0, 'utf8');
console.log(buf.toString()); // 输出: Hello
```

5. ##### Buffer.concat(list[, totalLength])

- 作用：合并多个 Buffer 为一个 Buffer。list 是要合并的 Buffer 数组，totalLength 是合并后 Buffer 的总长度。

```js
const buf1 = Buffer.from('Hello,');
const buf2 = Buffer.from('World!');

const combinedBuf = Buffer.concat([buf1, buf2]);
console.log(combinedBuf.toString());
```

6. ##### Buffer.byteLength(string[, encoding])

- 作用：返回给定字符串的字节长度。

```js
const str = 'hello world';
console.log(Buffer.byteLength(str));
```

7. ##### buf.slice([start[, end]])

- 作用：返回 Buffer 的一个片段，类似于数组的 slice() 方法。

```js
const buf = Buffer.from('Hello, World!', 'utf8');
const sliceBuf = buf.slice(0, 5);
console.log(sliceBuf.toString()); // 输出: Hello
```

8. ##### buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])

- 作用：将当前 Buffer 的内容复制到目标 Buffer。

```js
const buf1 = Buffer.from('Hello');
const buf2 = Buffer.alloc(5);
buf1.copy(buf2);
console.log(buf2.toString()); // 输出: Hello
```

9. ##### buf.equals(otherBuffer)

- 作用：比较两个 Buffer 的内容是否相同。

```js
const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('ABC');
const buf3 = Buffer.from('DEF');

console.log(buf1.equals(buf2)); // 输出: true
console.log(buf1.equals(buf3)); // 输出: false
```

10. ##### buf.indexOf(value[, byteOffset][, encoding])

- 作用：查找 Buffer 中的某个值，返回其首次出现的位置，如果没有找到则返回 -1。

```js
const buf = Buffer.from('Hello, World!', 'utf8');
console.log(buf.indexOf('World')); // 输出: 7
console.log(buf.indexOf('XYZ')); // 输出: -1
```

11. ##### buf.fill(value[, offset[, end]][, encoding])

- 作用：用指定值填充 Buffer 的内容。

```js
const buf = Buffer.alloc(10);
buf.fill('a');
console.log(buf.toString()); // 输出: aaaaaaaaaa
```

<!-- [last](https://www.bilibili.com/video/BV1gM411W7ex/?spm_id_from=333.337.search-card.all.click&vd_source=10257e657caa8b54111087a9329462e8)
[高级](https://www.bilibili.com/video/BV1sA41137qw/?spm_id_from=333.337.search-card.all.click&vd_source=10257e657caa8b54111087a9329462e8) -->
