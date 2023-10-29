# elastic

### 索引增删改查

1. 创建索引

```
PUT localhost:9200/shopping
```

2. 获取索引

```
GET localhost:9200/shopping
```

3. 查看所有索引

```
GET localhost:9200/_cat/indices?v
```

4. 删除索引

```
DELETE localhost:9200/shopping
```

### 文档删改查

1. 创建文档

```
POST localhost:9200/shopping/_doc
{
    "title":"晓智科技",
    "url":"https://www.xiaozhi.shop/",
    "docs":"一家专注于人工智能的公司"
}
```

2. 查看文档

```
GET localhost:9200/shopping/_doc/1001
```

3. 查询所有文档

```
localhost:9200/shopping/_search
```

4. 全量修改文档

```
PUT  localhost:9200/shopping/_doc/1001
{
    "title":"晓智科技",
    "url":"https://www.xiaozhi.shop/",
    "docs":"一家专注于人工智能的公司"
}
```

5. 局部更改数据

```
POST localhost:9200/shopping/_update/1001
{

    "doc":{
       "title":"晓智科技有限公司"
    }
}
```

6. 删除数据

```
DELETE localhost:9200/shopping/_doc/id

```
