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
2. ##### 原生go解析template
```html
<!--main同级下新建./hello.tmpl-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>解析template</title>
</head>
<body>
    <p>{{.}}</p>
</body>
</html>
```
```go
func sayHello(w http.ResponseWriter, r *http.Request) {
	// 解析模板
	files, err := template.ParseFiles("./hello.tmpl")
	if err != nil {
		panic(err)
	}
	// 渲染模板
	err = files.Execute(w, "晓智科技有限公司")
	if err != nil {
		panic(err)
	}

}

func main() {
	http.HandleFunc("/", sayHello)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}

```