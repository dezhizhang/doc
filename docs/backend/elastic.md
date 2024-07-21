# elastic
| 项目              | 地址                                           |
| :----------------------- | :--------------------------------------- |
| 晓智科技                 | [晓智科技](https://xiaozhi.shop)|
| 晓智文档                 | [晓智文档](https://doc.xiaozhi.shop/backend/elastic) |
| 源码地址                 | [源码地址](https://github.com/dezhizhang/java-awesome/tree/main/es)|
| 文档源码                 | [文档源码](https://github.com/dezhizhang/doc) |


## docker安装elastic

1. ##### 创建自定义网络
```bash
docker network create es-net
```
2. ##### 拉取镜像
```bash
docker pull elasticsearch:8.6.0
```
3. ##### 创建挂载点目录
```bash
mkdir -p /usr/local/es/data /usr/local/es/config /usr/local/es/plugins
```
4. ##### 部署单点es，创建es容器
```bash
docker run -d \
--restart=always \
--name es \
--network es-net \
-p 9200:9200 \
-p 9300:9300 \
--privileged \
-v /usr/local/es/data:/usr/share/elasticsearch/data \
-v /usr/local/es/plugins:/usr/share/elasticsearch/plugins \
-e "discovery.type=single-node" \
-e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
elasticsearch
```

5. ##### 编写elasticsearch.yml
```bash
docker exec -it es /bin/bash
cd config
echo 'xpack.security.enabled: false' >> elasticsearch.yml
exit
```
6. ##### 重启es容器
```bash
docker restart es
```
7. ##### 测试是否安装成功
```bash
http://localhost:9200/
```

## 索引增删改查

1. ##### 创建索引

```bash
PUT localhost:9200/shopping
```

2. ##### 获取索引

```bash
GET localhost:9200/shopping
```

3. ##### 查看所有索引

```bash
GET localhost:9200/_cat/indices?v
```

4. ##### 删除索引

```bash
DELETE localhost:9200/shopping
```

## 文档删改查

1. ##### 创建文档

```bash
POST localhost:9200/shopping/_doc
{
    "title":"晓智科技",
    "url":"https://www.xiaozhi.shop/",
    "docs":"一家专注于人工智能的公司"
}
```

2. ##### 查看文档

```bash
GET localhost:9200/shopping/_doc/1001
```

3. ##### 查询所有文档

```bash
localhost:9200/shopping/_search
```

4. ##### 全量修改文档

```bash
PUT  localhost:9200/shopping/_doc/1001
{
    "title":"晓智科技",
    "url":"https://www.xiaozhi.shop/",
    "docs":"一家专注于人工智能的公司"
}
```

5. ##### 局部更改数据

```bash
POST localhost:9200/shopping/_update/1001
{

    "doc":{
       "title":"晓智科技有限公司"
    }
}
```

6. ##### 删除数据

```bash
DELETE localhost:9200/shopping/_doc/id

```

## 条件查询

1.  ##### 匹配查询

```bash
localhost:9200/shopping/_search

GET localhost:9200/shopping/_search
{
    "query":{
        "match":{
             "category":"小米"
        }
    }
   
}
```

2. #####  全量查询

```bash
GET localhost:9200/shopping/_search
{
    "query":{
        "match_all":{

        }
    }
}
```

3. ##### 分页查询

```bash
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

4. ##### 只显示某些字段
```bash
GET localhost:9200/shopping/_search
{
    "query":{
        "match_all":{

        }
    },
    "from":0,
    "size":10,
    "_source":["title"]
}
```
5. ##### 排序查询

```bash
GET localhost:9200/shopping/_search
{
    "query":{
        "match_all":{

        }
    },
    "from":0,
    "size":10,
    "_source":["title"],
    "sort":{
        "price":{
            "order":"asc"
        }
    }
   
}
```
6. ##### 条件查询
```bash
GET localhost:9200/shopping/_search
{
    "query":{
        "bool":{
            "must":[{
                "match":{
                    "category":"小米"
                }   
            },
            {
                "match":{
                    "price":3999
                }
            }
            ]
        }
    }
}
```

7. ##### 全文检索
```bash
GET localhost:9200/shopping/_search
{
    "query":{
        "match":{
            "category":"米"
        }
    }
}
```



8. ##### 高亮显示

```bash
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

10. ##### 聚合操作

```bash
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

11. ##### 创建映射

```bash
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

12. ##### 映射查询

```bash
GET localhost:9200/user/_search

{
    "query":{
        "match":{
            "name":"科"
        }
    }
}
```

## java 操作es

1.  ##### 添加依赖
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>es</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>22</maven.compiler.source>
        <maven.compiler.target>22</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.elasticsearch</groupId>
            <artifactId>elasticsearch</artifactId>
            <version>7.8.0</version>
        </dependency>
        <!-- elasticsearch 的客户端 -->
        <dependency>
            <groupId>org.elasticsearch.client</groupId>
            <artifactId>elasticsearch-rest-high-level-client</artifactId>
            <version>7.8.0</version>
        </dependency>
        <!-- elasticsearch 依赖 2.x 的 log4j -->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-api</artifactId>
            <version>2.8.2</version>
        </dependency>
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>2.8.2</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.9.9</version>
        </dependency>
        <!-- junit 单元测试 -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
        </dependency>
    </dependencies>


</project>
```

2.  ##### 连接客户端

```java
package com.xiaozhicloud.es;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;

public class EsClient {
    
    public static void main(String[] args) throws Exception {
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        client.close();
    }
}

```

3. ##### 创建索引

```java
import org.apache.http.HttpHost;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.CreateIndexResponse;

public class EsClient {

    public static void main(String[] args) throws Exception {
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );


        CreateIndexRequest user = new CreateIndexRequest("user");
        CreateIndexResponse createIndexResponse = client.indices().create(user, RequestOptions.DEFAULT);

        boolean acknowledged = createIndexResponse.isAcknowledged();
        System.out.println("索引操作"+acknowledged);


        client.close();
    }
}
```

3.  ##### 查询索引

```java
package com.xiaozhicloud.es;


import org.apache.http.HttpHost;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.GetIndexRequest;
import org.elasticsearch.client.indices.GetIndexResponse;

public class ESSearchIndex {
    public static void main(String[] args) throws Exception {
        RestHighLevelClient restHighLevelClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );


        GetIndexRequest user = new GetIndexRequest("user");
        GetIndexResponse response = restHighLevelClient.indices().get(user,RequestOptions.DEFAULT);

        // 响应状态
        System.out.println(response.getAliases());
        System.out.println(response.getMappings());
        System.out.println(response.getSettings());


        restHighLevelClient.close();

    }
}
```

4. ##### 删除索引

```java
package com.xiaozhicloud.es;

import org.apache.http.HttpHost;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.support.master.AcknowledgedResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;

public class ESIndexDelete {
    public static void main(String[] args) throws Exception {

        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 删除索引
        DeleteIndexRequest user = new DeleteIndexRequest("user");
        AcknowledgedResponse delete = client.indices().delete(user, RequestOptions.DEFAULT);
        System.out.println(delete.isAcknowledged());

        client.close();

    }
}


```
5. ##### 文档中插入数据

```java
package com.xiaozhicloud.es;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHost;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;

public class ESDocInsert {
    public static void main(String[] args) throws Exception {
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 插入数据
        IndexRequest request = new IndexRequest();
        request.index("user").id("1001");
        
        
        User user = new User();
        user.setAge(18);
        user.setName("张三");
        user.setSex("男");


        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(user);
        request.source(json, XContentType.JSON);

        IndexResponse response = client.index(request, RequestOptions.DEFAULT);

        System.out.println(response.getResult());


        client.close();
    }
}


```


6. ##### 更新文档数据

```java
package com.xiaozhicloud.es;
import org.apache.http.HttpHost;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;

public class EsDocUpdate {
    public static void main(String[] args) throws Exception {

        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );
        
        // 修改数据
        UpdateRequest updateRequest = new UpdateRequest();
        UpdateRequest user = updateRequest.index("user").id("1001");

        updateRequest.doc(XContentType.JSON,"sex","女");

        UpdateResponse update = client.update(updateRequest, RequestOptions.DEFAULT);


        System.out.println(update.getResult());

        client.close();
    }
}
```
7. ##### 查询文档数据

```java
package com.xiaozhicloud.es;

import org.apache.http.HttpHost;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;

public class EsDocSearch {
    public static void main(String[] args) throws Exception {
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );


        GetRequest request = new GetRequest();
        request.index("user").id("1001");

        GetResponse response = client.get(request, RequestOptions.DEFAULT);
        System.out.println(response.getSourceAsString());
        
        client.close();

    }
}
```

8. ##### 删除文档数据

```java
package com.xiaozhicloud.es;

