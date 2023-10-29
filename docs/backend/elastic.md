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

### java 操作 es

1. 连接客户端

```java
package com.atguigu.es.test;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.transport.TransportClient;

public class EsTest_Client {
  public static void main(String[] args) throws Exception {

    // 创建es客户端
    RestHighLevelClient esClient = new RestHighLevelClient(
      RestClient.builder(new HttpHost("localhost",9200))
    );

    // 关闭es客户端
    esClient.close();

  }
}

```

2. 创建索引

```java
package com.atguigu.es.test;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.CreateIndexResponse;
import org.elasticsearch.client.transport.TransportClient;

public class EsTest_Client {
  public static void main(String[] args) throws Exception {

    // 创建es客户端
    RestHighLevelClient esClient = new RestHighLevelClient(
      RestClient.builder(new HttpHost("localhost",9200))
    );

    // 创建索引
    CreateIndexRequest user = new CreateIndexRequest("user");
    CreateIndexResponse createIndexResponse = esClient.indices().create(user, RequestOptions.DEFAULT);

    // 响应状态
    boolean acknowledged = createIndexResponse.isAcknowledged();

    System.out.println("索引操作:" + acknowledged);
    // 关闭es客户端
    esClient.close();

  }
}

```

3. 查询索引

```java
package com.atguigu.es.test;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.CreateIndexResponse;
import org.elasticsearch.client.indices.GetIndexRequest;
import org.elasticsearch.client.indices.GetIndexResponse;

public class EsTest_Index_Search {
  public static void main(String[] args) throws Exception {
    RestHighLevelClient esClient = new RestHighLevelClient(
      RestClient.builder(new HttpHost("localhost",9200))
    );


    // 查询索引
    GetIndexRequest user = new GetIndexRequest("user");
    GetIndexResponse getIndexResponse = esClient.indices().get(user, RequestOptions.DEFAULT);
    System.out.println(getIndexResponse.getAliases());
    System.out.println(getIndexResponse.getMappings());
    System.out.println(getIndexResponse.getSettings());


    // 关闭es客户端
    esClient.close();
  }
}

```

4. 删除索引

```java
package com.atguigu.es.test;

import org.apache.http.HttpHost;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.support.master.AcknowledgedResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.CreateIndexResponse;

public class EsTest_Index_Delete {
  public static void main(String[] args) throws Exception {
    // 创建es客户端
    RestHighLevelClient esClient = new RestHighLevelClient(
      RestClient.builder(new HttpHost("localhost",9200))
    );

    DeleteIndexRequest user = new DeleteIndexRequest("user");
    AcknowledgedResponse delete = esClient.indices().delete(user, RequestOptions.DEFAULT);

    System.out.println(delete.isAcknowledged());



    // 关闭es客户端
    esClient.close();
  }
}

```

5. 增加文档

```java
package com.atguigu.es.test;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHost;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.CreateIndexResponse;
import org.elasticsearch.common.xcontent.XContentType;

public class EsTest_Doc_Insert {
  public static void main(String[] args) throws Exception {
    // 创建es客户端
    RestHighLevelClient esClient = new RestHighLevelClient(
      RestClient.builder(new HttpHost("localhost",9200))
    );

    IndexRequest indexRequest = new IndexRequest();
    indexRequest.index("user").id("1001");

    User user = new User();
    user.setName("张德志");
    user.setAge(30);
    user.setSex("男");

    ObjectMapper objectMapper = new ObjectMapper();
    String userJson = objectMapper.writeValueAsString(user);

    indexRequest.source(userJson, XContentType.JSON);


    IndexResponse response = esClient.index(indexRequest, RequestOptions.DEFAULT);

    System.out.println(response.getResult());
    System.out.println(response.getId());


    // 关闭es客户端
    esClient.close();
  }
}

```

6. 更新文档

