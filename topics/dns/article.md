# DNS域名系统

## 概念解释

**DNS**（Domain Name System）将域名转换为IP地址。就像电话簿：通过名字查找电话号码。

## 为什么重要

- **用户体验**：记住域名比IP容易
- **灵活性**：IP变化不影响域名
- **负载均衡**：一个域名对应多个IP

## DNS 解析过程

```
1. 浏览器缓存
2. 操作系统缓存
3. 本地DNS服务器
4. 根DNS服务器
5. 顶级域名服务器
6. 权威DNS服务器
```

## DNS 记录类型

### A 记录

域名 → IPv4地址

```
example.com.  IN  A  93.184.216.34
```

### AAAA 记录

域名 → IPv6地址

### CNAME 记录

域名 → 另一个域名

```
www.example.com.  IN  CNAME  example.com.
```

### MX 记录

邮件服务器

```
example.com.  IN  MX  10  mail.example.com.
```

### NS 记录

DNS服务器

```
example.com.  IN  NS  ns1.example.com.
```

## DNS 工具

```bash
# 查询域名
nslookup example.com
dig example.com

# 查看DNS缓存
# Windows
ipconfig /displaydns
# Linux
systemd-resolve --statistics
```

## 可视化说明

在可视化中，你可以：
- 观察DNS解析过程
- 理解不同记录类型
- 使用DNS工具查询

## 常见错误

1. **DNS缓存**：修改DNS后需要等待
2. **TTL**：记录缓存时间
3. **DNS劫持**：安全风险

## 实际应用

- **网站**：域名解析
- **邮件**：MX记录
- **CDN**：智能DNS

## 总结

DNS是互联网基础设施的核心。理解DNS解析过程和记录类型，有助于网络管理和故障排查。
