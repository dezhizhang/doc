# gorm

### 连接数据库

```go
type Product struct {
	gorm.Model
	Code string `gorm:"unique" json:"code"`
	Name string `gorm:"unique" json:"name"`
}

func main() {
	dns := "root:12345678@tcp(127.0.0.1:3306)/gorm?charset=utf8&parseTime=True&loc=Local"
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			SlowThreshold: time.Second,
			LogLevel:      logger.Silent,
			Colorful:      true,
		},
	)

	var db, err = gorm.Open(mysql.Open(dns), &gorm.Config{
		Logger: newLogger,
	})
	if err != nil {
		panic(err)
	}
	_ = db.AutoMigrate(&Product{})

}
```
