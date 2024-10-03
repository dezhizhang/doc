# 深入理解 Git 一个开发者的必备工具

1. ##### 演示地址 [演示地址](https://www.shuqin.cc/market/design-component)
2. ##### 获取更多 [获取更多](https://www.xiaozhi.shop/)


- 在现代软件开发中，版本控制系统扮演着至关重要的角色。其中，Git 是最流行的选择之一。无论你是新手还是有经验的开发者，了解 Git 的基本概念和使用方法都能大大提升你的工作效率。

### 什么是 Git？

- Git 是一个分布式版本控制系统，旨在高效地处理从小型到大型的项目。与传统的版本控制系统不同，Git 允许每个开发者在本地拥有一个完整的版本库，这使得协作和分支管理变得更加灵活。

### git 工作流

- 首先我们的了解 Git 通常的操作流程，网上流行的不错一张图
  ![alt text](https://cdn.xiaozhi.shop/doc/git/work.png)

- 工作区:
  本地项目存放文件的位置,可以理解成图上的 workspace

- 暂存区 (Index/Stage):
  顾名思义就是暂时存放文件的地方，通过是通过 add 命令将工作区的文件添加到缓冲区

- 本地仓库（Repository）
  通常情况下，我们使用 commit 命令可以将暂存区的文件添加到本地仓库,通常而言，HEAD 指针指向的就是 master 分支

- 远程仓库（Remote）

举个例子，当我们使用 GitHub 托管我们项目时，它就是一个远程仓库。通常我们使用 clone 命令将远程仓库代码拷贝下来，本地代码更新后，通过 push 托送给远程仓库。

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

5. ##### 推送标签到远程

```bash
git push origin 标签名
```

6. ##### 推送标签到远程

```bash
git push origin 标签名
```

7. ##### 修补提交

- 如果你需要修改最近的提交，可以使用

```bash
git commit --amend
```

8. ##### 查看具体提交的更改

```bash
git show 提交哈希
```

9. ##### 图形化查看提交历史

```bash
git log --graph --oneline --decorate --all
```

10. ##### 查找文件的历史

```bash
git log -- 文件名
```

11. ##### 解决冲突

- 在合并或变基时发生冲突后，解决冲突后继续操作：

```bash
git add 解决的文件
git rebase --continue  # 或者 git merge --continue
```

12. ##### 添加子模块

- 子模块可以管理依赖于其他 Git 仓库的项目

```bash
git submodule add 仓库地址
```

12. ##### 初始化和更新子模块

```bash
git submodule init
git submodule update
```

13. ##### Cherry-Pick

- Cherry-pick 允许你从其他分支选择特定的提交

```bash
git cherry-pick 提交哈希
```

14. ##### 撤销未暂存的更改

```bash
git checkout -- 文件名
```

15. ##### 撤销已暂存的更改

```bash
git reset HEAD 文件名
```

16. ##### 查看某个文件在不同版本之间的差异

```bash
git diff 提交哈希1 提交哈希2 -- 文件名
```

17. ##### 查看远程信息

```bash
git remote -v
```

18. ##### 添加远程仓库

```bash
git remote add origin 仓库地址
```

19. ##### 推送到远程仓库

```bash
git push origin 分支名
```

20. ##### 推送所有分支到远程

```bash
git push --all origin
```

20. ##### 版本回滚

```bash
git revert 提交哈希
```

### 分支命名规范

![分支命名规范](https://cdn.xiaozhi.shop/doc/git/banch.png)


### 忽略文件 .gitignore

- 这个文件的作用，会去忽略一些不需要纳入 Git 管理这种，我们也不希望出现在未跟踪文件列表,那么我们来看看如何配置该文件信息。

```bash
# 此行为注释 会被Git忽略

# 忽略 node_modules/ 目录下所有的文件
node_modules


# 忽略所有.vscode结尾的文件
.vscode

# 忽略所有.md结尾的文件
*.md

# 但README.md 除外
!README.md

# 会忽略 doc/something.txt 但不会忽略doc/images/arch.txt
doc/*.txt

# 忽略 doc/ 目录下所有扩展名为txt文件

doc/**/*.txt
```

<!-- [last](https://www.bilibili.com/video/BV1MU4y1Y7h5/?p=5&spm_id_from=pageDriver&vd_source=10257e657caa8b54111087a9329462e8) -->

### 联系我们

1. ##### 关注我们

<img src="https://cdn.xiaozhi.shop/digitwin/assets/weixin.jpg" width = 300 height = 300 />

2. ##### 联系作者

<img src="https://cdn.xiaozhi.shop/digitwin/assets/winxin.png" width = 300 height = 300 />