import org.apache.http.HttpHost;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;

public class EsDocDelete {
    public static void main(String[] args) throws Exception {
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 删除文档数据
        DeleteRequest request = new DeleteRequest();
        request.index("user").id("1001");

        DeleteResponse response = client.delete(request, RequestOptions.DEFAULT);
        System.out.println(response.getResult());

        client.close();
    }
}

```

9.  ##### 批量增加文档

```java
package com.xiaozhicloud.es;

import org.apache.http.HttpHost;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;

public class EsDocInsetBatch {
    public static void main(String[] args)  throws Exception {
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 批量增加
        BulkRequest bulkRequest = new BulkRequest();
        IndexRequest source = new IndexRequest().index("user").id("1001").source(XContentType.JSON, "name", "张三");
        IndexRequest source1 = new IndexRequest().index("user").id("1002").source(XContentType.JSON,"name","李四");
        IndexRequest source2 = new IndexRequest().index("user").id("1003").source(XContentType.JSON, "name", "王五");


        bulkRequest.add(source,source1,source2);
        BulkResponse bulk = client.bulk(bulkRequest, RequestOptions.DEFAULT);

        System.out.println(bulk.getTook());

        client.close();
    }
}


```

10. ##### 批量删除文档

```java
package com.xiaozhicloud.es;

