# docker


## docker 安装

1. ##### yum 安装 gcc 相关

```bash
yum -y install gcc
yum -y install gcc-c++
```

2. ##### 安装需要的软件包

```bash
yum install -y yum-utils
```

3. ##### 设置stable镜像仓库

```bash
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

```

4. ##### 更新 yum 软件包索引

```bash
yum makecache fast
```

5. ##### 安装docker-ce

```bash

yum install docker-ce docker-ce-cli containerd.io

```

6. ##### 启动docker

```bash
systemctl start docker
systemctl stop docker
```

7. ##### 测试docker

```bash
docker version
docker run hello-world
```
8. ##### 自载docker
```bash
systemctl stop docker
sudo yum remove docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

## 配置阿里云境像

1. ##### 境像加速地址
```bash
https://cr.console.aliyun.com/cn-shenzhen/instances/mirrors
```

2. #####  配置镜像加速器

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://ikzlvx21.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

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

```bash
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

### Dockerfie 构建境像

1. 构建镜像

```bash
docker build -t 新镜像名字:tag .
```

2. 运行境像

```bash
docker run -it 新境像名字:tag
```

3. 查看本书所有虚悬镜像

```bash
docker images ls -f dangling=true
```

4. 删除所有虚悬镜像

```bash
docker image prune
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

<!-- # 下载路径是【/usr/local/bin/】下载完之后可以看下【/usr/local/bin】这个目录有没有【docker-compose】文件
curl -L https://get.daocloud.io/docker/compose/releases/download/1.29.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose -->

```

```

### 安装 portainer

```
docker run -d -p 8000:8000 -p 9000:9000 --name protainer --restart=always -v/var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```
<!-- 

docker login --username=3142922546@qq.com registry.cn-guangzhou.aliyuncs.com



docker run --name one-api -d --restart always -p 8092:8092 -e SQL_DSN="root:123456@tcp(localhost:3306)/oneapi"  -->


<!-- 
external_url 'http://gitlab.xiaozhi.sho'


docker run --detach \
  --hostname gitlab.xiaozhi.sho \
  --publish 443:443 --publish 80:80 \
  --name gitlab \
  --restart always \
  --volume /srv/gitlab/config:/etc/gitlab \
  --volume /srv/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest -->

### 地址：[docker](https://www.bilibili.com/video/BV1gr4y1U7CY?p=1&vd_source=e38cd951f2ee7bda48ec574f4e9ba363)

