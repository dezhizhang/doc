### Linux 下安装 mongodb

1. 在/etc/yum.repos.d/下创建 mongodb-org-4.2.repo

```bash
touch mongodb-org-4.2.repo
```

2. vim 写入 下面文件

```bash
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
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