import org.apache.http.HttpHost;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;

public class EsDocDelBatch {
    public static void main(String[] args) throws Exception {
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 批量删除文档
        BulkRequest bulkRequest = new BulkRequest();

        DeleteRequest source1 = new DeleteRequest().index("user").id("1001");
        DeleteRequest source2 = new DeleteRequest().index("user").id("1002");
        bulkRequest.add(source1,source2);


        BulkResponse bulk = client.bulk(bulkRequest, RequestOptions.DEFAULT);

        System.out.println(bulk.getTook());

        client.close();
    }
}

```

11. ##### 全量查询文档

```java
package com.xiaozhicloud.es;

import org.apache.http.HttpHost;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;

public class EsDocQuery {
    public static void main(String[] args) throws Exception {
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );
        
        // 全量查询数据
        SearchRequest request = new SearchRequest();
        request.indices("user");

        SearchSourceBuilder query = new SearchSourceBuilder().query(QueryBuilders.matchAllQuery());

        request.source(query);

        SearchResponse response = client.search(request, RequestOptions.DEFAULT);

        System.out.println(response.getHits().getTotalHits());
        System.out.println(response.getHits().getHits().getClass());

        client.close();
    }

}

```

12. ##### 匹配查询

```java
package com.atguigu.es.test;

import org.apache.http.HttpHost;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;

public class EsTest_Doc_Query2 {
  public static void main(String[] args) throws Exception {
    // 创建es客户端
    RestHighLevelClient esClient = new RestHighLevelClient(
      RestClient.builder(new HttpHost("localhost",9200))
    );

    SearchRequest request = new SearchRequest();
    request.indices("user");

    request.source(new SearchSourceBuilder().query(QueryBuilders.termQuery("age",30)));
    SearchResponse search = esClient.search(request, RequestOptions.DEFAULT);
    SearchHits hits = search.getHits();
    System.out.println(hits.getTotalHits());
    System.out.println(search.getTook());

    for (SearchHit hit:hits) {
      System.out.println(hit.getSourceAsString());
    }

    esClient.close();
  }
}

```

13. ##### 分页查询

```java
package com.atguigu.es.test;

import org.apache.http.HttpHost;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;

