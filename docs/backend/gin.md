# gin

| 项目     | 地址                                                                 |
| :------- | :------------------------------------------------------------------- |
| 晓智科技 | [晓智科技](https://xiaozhi.shop)                                     |
| 晓智文档 | [晓智文档](https://github.com/dezhizhang/cloud-native/tree/main/gin) |
| 文档源码 | [文档源码](https://github.com/dezhizhang/doc)                        |

### 快速体验

```go
func HandlerPong(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

func main() {
	r := gin.Default()
	r.GET("/ping", HandlerPong)
	_ = r.Run(":8080")
}
```

### restful 风格

- restful 与技术无关，代表的是一种软件架构风格，REST 是 Representational State Transfer 的简称，中文翻译为“表征状态转移”或“表现层状态转化”。
- RESTFUL 特点包括：

1. 每一个 URI 代表 1 种资源；
2. 客户端使用 GET、POST、PUT、DELETE4 个表示操作方式的动词对服务端资源进行操作：GET 用来获取资源，POST 用来新建资源（也可以用于更新资源），PUT 用来更新资源，DELETE 用来删除资源
3. 通过操作资源的表现形式来操作资源；
4. 资源的表现形式是 XML 或者 HTML；
5. 客户端与服务端之间的交互在请求之间是无状态的，从客户端到服务端的每个请求都必须包含理解请求所必需的信息。

```go
func HandlerGet(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "get",
	})
}

func HandlerPost(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "post",
	})
}

func HandlerPut(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "put",
	})
}

func HandlerDelete(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "delete",
	})
}

func main() {
	r := gin.Default()
	r.GET("/get", HandlerGet)
	r.POST("/post", HandlerPost)
	r.PUT("/put", HandlerPut)
	r.DELETE("/delete", HandlerDelete)
	_ = r.Run(":8080")
}
```

### 路由分组

- 在我们实际的开发应用中我们希望能个各个功能模块的路由进行分组，同一个模块的不同路由带有同样的前缀
- 作用：首先是路由更加的清晰 并且我们在针对某一组路由进行中间件权限校验的时候也比较的方便。

```go
func handleLogin(c *gin.Context) {

}

func handleSubmit(c *gin.Context) {

}

func main() {
	r := gin.Default()
	v1 := r.Group("/api/v1")
	{
		v1.POST("/login", handleLogin)
		v1.POST("/submit", handleSubmit)
	}

	v2 := r.Group("/api/v2")
	{
		v2.POST("/login", handleLogin)
		v2.POST("/submit", handleSubmit)
	}
}
```

### 动态参数获取

- 在 Gin 框架中，可以使用 c.Param("paramKey")来获取动态参数。这里的 paramKey 是你在路由定义中定义的参数名称。

```go
func handleGetInfo(c *gin.Context) {
	id := c.Param("id")
	action := c.Param("action")
	c.JSON(http.StatusOK, gin.H{
		"id":     id,
		"action": action,
	})
}

func main() {
	r := gin.Default()
	r.GET("/info/:id/:action", handleGetInfo)
	_ = r.Run(":8080")
}
```

### get 参数获取

- 获取 GET 参数可以使用 c.Query 函数。这个函数接受一个参数名作为字符串，并返回匹配该参数名的第一个值。如果参数不存在，则返回空字符串。

```go
func handlerGetParams(c *gin.Context) {
	name := c.DefaultQuery("name", "tom")
	age := c.DefaultQuery("age", "18")
	c.JSON(http.StatusOK, gin.H{
		"name": name,
		"age":  age,
	})
}

func main() {
	r := gin.Default()
	r.GET("/get-params", handlerGetParams)
	_ = r.Run(":8080")
}

```

### 绑定结构体数据

- 我们可以使用 ShouldBind 系列方法来绑定请求中的数据到 Go 的结构体。这些方法支持 JSON，XML，form 等数据格式。

```go
type Person struct {
	Id   int    `uri:"id" binding:"required" json:"id"`
	Name string `uri:"name" binding:"required" json:"name"`
}

func handleParams(c *gin.Context) {
	var person Person
	if err := c.ShouldBindUri(&person); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, person)
}

func main() {
	r := gin.Default()
	r.GET("/ping", handleParams)
	_ = r.Run(":8080")
}
```

### post 参数获取 form-data 数据

- 获取 POST 参数可以通过 Context.PostForm()方法来实现。这个方法可以获取到 application/x-www-form-urlencoded 类型的数据。

```go
func handlePostParams(c *gin.Context) {
	name := c.PostForm("name")
	age := c.PostForm("age")
	c.JSON(http.StatusOK, gin.H{
		"name": name,
		"age":  age,
	})
}

func main() {
	r := gin.Default()
	r.POST("/post-params", handlePostParams)
	_ = r.Run(":8080")
}

```

### post 参数获取 json

- 要获取 POST JSON 数据，你可以使用 Context.BindJSON()方法。

```go
type User struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

func handlePostJson(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, user)
}

func main() {
	r := gin.Default()
	r.POST("/post-json", handlePostJson)
	_ = r.Run(":8080")
}

```

### 返回 protobuf 数据

- 你需要做的是先将 Protobuf 数据序列化成二进制格式，然后设置正确的响应头，最后将二进制数据写入到 Response 中

```go
//protobuf
syntax = "proto3";

option go_package = ".;proto";

message Teacher{
  string name = 1;
  repeated  string course = 2;
}
//---------------------------------------
func handleProtobuf(c *gin.Context) {
	teacher := proto.Teacher{
		Name:   "tom",
		Course: []string{"python", "java", "go"},
	}
	c.ProtoBuf(http.StatusOK, &teacher)
}

func main() {
	r := gin.Default()
	r.GET("/protobuf", handleProtobuf)
	_ = r.Run(":8080")
}

```

### from 表单验证 from-data

- 若要将请求体绑定到结构体中，需要使用模型绑定，支持 JSON、XML、YAML 和标准表单的绑定，设置时需要在绑定的字段上设置 tag，其只要有两套绑定方法
- Must bind

1. 方法： Bind 、BindJSON、BindXML、BindQuery、BindYAML
2. 行为：这些方法底层使用 MustBindWith 方法，如果存在绑定错误，请求将被终止，响应代码会被设置成 400

- Should bind

1. 方法： ShouldBind、ShouldBindJSON、ShouldBindXML、ShouldBindQuery、ShouldBindYAML
2. 行为：底层使用 ShouldBindWith 方法，如果存在绑定错误，则返回 go 语言的错误形式，开发人员可以处理错误，请求不会被终

```go
type LoginForm struct {
	Name     string `form:"name" binding:"required,min=2,max=10"`
	Password string `form:"password" binding:"required,min=8,max=20"`
}

func handleLogin(c *gin.Context) {
	var loginForm LoginForm
	if err := c.ShouldBind(&loginForm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, &loginForm)
}

func main() {
	r := gin.Default()
	r.POST("/login", handleLogin)
	_ = r.Run(":8080")
}

```

### from 表单验证 json

```go
type User struct {
	Name     string `json:"name" binding:"required,min=2,max=20"`
	Password string `json:"password" binding:"required,min=8,max=20"`
}

func handleLogin(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, &user)
}

func main() {
	r := gin.Default()
	r.POST("/login", handleLogin)
	_ = r.Run(":8080")
}

```
