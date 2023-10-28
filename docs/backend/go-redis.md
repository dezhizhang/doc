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

## 哈希类型

1. HSet 设置哈希值

```go
func TestHSet(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	result, err := rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}
	t.Log(result)
	err = rdb.HSet(ctx, "user", "name", "张德志").Err()
	if err != nil {
		panic(err)
	}
	t.Log("设置hash成功")
}

```

2. HGet 获取哈希值

```go
func TestHGet(t *testing.T) {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	_, err := rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}
	t.Logf("连接数据库成功")
	result, err1 := rdb.HGet(ctx, "user", "name").Result()
	if err1 != nil {
		panic(err1)
	}
	t.Logf("获取值:%s", result)
}

```

3. TestHGetAll 获取所有哈希值

```go
func TestHGetAll(t *testing.T) {
	var err error
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr: "127.0.0.1:6379",
		DB:   0,
	})
	_, err = rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}
	t.Log("连接数据库成功")
	result, err1 := rdb.HGetAll(ctx, "user").Result()
	if err1 != nil {
		panic(err1)
	}
	t.Log(result)
}
```

4. HIncrBy 哈希累加

```go
func TestHIncrBy(t *testing.T) {
	var err error
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	_, err = rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}
	t.Log("数据库连接成功")
	count, err1 := rdb.HIncrBy(ctx, "user", "count", 2).Result()
	if err1 != nil {
		panic(err1)
	}
	t.Log(count)
}
```

5. HKeys 获取所有 keys

```go
func TestHKeys(t *testing.T) {
	var err error
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	_, err = rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}
	t.Log("连接数据库成功")
	keys, err1 := rdb.HKeys(ctx, "user").Result()
	if err1 != nil {
		panic(err)
	}
	t.Log(keys)
}

```

6. HLen 查询字段数量

```go
func TestHLen(t *testing.T) {
	var err error
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	_, err = rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}
	t.Log("连接数据库成功")
	result, err1 := rdb.HLen(ctx, "user").Result()
	if err1 != nil {
		panic(err1)
	}
	t.Log(result)

}

```

7. HMGet 批量获取

```go
func TestMGet(t *testing.T) {
	var err error
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	_, err = rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}
	result, err1 := rdb.HMGet(ctx, "user", "name", "count").Result()
	if err1 != nil {
		panic(err)
	}
	t.Log(result)
}
```

8. HMSet 批量设置

```go
func TestHMSet(t *testing.T) {
	var err error
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	_, err = rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}
	data := make(map[string]interface{})
	data["name"] = "周华建"
	data["age"] = 44
	data["gender"] = "男"

	err = rdb.HMSet(ctx, "user", data).Err()
	if err != nil {
		panic(err)
	}
}
```

9. HDel 删除值

```go
func TestHDel(t *testing.T) {
	var err error
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	_, err = rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}
	err = rdb.HDel(ctx, "user", "name").Err()
	if err != nil {
		panic(err)
	}

}
```

10. 检测是否存在

```go
func TestHExists(t *testing.T) {
	var err error
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr: "127.0.0.1:6379",
		DB:   0,
	})
	_, err = rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}
	result, err1 := rdb.HExists(ctx, "user", "name").Result()
	if err1 != nil {
		panic(err1)
	}
	t.Log(result)
}

```