public class EsTest_Doc_Query3 {
  public static void main(String[] args) throws Exception {
    RestHighLevelClient esClient = new RestHighLevelClient(
      RestClient.builder(new HttpHost("localhost",9200))
    );

    SearchRequest request = new SearchRequest();
    request.indices("user");


    SearchSourceBuilder query = new SearchSourceBuilder().query(QueryBuilders.matchAllQuery());
    query.from(0);
    query.size(2);

    request.source(query);
    SearchResponse search = esClient.search(request, RequestOptions.DEFAULT);

    SearchHits hits = search.getHits();
    System.out.println(hits.getTotalHits());
    System.out.println(search.getTook());

    for(SearchHit hit:hits) {
      System.out.println(hit.getSourceAsString());
    }

    esClient.close();

  }
}

```

14. ##### 组合查询

```java
package com.atguigu.es.test;

import org.apache.http.HttpHost;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;

public class EsTest_Doc_Query5 {
  public static void main(String[] args) throws Exception {
    RestHighLevelClient esClient = new RestHighLevelClient(
      RestClient.builder(new HttpHost("localhost",9200))
    );

    SearchRequest request = new SearchRequest();
    request.indices("user");

    SearchSourceBuilder query = new SearchSourceBuilder();
    BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();


    boolQueryBuilder.must(QueryBuilders.matchQuery("age",30));
    boolQueryBuilder.must(QueryBuilders.matchQuery("sex","男"));

    query.query(boolQueryBuilder);


    request.source(query);

    SearchResponse search = esClient.search(request, RequestOptions.DEFAULT);

    SearchHits hits = search.getHits();
    System.out.println(hits.getTotalHits());
    System.out.println(search.getTook());

    for(SearchHit hit:hits) {
      System.out.println(hit);
    }

    esClient.close();
  }
}
```

14. ##### 模湖查询

```java
package com.atguigu.es.test;

import org.apache.http.HttpHost;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.unit.Fuzziness;
import org.elasticsearch.index.query.FuzzyQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;

public class EsTest_Doc_Query6 {
  public static void main(String[] args) throws Exception {

    RestHighLevelClient esClient = new RestHighLevelClient(
      RestClient.builder(new HttpHost("localhost",9200))
    );


    SearchRequest request = new SearchRequest();
    request.indices("user");

    SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
    FuzzyQueryBuilder fuzziness = QueryBuilders.fuzzyQuery("name", "德志").fuzziness(Fuzziness.ONE);
    searchSourceBuilder.query(fuzziness);

    request.source(searchSourceBuilder);
    SearchResponse search = esClient.search(request, RequestOptions.DEFAULT);


    SearchHits hits = search.getHits();
    System.out.println(hits.getTotalHits());
    System.out.println(search.getTook());

    for(SearchHit hit:hits) {
      System.out.println(hit.getSourceAsString());
    }

    esClient.close();

  }
}

```

16. ##### 高亮查询

```java
package com.atguigu.es.test;

import org.apache.http.HttpHost;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.TermQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;

public class EsTest_Doc_Query7 {
  public static void main(String[] args) throws Exception {
    RestHighLevelClient esClient = new RestHighLevelClient(
      RestClient.builder(new HttpHost("localhost",9200))
    );

    SearchRequest request = new SearchRequest();
    request.indices("user");

    SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
    TermQueryBuilder termQueryBuilder = QueryBuilders.termQuery("name", "张德志 ");

    HighlightBuilder highlightBuilder = new HighlightBuilder();
    highlightBuilder.preTags("<em>");
    highlightBuilder.postTags("</em>");
    highlightBuilder.field("name");


    searchSourceBuilder.highlighter(highlightBuilder);

    searchSourceBuilder.query(termQueryBuilder);

    request.source(searchSourceBuilder);

    SearchResponse search = esClient.search(request, RequestOptions.DEFAULT);

    SearchHits hits = search.getHits();
    System.out.println(hits.getTotalHits());
    System.out.println(search.getTook());

    for(SearchHit hit:hits) {
      System.out.println(hit.getSourceAsString());
    }



    esClient.close();
  }
}

```
## estic8.0



<!-- [last](https://www.bilibili.com/video/BV1hh411D7sb?p=1&vd_source=10257e657caa8b54111087a9329462e8) -->