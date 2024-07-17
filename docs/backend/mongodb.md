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



<!-- [last](https://www.bilibili.com/video/BV1bJ411x7mq?p=7&vd_source=10257e657caa8b54111087a9329462e8) -->
