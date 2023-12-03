# grpc

### protobuf的安装
```

```
### proto文件的编写
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
### message介绍

### 字段映射字段

|protobuf  |notes  |c++      |python   |go       |
| -------- | ------| ------- | ------- | ------- |
| double   | ----- | double  | float   | float64 |
| float    | ----- | float   | float   | float32 |
| int32    | 使用变长编码|int32| int/long| unint32 | 
| uint32   | 使用变长编码|int32| int/long| unint32 | 
| sint32   | 使用变长编码|int32| int/long| int32   | 
| sint64   | 使用变长编码|int32| int/long| int64   | 
| bool     |           |  bool    | bool| bool   | 

### gprc调用
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
