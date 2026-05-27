# DHCP动态主机配置

## 概念解释

**DHCP**（Dynamic Host Configuration Protocol）自动为计算机分配IP地址和其他网络配置。

就像酒店前台：自动分配房间号，告诉你WiFi密码。

## 为什么重要

- **自动化**：手动配置IP很麻烦
- **管理方便**：集中管理IP分配
- **避免冲突**：自动避免IP重复

## DHCP 工作过程

```
1. 客户端广播 DHCP Discover
2. 服务器回复 DHCP Offer
3. 客户端请求 DHCP Request
4. 服务器确认 DHCP ACK
```

## DHCP 配置

### 服务器配置

```bash
# /etc/dhcp/dhcpd.conf
subnet 192.168.1.0 netmask 255.255.255.0 {
    range 192.168.1.100 192.168.1.200;
    option routers 192.168.1.1;
    option domain-name-servers 8.8.8.8;
    default-lease-time 600;
    max-lease-time 7200;
}
```

### 客户端使用

```bash
# 获取IP
dhclient eth0

# 释放IP
dhclient -r eth0
```

## DHCP 租约

- **租约时间**：IP地址使用期限
- **续租**：租约过半时自动续租
- **释放**：客户端主动释放IP

## 静态IP vs DHCP

| 特性 | 静态IP | DHCP |
|------|--------|------|
| 配置 | 手动 | 自动 |
| 冲突 | 可能 | 不会 |
| 管理 | 分散 | 集中 |
| 适用 | 服务器 | 客户端 |

## 可视化说明

在可视化中，你可以：
- 观察DHCP四步过程
- 理解租约机制
- 配置DHCP服务器

## 常见错误

1. **DHCP服务器冲突**：多个DHCP服务器
2. **IP池耗尽**：地址不够用
3. **租约过期**：长时间离线

## 实际应用

- **家庭网络**：路由器DHCP
- **企业网络**：集中管理
- **公共场所**：WiFi热点

## 总结

DHCP自动管理IP地址分配，简化网络配置。理解DHCP工作过程，有助于网络管理和故障排查。
