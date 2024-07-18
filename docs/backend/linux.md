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
##### mv移动文件目录
```bash
mv /home/bbb/* /home/aaa 
```
##### mv同目录重命名
```bash
mv hello2.txt hello.java
```
##### cat 查看文件内容 n显示行号
```bash
cat -n /etc/profile | more
```
##### less 动态查看文件 n 向下查找 N向上查找 q离开
```bash
less /etc/profile
```
##### echo 输入环境变量 如$PATH,$HOSTNAME
```bash
echo $HOSTNAME 
echo 'hello world'
```
##### head 显示文件开头内容，默认显示前10行

```bash
head /etc/profile
```
##### tail 输出文件尾部内容，默认显示尾10行

```bash
tail -n 10 /etc/profile
```

##### tail -f ‘文件路径’ 实时监控文件
```bash
tail -f /home/mydata.txt 
```
##### echo > 复盖写入
```bash
echo "hello world" > /home/mydata.txt
```
##### echo >> 追加写入
```bash
echo "hello world" >> /home/mydata.txt
cal >> /home/mycal.txt
```
##### 创建软连接 ln
```bash
ln -s /root/ /home/myroot
```
##### 删除软连接 ln
```bash
rm -f /home/myroot
```
##### history 查看已执行的历史命令

```bash
history
history 10 查看最近10条指令
history 5 
```
##### !历史编号 执行之前执行的命令
```bash
!1024
```
## 时间日期类

##### 显示当前时间
```bash
date                      #显示当前时间
date "+%Y"                #显示当前年份
date "+%m"                #显示当前月份
date "+%d"                #显示当前那一天
date "+%Y %m %d %H:%M:%S" #显示当前年月日时分秒
```
##### 显示当前日历
```bash
cal
```
## 搜索查找类

##### find -name 按名字进行查找

```bash
find /home -name hello.txt
```

##### find -user 按文件拥有者进行查找

```bash
find /opt -user root
```
##### find -size 按文件大小进行查找

```bash
find /etc/nginx -size 1k
```
##### which 查看指令存放目录

```bash
which find
```

##### grep 过虑查找内容，n行号，j忽略大小写

```bash
cat /home/hello.txt | grep -n "yes"
```
## 压缩和解压类

##### gzip用于压缩文件
```bash
gzip /home/hello.txt
```
##### gunzip用于解压文件
```bash
gunzip /home/hello.txt.gz
```
##### zip压缩成zip文件

```bash
zip -r myhome.zip /home/*
```
##### unzip解压zip文件

```bash
unzip  myhome.zip 
```
##### tar -zcvf 将文件打包成.tar.gz包

```bash
tar -zcvf pc.tar.gz /home/pig.txt /home/cat.txt
```

##### tar -zxvf -C 文件解压到指定目录
```bash
tar -zxvf /home/pc.tar.gz -C /home/temp 
```
## 组管理和权限管理

##### 查看文件的所有者

```bash
ls -ahl
```
##### 修改文件所有者
```bash
chown tom(用户名)  info.txt(文件名)
```
##### 修改文件所在组
```bash
chgrp fruit orange.txt
```
##### 修改用户所在组
```bash
usermod -g wudang(组名) zwj(用户名)
```
##### 修改文件/目录所在组

```bash
chgrp newgroup 文件/目录
chgrp shaolin /home/abc.txt
chgrp -R shaolin /home/test
```
## 任务调度

##### 开启任务调度
```bash
crontab -e 
```
##### 列出当前有那些任务调度
```bash
crontab - l
```
##### 终止任务调度
```bash
crontab -r 
```
##### atq查看任务队列
```bash
atq
```
##### 删除务队列
```bash
atrm 1(任务编号)
```
## 磁盘分区

##### 查看磁盘分区
```bash
lsblk -f 
```
##### 查看磁盘使用情况
```bash
df -h
```
##### 查看目录下磁盘使用情况
```bash
du -ha --max-depth=1 /opt(目录)
```
##### 统计文件夹下文件
```bash
ls -l /home | grep "^-"(-表示文件);
```
##### 统计文件夹下文件个数

```bash
ls -l /home | grep "^-" | wc -l
```
##### 统计文件夹个数
```bash
ls -l /home | grep "^d" | wc -l
```
##### tree树状显示文件
```bash
tree /home(目录名)
```
## 进程管理

##### 查看运行进程
```bash
ps -aux
```

##### 查看mysql
```bash
ps -aux | grep mysql
```
##### 终止进程
```bash
kill -9 (进程id) 
```
##### 查看运行的终端
```bash
ps -aux | grep bash
```
##### 查看进程树进程号
```bash
pstree -p 
```
##### 查看进程树用户
```bash
pstree -u
```

<!-- [47-51] -->

<!-- [last](https://www.bilibili.com/video/BV1Sv411r7vd?p=44&spm_id_from=pageDriver&vd_source=10257e657caa8b54111087a9329462e8) -->




