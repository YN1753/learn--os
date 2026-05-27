// 性能监控演示

export function runDemo() {
  console.log('性能监控演示')
  console.log('---')

  console.log('关键指标:')
  console.log('  CPU: 使用率、负载、上下文切换')
  console.log('  内存: 使用率、缓存命中、交换')
  console.log('  磁盘: IO等待、吞吐量、IOPS')
  console.log('  网络: 带宽、延迟、丢包率')
  console.log()

  console.log('监控工具:')
  console.log('  top/htop: 实时系统状态')
  console.log('  vmstat: 虚拟内存统计')
  console.log('  iostat: IO统计')
  console.log('  sar: 系统活动报告')
  console.log('  perf: 性能分析')
  console.log()

  console.log('示例输出 (vmstat):')
  console.log('  procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----')
  console.log('   r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa')
  console.log('   1  0      0 123456  65432 234567    0    0     5    10  100  200 10  5 80  5')
  console.log()

  console.log('性能优化建议:')
  console.log('  1. 先找到真正的瓶颈')
  console.log('  2. 关注峰值而非平均值')
  console.log('  3. IO等待可能是主要瓶颈')
  console.log('  4. 不要过度优化')
}
