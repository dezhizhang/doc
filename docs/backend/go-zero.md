# go-zero


| 项目              | 地址                                           |
| :----------------------- | :--------------------------------------- |
| 晓智科技                 | [晓智科技](https://xiaozhi.shop)|
| 晓智文档                 | [晓智文档](https://doc.xiaozhi.shop/backend/elastic) |
| 源码地址                 | [源码地址](https://github.com/dezhizhang/cloud-native/tree/main/go-zero)|
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

### goctl生成微服务

1. ##### 编写proto文件
```go
syntax = "proto3";

package user;

option go_package = "./user";

message IdRequest  {
  string  id = 1;
}

message UserResponse {
  // 用户id
  string  id = 1;
  // 用户名
  string name = 2;
  // 性别
  bool  gender = 3;
}

service User {
  rpc getUserInfo(IdRequest) returns(UserResponse);
}
```
2. ##### 通过proto文件生成微服务
```bash
# 切换到user.proto同级目录下
goctl rpc protoc user.proto --go_out=./pb --go-grpc_out=./pb --zrpc_out=.
```

3. ##### 运行rpc服务
```bash
go mod tidy
go run user.go
```

### api服务调用rpc服务


1. ##### 添加rpc配置
```go
// video/internal/config/config.go
package config

import (
	"github.com/zeromicro/go-zero/rest"
	"github.com/zeromicro/go-zero/zrpc"
)

type Config struct {
	rest.RestConf
    // rpc服务地址
	userRpc zrpc.RpcClientConf
}

```

2. ##### 完善服务依赖
```go
package svc

import (
	"github.com/zeromicro/go-zero/zrpc"
	"go-zero/user/userclient"
	"go-zero/video/internal/config"
)

type ServiceContext struct {
	Config  config.Config
    // 服务依赖
	UserRpc userclient.User
}

func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config:  c,
        // 服务依赖
		UserRpc: userclient.NewUser(zrpc.MustNewClient(c.UserRpc)),
	}
}
```

3. ##### 提供对外api
```go
package logic
import (
	"context"
	"fmt"
	"go-zero/user/pb/user"

	"go-zero/video/internal/svc"
	"go-zero/video/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type VideoLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewVideoLogic(ctx context.Context, svcCtx *svc.ServiceContext) *VideoLogic {
	return &VideoLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *VideoLogic) Video(req *types.Request) (resp *types.Response, err error) {
	// todo: add your logic here and delete this line
	info, err := l.svcCtx.UserRpc.GetUserInfo(l.ctx, &user.IdRequest{
		Id: "1",
	})
	if err != nil {
		panic(err)
	}
	fmt.Println(info)

	return &types.Response{Message:info.Name}, nil
}
```

### 接口服务api语法
1. ##### 简单路由服务
```go
syntax = "v1"
type Request {
	Id string `json:"id"`
}
type Response {
	Id     string `json:"id"`
	Name   string `json:"name"`
	Gender bool   `json:"gender"`
}
service video-api {
	@handler VideoHandler
	get /api/v1/user/:id (Request) returns (Response)
}
```
2. ##### 生成对应路由
```bash
# video.api路由api
goctl api go -api video.api -dir .
```
3. ##### 编写报务接口
```go
package logic

import (
	"context"
	"fmt"
	"github.com/zeromicro/go-zero/core/logx"
	"go-zero/user/pb/user"
	"go-zero/video/internal/svc"
	"go-zero/video/internal/types"
)

type VideoLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewVideoLogic(ctx context.Context, svcCtx *svc.ServiceContext) *VideoLogic {
	return &VideoLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *VideoLogic) Video(req *types.Request) (resp *types.Response, err error) {
	// 提供对外服务
	info, err := l.svcCtx.UserRpc.GetUserInfo(l.ctx, &user.IdRequest{
		Id: "1",
	})
	if err != nil {
		panic(err)
	}
	return &types.Response{
		Id:     info.Id,
		Name:   info.Name,
		Gender: info.Gender,
	}, nil
}

```
4. ##### api前
```go
@server (
	prefix: /api/users
)
```

### 操作mysql

```go
package config
import (
	"github.com/zeromicro/go-zero/rest"
	"github.com/zeromicro/go-zero/zrpc"
)

type Config struct {
	rest.RestConf
	UserRpc zrpc.RpcClientConf
	Auth    struct {
		AccessSecret string
		AccessExpire int64
	}
	Mysql struct {
		Datasource string
	}
}
```

















