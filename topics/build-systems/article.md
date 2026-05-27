# 构建系统

## 概念解释

构建系统是自动化编译和链接程序的工具。Make是最经典的构建工具，CMake是跨平台的构建系统生成器。

## 为什么重要

- **自动化编译**：避免手动输入编译命令
- **增量编译**：只重新编译修改的文件
- **跨平台**：CMake支持多种编译器和平台
- **依赖管理**：自动处理文件依赖关系

## 核心原理

### Makefile基本语法

```makefile
# 目标: 依赖
# 	命令

target: dependency1 dependency2
	command1
	command2

# 变量
CC = gcc
CFLAGS = -Wall -g

# 模式规则
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@
```

### CMake基本语法

```cmake
cmake_minimum_required(VERSION 3.10)
project(MyProject)

# 添加可执行文件
add_executable(myapp main.cpp utils.cpp)

# 添加库
add_library(mylib STATIC lib.cpp)

# 链接库
target_link_libraries(myapp mylib)
```

### Make vs CMake

| 特性 | Make | CMake |
|------|------|-------|
| 平台 | Unix/Linux | 跨平台 |
| 配置 | Makefile | CMakeLists.txt |
| 复杂度 | 简单 | 中等 |
| 适用 | 小项目 | 大型项目 |

## 可视化说明

可视化组件展示了Make和CMake的构建流程。

## 常见错误

1. **Tab vs 空格**：Makefile命令必须用Tab缩进
2. **依赖缺失**：忘记声明依赖导致编译错误
3. **CMake缓存**：修改CMakeLists.txt后需要重新生成

## 实际应用

- **C/C++项目**：编译大型项目
- **跨平台开发**：Windows/Linux/macOS统一构建
- **嵌入式开发**：交叉编译
- **开源项目**：标准构建流程

## 总结

Make和CMake是C/C++项目的核心构建工具，掌握它们对于系统级开发至关重要。
