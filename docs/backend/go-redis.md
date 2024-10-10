# 使用 Go 语言与 Redis 构建高效缓存与消息队列系统

### 什么是 Redis？

- Redis 是一个开源的内存数据库，支持多种数据结构，包括字符串、列表、集合、哈希和有序集合。由于 Redis 运行在内存中，读写速度极快，常被用于构建缓存系统、实时排行榜、会话存储和消息队列等高并发场景下的服务。
- 在这篇博客中，我们将介绍如何使用 Go 语言集成 Redis，构建高效的缓存和消息队列系统。

### 安装 Redis

- 安装 Redis： 你可以通过以下命令安装 Redis（适用于 Linux 和 macOS）：

```bash
sudo apt-get install redis-server
```

- 或者通过 Homebrew 安装：

```bash
brew install redis
```

### 启动 Redis 服务

```bash
redis-server
```

### 验证安装

- 可以通过以下命令进入 Redis CLI，验证 Redis 是否正常运行

```bash
redis-cli
```
###  安装 Go Redis 客户端
- 在 Go 项目中，我们将使用 go-redis/redis 这个流行的 Redis 客户端库。你可以通过以下命令安装：
```bash
go get github.com/go-redis/redis/v8
```

### 连接 redis

```go
rdb := redis.NewClient(&redis.Options{
	Addr:     "localhost:6379",
	Password: "",
	DB:       0,
})
```

### string 类型

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

### 哈希类型

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

### List 类型

1. TestLPush 左侧插入

```go
func TestLPush(t *testing.T) {
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

	err = rdb.LPush(ctx, "key", 1, 2, 3, 4, 5).Err()
	if err != nil {
		panic(err)
	}
	t.Log("插入成功")
}
```

2. 判断集合左侧是否可以插入，如果存在则不插入，如果不存在则插入

```go
func TestLPushX(t *testing.T) {
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
	err = rdb.LPushX(ctx, "key", 6, 7, 8).Err()
	if err != nil {
		panic(err)
	}
}
```

3. 从右则删除一个值并返回删除后的值

```go
func TestRPop(t *testing.T) {
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
	val, err1 := rdb.RPop(ctx, "key").Result()
	if err1 != nil {
		panic(err1)
	}
	t.Log(val)
}
```

4. RPush 从列表右则插入值

```go
func TestRPush(t *testing.T) {
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
	err = rdb.RPush(ctx, "key", 12).Err()
	if err != nil {
		panic(err)
	}
}

```

5. LPop 从左侧删除

```go
func TestLPop(t *testing.T) {
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
	result, err1 := rdb.LPop(ctx, "key").Result()
	if err1 != nil {
		panic(err1)
	}
	fmt.Println(result)
}
```

6. LLen 获取集合的长度

```go
func TestLLen(t *testing.T) {
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
	result, err1 := rdb.LLen(ctx, "key").Result()
	if err1 != nil {
		panic(err1)
	}
	t.Log(result)
}
```

7. 遍历集合

```go
func TestLRange(t *testing.T) {
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
	result, err1 := rdb.LRange(ctx, "key", 0, -1).Result()
	if err1 != nil {
		panic(err1)
	}
	t.Log(result)

}
```

8. 删除数据

```go
func TestLRem(t *testing.T) {
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
	err = rdb.LRem(ctx, "key", 0, -1).Err()
	if err != nil {
		panic(err)
	}
	t.Log("删除成功")

}

```

9. 获取值的索引

```go
func TestLIndex(t *testing.T) {
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

	val, err := rdb.LIndex(ctx, "key", 1).Result()
	if err != nil {
		panic(err)
	}
	t.Log(val)
}

```

### set 集合

1. sadd 添中集合

```go
func TestSAdd(t *testing.T) {
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
	err = rdb.SAdd(ctx, "set", 100).Err()
	if err != nil {
		panic(err)
	}
	t.Log("添加集合成功")
}
```

2. scard 获取集合元素个数

```go
func TestSCard(t *testing.T) {
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
	size, err := rdb.SCard(ctx, "set").Result()
	if err != nil {
		panic(err)
	}
	t.Log(size)
}
```

