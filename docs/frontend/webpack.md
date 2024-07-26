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
    use:['style-loader','css-loader','sass-loader']
}
```




