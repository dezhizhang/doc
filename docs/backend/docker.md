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
## 容器数据卷

1. ##### 容器数据卷存储
```bash
docker run -it --privileged=true -v /宿主机绝对路径目录:/容器内目录   镜像名
docker run -it --privileged=true -v /home/data:/home/data ubuntu
```
2. ##### 给容器添加读写权限
```bash
docker run -it --privileged=true -v /宿主机绝对路径目录:/容器内目录   镜像名
docker run -it --privileged=true -v /home/data:/home/data:ro ubuntu
```
2. ##### 给容器添加读写权限
```bash
docker run -it --privileged=true -v /宿主机绝对路径目录:/容器内目录   镜像名
docker run -it --privileged=true -v --volumes-form u1 --name=u2 ubuntu
```

3. ##### 查看数据卷是否挂载成功
```bash
dcoker inspect ee7f32630de9(容器id)
```


## 安装常规软件的安装

1. ##### 安装tomcat

```bash
docker search tomcat
docker pull tomcat
docker run -d -p 8080:8080(端口映射) --name t1 tomcat
docker stop t1
docker rmi 容器id
```
2. ##### 安装mysql
```bash
docker search mysql
docker pull mysql:5.7
docker run -d -p 3306:3306 --privileged=true 
-v /var/mysql/log:/var/log/mysql
-v /var/mysql/data:/var/lib/mysql
-v /var/mysql/conf.d:/var/mysql/conf.d 
-e MYSQL_ROOT_PASSWORD=123456
--name mysql:5.7 mysql:5.7
docker exec -it 容器id /bin/bash
mysql -uroot -p
```
2. ##### 安装redis
```bash
docker search redis
docker pull redis
docker run -d -p 6379:6379 --name redis --privileged=true 
-v /app/redis/redis.conf:/etc/redis/redus.conf 
-v /app/redis/data:/data redis redis-server 
/etc/redis/redis.conf
```
## mysql主从复制

1. ##### 启动主数据库
```bash
docker run -p 3307:3306 --name mysql-master \
-v /mydata/mysql-mater/log:/var/log/mysql \
-v /mysql/mysql-mater/data:/var/lib/mysql \
-v /mydata/mysql-mater/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root -d mysql:5.7
```
2. ##### 宿主机新建my.conf
```bash
# 文件路径
# /mydata/mysql-mater/conf
[mysqld]
#设置server_id,同一局域网中需要唯一
server_id=101
# 指定不需要同步的数据库名称
binlog-ignore-db=mysql
# 开启二进制日志功能
log_bin=mall-mysql-bin
# 设置二进制日志使用内存大小
binlog_cache_size=1M
# 设置使用的二进制日志格式
binlog_format=mixed
# 二进制日志清理时间,默认为0表示
expire_logs_days=7
# 跳过主从复制中遇到的所有错误信息
slave_skip_errors=1062
```
3. ##### 重启 mysql-mater
```bash
docker restart mysql-mater(容器id或容器名称)
```
4. ##### 创建数据同步用户
```bash
create user 'slave'@'%' IDENTIFIED BY '123456'
GRANT REPLICATION SLAVE,REPLICATION CLIENT ON *.* TO 'slave'@'%';
```
5. ##### 启动从数据库
```bash
docker run -p 3308:3306 --name mysql-slave \
-v /mydata/mysql-slave/log:/var/log/mysql \
-v /mydata/mysql-slave/data:/var/lib/mydql \
-v /mydata/mysql-slave/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root -d mysql:5.7
```
6. ##### 宿主机新建my.conf
```bash
# /mydata/mysql-slave/conf
[mysqld]
#设置server_id,同一局域网中需要唯一
server_id=102
# 指定不需要同步的数据库名称
binlog-ignore-db=mysql
# 开启二进制日志功能
log_bin=mall-mysql-slave1-bin
# 设置二进制日志使用内存大小
binlog_cache_size=1M
# 设置使用的二进制日志格式
binlog_format=mixed
# 二进制日志清理时间,默认为0表示
expire_logs_days=7
# 跳过主从复制中遇到的所有错误信息
slave_skip_errors=1062
#relay_log配置中继日志
relay_log=mall-mysql-relay-bin
# log_slave_updates表示slave将复制事件写进自已的二进制日志
log_slave_updates=1
# slave设置为只读(具有super权限的用户除外)
read_only=1
```
7. ##### 重启 mysql-slave
```bash
docker restart mysql-slave
```
8. ##### 进行slave数据库
```bash
docker exec -it mysql-slave /bin/bash
```
9. ##### 从服务器上主从复制
```bash
change master to master_host="(主服务器ip)",\
master_user="slave",\
master_password="123456",\
master_port=3307,\
master_log_file="mall-mysql-bin.000001",\
master_log_pos=154,\
master_connect_retry=30;
```
10.  ##### 从服务器查看主从同步状态
```bash
show slave status \G;
```
11. ##### 从服务器开启主从复制
```bash
start slave;
```