3.sIsmember 判断元素是否在集合中

```go
func TestSIsMember(t *testing.T) {
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
	ok, _ := rdb.SIsMember(ctx, "key", 100).Result()
	if !ok {
		t.Log("集合不含令指定元素")
		return
	}
	t.Log("集合包含指定元素")
}
```

4. smembers 获取集合中所有的元素

```go
func TestSMembers(t *testing.T) {

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
	values, err1 := rdb.SMembers(ctx, "set").Result()
	if err1 != nil {
		panic(err1)
	}
	t.Log(values)
}

```

5. srem 删除集合中元素

```go
func TestSRem(t *testing.T) {
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
	err = rdb.SRem(ctx, "set", 100).Err()
	if err != nil {
		panic(err)
	}
	t.Log("删除成功")
}

```

6. SPop 随机删除并返回删除的值

```go
func TestSPop(t *testing.T) {
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
	val, _ := rdb.SPop(ctx, "set").Result()
	t.Log(val)
	vals, _ := rdb.SPopN(ctx, "set", 5).Result()
	t.Log(vals)
}

```

### 可排序集合

1. zadd 添加一个或多个元素到集合，如果元素已经存在则更新分数

```go
func TestZAdd(t *testing.T) {
	var err error
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
		DB:   0,
	})
	_, err = rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}
	err = rdb.ZAdd(ctx, "zAdd", redis.Z{Score: 2.5, Member: "张德志"}).Err()
	if err != nil {
		panic(err)
	}
	t.Log("插入成功")
}

```

2. zcard 返回集合元素个数

```go
func TestZCard(t *testing.T) {
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
	size, err1 := rdb.ZCard(ctx, "zAdd").Result()
	if err1 != nil {
		panic(err)
	}
	t.Log(size)

}

```

3. zCount 获取某个区间的值

```go
func TestZCount(t *testing.T) {
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
	size, err1 := rdb.ZCount(ctx, "zAdd", "1", "5").Result()
	if err1 != nil {
		panic(err1)
	}
	t.Log(size)

}

```

4. ZIncrBy 增加元素的分数

```go
func TestZIncrBy(t *testing.T) {
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
	err = rdb.ZIncrBy(ctx, "zAdd", 2, "张德志").Err()
	if err != nil {
		panic(err)
	}
}

```

5. zrange 返回集合中某个索引范围的元素

```go
func TestZRange(t *testing.T) {
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
	result, err1 := rdb.ZRange(ctx, "zAdd", 0, -1).Result()
	if err1 != nil {
		panic(err1)
	}
	t.Log(result)

}
```

6. ZRangeByScore 根据分数范围返回集合元素，元素根据分数从小到大排序，支持分页

```go
func TestZRangeByScore(t *testing.T) {
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
	opt := redis.ZRangeBy{
		Min:    "2",
		Max:    "1000",
		Offset: 0,
		Count:  5,
	}
	vals, err1 := rdb.ZRangeByScore(ctx, "set", &opt).Result()
	if err1 != nil {
		panic(err1)
	}
	t.Log(vals)
}
```

7. 根据指定 key 删除元素

```go
func TestZRem(t *testing.T) {
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
	err = rdb.ZRem(ctx, "zAdd", "张德志").Err()
	if err != nil {
		panic(err)
	}
	t.Log("删除成功")
}
```

10. ZRemRangeByRank 根据索引范围删除元素

```go
func TestZRemRangeByRank(t *testing.T) {
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
	err = rdb.ZRemRangeByRank(ctx, "zAdd", 0, 1).Err()
	if err != nil {
		panic(err)
	}
	t.Log("删除成功")
}

```

#### 相关链接

[演示地址](https://www.shuqin.cc/market/design-component)  
[获取更多](https://www.xiaozhi.shop/)  
[源码地址](https://github.com/dezhizhang/rdb)

####

<img src="https://cdn.xiaozhi.shop/digitwin/assets/weixin.jpg" width = 300 height = 300 />
