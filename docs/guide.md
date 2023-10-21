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
