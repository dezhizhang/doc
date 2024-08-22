# gin

| 项目     | 地址                                                                 |
| :------- | :------------------------------------------------------------------- |
| 晓智科技 | [晓智科技](https://xiaozhi.shop)                                     |
| 晓智文档 | [晓智文档](https://github.com/dezhizhang/cloud-native/tree/main/gin) |
| 文档源码 | [文档源码](https://github.com/dezhizhang/doc)                        |

### 简单列子

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
