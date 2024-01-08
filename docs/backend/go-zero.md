# go-zero

### 环境安装
1. goctl

```bash
go install github.com/zeromicro/go-zero/tools/goctl@latest
```
2. 安装protoc

```bash
goctl env check --install --verbose --force

go get -u github.com/zeromicro/go-zero@latest
```
3. 快速创建一个api

```bash
goctl api new api
```

### 生成gprc
```bash
goctl rpc protoc user/rpc/user.proto --go_out=user/rpc/types --go-grpc_out=user/rpc/types --zrpc_out=user/rpc/
```

### 生成rpc

```bash
goctl rpc protoc user.proto --go_out=types --go-grpc_out=types --zrpc_out=. 
```
### 生成api
```bash
 goctl api go -api vido.api --dir ./
```

### 响应封装
```go
import (
	"github.com/zeromicro/go-zero/rest/httpx"
	"net/http"
)

type Body struct {
	Code int    `json:"code"`
	Data any    `json:"data"`
	Msg  string `json:"msg"`
}

func Response(r *http.Request, w http.ResponseWriter, data any, err error) {
	if err != nil {
		body := &Body{
			Code: 400,
			Data: nil,
			Msg:  "发生错误",
		}
		httpx.WriteJson(w, http.StatusOK, body)
		return
	}

	body := &Body{
		Code: 200,
		Data: data,
		Msg:  "ok",
	}
	httpx.WriteJson(w, http.StatusOK, &body)
}
```
## 单体服务生成

### 标签环境是否安装
```bash
goctl env check -i -f --verbose 
```

### 生成api
```bash
goctl api new hello
```

## 微服务生成

### 生成api
```bash
goctl api go -api order.api -dir ./gen

```





<!-- goctl api go -api user.api -dir .

时间指针
[last](https://www.bilibili.com/video/BV1kM411X7Cp/?p=6&spm_id_from=pageDriver&vd_source=e38cd951f2ee7bda48ec574f4e9ba363) -->
