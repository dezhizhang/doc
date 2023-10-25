# redis

地址：[reids](https://www.bilibili.com/video/BV13R4y1v7sP?p=1&vd_source=e38cd951f2ee7bda48ec574f4e9ba363)

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
