# 网络基础

## 概念解释

网络是多台计算机之间通信的系统。操作系统提供了网络通信的基础。

你可以把网络想象成**邮政系统**：
- 你写信（数据）
- 装进信封（封装）
- 写上地址（IP地址）
- 邮局投递（路由器）
- 对方收到（解封装）

## 为什么重要

网络让计算机能够：
- 共享资源
- 交换数据
- 协同工作
- 访问互联网

## 网络分层模型

### OSI七层模型

| 层 | 功能 | 协议示例 |
|----|------|----------|
| 应用层 | 用户接口 | HTTP, FTP, SMTP |
| 表示层 | 数据格式 | SSL, JPEG |
| 会话层 | 会话管理 | NetBIOS |
| 传输层 | 端到端通信 | TCP, UDP |
| 网络层 | 路由寻址 | IP, ICMP |
| 数据链路层 | 帧传输 | Ethernet, WiFi |
| 物理层 | 比特传输 | 光纤, 双绞线 |

### TCP/IP四层模型

| 层 | 功能 | 协议示例 |
|----|------|----------|
| 应用层 | 用户接口 | HTTP, FTP, DNS |
| 传输层 | 端到端通信 | TCP, UDP |
| 网络层 | 路由寻址 | IP, ICMP |
| 网络接口层 | 帧传输 | Ethernet, WiFi |

## IP地址

### 什么是IP地址？

IP地址是计算机在网络中的唯一标识。

### IPv4

- 32位地址
- 点分十进制：192.168.1.1
- 约43亿个地址

### IPv6

- 128位地址
- 冒号十六进制：2001:db8::1
- 地址空间几乎无限

### 特殊地址

- 127.0.0.1：本机（localhost）
- 192.168.x.x：私有地址
- 10.x.x.x：私有地址

## TCP协议

### 特点

- 面向连接
- 可靠传输
- 流量控制
- 拥塞控制

### 三次握手

```
客户端 → SYN → 服务器
客户端 ← SYN+ACK ← 服务器
客户端 → ACK → 服务器
```

### 四次挥手

```
客户端 → FIN → 服务器
客户端 ← ACK ← 服务器
客户端 ← FIN ← 服务器
客户端 → ACK → 服务器
```

### 应用场景

- 网页浏览（HTTP）
- 文件传输（FTP）
- 邮件（SMTP）

## UDP协议

### 特点

- 无连接
- 不可靠传输
- 速度快
- 无流量控制

### 应用场景

- DNS查询
- 视频流
- 游戏
- 实时通信

## Socket编程

### 什么是Socket？

Socket是网络通信的接口，是操作系统的系统调用。

### TCP Socket

```c
// 服务器
int server_fd = socket(AF_INET, SOCK_STREAM, 0);
bind(server_fd, (struct sockaddr*)&addr, sizeof(addr));
listen(server_fd, 5);
int client_fd = accept(server_fd, NULL, NULL);
read(client_fd, buffer, sizeof(buffer));
write(client_fd, response, strlen(response));
close(client_fd);

// 客户端
int sock = socket(AF_INET, SOCK_STREAM, 0);
connect(sock, (struct sockaddr*)&addr, sizeof(addr));
write(sock, request, strlen(request));
read(sock, buffer, sizeof(buffer));
close(sock);
```

### UDP Socket

```c
// 发送
int sock = socket(AF_INET, SOCK_DGRAM, 0);
sendto(sock, data, len, 0, (struct sockaddr*)&addr, sizeof(addr));

// 接收
recvfrom(sock, buffer, sizeof(buffer), 0, (struct sockaddr*)&addr, &addrlen);
```

## DNS

### 什么是DNS？

DNS（域名系统）将域名转换为IP地址。

### 工作流程

1. 浏览器输入 www.example.com
2. 查询本地DNS缓存
3. 查询DNS服务器
4. 返回IP地址
5. 建立连接

### 常见记录

- A记录：域名 → IPv4
- AAAA记录：域名 → IPv6
- CNAME记录：域名 → 域名
- MX记录：邮件服务器

## HTTP协议

### 特点

- 无状态
- 请求-响应模型
- 基于TCP

### 请求方法

- GET：获取资源
- POST：提交数据
- PUT：更新资源
- DELETE：删除资源

### 状态码

- 200：成功
- 301：重定向
- 404：未找到
- 500：服务器错误

## 常见错误

**错误1：TCP比UDP好**

两者适用场景不同。TCP适合需要可靠传输的场景，UDP适合实时性要求高的场景。

**错误2：IP地址可以唯一标识一台设备**

同一设备可以有多个IP地址，NAT可以让多台设备共享一个IP。

**错误3：HTTP是安全的**

HTTP是明文传输，HTTPS才是加密的。

## 实际应用

**Web开发**：使用HTTP/HTTPS协议。

**即时通讯**：使用TCP长连接。

**视频直播**：使用UDP或QUIC协议。

**物联网**：使用MQTT等轻量协议。

## 总结

- 网络是计算机通信的基础
- TCP/IP是互联网的核心协议栈
- TCP可靠但慢，UDP快但不可靠
- Socket是网络编程的接口
- DNS将域名转换为IP地址
- HTTP是Web的基础协议
