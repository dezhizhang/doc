# grpc

### protobuf的安装
```

```
### proto文件的编写
```go
syntax = "proto3";

option go_package = ".;proto";


service Greeter {
  rpc SayHello(HelloRequest) returns(HelloReply){}
}


message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}
```
### 服务端
```go
package main

import (
	"context"
	"google.golang.org/grpc"
	"net"
	pb "xiaozhi/grpc/proto"
)

type Server struct {
	pb.UnimplementedGreeterServer
}

func (s *Server) SayHello(ctx context.Context, request *pb.HelloRequest) (*pb.HelloReply, error) {
	return &pb.HelloReply{Message: "hello " + request.GetName()}, nil
}

func main() {
	g := grpc.NewServer()
	pb.RegisterGreeterServer(g, &Server{})
	listen, err := net.Listen("tcp", ":8084")
	if err != nil {
		panic(err)
	}

	err = g.Serve(listen)
	if err != nil {
		panic(err)
	}
}

```

### 客户端

```go
package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	"xiaozhi/grpc/proto"
)

func main() {
	conn, err := grpc.Dial("localhost:8084", grpc.WithInsecure())
	if err != nil {
		panic(err)
	}

	defer conn.Close()

	c := proto.NewGreeterClient(conn)

	r, err1 := c.SayHello(context.Background(), &proto.HelloRequest{Name: "刘德华"})
	if err1 != nil {
		panic(err)
	}

	fmt.Println(r.Message)
}

```