## Dockerfie
### 常用保留字指令

1. #####  FROM 当前境像是基于那个镜像的
```bash
FROM
```
2. ##### MAINTAINER 镜像的维护者
```bash
MAINTAINER
```
3. ##### RUN 容器构建时需要运行的命令
```bash
RUM
```
4. ##### EXPOSE 当前容器对外暴露出的端口
```bash
EXPOSE 
```
5. ##### WORKDIR 指定在创建容器后，终端默认登陆的进来工作目录，一个落脚点
```bash
WORKDIR
```
6. ##### USER 指定该镜像以什么样的用户去执行，如果都不指定，默认是root
```bash
USER
```
7. ##### ENV 用来在构建镜像过程中设置环境变量
```bash
ENV
```
8. ##### ADD 将宿主机目录下的文件拷贝进镜像且会自动处理URL和解压tar压缩包
```bash
ADD
```
9. ##### COPY 类似ADD，拷贝文件和目录到镜像中。将从构建上下文目录中 <源路径> 的文件/目录复制到新的一层的镜像内的 <目标路径> 位置
```bash
COPY
```
10. ##### VOLUME 容器数据卷，用于数据保存和持久化工作
```bash
VOLUME
```
11. ##### 指定容器启动后的要干的事情
```bash
CMD
```
12. ##### ENTRYPOINT 也是用来指定一个容器启动时要运行的命令
```bash
 ENTRYPOINT
```

### Dockerfile构建制作镜像

1. #####  编写Dockerfile
```bash
FROM centos:7
MAINTAINER zzyy
ENV MYPATH /usr/local
WORKDIR $MYPATH
#安装vim编辑器
RUN yum -y install vim
#安装ifconfig命令查看网络IP
RUN yum -y install net-tools
#安装java8及lib库
RUN yum -y install glibc.i686
RUN mkdir /usr/local/java
#ADD 是相对路径jar,把jdk-8u171-linux-x64.tar.gz添加到容器中,安装包必须要和Dockerfile文件在同一位置
ADD jdk-8u171-linux-x64.tar.gz /usr/local/java/
#配置java环境变量
ENV JAVA_HOME /usr/local/java/jdk1.8.0_171
ENV JRE_HOME $JAVA_HOME/jre
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib:$CLASSPATH
ENV PATH $JAVA_HOME/bin:$PATH
EXPOSE 80
CMD echo $MYPATH
CMD echo "success--------------ok"
CMD /bin/bash
```
2. #####  构建镜像
```bash
docker build -t 新境像名:Tag .
docker build -t centosjava8:1.5 .
```




￼













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


<!-- ### 地址：[docker](https://www.bilibili.com/video/BV1gr4y1U7CY?p=41&spm_id_from=pageDriver&vd_source=10257e657caa8b54111087a9329462e8)
 -->
