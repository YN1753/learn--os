# 内存映射IO

## 概念解释

**内存映射IO（mmap）** 是将文件或设备映射到内存地址空间的技术。通过内存操作实现文件IO。

就像把书的内容投影到墙上：你可以直接看墙上的内容，不需要翻书。

## 为什么重要

- **性能**：减少数据拷贝
- **共享内存**：进程间高效通信
- **大文件处理**：不需要一次性加载整个文件

## mmap 系统调用

### 基本用法

```c
#include <sys/mman.h>

void *addr = mmap(
    NULL,           // 映射地址（NULL让系统选择）
    length,         // 映射长度
    PROT_READ|PROT_WRITE,  // 保护标志
    MAP_SHARED,     // 映射标志
    fd,             // 文件描述符
    0               // 偏移
);
```

### 保护标志

- **PROT_READ**：可读
- **PROT_WRITE**：可写
- **PROT_EXEC**：可执行

### 映射标志

- **MAP_SHARED**：共享映射，修改写回文件
- **MAP_PRIVATE**：私有映射，修改不写回
- **MAP_ANONYMOUS**：匿名映射，不关联文件

## 使用场景

### 1. 文件IO

```c
// 读取文件
void *addr = mmap(NULL, size, PROT_READ, MAP_PRIVATE, fd, 0);
// 直接访问文件内容
char *content = (char *)addr;
```

### 2. 共享内存

```c
// 进程间通信
void *shared = mmap(NULL, size, PROT_READ|PROT_WRITE,
                    MAP_SHARED|MAP_ANONYMOUS, -1, 0);
```

### 3. 大文件处理

```c
// 分段映射大文件
for (offset = 0; offset < filesize; offset += chunk_size) {
    void *chunk = mmap(NULL, chunk_size, PROT_READ,
                       MAP_PRIVATE, fd, offset);
    // 处理chunk
    munmap(chunk, chunk_size);
}
```

## 与传统IO的比较

| 特性 | 传统IO | mmap |
|------|--------|------|
| 数据拷贝 | 需要 | 不需要 |
| 系统调用 | 每次读写 | 一次映射 |
| 随机访问 | 需要seek | 直接访问 |
| 大文件 | 需要循环 | 分段映射 |

## 可视化说明

在可视化中，你可以：
- 理解mmap的工作原理
- 比较传统IO和mmap的差异
- 了解共享内存的使用

## 常见错误

1. **忘记munmap**：导致内存泄漏
2. **文件大小变化**：映射后文件变小会段错误
3. **并发访问**：需要同步机制

## 实际应用

- **数据库**：内存映射数据文件
- **编辑器**：大文件编辑
- **共享内存**：进程间通信
- **动态链接**：加载共享库

## 总结

mmap通过将文件映射到内存，提供了高效的IO机制。理解mmap的使用场景和注意事项，有助于编写高性能程序。
