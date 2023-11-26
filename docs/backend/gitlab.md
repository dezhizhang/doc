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
external_url 'http://your-domain.com'

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
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume /srv/gitlab/config:/etc/gitlab \
  --volume /srv/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest
```
