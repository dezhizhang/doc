# grpc

### 什么是 grpc

1. ##### 基本介绍

- grpc 是一个高性能，开源和通用 rpc 框架，面向移动和 http/2 设计，目前提供 c,java 和 go 语言版本。

2. ##### 调用图解

![调用图解](../../public/grpc/grpc.png)

### 什么是 protobuf

1. ##### 基本介绍

- protobuf（Protocol Buffers）协议 😉 protobuf 是一种由 google 开发的二进制序列化格式和相关的技术，它用于高效地序列化和反序列化结构化数据，通常用于网络通信、数据存储等场景

2. ##### 优点与缺点
   ![优点与缺点](../../public/grpc/protobuf.png)

### gprc 开发环境准备

1. ##### 安装 protoc 工具

```bash
https://github.com/protocolbuffers/protobuf/releases
```

2. ##### 安装依赖包

```bash
go get github.com/golang/protobuf/protoc-gen-go
```

### grpc 简单入门

1. ##### 编写 protobuf 文件

```go
syntax = "proto3";
option go_package = ".;proto";
message HelloRequest {
  string name = 1;
}

message HelloReply{
  string message = 1;
}

service Greeter{
  rpc SayHello(HelloRequest) returns(HelloReply);
}
```

2. ##### 生成 grpc 对应代码

```bash
cd /proto

protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go_opt=paths=source_relative helloworld.proto
```

3. ##### 编写服务端代码

```go
type Server struct {
	proto.UnimplementedGreeterServer
}

// SayHello rpc服务调用
func (s *Server) SayHello(ctx context.Context, req *proto.HelloRequest) (*proto.HelloReply, error) {
	return &proto.HelloReply{Message: req.Name + "hello"}, nil
}

func main() {
	//1. 实例化grpc
	g := grpc.NewServer()
	// 注册服务
	proto.RegisterGreeterServer(g, &Server{})
	// 启动服务
	l, err := net.Listen("tcp", ":8080")
	if err != nil {
		panic("启动服务失败" + err.Error())
	}

	err = g.Serve(l)
	if err != nil {
		panic(err)
	}
}
```

4. ##### 编写客户端代码

```go
func main() {
	conn, err := grpc.Dial("localhost:8080", grpc.WithInsecure())
	if err != nil {
		panic(err)
	}

	defer func(conn *grpc.ClientConn) {
		err := conn.Close()
		if err != nil {
			panic(err)
		}
	}(conn)

	c := proto.NewGreeterClient(conn)

	r, err := c.SayHello(context.Background(), &proto.HelloRequest{
		Name: "tom",
	})
	if err != nil {
		panic(err)
	}
	fmt.Println(r.Message)
}

```

### rpc 服务调和客户端报务调用

```go
// server---------------------------------

type HelloService struct{}

func (s *HelloService) Hello(request string, reply *string) error {
	*reply = "Hello " + request
	return nil
}

func main() {
	//1. 实例化server
	listen, err := net.Listen("tcp", ":8080")
	if err != nil {
		panic(err)
	}
	//2. 注册服务
	err = rpc.RegisterName("HelloService", &HelloService{})
	if err != nil {
		panic(err)
	}
	// 启动服务
	conn, err := listen.Accept()
	rpc.ServeConn(conn)
}
// client---------------------------------
func main() {
	//1.建立连接
	conn, err := rpc.Dial("tcp", "127.0.0.1:8080")
	if err != nil {
		panic("连接失败")
	}
	var reply string
	err = conn.Call("HelloService.Hello", "world", &reply)
	if err != nil {
		panic("服务调用失败")
	}
	fmt.Println(reply)
}
```

### grpc 简单入门


### protobuf 的安装

```

```

### proto 文件的编写

```go
syntax = "proto3";

option go_package="../service";

package service;

// 传输的对像

message User {
  string username = 1;
  int32  age = 2;
}
```

### 序列化与反序列化

```go
package main

import (
	"fmt"
	"google.golang.org/protobuf/proto"
	"grpc/service"
)

func main() {
	user := &service.User{
		Username: "张三",
		Age:      18,
	}

	// 序列化过程
	marshal, err := proto.Marshal(user)
	if err != nil {
		panic(err)
	}

	newUser := service.User{}
	proto.Unmarshal(marshal, &newUser)

	fmt.Println(newUser.String())

}

```

### message 介绍

### 字段映射字段

| protobuf | notes        | c++    | python   | go      |
| -------- | ------------ | ------ | -------- | ------- |
| double   | -----        | double | float    | float64 |
| float    | -----        | float  | float    | float32 |
| int32    | 使用变长编码 | int32  | int/long | unint32 |
| uint32   | 使用变长编码 | int32  | int/long | unint32 |
| sint32   | 使用变长编码 | int32  | int/long | int32   |
| sint64   | 使用变长编码 | int32  | int/long | int64   |
| bool     |              | bool   | bool     | bool    |

### gprc 调用

1. 服务端方法的生成

```go
package service

import "context"

type productService struct {
	UnimplementedProductServiceServer
}

var ProductService = &productService{}

func (p *productService) GetProductStock(ctx context.Context, request *ProductRequest) (*ProductResponse, error) {
	return &ProductResponse{ProdStock: 12355}, nil
}

```

2. 服务端提供服务

```go
package main

import (
	"fmt"
	"google.golang.org/grpc"
	"grpc/service"
	"net"
)

func main() {
	srv := grpc.NewServer()
	service.RegisterProductServiceServer(srv, service.ProductService)

	// 启动服务
	listen, err := net.Listen("tcp", ":8002")
	if err != nil {
		panic(err)
	}

	err1 := srv.Serve(listen)
	if err1 != nil {
		panic(err)
	}
	fmt.Println("启动grpc服务端成功")
}

```

3. 客户端调用

```go
package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	service "grpc/client/pb"
)

func main() {
	conn, err := grpc.Dial(":8002", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		panic(err)
	}

	defer conn.Close()

	client := service.NewProductServiceClient(conn)

	request := &service.ProductRequest{
		ProdId: 56,
	}
	stock, err := client.GetProductStock(context.Background(), request)
	if err != nil {
		panic(err)
	}
	fmt.Println(stock)
}

```

### 生成自签名证书

```

```
