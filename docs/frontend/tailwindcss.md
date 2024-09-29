# tailwindcss

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

<!-- [last](https://www.bilibili.com/video/BV1rf4y1g7r5/?spm_id_from=333.337.search-card.all.click&vd_source=10257e657caa8b54111087a9329462e8)
