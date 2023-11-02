# docker

### 地址：[docker](https://www.bilibili.com/video/BV1gr4y1U7CY?p=1&vd_source=e38cd951f2ee7bda48ec574f4e9ba363)

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

```bash
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

### Dockerfile 常量

```
FROM        # 基础镜像
RUN         # 容器运行
EXPOSE      # 当前容器对外端口
WORKDIR     # 工作目录
USER        # 指定已什么样用户执行
ENV         # 运行时环境
VOLUME      # 容器卷
COPY        # 将宿主机目录下的文件拷贝进镜像
ADD         # 将宿主机目录下的文件拷贝进镜像且会自动处理URL和解压tar压缩包
CMD         # 指定容后启动后要干的事
ENTRYPOINT  #类型启动动令
```

### Dockerfie构建境像

```bash 
docker build -t 新镜像名字:tag .
```

### docker 网络命令

```
docker network --help          # 获取所命令
docker network connect
docker network rm 网络名称      # 删除网络
docker network inspect 网络名称 # 查看网络信息
```




### 在 Linux 上安装 Docker Compose
步骤 1: 下载 Docker Compose
1. 使用 curl 命令下载 Docker Compose 的最新稳定版本
```bash
使用 curl 命令下载 Docker Compose 的最新稳定版本
```



```

```

### 安装 portainer

```
docker run -d -p 8000:8000 -p 9000:9000 --name protainer --restart=always -v/var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```
