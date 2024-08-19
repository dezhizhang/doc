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

### server_name 匹配规则

1. ##### 匹配优先级

- 精确区配 > 前通配符匹配 > 后通配符匹配 > 正则表过式匹配 > 默认匹配

2. ##### 精确匹配

```bash
server
{
    listen 80;
    server_name www.xiaozhi.shop m.xiaozhi.shop doc.xiaozhi.shop;
    ...
}
```

3. ##### 通配符匹配

```bash
server
{
    listen 80;
    server_name *.xiaozhi.shop;
    ...
}
```

4. ##### 正则表达式匹配

```bash
server
{
    listen 80;
    server_name ~^www\.(\w+)\.shop;
    ....
}
```

### location 匹配规则

1. ##### 不带任何符号,以指定模式开始

```bash
location /abc {
    default_type text/plain;
    return 200 "success";

}
```

2. ##### 精确模式匹配（=）

```bash
location =/abc {
    default_type text/plain;
    return 200 "success";

}
```

3. ##### 区分大小写正则表达式匹配（~）

```bash
location ~/abc\w$ {
    default_type text/plain;
    return 200 "success";
}
```

4. ##### 不区分大小写正则表达式匹配（~\*）

```bash
location ~*^/abc\w$ {
    default_type text/plain;
    return 200 "success";
}
```

5. ##### 停止向后搜索模式(^~)

```bash
location ^~/abcd {
    default_type text/plain;
    return 200 "abcd success";
}
```

### 请求资源目录 root/alias

- root 的处理结果是： root 路径+location 路径
- alias 的处理结果：使用 alias 路径替换 location 路径
- alias 目一个目录别名的定义,root 则是最上层目录的含义
- 如果 location 路径以'/'结尾，则 alias 也必须以'/'结尾，root 没有要求

1. ##### root 为 root 路径+location 路径

```bash
location /images {
    root /mnt/html;
}
```

2. ##### alias 为 alias 路径替换 location 路径

```bash
location /images {
    alias /mnt/html/images;
}
```

### index 加载静态资源

1. ##### 可以跟多个请求资源，依次查找，找到第一个为止

```bash
location /images {
    root /mnt/html;
    index index.html 1.png;
}
```

### error_page 错误访问页面

1. ##### 可以指定具体跳转的地址

```bash
server{
    error_page 404 https://xiaozhi.shop;
}
```

2. ##### 可以指定重定向地址

```bash
server{
        error_page 404 500 502 503 504 /50x.html;
    location /50x.html{
        root /mnt/html;
    }
}
```

### 静态资源优化

- 请求静态资源的过程：客户端通过网络接口向服务端发送请求，操作系统将这些客户端的请求传递给服务器端应用程序，服务器端应用程序会处理这些请求，请求处理完成以后，操作系统还需要将处理得到的结果通过网络适配器传递回去。

```bash
sendfile on;
tcp_nopush on;
```

### gip 压缩配置

```bash
http {
    gzip on; # 是否开启压缩
    gzip_vary on; # gip压缩时是否携带头信息
    gzip_proxied any; # 对服务端返回结时进行gip压缩
    gzip_comp_level 6; # 压缩级别
    gzip_disable "Mozilla/*"; # 选择情的开启或开闭gip压缩
    gzip_buffers 16 8k; # 缓存空间大小
    gzip_http_version 1.1; # 选择压缩最低版本
    gzip_min_length 20; # 传输数据的大小
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### 静态资源缓存

1. ##### 缓存流程图
![静态资源缓存](../../public/nginx/cache.png)

2. ##### 配置代码

```bash
server{
    location ~.*\.(html|js|css|png)$ {
        expires 1000;
        add_header Cache-Control no-store;
        root /mnt/html;
    }
}
```

### 跨域问题

1. ##### 基本介绍

- 同源策略是一种约定，由 Netscape 公司 1995 年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到 XSS、CSFR 等攻击。所谓同源是指"协议+域名+端口"三者相同， 即便两个不同的域名指向同一个 ip 地址，也非同源。

2. ##### 配置代码

```bash
location /api/v1 {
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE;
    default_type application/json;
    return 200 '{"id":1,"name":"tom"}';
}
```

### 防盗链实现

1. ##### 基本介绍

- Referer 是 Header 的一部分，当浏览器向 Web 服务器发送请求的时候，一般会带上 Referer，告诉服务器该请求是从哪个页面链接过来的，服务器就可以禁止或允许某些来源的网站访问资源。
- 如果直接在浏览器直接打开文件链接https://examplebucket-1250000000.cos.ap-guangzhou.myqcloud.com/1.jpg，请求 Header 里不会带有 Referer。

2. ##### 配置代码

```bash
location ~.*\.(jpeg|jpg|png)$ {
    valid_referers no backed www.xiaozhi.shop;
    if ($invalid_referer) {
            return 403;
    }
    root /mnt/html;
}
```

### rewrite 重写url

1. ##### 基本介绍

- 在实际工作中往往会遇到很多跳转（重写 URL）的需求。比如：更换域名后需要保持旧的域名能够跳转到新的域名上、某网页发生改变需要跳转到新的页面、网站防盗链等等需求，使用 nginx 跳转效率会更高

2. ##### set 指令

```bash
location /write {
    set $name tom;
    set $age 18;
    default_type application/json;
    return 200 '{"name":$name,"age":$age}';
}
```

3. ##### if 指令

```bash
location /testif {
    default_type text/plain;
    set $username 'hello';
    if ($username) {
        return 200 $username;
    }
    return 200 'username is empty';
}
```

4. ##### break 指令

```bash
location /testbreak{
    default_type text/plain;
    set $username tom;
    if ($args) {
        set $username jeray;
        break;
        set $username rose;
    }
    add_header username $username;
    return 200 $username;
}
```

4. ##### return 指令

- 该指令用于完成对请求的处理，直接向客户端返回，在 return 后的所有 nginx 配置都是无效的。

```bash
location /testreturn {
    default_type application/json;
    return  200 '{"name":"tom","age":20}';
}
```

5. ##### rewrite 指令

- 该指令通过正则表过式的使用来改变 URI，可以同时存在一外或多个指令，按照顺序依次对 URL 进行匹配和处理

```bash
location /rewrite {
    rewrite ^/rewrite/url\w*$ https://www.baidu.com;
    rewrite ^/rewrite/(test)\w*$ /$1;
    rewrite ^/rewrite/(demo)\w*$ /$1;
}

location /test {
    default_type text/plain;
    return 200 'test success';
}

location /demo {
    default_type text/plain;
    return 200 'demo success';
}
```

5. ##### rewrite_log 指令

- 该指令配置是否开启 URL 重写日志输出功能

```bash
rewrite_log on;
error_log /var/log/nginx/error.log notice;
```

6. ##### 防盗链

- 盗链，用通俗易懂的话来说，就是别人未经您的允许，在他们的网站上直接链接到您网站的资源，让访问他们网站的用户可以直接获取您的资源。比如，您的网站上有一张精美的图片，另一个网站通过"您网站上图片的链接"这样的方式把您的图片展示在他们的页面上，这就是盗链。

```bash
location / {
    root /mnt;
    valid_referers none blocked *.xiaozhi.shop;
    if ($invalid_referer) {
        return 403;
    }
}
```

<!-- https://www.bilibili.com/video/BV1ov41187bq?p=50&spm_id_from=pageDriver&vd_source=10257e657caa8b54111087a9329462e8 -->
