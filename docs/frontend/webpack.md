# webpack

| 项目     | 地址                                                                       |
| :------- | :------------------------------------------------------------------------- |
| 晓智科技 | [晓智科技](https://xiaozhi.shop)                                           |
| 晓智文档 | [晓智文档](http://localhost:8000/backend/algorithm)                        |
| 源码地址 | [源码地址](https://github.com/dezhizhang/java-awesome/tree/main/algorithm) |
| 文档源码 | [文档源码](https://github.com/dezhizhang/doc)                              |

### 处理 css 资源

- webpack 本身不能识别样式资源，需要借助 loader 来帮助 webpack 解析样式资源

1. ##### 下载包

```bash
npm i css-loader style-loader -D
```

2. ##### 功能介绍

- css-loader 负责将 css 编译成 webpack 能识别的模块
- style-loader 会动态创建一个 style 标签里面放置 webpack 中 css 内容

3. ##### 配置

```js
{
    test: /\.css$/,
    // 执行顺序从右到左（从下到上）
    use: ["style-loader", "css-loader"],
}
```

### 处理 less 资源

1. ##### 下载包

```bash
npm install less less-loader -D
```

2. ##### 功能介绍

- less-loader 负责将 less 文件编译成 css 文件

3. ##### 配置

```js
{
    test:/\.less$/,
    // 执行顺序从右到左（从下到上）
    use:['style-loader','css-loader','less-loader']
}
```

### 处理 sass 资源

1. ##### 下载包

```bash
npm i sass saas-loader -D
```

2. ##### 功能介绍

- sass: saas-loader 依赖 sass 进行编译
- sass-loader 负责将 saas 文件编译为 css 文件

3. ##### 配置

```bash
{
    test:/\.s[ac]ss$/,
    // 执行顺序从右到左（从下到上）
    use:['style-loader','css-loader','sass-loader']
}
```

### 处理 styl 资源

1. ##### 下载包

```bash
npm i stylus stylus-loader -D
```

2. ##### 功能介绍

- stylus-loader 负责将 styl 文件编译成 css 文件

3. ##### 配置

```bash
{
    test:/\.styl$/,
    // 执行顺序从右到左（从下到上）
    use:['style-loader','css-loader','stylus-loader']
}
```

### 图片资源处理

1. ##### 功能介绍

- webpack5 已经将 file-loader 和 url-loader 功能内置到 webpack 里了，只需要简单配置就可处理图片资源

2. ##### 配置

```js
{
    test:/\.(png|jpe?g|gif|webp)$/,
    type:"asset",
    parser:{
        dataUrlCondition:{
        // 小于10kb
        maxSize:10 * 1024
        }
    }
}
```

### 修改图片输出路径

1. ##### 配置

```js
{
    test:/\.(png|jpe?g|gif|webp)$/,
    type:"asset",
    parser:{
        dataUrlCondition:{
            // 小于10kb
            maxSize:10 * 1024
        }
    },
    generator:{
        filename:'img/[hash:8][ext][query]'
    }
}
```

### 字体图标资源处理

1. ##### 功能介绍

- 设置 asset/resource ，静态资源文件打包时不会转 base64

2. ##### 配置

```js
{
    test:/\.(ttf|woff2?|eot|ttf|otf)$/,
    type:'asset/resource',
    generator:{
        filename:'font/[hash:8][ext][query]'
    }
}
```

### eslint 代码检查

1. ##### 下载包

```bash
npm i eslint eslint-webpack-plugin
```

2. ##### 功能介绍

- 用来检测 js 和 jsx 语法的工具，可对代码进行检查

3. ##### 配置文件.eslintrc.js

```js
module.exports = {
  // 继承Eslint规则
  extends: ['eslint.recommended'],
  env: {
    // 启用node中全局变量
    node: true,
    // 启用浏览器中全局变量
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2022, // 或者更高的版本
    sourceType: 'module',
  },
  rules: {
    // 不能使var定义变量
    'no-var': 2,
  },
};
```

4. ##### 配置

```js
const EsLintWebpackPluin = require('eslint-webpack-plugin');

new EsLintWebpackPluin({
  context: path.resolve(__dirname, 'src'),
});
```

### bebel 使用

1. ##### 下载包

```bash
npm i babel-loader @babel/core @babel/preset-env -D
```

2. ##### 功能介绍

- bebel 主要用于将 es6 语法编写的代码转换成向后兼容的 es5 语法，以版能够在浏览器或其它环境中运行

3. ##### 配置文件.babelrc

```js
{
    "presets": ["@babel/preset-env"],
    "plugins": []
}
```

4. ##### 配置

```js
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
        presets: ["@babel/preset-env"],
        },
    },
},
```

### 处理 html 资源

1. ##### 下载包

```bash
npm i html-webpack-plugin -D
```

2. ##### 功能介绍

- 动创建 HTML：在构建过程中自动生成一个 HTML5 文件，该文件可以包含所有 webpack 打包过程中生成的 bundles。这意味着你不需要手动创建 HTML 文件，插件会为你处理这一切。
- 自动注入资源：自动将打包生成的 JavaScript、CSS 等文件注入到生成的 HTML 文件中，无需手动添加<script>或<link>标签。这一点特别有用，因为随着使用代码分割等技术，输出文件的名称可能会发生变化。

3. ##### 配置

```js
new HtmlWebpackPlugin({
    inject:'body',
    template: path.resolve(__dirname,'public/index.html'),
}),
```

### 静态服务器

1. ##### 下载包

```bash
npm i webpack-dev-server -D
```

2. ##### 功能介绍

- 检测到文件的修改后会自动编译，提高开发效率

3. ##### 配置

```js
devServer:{
    port:8080,
    open:true,
}
"scripts": {
   "build": "webpack --config webpack.config.js"
},
```

### 抽离 css 文件

1. ##### 下载包

```bash
sudo npm i mini-extract-plugin -D
```

2. ##### 功能介绍

- css 和 js 共同打包在一个文件会出现闪屏现在用户体验不好
- 单独抽离 css 文件这过 link 标签加载性能才更好

3. ##### 配置

```js
//plugin
new MiniCssExtractPlugin({
    filename:'css/main.css'
})
//rules
{
    test: /\.css$/,
    // 执行顺序从右到左（从下到上）
    use: [MiniCssExtractPlugin.loader, "css-loader"]
}
```

### 样式兼容

1. ##### 下载包

```bash
npm i postcss-loader postcss postcss-preset-env -D

```

2. ##### 功能介绍

- 首先，了解不同浏览器之间的差异是解决兼容性问题的关键。不同浏览器可能对 CSS 规范的解释不同，这可能导致样式显示不一致。以下是一些常见的浏览器差异

3. ##### 配置

```js
"browserslist":[
   "last 2 version",
   "> 1%",
   "not dead"
]
{
test: /\.less$/,
// 执行顺序从右到左（从下到上）
use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                  'postcss-preset-env'
                ]
            }
         }
        },
        "less-loader"
    ],
},
```

### css 压缩

1. ##### 下载包

```bash
npm install css-minimizer-webpack-plugin -D
```

3. ##### 配置

```js
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
plugins: [
    new CssMinimizerWebpackPlugin(),
]
```
### soucemap

1. ##### 配置
```bash
module.exports = {
  devtool:'source-map',
}
```
### HMR
1. ##### 功能介绍
- HotModuleReplacement(HMR/热模块替换):在程序运行中，替换添加或删除模块，而无需重新加载整个页面

2. ##### 配置
```js
devServer: {
    port: 8080,
    open: true,
    hot:true, // 开启HMR功能
}
```
### oneOf
1. ##### 功能介绍
- 打包时每个文件都经过所有loader处理，虽然因为test正则原因实际没有处理上，但是都要通过一遍比较慢，用oneOf只能匹配上一个loader余下的就不匹配

2. ##### 配置
```js
  module: {
    rules: [
      {
        oneOf:[
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
          },
        ]
      }]
  }
```
### Include/Exclude

1. ##### 功能介绍
- 开发时需要使用第三方的库和插件，所有文件都下载到node_modules中，而这些文件是不需要编译可直接使用

2. ##### 配置
```js
{
  test: /\.js$/,
  exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
}
```

[last](https://www.bilibili.com/video/BV14T4y1z7sw?p=36&vd_source=10257e657caa8b54111087a9329462e8)


