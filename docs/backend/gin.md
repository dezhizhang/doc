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
	c.JSON(http.StatusOK, gin.H{
		"id": id,
	})
}

func main() {
	r := gin.Default()
	r.GET("/info/:id", handleGetInfo)
	_ = r.Run(":8080")
}
```
