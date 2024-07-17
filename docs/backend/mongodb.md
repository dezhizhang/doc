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
db.集合名称.drop()
```
## 增删改查操作
### 文档的插入

###### 单条数据插入
```bash
db.集合名.inset({ "articid" : "10000", "content" : "天气真好" })
```

###### 多条数据插入
```bash
db.集合名.insertMany(
[
    {"articid":"10001", "content":"天气真好1" },
    {"articid":"10002", "content":"天气真好2"}
]);
```
### 文档的查询
###### 查询所有文档的查询
```bash
db.集合名.find()
```
###### 查询单个文档
```bash
db.集合名.findOne({“_id”:"66971f606da08ea6a60473ac"});
```
##### 投影查询只显示articid
```bash
db.集合名.find({"articid":"10000"},{articid:1})
```
### 文档的更新
###### 修改命令
```bash
db.集合名.update(query,update,options)
```
###### 复盖修改数据

```bash
db.集合名.update({"articid":"10000"},{"content":"天气好个狗屁"});
```
###### 局部修改数据
```bash
db.集合名.update({"articid":"10002"},{$set:{"content":"天气好个狗屁"}});
```
###### 局部自动增长数据
```bash
db.集合名.update({"articid":"10002"},{$inc:{count:NumberInt(1)}});
```
### 文档的删除
###### 删除单条数据
```bash
db.集合名.remove({"articid":"10002"})；
```
###### 批量删除数据
```bash
db.集合名.remove({});
```

<!-- [last](https://www.bilibili.com/video/BV1bJ411x7mq?p=7&vd_source=10257e657caa8b54111087a9329462e8) -->
