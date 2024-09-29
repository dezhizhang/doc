# tailwindcss

### 相关链接

1. ##### 演示地址 [演示地址](https://www.shuqin.cc/market/design-component)
2. ##### 源码地址 [源码地址](https://github.com/dezhizhang/interview/tree/main/tailwindcss)


### 什么是 Tailwind

- Tailwind CSS 是一种 实用优先的 CSS 框架，它通过一组预定义的、基于类名的样式帮助开发者快速构建现代化、响应式的用户界面。与传统的 CSS 框架（如 Bootstrap）不同，Tailwind 并不提供现成的 UI 组件，而是通过大量的小而精确的 CSS 类，让开发者能够灵活地自定义页面的设计，而无需编写大量自定义的 CSS 代码。

### 安装与配置

1. ##### 安装 Tailwind CSS

- 通过 npm 安装 tailwindcss，然后创建你自己的 create your tailwind.config.js 配置文件。

```bash
npm install -D tailwindcss
npx tailwindcss init
```

2. ##### 配置模板文件的路径

- 在 tailwind.config.js 配置文件中添加所有模板文件的路径。

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3. ##### 将加载 Tailwind 的指令添加到你的 CSS 文件中

- 将加载 Tailwind 的指令添加到你的 CSS 文件中

```css
/*src/input.css*/
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. ##### 启 Tailwind CLI 构建流程

- 运行命令行（CLI）工具扫描模板文件中的所有出现的 CSS 类（class）并编译 CSS 代码。

```bash
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

5.  ##### 在你的 HTML 代码中使用 Tailwind 吧

- 在 <head> 标签内引入编译好的 CSS 文件，然后就可以开始使用 Tailwind 的工具类 来为你的内容设置样式了。

```html
<!--src/index.html-->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="./output.css" rel="stylesheet" />
  </head>
  <body>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
  </body>
</html>
```

### 如何配置主题，字体样式等

- 主题部分是您定义调色板、字体、字体比例、边框大小、断点 - 与站点视觉设计相关的任何内容的地方

```js
//tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  theme: {
    colors: {
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
};
```

### 如何使用插件

- 插件部分允许您向 Tailwind 注册插件，这些插件可用于生成额外的实用程序、组件、基本样式或自定义变体。

```js
//tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-children'),
  ],
};
```

### 如何设置预设

- 预设部分允许您指定自己的自定义基本配置，而不是使用 Tailwind 的默认基本配置。

```js
//tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  presets: [require('@acmecorp/base-tailwind-config')],

  // Project-specific customizations
  theme: {
    //...
  },
};
```

### 如何设置前缀

- 前缀选项允许您向所有 Tailwind 生成的实用程序类添加自定义前缀。当将 Tailwind 分层在可能存在命名冲突的现有 CSS 之上时，这非常有用。

```js
//tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
};
```

- 现在每个类都将使用配置的前缀生成：

```css
.tw-text-left {
  text-align: left;
}
.tw-text-center {
  text-align: center;
}
.tw-text-right {
  text-align: right;
}
```

- 重要的是要了解此前缀添加在任何变体修饰符之后。这意味着具有响应式或状态修饰符（例如 sm: 或悬停：）的类仍将首先具有响应式或状态修饰符，并且您的自定义前缀出现在冒号之后：

```html
<div class="tw-text-lg md:tw-text-xl tw-bg-red-500 hover:tw-bg-blue-500">
  <!-- -->
</div>
```

### 配置是否应标记为 !important

- important 选项可让您控制 Tailwind 的实用程序是否应标记为 !important。当将 Tailwind 与具有高特异性选择器的现有 CSS 一起使用时，这非常有用。

```js
//tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
};
```

- 现在所有 Tailwind 的实用程序类都将生成为 !important：

```css
.leading-none {
  line-height: 1 !important;
}
.leading-tight {
  line-height: 1.25 !important;
}
.leading-snug {
  line-height: 1.375 !important;
}
```

- 这也适用于您使用 @layer utility 指令在 CSS 中定义的任何自定义实用程序

```css
@layer utilities {
  .bg-brand-gradient {
    background-image: linear-gradient(#3490dc, #6574cd);
  }
}

/* Output */
.bg-brand-gradient {
  background-image: linear-gradient(#3490dc, #6574cd) !important;
}
```

### 未完待续...



### 联系我们

1. ##### 关注我们

<img src="https://cdn.xiaozhi.shop/digitwin/assets/weixin.jpg" width = 300 height = 300 />

2. ##### 联系作者

<img src="https://cdn.xiaozhi.shop/digitwin/assets/winxin.png" width = 300 height = 300 />

<!-- ### 布局组件

1. ##### 纵横比

- 用于控制元素纵横比的实用程序。

```js
//tailwind.config.js
module.exports = {
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
};
```

- 如果您需要使用一次性纵横比值，而该值在主题中包含没有意义，请使用方括号使用任意值动态生成属性。

```html
<iframe class="w-full aspect-video ..." src="https://www.youtube.com/..."></iframe>
<iframe class="w-full aspect-[4/3]" src="https://www.youtube.com/..."></iframe>
<iframe class="w-full aspect-video md:aspect-square" src="https://www.youtube.com/..."></iframe>
``` -->

<!-- [last](https://www.bilibili.com/video/BV1rf4y1g7r5/?spm_id_from=333.337.search-card.all.click&vd_source=10257e657caa8b54111087a9329462e8)
