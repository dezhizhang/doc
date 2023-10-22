# docker 文档

### 进行容器

```
docker exec --it 容器id /bin/bash
```

### 安装 tomcat

```
docker pull tomcat
```

### 运行 tomcat

```
docker run -d -p 8080:8080 --name t1 tomcat
```

### 安装 mysql

```
docker search mysql # 查看是否有

docker pull mysq  # 下载境像

docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql # 启动mysql
```

### 安装 redis

```
docker search redis

docker pull redis

docker run  -p 6379:6379 --name redis --privileged=true -v /app/redis/redis.conf:/etc/redis/redis.conf -v /app/redis/data:/data  -d redis redis-server /etc/redis/redis.conf #和缩主机关联

docker ps -a # 列出所有容器

docker start 容器id # 运行容器
```
