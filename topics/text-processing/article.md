# 文本处理

## 概念解释

Linux提供了强大的文本处理工具，包括grep（搜索）、sed（流编辑）和awk（文本分析）。这些工具是系统管理和数据处理的基础。

## 为什么重要

- **日志分析**：快速从大量日志中提取信息
- **数据处理**：批量处理文本数据
- **自动化**：脚本中处理文本输出
- **系统管理**：配置文件批量修改

## 核心原理

### grep - 文本搜索

```bash
grep "pattern" file          # 搜索匹配行
grep -r "pattern" dir/       # 递归搜索目录
grep -i "pattern" file       # 忽略大小写
grep -v "pattern" file       # 反向匹配
grep -c "pattern" file       # 统计匹配行数
grep -n "pattern" file       # 显示行号
```

### sed - 流编辑器

```bash
sed 's/old/new/' file        # 替换第一个匹配
sed 's/old/new/g' file       # 替换所有匹配
sed -i 's/old/new/g' file   # 直接修改文件
sed '3d' file                # 删除第3行
sed '2,5d' file              # 删除2-5行
sed -n '10,20p' file         # 打印10-20行
```

### awk - 文本分析

```bash
awk '{print $1}' file        # 打印第一列
awk -F: '{print $1}' file   # 指定分隔符
awk '$3 > 100' file          # 条件过滤
awk '{sum+=$1} END{print sum}' file  # 求和
awk 'NR==5' file             # 第5行
```

## 可视化说明

可视化组件展示了grep、sed和awk的文本处理流程。

## 常见错误

1. **忘记转义特殊字符**：正则表达式中的特殊字符需要转义
2. **sed不修改原文件**：默认输出到stdout，需要-i选项才修改
3. **awk列号从1开始**：不是从0开始

## 实际应用

- **日志分析**：统计错误次数、提取关键信息
- **配置管理**：批量修改配置文件
- **数据清洗**：处理CSV、日志等文本数据
- **系统监控**：解析命令输出

## 总结

grep、sed、awk是Linux文本处理三剑客，掌握它们可以大幅提高数据处理效率。
