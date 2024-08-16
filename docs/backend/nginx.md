# nginx

| 项目     | 地址                                                                       |
| :------- | :------------------------------------------------------------------------- |
| 晓智科技 | [晓智科技](https://xiaozhi.shop)                                           |
| 晓智文档 | [晓智文档](https://doc.xiaozhi.shop/backend/algorithm)                     |
| 源码地址 | [源码地址](https://github.com/dezhizhang/java-awesome/tree/main/algorithm) |
| 文档源码 | [文档源码](https://github.com/dezhizhang/doc)                              |

### yum 安装 nginx

1. ##### 安装 yum-utils

```bash
sudo yum  install -y yum-utils
```

2. ##### 添加 yum 源文件

```bash
# 新建文件
vim /etc/yum.repos.d/nginx.repo
# 添加文件源
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```

3. ##### 使用 yum 进行安装

```bash
yum install -y nginx
```

4. ##### 查看是否安装成功

```bash
yum list | grep nginx
```

5. ##### 查看 nginx 的安装位置

```bash
whereis nginx
```

6. ##### 启动 nginx

```bash
systemctl start nginx
```

7. ##### 查看 nginx 是否启动成功

```
ps -ef | grep nginx
```

### nginx 常用系统命令

1. ##### 启动 nginx

```bash
systemctl start nginx
```

2. ##### 停止 nginx

```bash
systemctl stop nginx
```

3. ##### 重启 nginx

```bash
systemctl restart nginx
```

4. ##### 重新加载配置文件

```bash
systemctl reload nginx
```

5. ##### 查看 nginx 状态

```bash
systemctl status nginx
```

6. ##### 开机启动

```bash
systemctl enable nginx
```

### 目录结构

1. ##### nginx 常用目录

![alt text](../../public/nginx/dir.png)

### 核心配置文件

1. ##### nginx.conf 配置文件

```bash
user www-data;
#master_process on| off #指定是否开启工作进程
worker_processes auto; #设置工作进程个数
daemon off; #是否以守护进程运行
pid /run/nginx.pid; #用来配置nginx进程id存放位置
include /etc/nginx/modules-enabled/\*.conf;

events {
    worker_connections 768; #单个worker进程最大连接数
    multi_accept on; #设置是否允许周时接收多个网络链接
}

http {
    sendfile on; #是否使用sendfile()传输文件，可以大大提高nginx文件传输
    tcp_nopush on; #
    types_hash_max_size 2048;
    # server_tokens off;
    # server_names_hash_bucket_size 64;
    # server_name_in_redirect off;

    keepalive_timeout 75s #用来设置长链接的超时时间
    keepalive_requests 100; #用来设置一个keep-alive连接使用的次数

    include /etc/nginx/mime.types;
    default_type application/octet-stream; #响应浏览器请求默认MIME类型

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
    ssl_prefer_server_ciphers on;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log; #配置错误日志

    gzip on;
}
```

2. ##### 配置返回不同 MIME 类型

```bash
server
{
    listen 80;
    server_name 47.107.101.79;
    index index.html index.htm default.htm default.html;

    location /get_text {
        default_type text/html; #返回html类型
        return 200 "<h1>this is a text</h1>";
    }

    location /get_json {
        default_type application/json; #返回json类型
        return 200 "{'name':'hello'}";
    }
}
```

### nginx 配置到系统变量

1. ##### 修改/etc/profile 文件

```bash
vim /etc/profile
export PATH=$PATH:/usr/sbin;
```

2. ##### 使之立即生效

```bash
source /etc/profile
```

3. ##### 验证是否生效

```bash
nginx -v
```

<!-- https://njavtv.com/cn/my-779-uncensored-leak -->
