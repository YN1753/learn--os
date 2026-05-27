# 可加载内核模块

## 概念解释

**可加载内核模块（LKM）** 是可以在运行时动态加载到内核的代码。不需要重新编译内核，就能扩展内核功能。

就像手机安装App：不需要刷机，安装后就能使用新功能。

## 为什么重要

- **灵活性**：按需加载，不用重启
- **模块化**：内核功能可独立开发
- **驱动支持**：硬件驱动通常作为模块加载

## 模块操作

### 1. 加载模块

```bash
# 使用 insmod
insmod mymodule.ko

# 使用 modprobe（自动处理依赖）
modprobe mymodule
```

### 2. 卸载模块

```bash
# 使用 rmmod
rmmod mymodule

# 使用 modprobe -r
modprobe -r mymodule
```

### 3. 查看模块

```bash
# 列出已加载模块
lsmod

# 查看模块信息
modinfo mymodule
```

## 模块编程基础

### 模块结构

```c
#include <linux/module.h>
#include <linux/kernel.h>

// 模块加载时调用
static int __init mymodule_init(void) {
    printk(KERN_INFO "模块加载\n");
    return 0;
}

// 模块卸载时调用
static void __exit mymodule_exit(void) {
    printk(KERN_INFO "模块卸载\n");
}

module_init(mymodule_init);
module_exit(mymodule_exit);

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("我的第一个模块");
MODULE_AUTHOR("Author");
```

### 编译模块

```makefile
obj-m += mymodule.o

all:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules

clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean
```

## 模块与内核的区别

| 特性 | 内核代码 | 模块代码 |
|------|----------|----------|
| 编译时机 | 编译内核时 | 运行时加载 |
| 运行空间 | 内核空间 | 内核空间 |
| 调试难度 | 难 | 较难 |
| 崩溃影响 | 系统崩溃 | 系统崩溃 |

## 可视化说明

在可视化中，你可以：
- 理解模块加载和卸载过程
- 观察模块与内核的交互
- 了解模块编程的基本结构

## 常见错误

1. **模块崩溃**：会导致系统崩溃
2. **版本不匹配**：模块必须与内核版本匹配
3. **许可证问题**：非GPL模块无法使用某些符号

## 实际应用

- **设备驱动**：显卡、网卡驱动
- **文件系统**：NTFS、exFAT 支持
- **网络协议**：VPN 模块
- **安全模块**：SELinux

## 总结

可加载内核模块提供了灵活的内核扩展机制。模块运行在内核空间，编写时需要特别小心，一个错误可能导致系统崩溃。
