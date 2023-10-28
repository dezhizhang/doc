# redis

<!-- 地址：[reids](https://www.bilibili.com/video/BV13R4y1v7sP?p=1&vd_source=e38cd951f2ee7bda48ec574f4e9ba363) -->

### Redis key 键

|-

8. move key dbindex[0,-15] #当

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

### strem

```
XADD mystrem * id 11 cname z3       # 添加
XRANGE mystrem - +                  # 查找
XDEL 1698008508965-0                # 删除
XREAD count 2 streams mystream $    # 最后一条的下一条
```

### 管道

```
cat cmd.txt | redis-cli --pipe
```

110
