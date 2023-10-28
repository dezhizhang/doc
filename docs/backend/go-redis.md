# go-redis

### 连接 redis

```go
rdb := redis.NewClient(&redis.Options{
	Addr:     "localhost:6379",
	Password: "",
	DB:       0,
})
```

## string 类型

1. set 设置 string 的值

```go
func TestSetKey(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	err := rdb.Set(ctx, "name", "hello world", time.Second*1000).Err()
	if err != nil {
		panic(err)
	}
	fmt.Println("设置值成功")
}
```

2. get 获取 string 的值

```go
func TestGetKey(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	result, err := rdb.Get(ctx, "name").Result()
	if err != nil {
		panic(err)
	}
	fmt.Println("result", result)
}

```

3. getset 获取到的值是上一次的值

```go
func TestGetSet(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	result, err := rdb.GetSet(ctx, "name", "hello world").Result()
	if err != nil {
		panic(err)
	}
	fmt.Println(result)
}

```

4. setnx 如果值存在则不设置，如果不存在则设置

```go
func TestSetNx(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	err := rdb.SetNX(ctx, "name", "hello set nex", time.Second*1000).Err()
	if err != nil {
		panic(err)
	}

}
```

5. mget 批量获取值

```go
func TestMGet(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	result, err := rdb.MGet(ctx, "name", "k1", "k2").Result()
	if err != nil {
		panic(err)
	}
	fmt.Println(result)
}

```

6. 批量设置

```go
func TestMSet(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	err := rdb.MSet(ctx, "k1", "value1", "k2", "value2", "k3", "value3").Err()
	if err != nil {
		panic(err)
	}

}

```

7. 自增

```go
// 自增
func TestIncrBy(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	result, err := rdb.IncrBy(ctx, "money", 1).Result()
	if err != nil {
		panic(err)
	}
	fmt.Println(result)
}
```

8. 自减

```go
func TestDecrBy(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	val, err := rdb.DecrBy(ctx, "money", 1).Result()
	if err != nil {
		panic(err)
	}
	fmt.Println(val)
}

```

9. 删除

```go
func TestDel(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	err := rdb.Del(ctx, "k1").Err()
	if err != nil {
		panic(err)
	}
}
```

10. 设置过期时间

```go
func TestExpire(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	rdb.Expire(ctx, "key2", 1000*time.Second)
}

```
