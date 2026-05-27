# Shell与命令行

## 概念解释

Shell是用户和操作系统内核之间的接口。你输入命令，Shell帮你执行。

你可以把Shell想象成**翻译官**：
- 你说人话（命令）
- Shell翻译成机器能懂的语言
- 机器执行后，Shell把结果翻译回来

## 为什么重要

- **效率**：命令行操作比图形界面更快
- **自动化**：可以编写脚本自动执行任务
- **远程管理**：服务器通常只有命令行
- **强大功能**：可以完成图形界面做不到的事情

## 常见Shell

| Shell | 特点 |
|-------|------|
| bash | 最常用，Linux默认 |
| zsh | 功能更强，macOS默认 |
| fish | 用户友好，自动补全 |
| sh | 最基础的Shell |
| PowerShell | Windows的Shell |

## 基础命令

### 文件操作

```bash
# 列出文件
ls
ls -la  # 详细信息，包含隐藏文件

# 切换目录
cd /path/to/dir
cd ..  # 返回上级
cd ~   # 返回家目录

# 创建目录
mkdir dirname

# 创建文件
touch filename

# 复制
cp source dest
cp -r dir1 dir2  # 复制目录

# 移动/重命名
mv source dest

# 删除
rm filename
rm -rf dirname  # 强制删除目录

# 查看文件内容
cat filename
less filename  # 分页查看
head -n 10 filename  # 前10行
tail -n 10 filename  # 后10行
```

### 文本处理

```bash
# 搜索文本
grep "pattern" filename
grep -r "pattern" dir  # 递归搜索

# 排序
sort filename

# 去重
uniq filename

# 统计行数
wc -l filename

# 截取列
cut -d: -f1 /etc/passwd
```

### 管道和重定向

```bash
# 管道：将一个命令的输出作为另一个命令的输入
ls | grep ".txt"

# 输出重定向
echo "hello" > file.txt  # 覆盖
echo "world" >> file.txt  # 追加

# 输入重定向
sort < file.txt

# 错误重定向
command 2> error.log
command > output.log 2>&1  # 合并
```

### 权限管理

```bash
# 查看权限
ls -la

# 修改权限
chmod 755 file
chmod +x script.sh

# 修改所有者
chown user:group file
```

### 进程管理

```bash
# 查看进程
ps aux
top

# 终止进程
kill PID
kill -9 PID  # 强制终止

# 后台运行
command &

# 查看后台任务
jobs
```

## Shell脚本

### 基本语法

```bash
#!/bin/bash

# 变量
name="World"
echo "Hello, $name"

# 条件
if [ $age -gt 18 ]; then
    echo "成年"
else
    echo "未成年"
fi

# 循环
for i in 1 2 3 4 5; do
    echo $i
done

# 函数
greet() {
    echo "Hello, $1"
}
greet "World"
```

### 常用技巧

```bash
# 获取命令输出
files=$(ls)

# 命令替换
echo "当前时间: $(date)"

# 数组
arr=(apple banana cherry)
echo ${arr[0]}

# 字符串操作
str="Hello World"
echo ${#str}  # 长度
echo ${str:0:5}  # 截取
```

## 环境变量

```bash
# 查看环境变量
echo $PATH
echo $HOME
echo $USER

# 设置环境变量
export MY_VAR="value"

# 永久设置：添加到 ~/.bashrc 或 ~/.profile
```

## 命令历史

```bash
# 查看历史
history

# 执行上一条命令
!!

# 执行第N条命令
!N

# 搜索历史
Ctrl+R
```

## 别名

```bash
# 创建别名
alias ll='ls -la'
alias gs='git status'

# 永久设置：添加到 ~/.bashrc
```

## 常见错误

**错误1：忘记加引号**

变量包含空格时必须加引号：`echo "$var"`

**错误2：权限被拒绝**

需要执行权限：`chmod +x script.sh`

**错误3：路径错误**

使用绝对路径或确认当前目录。

## 实际应用

**系统管理**：监控系统状态、管理用户、配置网络。

**自动化**：定时任务、批量处理文件、部署程序。

**开发**：编译代码、运行测试、管理版本。

**数据分析**：处理日志、统计信息、生成报告。

## 总结

- Shell是用户和内核之间的接口
- 命令行操作高效且强大
- 管道和重定向是Shell的核心特性
- Shell脚本可以自动化任务
- 环境变量和别名提高效率
