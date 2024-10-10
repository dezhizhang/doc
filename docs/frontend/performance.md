# 前端性能优化全面指南

- 前端性能优化是提升用户体验的关键，页面加载速度、响应时间和交互流畅度直接影响用户的留存率和满意度。以下是常用的前端性能优化方法，从网络层、资源加载、JavaScript 执行、渲染性能等方面进行全方位优化。

### 减少 HTTP 请求

- 合并文件：将多个 CSS 和 JS 文件合并，减少请求次数。
- 使用图像精灵：将多个小图标合并到一张图片，通过 CSS 的 background-position 定位，减少图片请求数量。

### 文件压缩与打包

- 压缩代码：使用工具（如 Webpack、Gulp、UglifyJS 等）去除代码中的空格、注释等无关内容。
- 图片压缩：通过工具（如 TinyPNG、ImageOptim）优化图片文件大小。

### 启用浏览器缓存

- 通过设置 HTTP 头中的 Cache-Control 或 Expires，允许浏览器缓存静态资源，减少重复加载。

### 异步加载 JS 和 CSS

- JS 异步加载：使用 async 或 defer 属性异步加载脚本，避免阻塞页面渲染。
- CSS 资源加载优化：将关键 CSS 写入 HTML 的 <head>，非关键样式表异步加载。

### 减少 DOM 操作

- 频繁的 DOM 操作开销较大，尽量批量修改 DOM 或使用虚拟 DOM（如 React 中的 Virtual DOM）进行优化

### 使用现代浏览器特性

- 利用浏览器的预加载、预解析功能，如 prefetch、preload，提前加载后续可能需要的资源。

### 提升 CSS 选择器性能

- 尽量使用简单、高效的 CSS 选择器，避免使用层级过深的选择器。

### 减少重绘和回流

- 尽量减少对 DOM 的频繁修改，尤其是影响布局的修改，避免引发页面重绘（Repaint）和回流（Reflow）。

### 使用 HTTP/2

- 相较于 HTTP/1.1，HTTP/2 可以实现多路复用，提升传输效率。

### 服务端渲染 (SSR) 和静态生成 (SSG)

- 对于复杂的 JavaScript 框架（如 React、Vue 等），前端渲染可能导致首屏白屏时间过长。
  可以考虑：
- SSR (Server-Side Rendering)：在服务器端预先渲染页面，用户访问时直接看到 HTML 内容，减少客户端的渲染负担。Next.js 和 Nuxt.js 是常用的支持 SSR 的框架。
- SSG (Static Site Generation)：生成静态 HTML 文件用于服务，适合于内容不经常变动的网站，如博客等。

### 减少 JavaScript 运行时开销

过多的 JavaScript 会导致页面运行时性能下降，尤其是在低端设备上。可以通过以下方式优化：

- 减少第三方库的使用：许多第三方库（如 lodash）可能只用到其中一小部分功能，但引入整个库会造成代码冗余。可以通过 Tree Shaking 或按需引入解决：

```bash
import { debounce } from 'lodash'; // 仅引入特定功能

```

- 惰性初始化：将一些不必要的逻辑推迟到实际需要时再初始化，避免页面加载时的开销。
- 避免长任务：长时间运行的 JavaScript 会阻塞主线程，影响页面交互。可以使用 requestIdleCallback 或将任务分批次执行。

```js
window.requestIdleCallback(() => {
  // 在浏览器空闲时执行任务
});
```

### 优化图片和视频

- 响应式图片：使用 srcset 和 sizes 标签为不同设备提供不同尺寸的图片，确保移动设备不会加载过大的图片。
- 延迟加载非关键图片和视频：使用 loading="lazy" 属性实现懒加载，或者结合 Intersection Observer API 延迟加载

```js
<img src="image.jpg" loading="lazy" />
```

### 图片转 base64 格式

- 将小图片转换为 base64 编码字符串，并写入 HTML 或者 CSS 中，减少 http 请求
- 转 base64 格式的优缺点：
  1）它处理的往往是非常小的图片，因为 Base64 编码后，图片大小会膨胀为原文件的 4/3，如果对大图也使用 Base64 编码，后者的体积会明显增加，即便减少了 http 请求，也无法弥补这庞大的体积带来的性能开销，得不偿失
  2）在传输非常小的图片的时候，Base64 带来的文件体积膨胀、以及浏览器解析 Base64 的时间开销，与它节省掉的 http 请求开销相比，可以忽略不计，这时候才能真正体现出它在性能方面的优势

### 使用字体图标

