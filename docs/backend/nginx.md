# nginx 

# 背景介绍
-  Nginx（“engine x”）一个具有高性能的【HTTP】和【反向代理】的【WEB服务器】，同时也是一个【POP3/SMTP/IMAP代理服务器】，是由伊戈尔·赛索耶夫(俄罗斯人)使用C语言编写的，Nginx的第一个版本是2004年10月4号发布0.1.0版本。另外值得一提的是伊戈尔·赛索耶夫将Nginx的源码进行了开源，这也为Nginx的发展提供了良好的保障。


### 反向代理


### nginx 常用命令
1. 查看nginx 版本号

```bash
nginx -v 
```
2. 启动nginx 
```
nginx -s start
```
3. 关闭nginx
```bash
nginx -s stop
```
4. 重新加载
```bash
nginx -s reload
```

5. 查看nginx进程
```bash
ps -ef | grep nginx     
```

6. 通过信号量关闭nginx
```bash
kill -TERM 进程id
```

### http块

1. 自定义MIME-TYPE

```bash
include       /etc/nginx/mime.types;
default_type  application/octet-stream;
```
2. default_type的MIME类型
```
                       
```
3. 自定义服务日志
```

```
4. 配置防盗链
```bash
location /image/ {
    valid_referers blocked www.baidu.com;
    if ($invalid_referer) {
        return 403;
    }
    alias /home/image/;
    index img.jpg;
}
```
5. rewrite if条件

```bash
location /testif {
    set $username 'Rose';
    default_type text/plain;
    # args 方法
    if ($args) {
        return 200 success;
    }
    # 参数形式
    if ($request_method = POST) {
        return 405;
    }
    
    # 正则表达式形式
    if ($http_user_agent ~ Safari) {
        return 200 Chrome;
    }

    # 判断文件是否存在
    if (!-f $request_filename) {
        return 200 '<h1>文件不存在</h1>';
    }

    return 200 error;
}
```

6. rewrite break 条件

```bash
location /textbreak {
    default_type text/plain;
    set $username TOM;

    if ($args) {
        set $username jerry;
        break;
        set $username rose;
    }

    add_header username $username;
    return 200 $username;
}
```
7. testreturn 返回
```bash
location /testreturn {
    default_type application/json;
    #return 200 '{"name":"hello world"}';
    return https://www.baidu.com;
}
```
8. rewrite 重写路由
```bash
location /rewrite {
    rewrite ^/rewrite/url\w*$ https://www.baidu.com;
    rewrite ^/rewrite/(test)\w*$ /$1 break;
    rewrite ^/rewrite/(demo)\w*$ /$1 break;

}
location /test {
    default_type text/plain;
    return 200 'text_success';

}
```
9. 负载均衡轮询

```bash
upstream backend {
  server 8.134.182.122:3000;
  server 8.134.182.122:8082;
}

location / {
    proxy_pass http://backend;
    #try_files $uri $uri/ /index.html;
}

```
10. 负载均衡最少连接
```bash
upstream backend {
  least_conn;
  server 8.134.182.122:3000;
  server 8.134.182.122:8082;
}

location / {
    proxy_pass http://backend;
    #try_files $uri $uri/ /index.html;
}
```
11. 负载均衡权重
```bash
upstream backend {
  server 8.134.182.122:3000 weight=10;
  server 8.134.182.122:8082 weight=1;
}

location / {
    proxy_pass http://backend;
    #try_files $uri $uri/ /index.html;
}
```

[last](https://www.bilibili.com/video/BV1ov41187bq/?p=55&spm_id_from=pageDriver&vd_source=10257e657caa8b54111087a9329462e8)
