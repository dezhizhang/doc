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


[last](https://www.bilibili.com/video/BV1ov41187bq?p=32&spm_id_from=pageDriver&vd_source=10257e657caa8b54111087a9329462e8)