- Tree shaking 的作用：消除无用的 JS 代码，减少代码体积
- tree-shaking 原理：
  1）依赖于 ES6 的模块特性，ES6 模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是 tree-shaking 的基础
  2）静态分析就是不需要执行代码，就可以从字面量上对代码进行分析。ES6 之前的模块化，比如 CommonJS 是动态加载，只有执行后才知道引用的什么模块，就不能通过静态分析去做优化，正是基于这个基础上，才使得 tree-shaking 成为可能

### 合理使用 Tree shaking

### 内容传递网络 (CDN)

- CDN：利用全球分布的边缘服务器缩短请求路径，提升资源加载速度。CDN 还可以自动进行图片压缩和优化，提供不同设备适配的资源。

### 性能监控与分析工具

要持续优化前端性能，必须使用监控工具分析性能瓶颈：

- Lighthouse：Google 提供的开源工具，可以分析网页的性能、可访问性、SEO 等，并给出优化建议。
- Performance API：浏览器内置的性能 API，可以在代码中插入时间戳，记录任务执行时间：

```js
performance.mark('startTask');
// 任务执行
performance.mark('endTask');
performance.measure('taskDuration', 'startTask', 'endTask');
```

- Webpack Bundle Analyzer：用于分析打包后文件的大小和组成，找到性能瓶颈，删除不必要的依赖。

### 预加载和预渲染 (Prefetching/Prerendering)

- Prefetch：提前加载用户可能访问的资源（如下一页所需的 JS、CSS、图片等），减少未来页面跳转时的加载时间。

```html
<link rel="prefetch" href="next-page.html" />
```

- Prerender：提前在后台渲染用户可能访问的页面，当用户访问时能立即呈现内容。

```js
<link rel="prerender" href="next-page.html">

```

### 路由懒加载

- SPA 项目，一个路由对应一个页面，如果不做处理，项目打包后，会把所有页面打包成一个文件，当用户打开首页时，会一次性加载所有的资源，造成首页加载很慢，降低用户体验
  加载前提的实现：ES6 的动态地加载模块——import()

- 调用 import() 之处，被作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中。
- 要实现懒加载，就得先将进行懒加载的子模块分离出来，打包成一个单独的文件 webpackChunkName 作用是 webpack 在打包的时候，对异步引入的库代码（lodash）进行代码分割时，设置代码块的名字。webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中

### 骨架屏优化白屏时长

- 使用骨架屏，可以缩短白屏时间，提升用户体验。国内大多数的主流网站都使用了骨架屏，特别是手机端的项目
- SPA 单页应用，无论 vue 还是 react，最初的 html 都是空白的，需要通过加载 JS 将内容挂载到根节点上，这套机制的副作用：会造成长时间的白屏
- 常见的骨架屏插件就是基于这种原理，在项目打包时将骨架屏的内容直接放到 html 文件的根节点中

#### requestAnimationFrame 制作动画

- requestAnimationFrame 是浏览器专门为动画提供的 API，它的刷新频率与显示器的频率保持一致，使用该 api 可以解决用 setTimeout/setInterval 制作动画卡顿的情况

- setTimeout/setInterval、requestAnimationFrame 三者的区别：
- 1）引擎层面
  setTimeout/setInterval 属于 JS 引擎，requestAnimationFrame 属于 GUI 引擎
  JS 引擎与 GUI 引擎是互斥的，也就是说 GUI 引擎在渲染时会阻塞 JS 引擎的计算
- 2）时间是否准确
  requestAnimationFrame 刷新频率是固定且准确的，但 setTimeout/setInterval 是宏任务，根据事件轮询机制，其他任务会阻塞或延迟 js 任务的执行，会出现定时器不准的情况
- 3）性能层面
  当页面被隐藏或最小化时，setTimeout/setInterval 定时器仍会在后台执行动画任务，而使用 requestAnimationFrame 当页面处于未激活的状态下，屏幕刷新任务会被系统暂停

### 长列表虚拟滚动

- 首页中不乏有需要渲染长列表的场景，当渲染条数过多时，所需要的渲染时间会很长，滚动时还会造成页面卡顿，整体体验非常不好
- 虚拟滚动——指的是只渲染可视区域的列表项，非可见区域的不渲染，在滚动时动态更新可视区域，该方案在优化大量数据渲染时效果是很明显的

<!-- 【last】(https://www.bilibili.com/video/BV1GAWDe7E3k/?p=4&spm_id_from=pageDriver&vd_source=10257e657caa8b54111087a9329462e8) -->

### 相关链接

[演示地址](https://www.shuqin.cc/market/design-component)  
[获取更多](https://www.xiaozhi.shop/)  
[源码地址](https://github.com/dezhizhang/interview/tree/main/performance)

###

<img src="https://cdn.xiaozhi.shop/digitwin/assets/weixin.jpg" width = 300 height = 300 />
