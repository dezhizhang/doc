# gin

| 项目              | 地址                                           |
| :----------------------- | :--------------------------------------- |
| 晓智科技                 | [晓智科技](https://xiaozhi.shop)|
| 晓智文档                 | [晓智文档](https://doc.xiaozhi.shop/backend/linux) |
| 文档源码                 | [文档源码](https://github.com/dezhizhang/doc) |


## gin入门
1. ##### RESTful接口
```go
r := gin.Default()
r.GET("/ping", func(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
})
err := r.Run(":8082")
if err != nil {
	panic(err)
}
log.Fatalf("服务运行在%d端口上", 8082)
```