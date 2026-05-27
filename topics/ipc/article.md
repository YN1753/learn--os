# 进程间通信

## 概念解释

进程间通信（IPC）是不同进程之间交换数据的机制。

想象两个房间的人要交流：
- **管道**：通过墙上的管子传纸条
- **消息队列**：通过信箱传递消息
- **共享内存**：在墙上开一个窗口，两边都能看到
- **信号**：按门铃通知对方

## 为什么重要

进程间通信是构建复杂系统的基础：
- 不同程序需要协作
- 客户端和服务器需要通信
- 父子进程需要交换数据

## 管道（Pipe）

### 什么是管道？

管道是最简单的IPC机制，数据单向流动。

### 匿名管道

只能用于有亲缘关系的进程（如父子进程）。

```c
int pipefd[2]; // pipefd[0]读, pipefd[1]写
pipe(pipefd);

// 父进程写
write(pipefd[1], "hello", 5);

// 子进程读
char buf[10];
read(pipefd[0], buf, 10);
```

### 命名管道（FIFO）

可以用于无亲缘关系的进程。

```bash
# 创建命名管道
mkfifo mypipe

# 写入
echo "hello" > mypipe

# 读取
cat mypipe
```

### 特点

- 单向流动
- 面向字节流
- 生命周期随进程

## 消息队列（Message Queue）

### 什么是消息队列？

消息队列是消息的链表，存储在内核中。

### 特点

- 消息有类型
- 可以按类型读取
- 消息独立，有边界

### 使用

```c
// 创建消息队列
int msgid = msgget(IPC_PRIVATE, 0666);

// 发送消息
struct msgbuf {
    long mtype;
    char mtext[100];
};
struct msgbuf msg = {1, "hello"};
msgsnd(msgid, &msg, sizeof(msg.mtext), 0);

// 接收消息
msgrcv(msgid, &msg, sizeof(msg.mtext), 1, 0);
```

### 优点

- 消息有类型
- 可以异步通信
- 不需要亲缘关系

### 缺点

- 消息大小有限制
- 需要内核参与

## 共享内存（Shared Memory）

### 什么是共享内存？

多个进程可以访问同一块内存区域。

### 特点

- 最快的IPC方式
- 需要同步机制
- 直接访问内存

### 使用

```c
// 创建共享内存
int shmid = shmget(IPC_PRIVATE, 1024, 0666);

// 附加到进程地址空间
char *ptr = (char*)shmat(shmid, NULL, 0);

// 写入
strcpy(ptr, "hello");

// 读取
printf("%s", ptr);

// 分离
shmdt(ptr);
```

### 优点

- 速度最快
- 数据共享方便

### 缺点

- 需要同步机制
- 编程复杂

## 信号（Signal）

### 什么是信号？

信号是异步通知机制，通知进程某个事件发生了。

### 常见信号

| 信号 | 含义 |
|------|------|
| SIGINT | 中断（Ctrl+C） |
| SIGKILL | 强制终止 |
| SIGSEGV | 段错误 |
| SIGCHLD | 子进程状态改变 |
| SIGALRM | 定时器到期 |

### 使用

```c
// 注册信号处理函数
signal(SIGINT, handler);

void handler(int sig) {
    printf("收到信号 %d\n", sig);
}
```

### 特点

- 异步通知
- 信息量小（只有信号号）
- 可以被捕获或忽略

## 信号量（Semaphore）

### 什么是信号量？

信号量是用于同步的计数器。

### 使用

```c
// 创建信号量
int semid = semget(IPC_PRIVATE, 1, 0666);

// P操作（等待）
struct sembuf op = {0, -1, 0};
semop(semid, &op, 1);

// V操作（释放）
struct sembuf op = {0, 1, 0};
semop(semid, &op, 1);
```

### 特点

- 用于同步
- 可以控制资源数量
- 原子操作

## Socket

### 什么是Socket？

Socket是网络通信的接口，也可以用于本地进程通信。

### 类型

- **流式Socket（TCP）**：可靠、面向连接
- **数据报Socket（UDP）**：不可靠、无连接
- **Unix域Socket**：本地通信

### 使用

```c
// 创建socket
int sockfd = socket(AF_UNIX, SOCK_STREAM, 0);

// 绑定地址
struct sockaddr_un addr;
addr.sun_family = AF_UNIX;
strcpy(addr.sun_path, "/tmp/mysocket");
bind(sockfd, (struct sockaddr*)&addr, sizeof(addr));

// 监听
listen(sockfd, 5);

// 接受连接
int connfd = accept(sockfd, NULL, NULL);

// 读写
write(connfd, "hello", 5);
read(connfd, buf, 10);
```

## IPC方式对比

| 方式 | 速度 | 复杂度 | 适用场景 |
|------|------|--------|----------|
| 管道 | 中 | 简单 | 父子进程 |
| 消息队列 | 中 | 中等 | 异步通信 |
| 共享内存 | 快 | 复杂 | 大量数据 |
| 信号 | 快 | 简单 | 异步通知 |
| Socket | 中 | 中等 | 网络通信 |

## 常见错误

**错误1：管道可以双向通信**

匿名管道是单向的，双向通信需要两个管道。

**错误2：共享内存不需要同步**

共享内存必须配合信号量等同步机制，否则会出现竞态条件。

**错误3：信号可以传递大量数据**

信号只能传递信号号，不能传递数据。

## 实际应用

**Shell管道**：`ls | grep txt` 使用管道连接两个命令。

**数据库**：客户端和服务器通过Socket通信。

**多进程程序**：使用共享内存交换大量数据。

**守护进程**：使用信号处理配置重载等事件。

## 总结

- 进程间通信是进程协作的基础
- 管道简单但单向
- 消息队列支持异步通信
- 共享内存最快但需要同步
- 信号用于异步通知
- Socket支持网络通信
