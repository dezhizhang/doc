# go-zero


| 项目              | 地址                                           |
| :----------------------- | :--------------------------------------- |
| 晓智科技                 | [晓智科技](https://xiaozhi.shop)|
| 晓智文档                 | [晓智文档](https://doc.xiaozhi.shop/backend/elastic) |
| 源码地址                 | [源码地址](https://github.com/dezhizhang/java-awesome/tree/main/es)|
| 文档源码                 | [文档源码](https://github.com/dezhizhang/doc) |


### 环境安装

1. ##### 安装 goctl

```bash
go install github.com/zeromicro/go-zero/tools/goctl@latest
```

2. ##### 安装 protoc

```bash
goctl env check --install --verbose --force

go get -u github.com/zeromicro/go-zero@latest
```

3. ##### 加载环境变量

```bash
export GOPATH="/Users/zhangdezhi/Documents/go"
export GOBIN="${PATH}:/bin"
```

### 生成 api 服务

```bash
goctl api new api
cd /api
go run api.go
```

### mac 安装etcd

1. ##### 下载etcd

```bash
brew install etcd
```
2. ##### 启动etcd
```bash
brew services start etcd 
```
3. ##### 查看应用列表
```bash
brew services list
```
4. ##### 查看应用列表
```bash
brew services list
```
5. ##### 停止etcd
```bash
brew services stop etcd 
```



