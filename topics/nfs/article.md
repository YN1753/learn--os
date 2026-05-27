# NFS网络文件系统

## 概念解释

**NFS**（Network File System）允许在网络中共享文件系统。客户端可以像访问本地文件一样访问远程文件。

就像共享网盘：文件在服务器上，但你可以像本地文件一样使用。

## 为什么重要

- **文件共享**：多台计算机共享文件
- **集中管理**：数据集中存储
- **节省空间**：不需要每台机器都存一份

## NFS 工作原理

```
客户端 → NFS请求 → 服务器
客户端 ← NFS响应 ← 服务器
```

## NFS 配置

### 服务器配置

```bash
# /etc/exports
/shared 192.168.1.0/24(rw,sync,no_root_squash)

# 启动服务
systemctl start nfs-server
exportfs -ra
```

### 客户端挂载

```bash
# 查看共享
showmount -e 192.168.1.100

# 挂载
mount 192.168.1.100:/shared /mnt/nfs

# 开机自动挂载
# /etc/fstab
192.168.1.100:/shared /mnt/nfs nfs defaults 0 0
```

## NFS 版本

| 版本 | 特点 |
|------|------|
| NFSv3 | 无状态，性能好 |
| NFSv4 | 有状态，支持ACL，安全性好 |
| NFSv4.1 | 并行访问，性能更好 |

## NFS 权限

```bash
# exports选项
rw              # 读写
ro              # 只读
sync            # 同步写入
async           # 异步写入
no_root_squash  # 允许root访问
root_squash     # 映射root为匿名用户
```

## 可视化说明

在可视化中，你可以：
- 理解NFS的工作原理
- 配置NFS服务器和客户端
- 了解NFS权限设置

## 常见错误

1. **权限问题**：exports配置不当
2. **防火墙**：需要开放NFS端口
3. **版本不匹配**：客户端服务器版本要一致

## 实际应用

- **Linux集群**：共享存储
- **家庭网络**：文件共享
- **开发环境**：代码共享

## 总结

NFS是Linux/Unix系统中常用的文件共享方案。理解NFS配置和权限管理，有助于实现文件共享。
