# 深入理解 Git 一个开发者的必备工具

- 在现代软件开发中，版本控制系统扮演着至关重要的角色。其中，Git 是最流行的选择之一。无论你是新手还是有经验的开发者，了解 Git 的基本概念和使用方法都能大大提升你的工作效率。

### 什么是 Git？

- Git 是一个分布式版本控制系统，旨在高效地处理从小型到大型的项目。与传统的版本控制系统不同，Git 允许每个开发者在本地拥有一个完整的版本库，这使得协作和分支管理变得更加灵活。

### Git 安装指南

1. ##### Windows

- 下载： 前往 Git for Windows 网站，下载最新的安装程序。
- 安装： 运行下载的安装程序，按照向导进行操作。推荐使用默认选项。
- 验证安装： 打开命令提示符（cmd）或 PowerShell，输入以下命令：

```bash
git --version
```

2. ##### macOS

- 使用 Homebrew： 如果你已安装 Homebrew，可以通过以下命令安装 Git：

```bash
brew install git
```

- 验证安装： 打开终端，输入：

```bash
git --version
```

3. ##### Linux

- Debian/Ubuntu：

```
sudo apt update
sudo apt install git
```

- CentOS/Fedora：

```bash
sudo dnf install git  # Fedora
sudo yum install git  # CentOS
```

- 验证安装： 打开终端，输入：

```bash
git --version
```

4. ##### 如用户名和邮箱：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

### git 常用命令

1. ##### 创建新仓库

```bash
git init
```

2. ##### 克隆远程仓库

```bash
git clone 仓库地址
```

3. ##### 查看当前状态

```bash
git status
```

4. ##### 查看变更（未暂存和已暂存）：

```bash
git diff           # 未暂存的变更
git diff --cached  # 已暂存的变更
```

5. ##### 添加文件到暂存区

```bash
git add 文件名
git add .          # 添加所有变更
```

6. ##### 提交变更

```bash
git commit -m "提交信息"
```

7. ##### 查看所有分支

```bash
git branch
```

8. ##### 创建新分支

```bash
git branch 新分支名
```

9. ##### 切换分支

```bash
git checkout 分支名
```

10. ##### 切换分支

```bash
git merge 分支名
```

11. ##### 删除分支

```bash
git branch -d 分支名
```

12. ##### 添加远程仓库

```bash
git remote add origin 仓库地址
```

13. ##### 推送到远程仓库

```bash
git push origin 分支名
```

14. ##### 拉取远程变更

```bash
git pull
```

15. ##### 查看提交历史

```bash
git log
```

16. ##### 查看简洁历史

```bash
git log --oneline
```

17. ##### 重置当前分支的 HEAD 到某个提交

```bash
git reset --hard 提交哈希
```

18. ##### 解决合并冲突后继续合并

```bash
git merge --continue
```

### git 高级命令

1. ##### 交互式暂存

- 使用 git add -p，你可以逐块选择需要暂存的改动，使提交更精确

```bash
git add -p
```

2. ##### 创建标签

```bash
git tag -a 标签名 -m "说明"
```

3. ##### 查看标签

```bash
git tag
```

4. ##### 删除标签

```bash
git tag -d 标签名
```

[last](https://www.bilibili.com/video/BV1MU4y1Y7h5/?p=5&spm_id_from=pageDriver&vd_source=10257e657caa8b54111087a9329462e8)

<div align="center"><a href="https://xiaozhi.shop">贵州晓智信息科技公众号</a></div>
<div align="center"> <img src="https://cdn.xiaozhi.shop/xiaozhi/public/picture/weixinpub.png" width = 300 height = 300 /> </div>
