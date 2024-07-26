# webpack

| 项目              | 地址                                           |
| :----------------------- | :--------------------------------------- |
| 晓智科技                 | [晓智科技](https://xiaozhi.shop)|
| 晓智文档                 | [晓智文档](http://localhost:8000/backend/algorithm) |
| 源码地址                 | [源码地址](https://github.com/dezhizhang/java-awesome/tree/main/algorithm)|
| 文档源码                 | [文档源码](https://github.com/dezhizhang/doc) |


### 处理css资源
- webpack本身不能识别样式资源，需要借助loader来帮助webpack解析样式资源

1. ##### 下载包
```bash
npm i css-loader style-loader -D
```
2. ##### 功能介绍
- css-loader 负责将css编译成webpack能识别的模块
- style-loader会动态创建一个style标签里面放置webpack中css内容

3. ##### 配置
```js
{
    test: /\.css$/,
    // 执行顺序从右到左（从下到上）
    use: ["style-loader", "css-loader"],
}
```

### 处理less资源
1. ##### 下载包
```bash
npm install less less-loader -D
```
2. ##### 功能介绍
- less-loader 负责将less文件编译成css文件

3. ##### 配置
```js
{
    test:/\.less$/,
    // 执行顺序从右到左（从下到上）
    use:['style-loader','css-loader','less-loader']
}
```

### 处理sass资源

1. ##### 下载包
```bash
npm i sass saas-loader -D 
```

2. ##### 功能介绍
- sass: saas-loader依赖sass进行编译
- sass-loader负责将saas文件编译为css文件

3. ##### 配置
```bash
{   
    test:/\.s[ac]ss$/,
    // 执行顺序从右到左（从下到上）
    use:['style-loader','css-loader','sass-loader']
}
```
### 处理styl资源

1. ##### 下载包
```bash
npm i stylus stylus-loader -D
```

2. ##### 功能介绍
- stylus-loader负责将styl文件编译成css文件

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
- webpack5已经将file-loader和url-loader功能内置到webpack里了，只需要简单配置就可处理图片资源

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

### eslint代码检查
1. ##### 下载包
```bash
npm i eslint eslint-webpack-plugin 
```

2. ##### 功能介绍
- 用来检测js和jsx语法的工具，可对代码进行检查

3. ##### 配置文件.eslintrc.js
```js
module.exports = {
  // 继承Eslint规则
  extends: ["eslint.recommended"],
  env: {
    // 启用node中全局变量
    node: true,
    // 启用浏览器中全局变量
    browser: true,
  },
  parserOptions: {
    "ecmaVersion": 2022, // 或者更高的版本
    "sourceType": "module",
  },
  rules: {
    // 不能使var定义变量
    "no-var": 2,
  },
};
```

4. ##### 配置
```js
const EsLintWebpackPluin = require('eslint-webpack-plugin');

new EsLintWebpackPluin({
    context:path.resolve(__dirname,'src')
})
```











