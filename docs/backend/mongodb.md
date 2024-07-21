# mongodb
| 项目              | 地址                                           |
| :----------------------- | :--------------------------------------- |
| 晓智科技                 | [晓智科技](https://xiaozhi.shop)|
| 晓智文档                 | [晓智文档](https://doc.xiaozhi.shop/backend/elastic) |
| 源码地址                 | [源码地址](https://github.com/dezhizhang/java-awesome/tree/main/mongodb)|
| 文档源码                 | [文档源码](https://github.com/dezhizhang/doc) |



## Linux 下安装 mongodb

1. ##### 在/etc/yum.repos.d/下创建 mongodb-org-4.2.repo

```bash
touch mongodb-org-4.2.repo
```

2. ##### vim 写入 下面文件

```bash
[mngodb-org]
name=MongoDB Repository
baseurl=http://mirrors.aliyun.com/mongodb/yum/redhat/7Server/mongodb-org/4.0/x86_64/
gpgcheck=0
enabled=1
```

3. ##### 安装 mongodb

```bash
yum install -y mongodb-org
```

4. ##### 开启 mongodb

```bash
systemctl start mongod
```

5. ##### 设置开机启动 mongodb

```bash
systemctl enable mongod
```

## 基本常用命令
- 备注collection:集合名称

1. ###### 查看当前数据库
```bash
db
```
2. ###### 删除当前数据库
```bash
db.dropDatabase();
```
3. ##### 显示创建集合
```bash
db.createCollection("my");
```
4. ##### 显示集合
```bash
show collections;
```
5. ##### 删除集合
```bash
db.collection.drop()
```
## 增删改查操作
### 文档的插入

1. ###### 单条数据插入
```bash
db.collection.inset({ "articid" : "10000", "content" : "天气真好" })
```

2. ###### 多条数据插入
```bash
db.collection.insertMany(
[
    {"articid":"10001", "content":"天气真好1" },
    {"articid":"10002", "content":"天气真好2"}
]);
```
### 文档的查询
1. ###### 查询所有文档的查询
```bash
db.collection.find()
```
2. ###### 查询单个文档
```bash
db.collection.findOne({“_id”:"66971f606da08ea6a60473ac"});
```
3. ##### 投影查询只显示articid
```bash
db.collection.find({"articid":"10000"},{articid:1})
```
### 文档的更新
1. ###### 修改命令
```bash
db.collection.update(query,update,options)
```
2. ###### 复盖修改数据

```bash
db.collection.update({"articid":"10000"},{"content":"天气好个狗屁"});
```
3. ###### 局部修改数据
```bash
db.collection.update({"articid":"10002"},{$set:{"content":"天气好个狗屁"}});
```
4. ###### 局部自动增长数据
```bash
db.collection.update({"articid":"10002"},{$inc:{count:NumberInt(1)}});
```
### 文档的删除

1. ###### 删除单条数据
```bash
db.collection.remove({"articid":"10002"})；
```
2. ###### 批量删除数据
```bash
db.collection.remove({});
```
## 统计与分页

1. ##### 文档的统计
```bash
db.collection.count();
```
2. ##### 分页查询
```bash
db.collection.find().limit(2);
```
3. ##### 排序查询
```bash
db.collection.find().sort({"articid":-1});
```
## 文档的复杂查询

1. ##### 正则查询
```bash
db.collection.find({"content":/小明/});
```
2. ##### 比较查询
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
3. ##### 包含查询$in
```bash
db.collection.find({"articid":{$in:[1,3]}});
```
4. ##### 条件查询$and
```bash
db.collection.find({$and:[
    {"articid":{$gt:NumberInt(1)}},
    {"articid":{$lt:NumberInt(3)}},
]});
```

5. ##### 条件查询$or
```bash
db.collection.find({$or:[
    {"articid":{$gte:NumberInt(2)}},
    {"articid":{$lte:NumberInt(3)}}]
});
```
## 索引管理操作
1. ##### 索引的查看
```bash
db.collection.getIndexes();
```
2. ##### 创建单值索引

```bash
db.collection.createIndex({"articid":1},options);
```

3. ##### 创建复合索引

```bash
db.collection.createIndex({"_id":1,"articid":-1},options);
```
4. ##### 根据名称删除索引
```bash
db.collection.dropIndex("_id_1_articid_-1")
```
5. ##### 根据key删除索引
```bash
db.collection.dropIndex({"articid":1});
```

## Docker搭建副本集

1. ##### Docker Compose部署Mongodb副本集群教程

```bash
docker pull mongo:4.0.27
```
2. ##### 编写/home/docker/mongodb/docker-compose.yml配置文件
```bash
version: '3.7'
services:
  master:
    image: mongo:4.0.27
    container_name: master
    restart: always
    ports:
     - 0.0.0.0:27017:27017
    volumes:
      - /home/data/master:/data/db
    command: mongod --dbpath /data/db --replSet appSet --oplogSize 128 # --auth 开启认证
  secondary:
    image: mongo:4.0.27
    container_name: secondary
    restart: always
    ports:
       - 0.0.0.0:27018:27017
    volumes:
       - /home/data/secondary:/data/db
    command: mongod --dbpath /data/db --replSet appSet --oplogSize 128 # --auth 开启认证
  arbiter:
    image: mongo:4.0.27
    container_name: arbiter
    restart: always
    ports:
       - 0.0.0.0:27019:27017
    volumes:
       - /home/data/arbiter:/data/db
    command: mongod --replSet appSet --smallfiles --oplogSize 128
```

3. ##### 在路径/home/docker/mongodb启动mongodb 副本集
```bash
docker-compse up -d
```
4. #####  初始化副本集
```bash
docker exec -it master mongo

> rs.initiate()
{
        "info2" : "no configuration specified. Using a default configuration for the set",
        "me" : "89888be75898:27017",
        "ok" : 1
}
```
5. ##### 添加副本集
```bash
rs.add('47.107.101.79:27018')
rs.add('47.107.101.79:27019',true) 
"ok" : 1,
```
6. ##### 查看配置
```bash
rs.conf() 
```
7. ##### 查看副本集状态
```bash
rs.status()
```
8.  ##### master可用性

```bash
docker exec -it master mongo
use test  
db.test.insert({userName:"lisi",age: 18})
```
9.  ##### secondary可用性

```bash
docker exec -it master mongo
use test
# 报错"errmsg" : "not master and slaveOk=false",
rs.secondaryOk()
db.test.find()
```




<!-- [副本集搭建参考文档](https://blog.csdn.net/JJW1002/article/details/136367485) -->





