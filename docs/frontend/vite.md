# vite 快速入门指南

### 相关链接

- [演示地址](https://www.shuqin.cc/)
- [源码地址](https://github.com/dezhizhang/interview/tree/main/vite)
- [vite 官网地址](https://cn.vitejs.dev/guide/)

### vite 是什么

- Vite 是一个由 Evan You（Vue.js 的创始人）开发的前端构建工具，旨在为现代 Web 开发提供快速的开发和构建体验。其主要特点包括：

1. 快速启动：利用原生 ES 模块，Vite 可以在开发模式下即时启动应用程序，而无需打包。
2. 热模块替换（HMR）：在开发过程中，Vite 可以实时更新模块，提供更快的反馈和调试体验。
3. 优化构建：在生产模式下，Vite 会进行优化打包，支持多种预处理器和插件。
4. 易于配置：Vite 的配置非常灵活，适合多种项目需求，包括 Vue、React、Svelte 等框架。

### 快速开始

- 兼容性注意
- Vite 需要 Node.js 版本 18+ 或 20+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。

```bash
npm create vite@latest
```

### 环境变量配置

- 为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE\_ 为前缀的变量才会暴露给经过 vite 处理的代码。例如下面这些环境变量：

##### 设置环境娈量

- 根目录下创建.env 文件 touch.env;

```js
//----------------
VITE_SOME_KEY = 123;
DB_PASSWORD = foobar;
```

### 配置自动打开页面

```js
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  server: {
    // 自动打开
    open: true,
    cros: true,
  },
});
```

###   配置别名

```js
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
```

### 配置使用 less

<!-- [vite](https://www.bilibili.com/video/BV1GN4y1M7P5/?spm_id_from=333.337.search-card.all.click&vd_source=e38cd951f2ee7bda48ec574f4e9ba363) -->
