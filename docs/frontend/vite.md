# vite 快速入门指南

### 相关链接

- [演示地址](https://www.shuqin.cc/)
- [源码地址](https://github.com/dezhizhang/interview/tree/main/vite)
- [vite 官网地址](https://cn.vitejs.dev/guide/)

### Vite 是什么

- Vite 是由 Evan You（Vue.js 创始人）开发的现代前端构建工具，专为提升开发体验而设计。它通过创新的开发模式和高效的构建流程，极大提高了开发效率，尤其在处理大型项目和复杂的前端框架时，表现出色。

- Vite 的核心特点包括：

1. 快速启动：通过使用原生 ES 模块，Vite 在开发模式下可以跳过繁琐的打包步骤，直接提供即时的模块服务，显著缩短应用启动时间，特别适合大型项目的开发调试。
2. 热模块替换（HMR）：Vite 支持高效的热模块替换，当代码发生变化时，应用会自动更新相关模块，而无需重新加载整个页面，极大提升了开发时的反馈速度。
3. 优化的生产构建：在生产模式下，Vite 会利用 Rollup 进行优化打包，支持按需加载、代码分割以及各种预处理器和插件，确保构建输出的高效和高性能。
4. 高度可配置：Vite 提供灵活的配置系统，能够适配不同项目需求，支持 Vue、React、Svelte、Preact 等多种框架，轻松处理从简单应用到复杂项目的配置要求。
5. 插件系统：Vite 提供了强大的插件系统，基于 Rollup 插件 API 构建，支持定制化的扩展功能，易于添加构建工具的自定义功能。

### 快速开始

- 要开始使用 Vite，首先需要确保 Node.js 的版本为 18+ 或 20+，因为 Vite 依赖这些版本来确保最佳的兼容性。有些项目模板可能还会要求更高的 Node 版本。如果遇到包管理器发出的警告，建议根据提示升级 Node 版本。

##### 初始化一个新项目：

```bash
npm create vite@latest
```

##### 启动开发服务器：

- 进入项目目录后，运行以下命令启动开发服务器：

```bash
npm install
npm run dev
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
    open: true, // 自动在浏览器中打开应用
    cors: true, // 允许跨域
  },
});
```

###   配置别名

```js
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置 '@' 为 'src' 目录别名
    },
  },
});
```

### 设置最低兼容浏览器

```js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'chrome58', // 设置最低兼容浏览器版本
  },
});
```

### 插件

- 注意: Vite 旨在为常见的 web 开发工作提供开箱即用的支持。在搜索一个 Vite 或 Rollup 兼容插件之前，请先查看 功能指引。很多场景下，在 Rollup 项目中需要添加插件，而在 Vite 中已经内建支持了。

### @vitejs/plugin-legacy 插件使用

- 为打包后的文件提供传统浏览器兼容性支持。

1. ##### 下载安装

```bash
npm i @vitejs/plugin-legacy -D
```

2. ##### 配置插件

```js
// vite.config.js
import legacy from '@vitejs/plugin-legacy';

export default {
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
};
```

### [@vitejs/plugin-react 插件使作](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react)

- 使用 esbuild 和 Babel，使用一个微小体积的包脚注可以实现极速的 HMR，同时提升灵活性，能够使用 Babel 的转换管线。在构建时没有使用额外的 Babel 插件，只使用了 esbuild。

1. ##### 下载安装

```bash
npm i @vitejs/plugin-react @mdx-js/rollup react react-dom -D
```

2. ##### 配置插件

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx() },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
});
```

3. ##### 使用 react

- 注意修改 index.htmml 入口文件引用路径

```js
// main.tsx
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app') as any);
root.render(<h1>Hello, world</h1>);
```

### 构建优化

- Vite 提供了内置的构建优化选项，能自动优化静态资源和第三方依赖项。此外，它还提供了诸如 Tree Shaking、CSS 提取、压缩等功能，确保生成的代码尽可能小且高效。

```js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'dist', // 设置打包输出目录
    sourcemap: true, // 是否生成 sourcemap 文件
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 自定义 chunk 文件名
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    terserOptions: {
      compress: {
        drop_console: true, // 在生产环境中移除 console.log
      },
    },
  },
});
```

### CSS 处理与预处理器支持

- Vite 内置支持 CSS 和各种预处理器，如 SASS、LESS 和 Stylus。此外，Vite 还支持自动 CSS 模块化、PostCSS 处理等。

1. ##### 安装 sass

```bash
npm install sass
```

2. ##### 在 styles 中使用 sass

```scss
// styles.scss
$primary-color: #42b983;

body {
  color: $primary-color;
}
```

3. ##### 在 styles 中使用 sass

```js
import './styles.scss';
```

### SSR（服务端渲染）支持

- Vite 提供对服务端渲染（SSR）的支持，通过配置可以轻松将应用部署到服务端渲染环境中。Vite 支持通过 vite-ssr 或 vite-plugin-ssr 插件实现服务端渲染的能力，并且提供了开箱即用的解决方案。

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  ssr: {
    noExternal: ['vue'], // 指定不打包为外部依赖的模块
  },
});
```

### CI/CD 集成

- Vite 可以方便地与各种持续集成（CI）工具和 CD（持续部署）工具集成。在项目中使用如 GitLab CI、GitHub Actions 或 Jenkins，可以轻松实现自动化构建、测试和部署。

##### GitHub Actions

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v1
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - name: Deploy
        run: |
          # 使用自定义脚本或工具进行部署
          scp -r ./dist/ user@server:/var/www/project
```

### 静态资源处理

- Vite 对静态资源（如图片、字体、媒体文件）有良好的支持，它能够将这些资源处理成基于内容哈希值的文件名，确保缓存的有效性。通过 import 语法，静态资源可以在代码中像模块一样引用：
- Vite 在生产构建时会将这些资源打包、压缩并生成具有内容哈希的文件名，从而提高缓存效果和加载速度。

```js
import logo from './assets/logo.png';

const img = document.createElement('img');
img.src = logo;
document.body.appendChild(img);
```

### 文件打包在不同目录

```js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames(assetInfo) {
          if (assetInfo.name.endsWith('css')) {
            return 'css/[name].[hash].css';
          }
          const imgExts = ['.png', '.jpg', 'jpeg', 'webp', '.svg', '.gif'];
          if (imgExts.some((ext) => assetInfo.name.endsWith(ext))) {
            return 'img/[name].[hash][ext]';
          }

          return 'assets/[name].[hash][ext]';
        },
      },
    },
  },
});
```
### 

<div align="center">
    <img src="https://cdn.xiaozhi.shop/digitwin/assets/weixin.jpg" width = 200 height = 200 />
</div>

<!-- [vite](https://www.bilibili.com/video/BV1GN4y1M7P5/?spm_id_from=333.337.search-card.all.click&vd_source=e38cd951f2ee7bda48ec574f4e9ba363) -->
[晓智科技](https://www.xiaozhi.shop/)
[数擎科技](https://www.shuqin.cc/)
[前端面试](https://fe.shuqin.cc/)