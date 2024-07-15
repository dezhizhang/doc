# redis

<!-- 地址：[reids](https://www.bilibili.com/video/BV13R4y1v7sP?p=1&vd_source=e38cd951f2ee7bda48ec574f4e9ba363) -->

### Redis key 键

| key 字段                | 功能                                              |
| ----------------------- | ------------------------------------------------- |
| keys \*                 | 查看当前库所有的 key                              |
| exists key              | 判断某个 key 是否存在                             |
| type key                | 查看 key 是什么类型                               |
| del key                 | 删除指定的 key 数据                               |
| unlink key              | 非阻塞删除，仅仅将 keys 从 keyspace 元素中删除    |
| ttl key                 | 查看还有多少秒过期,-1 表示永不过期，-2 表示已过期 |
| expirt key              | 秒种 为 key 设置过期时间                          |
| move key dbindex[0,-15] | 将当前数据库的 key 移动给定的数据库 db 当中       |
| select dbindex          | 切换数据训[0-15] 默认为 0                         |
| dbsize                  | 查看当前数据库 key 的数量                         |
| flushdb                 | 清空当前库                                        |
| flushall                | 通杀全部库                                        |

### string 类型

| 命令                 | 功能                   |
| -------------------- | ---------------------- |
| get                  | 获取键值               |
| set                  | 设置取键值             |
| mset                 | 同时设置多个键值       |
| mget                 | 同时获取多个键值       |
| msetnx               | 不存在时才设直键值     |
| msetnx               | 不存在时才设直键值     |
| getrange             | 获取指定区间范围内的值 |
| setrange             | 设置指定区间范围内的值 |
| incr key             | 递增数字               |
| incrby key increment | 增加指定的整数         |
| decr key             | 递增数字               |
| decr key decrement   | 减少指定的整数         |
| strlen key           | 获取字符串长度         |
| append key value     | 字符串加               |
| getset key value     | 先 get 再 set 设置值   |

### List 类型

| 命令                        | 功能                   |
| --------------------------- | ---------------------- |
| lpush key value1 value2 ... | 从左向右向 list 添加   |
| rpush key value1 value2 ... | 从右向左向 list 添加   |
| lrange key stop end         | 从左向右遍历 list 集合 |

### Hash 类型

| 命令 | 功能     |
| ---- | -------- |
| get  | 获取键值 |

### strem

```
XADD mystrem * id 11 cname z3       # 添加
XRANGE mystrem - +                  # 查找
XDEL 1698008508965-0                # 删除
XREAD count 2 streams mystream $    # 最后一条的下一条
```
### reis通用命令
| 命令                 | 功能                    |
| -------------------- | ---------------------- |
| keys                 | 查看符合模板的所有key     |
| del                  | 删除一个或多个指定的key    |
| exists               | 判断key是否存在           |
| expire               | 给一个key设置有效期,有效期到自动删除 |
| ttl                  | 查看一个key有效时间        |

### jedis操作redis

1. 引入依赖
```xml
<dependencies>
  <!--jedis-->
    <dependency>
      <groupId>redis.clients</groupId>
        <artifactId>jedis</artifactId>
        <version>3.7.0</version>
      </dependency>
      <!--单元测试 -->
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.7.0</version>
    <scope>test</scope>
    </dependency>
</dependencies>
```
2. 建立链接池
```java
package com.xiaozhicloud.test;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import redis.clients.jedis.Jedis;

public class JedisTest {
    private Jedis jedis;

    @BeforeEach
    void setUp() {
        // 建立连接
        jedis = new Jedis("127.0.0.1",6379);
        // 设置密码
//        jedis.auth("");
        // 选择库
        jedis.select(0);
    }

    @Test
    void testString() {
        String result = jedis.set("name", "hello world");
        System.out.println(result);

        // 获取数据
        String name = jedis.get("name");
        System.out.println("name=" + name);
    }

    //  释放连接
    @AfterEach
    void  tearDown() {
        if(jedis != null) {
            jedis.close();
        }
    }
}

```





