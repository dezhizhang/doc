# docker


## docker 安装
[阿里云境像服务登录不上]（https://juejin.cn/post/6954645387542003726）

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
  "registry-mirrors": ["https://sjflvx12.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## docker常用命令

### 帮助启动类命令
1. ##### 启动docker
```bash
systemctl start docker 
```
2. ##### 停止docker
```bash
systemctl stop docker 
```
3. ##### 重启docker
```bash
systemctl restart docker 
```
4. ##### 查看docker状态
```bash
systemctl status docker 
```
5. ##### 开机启动docker
```bash
systemctl enable docker 
```
6. ##### 查看docker信息
```bash
docker info
```
7. ##### 查看所有命令帮助
```bash
docker --help
```
8. ##### 查看某个命令帮助
```bash
docker image --help 
```

### 镜像命令
1. ##### 列出本地所有境像(含历史境像)
```bash
docker images -a 
```
2. ##### 只显示境像id
```bash
docker images -q
```
3. ##### 查询某个境像
```bash
docker search mysql(境像名称)
```
4. ##### 查询前n个个境像
```bash
docker search --limit 5 mysql(境像名称)
```

5. ##### 拉取某个境像
```bash
docker pull mysql:latest(境像名称)
```
6. ##### 拉取某个版本号
```bash
docker pull mysql:6.0.8 (境像名称:[tag])
```
7. ##### 查看境像容器所占的空间
```bash
docker system df 
```
8. ##### 强制删除某个容器
```bash
docker rmi -f feb5d9fea6a5(Image ID)
```
9. ##### 删除所有容器
```bash
docker rmi -f $(docker images -qa)
```

### 容器命令

1. ##### 使用交互式启动境像,  -i：交互式, -t:终端
```bash
docker run -it ubuntu(境像名称) /bin/bash
```
2. ##### 以名字启动交互式境像, -it:交互式,--name:境像名称
```bash
docker run -it --name=myubuntu ubuntu(境像名称) /bin/bash
```
3. ##### 后台守护进程运行
```bash
docker run -d redis:6.0.8(容器名)
```
4. ##### 查看容器日志
```bash
docker logs 3b5d312e445d(容器id)
```
5. ##### 查看容器内运行进程
```bash
docker top 3b5d312e445d(容器id)
```
6. ##### 查看容器内部细节
```bash
docker inspect 3b5d312e445d(容器id)
```
7. ##### 进入正在运行的容器并以命令行交互
```bash
docker exec -it 3b5d312e445d(容器id) /bin/bash
docker attach -it 3b5d312e445d(容器id) /bin/bash
```
7. ##### 容器内文件烤贝到主机上
```bash
docker cp  docker cp d49bf82c61ee:/home/aaa.txt(容器id:容器路径) /home
```
8. ##### 容器导出为tar包
```bash
docker export d49bf82c61ee(容器id) >  ubuntu.tar
```
9. ##### tar导入为容器
```bash
cat ubuntu.tar | docker import - ubuntu 
```
10. ##### apt下载软件包
```bash
apt-get update
apt-get -y install vim
```
11. ##### docker commit 
```bash
docker commit -m 'vim cmd add ok' -a='zhangdezhi' 199cf9ead58b(容器id) xiaozhi/ubuntu:1.3
```
12. ##### 登录阿里云Docker Registry
```bash
docker login --username=31429*****@qq.com registry.cn-shenzhen.aliyuncs.com
```
13. ##### 从Registry中拉取镜像
```bash
docker pull registry.cn-shenzhen.aliyuncs.com/xiaozhicloud/myubuntu1.3:[镜像版本号]
```
14. ##### 将镜像推送到Registry
```bash
$ docker push registry.cn-shenzhen.aliyuncs.com/xiaozhicloud/myubuntu1.3:[镜像版本号]
```

15. ##### 列出当前所有正在运行的容器
```bash
docker ps 
```

16. ##### 列出当前所有正在运行的容器+历史运行过的
```bash
 docker ps -a 
```
17. ##### 显示最近创建的容器
```bash
docker ps -l
```
18. ##### 只显示容器编号
```bash
docker ps -q
```
19. ##### run进容器 exit退出, 容器停止
```bash
exit
```
20. ##### run进容器 ctrl+p+q退出, 容器不停止
```bash
ctrl+p+q
```
21. ##### 启动已停止的容器
```bash
docker start 6f7f870398f2(容器id或容器名称)
```
22. ##### 重启容器
```bash
docker restart 6f7f870398f2(容器id或容器名称)
```
23. ##### 停止容器
```bash
docker stop 6f7f870398f2(容器id或容器名称)
```
24. ##### 强制停止容器
```bash
docker kill 6f7f870398f2(容器id或容器名称)
```
25. ##### 删除停止容器
```bash
docker rm 6f7f870398f2(容器id或容器名称)
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


### 地址：[docker](https://www.bilibili.com/video/BV1gr4y1U7CY?p=1&vd_source=e38cd951f2ee7bda48ec574f4e9ba363)

