# go-elastic

[视频地址](https://www.bilibili.com/video/BV1xM4y1p7LM?p=9&spm_id_from=pageDriver&vd_source=e38cd951f2ee7bda48ec574f4e9ba363s)

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
		Username: "张德志",
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
