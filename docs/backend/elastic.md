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

### 条件查询

1. 匹配查询

```
GET localhost:9200/shopping/_search?q=title:晓智科技有限公司

GET localhost:9200/shopping/_search
{
    "query":{
        "match":{
            "title":"晓智科技有限公司"
        }
    }
}
```

2. 全量查询

```
GET localhost:9200/shopping/_search
{
    "query":{
        "match_all":{

        }
    }
}
```

3. 分页查询

```
GET localhost:9200/shopping/_search
{
    "query":{
        "match_all":{

        }
    },
    "from":0,
    "size":10
}

```

4. 完全匹配

```
GET localhost:9200/shopping/_search
{
    "query":{
        "match":{
            "title":"晓智"
        }
    }
}
```

5. 高亮显示

```
GET localhost:9200/shopping/_search
{
    "query":{
        "match":{
            "title":"晓"
        }
    },
    "highlight":{
        "fields":{
            "title":{}
        }
    }
}
```

6. 聚合操作

```
GET localhost:9200/shopping/_search
{
    "aggs":{
        "price_group":{
            "terms":{
                "field":"price"
            }
        }
    },
    "size":0
}
```

7. 创建映射

```
PUT localhost:9200/user/_mapping
{
    "properties":{
        "name":{
            "type":"text",
            "index":true
        },
        "sex":{
            "type":"keyword",
            "index":true
        },
        "tel":{
            "type":"keyword",
            "index":false
        }
    }
}
```

8. 映射查询

```
GET localhost:9200/user/_search

{
    "query":{
        "match":{
            "name":"科"
        }
    }
}
```
