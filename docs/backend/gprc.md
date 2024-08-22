# grpc

| 项目     | 地址                                                                            |
| :------- | :------------------------------------------------------------------------------ |
| 晓智科技 | [晓智科技](https://xiaozhi.shop)                                                |
| 晓智文档 | [晓智文档](https://doc.xiaozhi.shop/backend/gprc)                               |
| 源码地址 | [源码地址](https://github.com/dezhizhang/cloud-native/tree/main/starfruit/test) |
| 文档源码 | [文档源码](https://github.com/dezhizhang/doc)                                   |

### 什么是 protobuf

1. ##### 基本介绍

- protobuf（Protocol Buffers）协议 😉 protobuf 是一种由 google 开发的二进制序列化格式和相关的技术，它用于高效地序列化和反序列化结构化数据，通常用于网络通信、数据存储等场景

2. ##### 优点与缺点

![优点与缺点](https://cdn.xiaozhi.shop/doc/grpc/protobuf.png)

3. ##### protobuf 对应 go 类型

![protobuf对应go类型](https://cdn.xiaozhi.shop/doc/grpc/protobuf-go.png)

4. ##### 类型引用

```go
//common.proto
syntax = "proto3";

option go_package = ".;proto";

message Pong{
  string id = 1;
}
// hello.proto
syntax = "proto3";
option  go_package = ".;proto";

import "google/protobuf/empty.proto";
import "common.proto"; // 调用公共protobuf

message HelloRequest{
  string name = 1;
}

message HelloReply {
  string message = 1;
}

service Greeter{
  rpc SayHello (HelloRequest) returns(HelloReply);
  rpc Ping(google.protobuf.Empty) returns(Pong);
}
```

5. ##### 嵌套的 message

```go
message HelloReply {
  string message = 1;
  message Result {
    string name = 1;
    string url = 2;
  }
}
```

6. ##### 枚举类型

```go
enum Gender{
  MALE =0;
  FEMALE = 1;
}

message HelloRequest{
  string name = 1;
  Gender g = 3;
}
```

7. ##### map 类型

```go
message HelloRequest{
  string name = 1;
  Gender g = 3;
  map<string,string> mp = 4;
}
```

8. ##### timestamp 类型

```go
message HelloRequest{
  string name = 1;
  Gender g = 2;
  map<string,string> mp = 3;
  google.protobuf.Timestamp createTime = 4;
}
```

### 什么是 grpc

1. ##### 基本介绍

- grpc 是一个高性能，开源和通用 rpc 框架，面向移动和 http/2 设计，目前提供 c,java 和 go 语言版本。

2. ##### 调用图解

![调用图解](https://cdn.xiaozhi.shop/doc/grpc/grpc.png)

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

### grpc 的 metadata

1. ##### 基本介绍

- gRPC 中的 Metadata 类似于 HTTP Header 的概念，用于描述数据和消息的数据信息，可以理解为一个键值对集合，用于在 gRPC 客户端和服务端之间传递元数据信息，提供一种在消息中传递数据和追加关键信息的机制。
- Metadata 主要有两个作用：提供 RPC 调用的元数据信息，例如用于链路追踪的 traceId、调用时间、应用版本等等。控制 gRPC 消息的格式，例如是否压缩或是否加密。在 gRPC 中，元数据可以在客户端和服务器之间进行交换。客户端可以在发送请求时，通过添加元数据，向服务器传递特定的信息，例如授权令牌、用户标识、链路追踪 ID 等。服务器可以使用这些元数据来进行身份验证、授权、跟踪请求等作。使用 gRPC 的元数据可以通过 gRPC API 提供的 Metadata 对象来实现。在客户端，可以在调用服务方法时使用 Metadata 对象，并将元数据添加到对象中，服务端可以在接收请求时从 RPC 上下文中提取 Metadata。

2. ##### protobuf 文件

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

3. ##### 服务端

```go
type Server struct {
	proto.UnimplementedGreeterServer
}

func (s *Server) SayHello(ctx context.Context, request *proto.HelloRequest) (*proto.HelloReply, error) {
	// metdata
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		panic(errors.New("metadata not nil"))
	}
	for key, val := range md {
		fmt.Println(string(key), val)
	}
	return &proto.HelloReply{Message: "Hello " + request.Name}, nil
}

func main() {
	g := grpc.NewServer()
	proto.RegisterGreeterServer(g, &Server{})
	lis, err := net.Listen("tcp", ":8081")
	if err != nil {
		panic(err)
	}

	err = g.Serve(lis)
}
```

4. ##### 客户端

```go
func main() {
	conn, err := grpc.Dial(":8081", grpc.WithInsecure())
	if err != nil {
		panic(err)
	}

	defer conn.Close()

	c := proto.NewGreeterClient(conn)
    // metdata
	md := metadata.Pairs("timestamp", time.Now().Format("2006-01-02 15:04:05"))
	ctx := metadata.NewOutgoingContext(context.Background(), md)

	h, err := c.SayHello(ctx, &proto.HelloRequest{
		Name: "tom",
	})
	if err != nil {
		panic(err)
	}
	fmt.Println(h.Message)
}

```

### grpc 的拦戴器

1. ##### 基本介绍

- gRPC 的拦截器（interceptor）类似各种 Web 框架里的请求中间件，请求中间件大家都知道是利用装饰器模式对最终处理请求的 handler 程序进行装饰，这样中间件就可以在处理请求前和完成处理后这两个时机上，拦截到发送给 handler 的请求以及 handler 返回给客户端的响应 。
- 中间件的最大的用处是可以把一些 handler 的前置和后置操作从 handler 程序中解耦出来，比如最常见的记录响应时长、记录请求和响应数据日志等操作往往是通过中间件程序实现的。
- 与 Web 框架的中间件同理，可以对 gRPC 的请求和响应进行拦截处理，而且既可以在客户端进行拦截，也可以对服务器端进行拦截。利用拦截器，可以对 gRPC 进行很好的扩展，把一些业务逻辑外的冗余操作从 handler 中抽离，提升项目的开发效率和扩展性。

2. ##### protobuf 文件

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

3. ##### 服务端

```go
type Server struct {
	proto.UnimplementedGreeterServer
}

func (s *Server) SayHello(ctx context.Context, in *proto.HelloRequest) (*proto.HelloReply, error) {
	return &proto.HelloReply{Message: "Hello " + in.Name}, nil
}
func main() {
	//拦戴器处理逻辑
	interceptor := func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp interface{}, err error) {
		fmt.Println("--------interceptor")
		return handler(ctx, req)
	}
	opt := grpc.UnaryInterceptor(interceptor)
	g := grpc.NewServer(opt)
	proto.RegisterGreeterServer(g, &Server{})
	listen, err := net.Listen("tcp", ":8082")
	if err != nil {
		panic(err)
	}
	err = g.Serve(listen)
	if err != nil {
		panic(err)
	}
}
```

4. ##### 客户端

```go
func main() {
	conn, err := grpc.Dial(":8082", grpc.WithInsecure())
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	c := proto.NewGreeterClient(conn)
	h, err := c.SayHello(context.Background(), &proto.HelloRequest{
		Name: "tom",
	})
	if err != nil {
		panic(err)
	}
	fmt.Println(h.Message)
}
```
###

<div align="center">贵州晓智信息科技公众号</div>
<div align="center"> <img src="https://cdn.xiaozhi.shop/xiaozhi/public/picture/weixinpub.png" width = 300 height = 300 /> </div>

