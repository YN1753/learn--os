# 日志管理

## 概念解释

**日志**是系统和应用程序运行时产生的记录。日志管理包括日志的收集、存储、分析和轮转。

就像飞机的黑匣子：记录所有重要事件，出问题时可以回溯分析。

## 为什么重要

- **故障排查**：快速定位问题
- **安全审计**：追踪可疑活动
- **性能分析**：发现性能瓶颈
- **合规要求**：满足法规要求

## 日志类型

### 系统日志

- 内核消息
- 服务启动/停止
- 硬件事件

### 应用日志

- 应用程序运行记录
- 错误和警告
- 访问记录

### 安全日志

- 登录记录
- 权限变更
- 安全事件

## 日志级别

```
EMERG  → 系统不可用
ALERT  → 需要立即处理
CRIT   → 严重错误
ERR    → 错误
WARN   → 警告
NOTICE → 正常但重要
INFO   → 信息
DEBUG  → 调试信息
```

## 日志系统

### syslog

传统日志系统：

```bash
/var/log/syslog      # 系统日志
/var/log/auth.log    # 认证日志
/var/log/kern.log    # 内核日志
```

### journalctl

systemd日志工具：

```bash
journalctl                    # 查看所有日志
journalctl -u nginx           # 查看服务日志
journalctl --since "1 hour ago"  # 最近1小时
journalctl -f                 # 实时跟踪
```

### rsyslog

增强版syslog：

```bash
/etc/rsyslog.conf    # 配置文件
```

## 日志轮转

防止日志文件过大：

```bash
/etc/logrotate.conf  # 轮转配置
```

配置示例：

```
/var/log/nginx/*.log {
    daily
    rotate 14
    compress
    missingok
    notifempty
}
```

## 可视化说明

在可视化中，你可以：
- 理解日志的结构和级别
- 学习使用日志工具
- 了解日志轮转配置

## 常见错误

1. **日志过多**：占用大量磁盘空间
2. **日志不足**：出问题时没有足够信息
3. **不轮转**：日志文件无限增长

## 实际应用

- **ELK Stack**：Elasticsearch + Logstash + Kibana
- **Splunk**：企业级日志分析
- **Graylog**：开源日志管理

## 总结

日志管理是系统运维的基础。合理配置日志收集和轮转，有助于故障排查和安全审计。
