# webpack

### 相关链接

[演示地址](https://www.shuqin.cc/market/design-component)
[源码地址](https://github.com/dezhizhang/interview/webpack)

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
plugins: [new CssMinimizerWebpackPlugin()];
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

- 打包时每个文件都经过所有 loader 处理，虽然因为 test 正则原因实际没有处理上，但是都要通过一遍比较慢，用 oneOf 只能匹配上一个 loader 余下的就不匹配

2. ##### 配置

```js
module: {
  rules: [
    {
      oneOf: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  ];
}
```

### Include/Exclude

1. ##### 功能介绍

- 开发时需要使用第三方的库和插件，所有文件都下载到 node_modules 中，而这些文件是不需要编译可直接使用

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

### Cache 缓存

1. ##### 功能介绍

- 每次打包 js 文件都要经地 eslint 检查和 babel 编译，速度比较慢。可以缓存之前的 eslint 栓查和 babel 编译结果，这样每二次打包速度就会更快

2. ##### 配置

```js
{
  test: /\.js$/,
  exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
          // 开启babel缓存
          cacheDirectory: true,
          // 关闭缓存文件压缩
          // cacheCompression: false,
        },
    },
}
```

### 多进程打包

1. ##### 下载包

```bash
npm i thread-loader -D
```

2. ##### 功能介绍

- 当项目变来越来越庞大时，打包速度越来越慢，而对 js 文件处理主要是 eslint,babel,terser 三个工具，可以开启多进程同时处理 js 文件，这个速度比单进程快

3. ##### 配置

```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  use:[
    {
      // 需放babel-loader前
      loader:'thread-loader',
      options:{
        threads:threads
      }
    },
  ]
},
```

### babal 文件处理

1. ##### 下载包

```bash
npm i @babel/plugin-transform-runtime -D
```

2. ##### 功能介绍

- @babel/plugin-transform-runtime 禁用了 babel 自动对每个文件的 runtime 注入，而是引入@babel/plugin-transform-runtime 所辅助代码

3. ##### 配置

```js
{
  loader: "babel-loader",
  options: {
    presets: ["@babel/preset-env"],
      // 开启babel缓存
      cacheDirectory: true,
      // 关闭缓存文件压缩
      // cacheCompression: false,
      plugins:['@babel/plugin-transform-runtime']
    },
}
```

### 图片压缩

1. ##### 下载包

```bash
npm i image-minimizer-webpack-plugin imagemin -D
```

2. ##### 功能介绍

- 开发中引用了较多图片，图片休积会比较大，可以对图片进行压缩，减少图片体积
- 注意：如果图片都是在线链接，那么就不需要压缩

3. ##### 配置

```js
module.exports = {
  optimization: {
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
        },
        generator: [
          {
            type: 'asset',
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: {
                webp: {
                  quality: 90,
                },
              },
            },
          },
        ],
      }),
    ],
  },
  plugins: [new CopyPlugin({ patterns: ['images/**/*.png'] })],
};
```

### 多入口

1. ##### 功能介绍

- 打包时将所有 js 文件打包到一个文件中，休积太大了，如果只要渲染首页，就只加载首页的 js 文件其它文件不应该加载
- 将打包的文件进行代码分割，生成多个 js 文件渲染对应的 js 文件这样加载资源就少速度就快

3. ##### 配置

```js
module.exports = {
  // 多入口
  entry: {
    app: './src/app.js',
    main: './src/main.js',
  },
  // 出口
  output: {
    // 文件输出路径
    path: path.resolve(__dirname, 'build'),
    // 输出文件名
    filename: 'js/[name].js',
    // 自动清空上次打包内容
    clean: true,
  },
};
```

### Preload/Prefetch

1. ##### 下载包

```bash
npm install --save-dev preload-webpack-plugin
```

2. ##### 功能介绍

- preload/prefetch 告诉浏览器空闲时间加载需要的资源
- preload 浏览器立即加载资源
- prefetch 在空闲时才开始加载资源
- 都会加载资源，并不执行都有缓存
- preload 加载优先级高，prefetch 加载优先级低
- preload 只能加载当前页面需要使用的资源,prefetch 加载当前页面资源，也可以加载下一个页面需要使用的资源

3. ##### 配置

```js
 plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.css",
    }),
    new CssMinimizerWebpackPlugin(),
    // 开启Preload预加载
    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'script'
    })
  ],
```

### js 兼容处理

1. ##### 下载包

```bash
npm i core-js
```

2. ##### 功能介绍

- core-js 是专门用来做 es6 以及上 api 处理的 polyfill
- polyfill 补丁就用用社用上提供的一段代码，让在不兼容某些特性新特性的浏览器上，使用该新特性

3. ##### 配置

```js
//app.js
import 'core-js';
//动态引入配置
module.exports = {
  presets: [
    '@babel/preset-env',
    {
      targets: '> 0.25%, not dead',
      corejs: { version: 3, proposals: true }, // 设置corejs版本
      useBuiltIns: 'usage', // 根据使用情况引入polyfill
    },
  ],
  plugins: [],
};
```

### PWA

1. ##### 下载包

```bash
npm i workbox-webpack-plugin -D
```

2. ##### 功能介绍

- 渐进式网络应用程序：是一种可以提供类似于 navive app(原生应用程序)体验的 web app 技术
- 其中最重要的是在离线 offline 时应用程序能够继续运行功能
- 内部通过 service workers 技术实现的

3. ##### 配置

```js
// https://www.webpackjs.com/guides/progressive-web-application/#adding-workbox
//webpack.config.js

new WorkboxPlugin.GenerateSW({
  // 这些选项帮助快速启用 ServiceWorkers
  // 不允许遗留任何“旧的” ServiceWorkers
    clientsClaim: true,
    skipWaiting: true,
}),
//入口index.js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

```

### 自定义 babel-loader

1. ##### webpack.config.js 里配置自定义 babel-loader

```js
// webpack.config.js
// 加载器
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: './loaders/babel-loader',
          options: {
            targets: "defaults",
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['> 0.25%', 'not dead'],
                  },
                },
              ]
            ]
          }
        }
      }
    ]
},
```

2. ##### 编写自定义 loader

```js
//schema.json
{
  "type": "object",
  "properties": {
    "presets": {
      "type": "array"
    }
  },
  "additionalProperties": true
}

//------------------------------------
const schema = require("./schema.json");
const babel = require("@babel/core");

module.exports = function (content) {
  const callback = this.async();
  const options = this.getOptions(schema);

  console.log('options',options);


  babel.transform(content, options, function (err, result) {
    if (err) callback(err);
    else callback(null, result.code);
  });
};

```

### 自定义 file-loader

-

```js
// webpack.config.js

{
  test:/\.(png | jpe?g|gif)$/,
  loader:'./loaders/file-loader',
  type:'javascript/auto'
},
//-------------------------------------
const loaderUtils = require("loader-utils");

module.exports = function (content) {
  const interpolateName = loaderUtils.interpolateName(
    this,
    "[hash],[ext][query]",
    {
      content,
    }
  );
  console.log("interpolateName", interpolateName);
  this.emitFile(interpolateName, content);

  return `module.exports=${interpolateName}`;
};

module.exports.raw = true;

```

### 自定义 BannerWebpackPlugin 添加作者信息

```js
class BannerWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    // 在资源输入之前触发
    compiler.hooks.emit.tapAsync(
      'BannerWebpackPlugin',
      (compilation, callback) => {
        const extensions = ['css', 'js'];
        const assets = Object.keys(compilation.assets).filter((path) => {
          const splitted = path.split('.');
          // 获取文件扩展名
          const extension = splitted[splitted.length - 1];
          return extensions.includes(extension);
        });

        const prefix = `
        /*
        * :file description:
        * :name: /webpack/plugins/banner-webpack-plugin.js
        * :author:张德志
        * :copyright: (c) 2024, Xiaozhi
        * :date created: 2024-09-30 19:55:04
        * :last editor: 张德志
        * :date last edited: 2024-09-30 20:04:03
        */
      `;

        // 遍历资源添加注释
        assets.forEach((asset) => {
          const source = compilation.assets[asset].source;

          const content = prefix + source;

          // 修改资源
          compilation.assets[asset] = {
            source() {
              return content;
            },
            size() {
              return content.length;
            },
          };
        });
        callback();
      },
    );
  }
}

module.exports = BannerWebpackPlugin;
```

### 自定义 ClearWebpackPlugin

```js
class ClearWebpackPlugin {
  constructor() {}
  apply(compiler) {
    // 获取打包输出目录
    const outputPath = compiler.options.output.path;

    const fs = compiler.outputFileSystem;

    // 注册钩子，在打包输出之前 emit
    compiler.hooks.emit.tap('ClearWebpackPlugin', (compilation) => {
      this.removeFiles(fs, outputPath);
    });
  }
  removeFiles(fs, filePath) {
    // 想要删除打包输出目录下所有资源，需要先将目录下的资源删除，才能删除这个目录
    // 1. 读取当前目录下所有资源
    if (fs?.readdirSync(filePath)) {
      const files = filePath && fs.readdirSync(filePath);

      files.forEach((file) => {
        const path = `${filePath}/${file}`;
        const fileStat = fs.statSync(path);

        if (fileStat.isDirectory()) {
          this.removeFiles(fs, path);
        } else {
          fs.unlinkSync(path);
        }
      });
    }
  }
}

module.exports = ClearWebpackPlugin;
```

### 联系我们

1. ##### 关注我们

<img src="https://cdn.xiaozhi.shop/digitwin/assets/weixin.jpg" width = 300 height = 300 />

2. ##### 联系作者

<img src="https://cdn.xiaozhi.shop/digitwin/assets/winxin.png" width = 300 height = 300 />
<!-- 
[last](https://www.bilibili.com/video/BV14T4y1z7sw/?p=75&spm_id_from=pageDriver&vd_source=10257e657caa8b54111087a9329462e8) -->
