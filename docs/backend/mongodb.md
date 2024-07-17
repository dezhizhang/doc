# mongodb

### Linux 下安装 mongodb

1. 在/etc/yum.repos.d/下创建 mongodb-org-4.2.repo

```bash
touch mongodb-org-4.2.repo
```

2. vim 写入 下面文件

```bash
[mngodb-org]
name=MongoDB Repository
baseurl=http://mirrors.aliyun.com/mongodb/yum/redhat/7Server/mongodb-org/4.0/x86_64/
gpgcheck=0
enabled=1
```

3. 安装 mongodb

```bash
yum install -y mongodb-org
```

4. 开启 mongodb

```bash
systemctl start mongod
```

5. 设置开机启动 mongodb

```bash
systemctl enable mongod
```
## 基本常用命令
- 备注collection:集合名称

###### 查看当前数据库
```bash
db
```
###### 删除当前数据库
```bash
db.dropDatabase();
```
##### 显示创建集合
```bash
db.createCollection("my");
```
##### 显示集合
```bash
show collections;
```
##### 删除集合
```bash
db.collection.drop()
```
## 增删改查操作
### 文档的插入

###### 单条数据插入
```bash
db.collection.inset({ "articid" : "10000", "content" : "天气真好" })
```

###### 多条数据插入
```bash
db.collection.insertMany(
[
    {"articid":"10001", "content":"天气真好1" },
    {"articid":"10002", "content":"天气真好2"}
]);
```
### 文档的查询
###### 查询所有文档的查询
```bash
db.collection.find()
```
###### 查询单个文档
```bash
db.collection.findOne({“_id”:"66971f606da08ea6a60473ac"});
```
##### 投影查询只显示articid
```bash
db.collection.find({"articid":"10000"},{articid:1})
```
### 文档的更新
###### 修改命令
```bash
db.collection.update(query,update,options)
```
###### 复盖修改数据

```bash
db.collection.update({"articid":"10000"},{"content":"天气好个狗屁"});
```
###### 局部修改数据
```bash
db.collection.update({"articid":"10002"},{$set:{"content":"天气好个狗屁"}});
```
###### 局部自动增长数据
```bash
db.collection.update({"articid":"10002"},{$inc:{count:NumberInt(1)}});
```
### 文档的删除

###### 删除单条数据
```bash
db.collection.remove({"articid":"10002"})；
```
###### 批量删除数据
```bash
db.collection.remove({});
```
## 统计与分页

##### 文档的统计
```bash
db.collection.count();
```
##### 分页查询
```bash
db.collection.find().limit(2);
```
##### 排序查询
```bash
db.collection.find().sort({"articid":-1});
```
## 文档的复杂查询

##### 正则查询
```bash
db.collection.find({"content":/小明/});
```
##### 比较查询
```bash
大于$gt
db.collection.find({"articid":{$gt:NumberInt(1)}});
小于$lt
db.collection.find({"articid":{$lt:NumberInt(2)}});
大于等于$gte
db.collection.find({"articid":{$gte:NumberInt(2)}});
小于等于$lte
db.collection.find({"articid":{$lte:NumberInt(1)}});
不等于$ne
db.collection.find({"articid":{$ne:NumberInt(1)}});
```
##### 包含查询$in
```bash
db.collection.find({"articid":{$in:[1,3]}});
```
##### 条件查询$and
```bash
db.collection.find({$and:[
    {"articid":{$gt:NumberInt(1)}},
    {"articid":{$lt:NumberInt(3)}},
]});
```

##### 条件查询$or
```bash
db.collection.find({$or:[
    {"articid":{$gte:NumberInt(2)}},
    {"articid":{$lte:NumberInt(3)}}]
});
```
## 索引管理操作
##### 索引的查看
```bash
db.collection.getIndexes();
```
##### 创建单值索引

```bash
db.collection.createIndex({"articid":1},options);
```

##### 创建复合索引

```bash
db.collection.createIndex({"_id":1,"articid":-1},options);
```
##### 根据名称删除索引
```bash
db.collection.dropIndex("_id_1_articid_-1")
```
##### 根据key删除索引
```bash
db.collection.dropIndex({"articid":1});
```



<!-- [last](https://www.bilibili.com/video/BV1bJ411x7mq?p=26&spm_id_from=pageDriver&vd_source=10257e657caa8b54111087a9329462e8) -->
