使用 Go 语言与 Elasticsearch 实现高效搜索服务

### 什么是 Elasticsearch

- Elasticsearch 是一个基于 Apache Lucene 构建的分布式搜索引擎，能够存储、搜索和分析大量数据。它具有高可扩展性、快速的搜索速度，支持全文检索、多字段查询和近实时数据分析。Elasticsearch 常与 Logstash 和 Kibana 一起构成 ELK 技术栈，广泛应用于日志分析、推荐系统和全文检索等领域。

### 安装 Elasticsearch

- 下载并安装：你可以从 Elasticsearch 官网 下载适用于你操作系统的版本。
- 启动 Elasticsearch：

```bash
./bin/elasticsearch
```

- 验证安装：可以通过访问以下地址来验证 Elasticsearch 是否启动成功

```bash
http://localhost:9200/
```

### Go 语言与 Elasticsearch 集成

- 我们将使用 olivere/elastic 库，这是一个流行的 Go 语言客户端库，能够方便地与 Elasticsearch 交互。以下是实现的步骤：

### 安装 olivere/elastic 库

```bash
go get github.com/olivere/elastic/v7
```

- 这个库支持 Elasticsearch 7.x 版本的所有功能，确保你的 Elasticsearch 版本兼容。

<!-- [视频地址](https://www.bilibili.com/video/BV1xM4y1p7LM?p=9&spm_id_from=pageDriver&vd_source=e38cd951f2ee7bda48ec574f4e9ba363s) -->

### 连接 es

```go
import (
	"github.com/olivere/elastic/v7"
	"testing"
)

func TestClient(t *testing.T) {
	client, err := elastic.NewClient(
		elastic.SetSniff(false),
		elastic.SetURL("http://localhost:9200"),
	)
	if err != nil {
		panic(err)
	}
	t.Log(client)
}

```

### go 操作索引

1. 创建索引

```go
import (
	"github.com/olivere/elastic/v7"
	"testing"
)

func TestIndexMapping(t *testing.T) {
	mapping := `
		{
			"settings" : {
				"number_of_shards" : 1,
				"number_of_replicas" : 1
			},
			"mappings":{
				"properties":{
					"nickname":{
						"type":"text"
 					},
					"username":{
						"type":"keyword"
					},
					"id":{
						"type":"integer"
					},
					"create_at":{
						"type":"date",
						"format":"[YYYY-MM-dd HH:mm:ss]"
					}
                 }
			}
		}
	`
	//t.Log(mapping)
	client, err := elastic.NewClient(
		elastic.SetSniff(false),
		elastic.SetURL("http://localhost:9200"),
	)
	if err != nil {
		panic(err)
	}

	do, err1 := client.CreateIndex("user").BodyString(mapping).Do(context.Background())
	if err1 != nil {
		t.Logf("创建mapping失败%s", err1.Error())
		return
	}
	t.Log("创建mapping成功", do)

}

```

2. 判断索引是否存在

```go

import (
	"github.com/olivere/elastic/v7"
	"testing"
)


func TestIndexExists(t *testing.T) {
	client, err := elastic.NewClient(
		elastic.SetSniff(false),
		elastic.SetURL("http://localhost:9200"),
	)
	if err != nil {
		panic(err)
	}
	do, err1 := client.IndexExists("user").Do(context.Background())
	if err1 != nil {
		panic(err1)
	}
	t.Log(do)
}

```

3. 删除索引

```go
import (
	"github.com/olivere/elastic/v7"
	"testing"
)


func TestDeleteIndex(t *testing.T) {
	client, err := elastic.NewClient(
		elastic.SetURL("http://localhost:9200"),
		elastic.SetSniff(false),
	)

	if err != nil {
		panic(err)
	}

	do, err1 := client.DeleteIndex("user").Do(context.Background())
	if err1 != nil {
		panic(err1)
	}
	t.Log(do)

}
```

### go 操作文档

1. 添加文档

```go
import (
	"github.com/olivere/elastic/v7"
	"testing"
)


type User struct {
	ID       uint      `json:"id"`
	Username string    `json:"username"`
	Nickname string    `json:"nickname"`
	CreateAt time.Time `json:"create_at"`
}

func TestCreateDoc(t *testing.T) {
	user := &User{
		ID:       1,
		Username: "晓智科技",
		Nickname: "晓智",
		CreateAt: time.Now(),
	}
	client, err := elastic.NewClient(
		elastic.SetSniff(false),
		elastic.SetURL("http://localhost:9200"),
	)

	if err != nil {
		panic(err)
	}

	do, err1 := client.Index().Index("user").BodyJson(user).Do(context.Background())
	if err1 != nil {
		panic(err1)
	}
	t.Log(do)

}


```

2. 根据 id 删除

```go
import (
	"github.com/olivere/elastic/v7"
	"testing"
)

func TestDeleteDoc(t *testing.T) {
	client, err := elastic.NewClient(elastic.SetSniff(false),
		elastic.SetURL("http://localhost:9200"),
	)
	if err != nil {
		panic(err)
	}
	deleteId := "7VKzh4sBP_UzlGBnhzrD"
	do, err1 := client.Delete().Index("user").Id(deleteId).Refresh("true").Do(context.Background())
	if err1 != nil {
		panic(err1)
	}

	t.Log(do)

}
```

3. 根据 id 批量删除

```go
import (
	"github.com/olivere/elastic/v7"
	"testing"
)
func TestBatchDeleteDocById(t *testing.T) {
	list := []string{"91LDh4sBP_UzlGBnwzpC", "9VLDh4sBP_UzlGBntjr8"}
	client, err := elastic.NewClient(
		elastic.SetSniff(false),
		elastic.SetURL("http://localhost:9200"),
	)
	if err != nil {
		panic(err)
	}
	bulk := client.Bulk().Index("user").Refresh("true")
	for _, s := range list {
		req := elastic.NewBulkDeleteRequest().Id(s)
		bulk.Add(req)
	}

	do, err1 := bulk.Do(context.Background())
	if err1 != nil {
		panic(err1)
	}
	t.Log(do.Succeeded())
}
```

4. 批量添加

```go
import (
	"github.com/olivere/elastic/v7"
	"testing"
)

func TestBatchCreate(t *testing.T) {
	list := []User{
		{
			ID:       12,
			Username: "张三",
			Nickname: "三",
			CreateAt: time.Now(),
		},
		{
			ID:       13,
			Username: "李四",
			Nickname: "阿四",
			CreateAt: time.Now(),
		},
	}

	client, err := elastic.NewClient(
		elastic.SetSniff(false),
		elastic.SetURL("http://localhost:9200"),
	)
	if err != nil {
		panic(err)
	}
	bulk := client.Bulk().Index("user").Refresh("true")
	for _, user := range list {
		doc := elastic.NewBulkCreateRequest().Doc(&user)
		bulk.Add(doc)
	}

	do, err1 := bulk.Do(context.Background())
	if err1 != nil {
		panic(err1)
	}

	t.Log(do.Created())
}

```

### 文档查询

1. 分页查询

```go
import (
	"github.com/olivere/elastic/v7"
	"testing"
)


// 查询文档
func TestFindDoc(t *testing.T) {
	client, err := elastic.NewClient(
		elastic.SetSniff(false),
		elastic.SetURL("http://localhost:9200"),
	)
	if err != nil {
		panic(err)
	}

	query := elastic.NewBoolQuery()
	res, err1 := client.Search("user").Query(query).From(0).Size(10).Do(context.Background())
	if err1 != nil {
		panic(err1)
	}

	count := res.Hits.TotalHits.Value
	t.Log(count)
	for _, value := range res.Hits.Hits {
		t.Log(string(fmt.Sprintf("%d", value.Score)))
	}

}

```

2. 精确查询

```go
import (
	"github.com/olivere/elastic/v7"
	"testing"
)

func TestFindTermDoc(t *testing.T) {
	client, err := elastic.NewClient(
		elastic.SetSniff(false),
		elastic.SetURL("http://localhost:9200"),
	)
	if err != nil {
		panic(err)
	}

	query := elastic.NewTermQuery("nickname", "晓智科技")
	res, err1 := client.Search("user").Query(query).From(0).Size(10).Do(context.Background())
	if err1 != nil {
		panic(err1)
	}

	count := res.Hits.TotalHits.Value

	t.Log(count)

	for _, val := range res.Hits.Hits {
		t.Log(val.Source)
	}

}

```

3. 模糊查询

```go
import (
	"github.com/olivere/elastic/v7"
	"testing"
)


// 模湖查询
func TestFinMathDoc(t *testing.T) {
	client, err := elastic.NewClient(
		elastic.SetSniff(false),
		elastic.SetURL("http://localhost:9200"),
	)

	if err != nil {
		panic(err)
	}

	query := elastic.NewMatchQuery("desc", "It从业人员")
	res, err1 := client.Search("user").Query(query).From(0).Size(10).Do(context.Background())
	if err1 != nil {
		panic(err1)
	}

	count := res.Hits.TotalHits.Value
	t.Log(count)

	for _, val := range res.Hits.Hits {
		t.Log(string(val.Source))
	}
}

```

4. 文档更新

```go
import (
	"github.com/olivere/elastic/v7"
	"testing"
)

// 文档更新
func TestUpdateDoc(t *testing.T) {
	client, err := elastic.NewClient(elastic.SetSniff(false), elastic.SetURL("http://localhost:9200"))
	if err != nil {
		panic(err)
	}

	updateId := "8VLDh4sBP_UzlGBnlTqW"

	do, err1 := client.Update().Index("user").Id(updateId).Doc(map[string]any{"username": "晓晓智"}).Do(context.Background())
	if err1 != nil {
		panic(err1)
	}
	t.Log(do)
}

```

### 使用异步请求

- 为了提高响应速度，可以使用异步请求处理搜索和索引操作。异步请求不会阻塞主线程，可以提高吞吐量。

```bash
client.Index().
    Index("products").
    BodyJson(product).
    DoAsync(context.Background(), func(response *elastic.IndexResponse, err error) {
        if err != nil {
            log.Printf("Error indexing document asynchronously: %s", err)
        } else {
            fmt.Printf("Asynchronous indexing completed for document %s\n", response.Id)
        }
    })

```

### 相关链接

[演示地址](https://www.shuqin.cc/market/design-component)  
[获取更多](https://www.xiaozhi.shop/)  
[源码地址](https://github.com/dezhizhang/rpc/blob/main/elastic/elastic_test.go)

###

<img src="https://cdn.xiaozhi.shop/digitwin/assets/weixin.jpg" width = 300 height = 300 />

