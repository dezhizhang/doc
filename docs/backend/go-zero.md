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
- go-zero对应文档地址[mysql](https://go-zero.dev/docs/tasks/cli/mysql)

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
  bool gender = 3;
}
message UserRequest{
  // 生名
  string name = 1;
  // 密码
  string password = 2;
  // 手机号
  string mobile = 3;
}
message UserOkResponse{
  string message = 1;
}

//goctl rpc protoc user.proto --go_out=. --go-grpc_out=. --zrpc_out=.

service User {
  // createUser创建用户
  rpc createUser(UserRequest) returns(UserOkResponse);
  // getUserInfo获取用户信息
  rpc getUserInfo(IdRequest) returns(UserResponse);
}
```
2. ##### 生成对应的代码
```bash
# 切到和user.proto同级目录下
goctl rpc protoc user.proto --go_out=. --go-grpc_out=. --zrpc_out=.
```
3. ##### 编写mydql ddl文件
```bash
# user/models
CREATE TABLE users
(
    id        bigint AUTO_INCREMENT,
    name      varchar(255) NOT NULL DEFAULT '' COMMENT '用户名',
    password  varchar(255) NOT NULL DEFAULT '' COMMENT '密码',
    mobile    varchar(255) NOT NULL DEFAULT '' COMMENT '手机号',
    gender    char(10)     NOT NULL DEFAULT 'male' COMMENT 'gender,male|female|unknown',
    create_at timestamp NULL,
    update_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE mobile_index (mobile),
    UNIQUE name_index (name),
    PRIMARY KEY (id)
) ENGINE = InnoDB COLLATE utf8mb4_general_ci COMMENT 'users table';
```
4. ##### 生成mysql操作代码
```bash
cd ~/workspace/model/mysql
goctl model mysql ddl --src user.sql --dir . -c
```

5. ##### 编写配置文件
```yaml
Name: user.rpc
ListenOn: 0.0.0.0:8080
Etcd:
  Hosts:
  - 127.0.0.1:2379
  Key: user.rpc

Mysql:
  DataSource: "root:12345678@tcp(127.0.0.1:3306)/zero?charset=utf8mb4&parseTime=True&loc=Local"

Cache:
- Host: "127.0.0.1:6379"
  Type: "node"
  Pass:
```
6. ##### 添加配置文件
```go
//interal/config
package config
import (
	"github.com/zeromicro/go-zero/core/stores/cache"
	"github.com/zeromicro/go-zero/zrpc"
)
type Config struct {
	zrpc.RpcServerConf
	Mysql struct {
		DataSource string
	}
	// redis配置
	Cache cache.CacheConf
}
```
7. ##### 添加context
```go
//interal/srv
package svc
import (
	"github.com/zeromicro/go-zero/core/stores/sqlx"
	"go-zero/user/internal/config"
	"go-zero/user/models"
)
type ServiceContext struct {
	Config    config.Config
	UserModel models.UsersModel
}
func NewServiceContext(c config.Config) *ServiceContext {
	sqlConn := sqlx.NewMysql(c.Mysql.DataSource)
	return &ServiceContext{
		Config:    c,
		UserModel: models.NewUsersModel(sqlConn, c.Cache),
	}
}
```
8. ##### 编写业务逻辑
```go
//internal/logic

package logic

import (
	"context"
	"go-zero/user/models"

	"go-zero/user/internal/svc"
	"go-zero/user/user"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateUserLogic struct {
	ctx    context.Context
	svcCtx *svc.ServiceContext
	logx.Logger
}

func NewCreateUserLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateUserLogic {
	return &CreateUserLogic{
		ctx:    ctx,
		svcCtx: svcCtx,
		Logger: logx.WithContext(ctx),
	}
}

// CreateUser 创建用户
func (l *CreateUserLogic) CreateUser(in *user.UserRequest) (*user.UserOkResponse, error) {
	_, err := l.svcCtx.UserModel.Insert(l.ctx, &models.Users{
		Name:     in.Name,
		Password: in.Password,
		Mobile:   in.Mobile,
	})
	if err != nil {
		panic(err)
	}
	return &user.UserOkResponse{Message: "创建用户成功"}, nil
}
```
### 中间件middleware的使用

1. ##### 编写api接口
```go
syntax = "v1"
type URequest {
	id string `json:"id"`
}

type ULoginResponse {
	Token   string `json:"token"`
	Message string `json:"message"`
}

type UInfoResponse {
	Id     string `json:"id"`
	Name   string `json:"name"`
	Mobile string `json:"mobile"`
	Gender string `json:"gender"`
}

service user {
	@handler LoginHandler
	post /user/login (URequest) returns (ULoginResponse)
}

// 添加中间件
@server (
	middleware: LoginVerification
)
service user {
	// 添加中间件检验
	@handler GetUserInfoHandler
	get /user/info (URequest) returns (UInfoResponse)
}
```
2. ##### 添加中间件context
```go
//internal/srv
package svc

import (
	"github.com/zeromicro/go-zero/rest"
	"github.com/zeromicro/go-zero/zrpc"
	"go-zero/api/internal/config"
	"go-zero/api/internal/middleware"
	"go-zero/user/userclient"
)

type ServiceContext struct {
	Config config.Config
	userclient.User
	LoginVerification rest.Middleware
}

func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config:            c,
		User:              userclient.NewUser(zrpc.MustNewClient(c.UserRpc)),
		LoginVerification: middleware.NewLoginVerificationMiddleware().Handle,
	}
}
```
3. ##### 编写中间件给验证
```go
package middleware

import (
	"fmt"
	"net/http"
)

type LoginVerificationMiddleware struct {
}

func NewLoginVerificationMiddleware() *LoginVerificationMiddleware {
	return &LoginVerificationMiddleware{}
}

func (m *LoginVerificationMiddleware) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(r.Header.Get("token"))
		if r.Header.Get("token") == "go-zero" {
			next(w, r)
			return
		}
		_, err := w.Write([]byte("您没有权限"))
		if err != nil {
			panic(err)
		}
		return
	}
}
```



















