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

### 默认值
