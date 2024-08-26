# git

| 项目     | 地址                                                                       |
| :------- | :------------------------------------------------------------------------- |
| 晓智科技 | [晓智科技](https://xiaozhi.shop)                                           |
| 晓智文档 | [晓智文档](https://doc.xiaozhi.shop/backend/algorithm)                     |
| 源码地址 | [源码地址](https://github.com/dezhizhang/java-awesome/tree/main/algorithm) |
| 文档源码 | [文档源码](https://github.com/dezhizhang/doc)                              |

### 介绍

1. ##### 基本简介

- git（读音为/gɪt/）是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。 [1]也是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

### 安装

1. ##### Linux 上安装 git

- 如果你碰巧用 Debian 或 Ubuntu Linux，通过一条 sudo apt-get install git 就可以直接完成 Git 的安装，非常简单。 -老一点的 Debian 或 Ubuntu Linux，要把命令改为 sudo apt-get install git-core，因为以前有个软件也叫 GIT（GNU Interactive Tools），结果 Git 就只能叫 git-core 了。由于 Git 名气实在太大，后来就把 GNU Interactive Tools 改成 gnuit，git-core 正式改为 git。
- 如果是其他 Linux 版本，可以直接通过源码安装。先从 Git 官网下载源码，然后解压，依次输入：./config，make，sudo make install 这几个命令安装就好了。

```bash
sudo apt-get install git
```

2. ##### Mac OS X 上安装 Git

- 如果你正在使用 Mac 做开发，有两种安装 Git 的方法,是安装 homebrew，然后通过 homebrew 安装 Git：

```bash
brew install git
```

- 第二种方法更简单，就是直接从 AppStore 安装 Xcode，Xcode 集成了 Git，不过默认没有安装，你需要运行 Xcode，选择菜单“Xcode”->“Preferences”，在弹出窗口中找到“Downloads”，选择“Command Line Tools”，“Install”就可以完成安装了。

![mac](../../public/git/mac.png)

3. ##### 在 Windows 上安装 Git

- 在 Windows 上使用 Git，可以从 Git 官网直接下载安装程序，然后按默认选项安装即可。
- 安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，就说明 Git 安装成功！

![windows](../../public/git/windows.png)

- 安装完成后，还需要最后一步设置，在命令行输入：

```bash
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

### 常用命令

1. ##### 设置用户签名

- 签名的作用是区分不同操作者身份。用户的签名信息在每一个版本的提交信息中能够看 到，以此确认本次提交是谁做的。Git 首次安装必须设置一下用户签名，否则无法提交代码。

```bash
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

2. ##### 初始化本地库

- 要在本地初始化一个 git 库，运行命令 git init，这将在当前目录创建一个空的 git 库。

```bash
git init
```

3. ##### 查看本地库状态

```bash
git status
```

4. ##### 添加暂存区

- 命令用于将文件从工作目录添加到暂存区（Staging Area），这是提交文件更改到 Git 仓库之前的中间步骤。通过使用 git add，你可以选择性地或者批量地准备文件，以便在下一次提交时包含它们。以下是几种常见的使用场景和语法：

```bash
git add .
```

5. ##### 提交本地库

- 提交是指将你的代码保存到 Git 本地存储库，就像用 Word 写长篇论文时进行保存文件一样。每次 Git 提交时都会创建一个唯一的版本，除了记录本次新增或发生修改的代码外，还可以包含提交信息，来概括自己这次提交的改动内容。

```bash
git commit -m 'feat: 提交'
```

###

<div align="center"><a href="https://xiaozhi.shop">贵州晓智信息科技公众号</a></div>
<div align="center"> <img src="https://cdn.xiaozhi.shop/xiaozhi/public/picture/weixinpub.png" width = 300 height = 300 /> </div>
