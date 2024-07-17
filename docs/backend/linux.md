# linux

##### 查看ip
```bash
ifconfig
```
## vi和vim编辑器

#####  设置行号
```bash
:set nu
```
#####  取消设置行号
```bash
:set nonu
```
#####  一搬模式下G定位到未尾
```bash
G
```
#####  一搬模式下gg定位到首行
```bash
gg
```
##### 一搬模式下u撤销
```bash
u
```
#####  一搬模式下定位到某一行
```bash
n shift+g
```
## 关机&重启命令

##### 立刻进行关机
```bash
shutdown -h now
```
#####  1分钟后会关机
```bash
shutdown -h 1
```
#####  正在重新启动计算机
```bash
shutdown -f now
```
#####  现在重新启动计算机
```bash
reboot
```

##### 把内存的数据同步到磁盘
```bash
sync
```

## 用户登录与注销

##### 切换用户
```bash
su - 用户名
```
##### 注销用户

```bash
logout 
```

## 用户管理

##### 添加用户
```bash
useradd 用户名
```

##### 修改密码
```bash
passwd 用户名
```

##### 显示当前用户所在目录
```bash
pwd
```
##### 删除用户保留家目录

```bash
userdel 用户名
```
##### 删除用户及家目录
```bash
userdel -r 用户名
```
##### 查看用户信息
```bash
id 用户名
```
##### 查看当前登录用户
```bash
who am i 
```
## 用户组管理

##### 新增组
```bash
groupadd 组名
```
##### 删除组
```bash
groupdel 组名
```
##### 增加用户并添加对应组
```bash
useradd -g 用户组 用户名
```
##### 修改用户组
```
usermod -g 用户组 用户名
```
## 文件目录类
##### pwd 当前工作目录绝对路径
```bash
pwd
```
##### 返回到根目录
```bash
cd ~
```
##### mkdir创建单级目录
```bash
mkdir /home/dog
```
##### mkdir创建多级目录
```bash
mkdir -p /home/animal/tiger
```
##### rm -rf 删除文件
```bash
rm -rf /home/animal
```
##### 创建空文件
```bash
touch /home/hello.txt
```
##### 拷贝文件到指定目录
```bash
cp /home/hello.txt /home/bbb
```
#### 递归复制整个文件夹

```bash
cp -r /home/bbb/* /home/aa
```
### \cp 强制递归复制整个文件夹
```bash
\cp -r /home/bbb/* /home/aa
```



<!-- [last](https://www.bilibili.com/video/BV1Sv411r7vd?p=28&spm_id_from=pageDriver&vd_source=10257e657caa8b54111087a9329462e8) -->




