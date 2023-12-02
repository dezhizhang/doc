# gitlab


### docker 安装gitlab
1. 安装Docker：
首先，确保您的系统上已经安装了Docker。您可以按照Docker官方文档提供的指南进行安装：https://docs.docker.com/get-docker/

2. 创建GitLab配置文件：
在您的系统上创建一个目录，用于存储GitLab的配置文件。例如，创建一个名为/srv/gitlab/config的目录，并在其中创建一个名为gitlab.rb的配置文件：
```bash
mkdir -p /srv/gitlab/config
vi /srv/gitlab/config/gitlab.rb
```
在配置文件中，您可以根据需要进行配置更改。以下是一个示例配置文件的内容：

```bash
external_url 'http://gitlab.xiaozhi.shop'

```
3. 创建GitLab数据存储目录：
创建一个目录用于存储GitLab的数据。例如，创建一个名为/srv/gitlab/data的目录：
```bash
mkdir -p /srv/gitlab/data
```
4. 运行GitLab容器：
使用以下命令在Docker中运行GitLab容器：
```bash
docker run --detach \
  --hostname your-domain.com \
  --publish 443:443 --publish 80:80 
  --name gitlab \
  --restart always \
  --volume /srv/gitlab/config:/etc/gitlab \
  --volume /srv/gitlab/data:/var/opt/gitlab \
 gitlab/gitlab-ce:15.6.0-ce.0
```

docker run -d  -p 8080:80  a2bf5ef04c22 --privileged=true gitlab/gitlab-ce:14.5.2-ce.0

docker pull gitlab/gitlab-ce:14.5.2-ce.0
5. 查看root密码
```bash
sudo docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password
```

sudo docker exec -it 5c0954f361ca grep 'Password:' /etc/gitlab/initial_root_password

docker run -d --name gitlab-runner 
  --restart always 
  -v /var/run/docker.sock:/var/run/docker.sock 
  gitlab/gitlab-runner:latest



docker exec -it a28542a6c245 /bin/bash



docker run -d --name gitlab-runner --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /path/to/config:/etc/gitlab-runner \
  gitlab/gitlab-runner:latest register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "https://http://gitlab.digit.icu/" \
  --registration-token "T2PsEWj3f7gxNRGVLzGa" \
  --description "My Docker Runner" \
  --tag-list "docker,linux,x86_64"



<!-- docker run --detach \
  --hostname yhttp://gitlab.xiaozhi.shop \
  --publish 443:443 --publish 8080:80
  --volume /srv/gitlab/config:/etc/gitlab \
  --volume /srv/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:14.3.0-ce.0 -->


docker run -d  -p 3000:3000  0178f49bf609 --privileged=true xiaozhicloud/intelligent