```java
package com.atguigu.es.test;

import org.apache.http.HttpHost;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;

public class EsTest_Doc_Update {
  public static void main(String[] args) throws Exception {
    RestHighLevelClient esClient = new RestHighLevelClient(
      RestClient.builder(new HttpHost("localhost",9200))
    );

    // 更新
    UpdateRequest request = new UpdateRequest();
    request.index("user").id("1001");
    request.doc(XContentType.JSON,"sex","女");


    UpdateResponse update = esClient.update(request, RequestOptions.DEFAULT);

    System.out.println(update.getId());
    // 关闭es客户端
    esClient.close();
  }
}

```

7. 删除文档

```java
package com.atguigu.es.test;

import org.apache.http.HttpHost;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;

public class EsTest_Doc_Delete {
  public static void main(String[] args) throws Exception {
    RestHighLevelClient esClient = new RestHighLevelClient(
      RestClient.builder(new HttpHost("localhost",9200))
    );

    DeleteRequest request = new DeleteRequest();
    request.index("user").id("1001");

    DeleteResponse delete = esClient.delete(request, RequestOptions.DEFAULT);
    System.out.println(delete.toString());



    esClient.close();
  }
}

```

8. 批量增加

```java
package com.atguigu.es.test;

import org.apache.http.HttpHost;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;

public class EsTest_Doc_Insert_Batch {
  public static void main(String[] args) throws Exception {
    // 创建es客户端
    RestHighLevelClient esClient = new RestHighLevelClient(
      RestClient.builder(new HttpHost("localhost",9200))
    );

    // 创建索引
    BulkRequest request = new BulkRequest();
    IndexRequest source = new IndexRequest().index("user").id("1001").source(XContentType.JSON, "name", "刘德华");
    IndexRequest source1 = new IndexRequest().index("user").id("1002").source(XContentType.JSON, "name", "周华建");
    IndexRequest source3 = new IndexRequest().index("user").id("1003").source(XContentType.JSON, "name", "周峰");
    request.add(source);
    request.add(source1);
    request.add(source3);

    BulkResponse bulk = esClient.bulk(request, RequestOptions.DEFAULT);


    System.out.println(bulk.getTook());


    // 关闭es客户端
    esClient.close();
  }
}

```

9. 批量删除

```java
import org.apache.http.HttpHost;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;


public class EsTest_Doc_Delete_Batch {
  public static void main(String[] args) throws Exception {
    RestHighLevelClient esClient = new RestHighLevelClient(
      RestClient.builder(new HttpHost("localhost",9200))
    );

    BulkRequest request = new BulkRequest();
    request.add(new DeleteRequest().index("user").id("1001"));
    request.add(new DeleteRequest().index("user").id("1002"));
    request.add(new DeleteRequest().index("user").id("1003"));

    BulkResponse bulk = esClient.bulk(request, RequestOptions.DEFAULT);
    System.out.println(bulk.getTook());
    System.out.println(bulk.getItems());

    esClient.close();
  }
}

```

10. 全量查询

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

public class EsTest_Doc_Query {
  public static void main(String[] args) throws Exception {


    // 创建es客户端
    RestHighLevelClient esClient = new RestHighLevelClient(
      RestClient.builder(new HttpHost("localhost",9200))
    );

    SearchRequest searchRequest = new SearchRequest();
    searchRequest.indices("user");

    SearchSourceBuilder query = new SearchSourceBuilder().query(QueryBuilders.matchAllQuery());


    searchRequest.source(query);


    SearchResponse search = esClient.search(searchRequest, RequestOptions.DEFAULT);

    SearchHits hits = search.getHits();
    System.out.println(hits.getTotalHits());
    System.out.println(search.getTook());


    for (SearchHit hit:hits) {
      System.out.println(hit.getSourceAsString());
    }


    // 关闭es客户端
    esClient.close();
  }
}

```

11. 匹配查询

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

12. 分页查询

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

13. 组合查询

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

14. 模湖查询

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

15. 高亮查询

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
