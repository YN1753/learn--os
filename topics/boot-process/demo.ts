/**
 * 操作系统启动过程演示
 */

export function runAllDemos() {
  console.log('=== 操作系统启动流程 ===\n')

  const steps = [
    { phase: '硬件', label: '按下电源', desc: '电源按钮触发电源启动' },
    { phase: '硬件', label: 'CPU复位', desc: 'CPU从0xFFFF0开始执行' },
    { phase: '固件', label: 'BIOS/UEFI', desc: '加载并执行固件程序' },
    { phase: '固件', label: 'POST自检', desc: '检查CPU、内存、显卡等' },
    { phase: '固件', label: '查找引导设备', desc: '按顺序查找可引导设备' },
    { phase: '引导', label: '读取引导扇区', desc: '读取MBR/GPT' },
    { phase: '引导', label: '引导加载程序', desc: 'GRUB/BOOTMGR加载' },
    { phase: '内核', label: '加载内核', desc: '操作系统内核加载到内存' },
    { phase: '内核', label: '内核初始化', desc: '初始化硬件和驱动' },
    { phase: '系统', label: '启动init', desc: '启动第一个进程(PID 1)' },
    { phase: '系统', label: '系统服务', desc: '启动网络、图形界面等' },
    { phase: '用户', label: '用户登录', desc: '显示登录界面' },
  ]

  console.log('阶段'.padEnd(8) + '步骤'.padEnd(16) + '描述')
  console.log('-'.repeat(50))
  for (const s of steps) {
    console.log(s.phase.padEnd(8) + s.label.padEnd(16) + s.desc)
  }

  console.log('\n=== BIOS vs UEFI ===\n')
  console.log('特性'.padEnd(14) + 'BIOS'.padEnd(16) + 'UEFI')
  console.log('-'.repeat(45))
  console.log('分区表'.padEnd(14) + 'MBR'.padEnd(16) + 'GPT')
  console.log('最大硬盘'.padEnd(14) + '2TB'.padEnd(16) + '9.4ZB')
  console.log('最大分区'.padEnd(14) + '4个主分区'.padEnd(16) + '128个')
  console.log('启动速度'.padEnd(14) + '较慢'.padEnd(16) + '较快')
  console.log('安全启动'.padEnd(14) + '不支持'.padEnd(16) + '支持')
  console.log('图形界面'.padEnd(14) + '无'.padEnd(16) + '有')

  console.log('\n=== 引导加载程序 ===\n')
  console.log('Windows: BOOTMGR (新) / NTLDR (旧)')
  console.log('Linux: GRUB (最常用) / LILO (旧)')
  console.log('macOS: boot.efi')

  console.log('\n=== Linux启动后的第一个进程 ===\n')
  console.log('传统: init (SysVinit)')
  console.log('现代: systemd')
  console.log('PID: 1')
  console.log('作用: 启动和管理所有其他进程')

  console.log('\n=== 常见启动问题 ===\n')
  console.log('1. 无法启动: 检查电源、硬盘连接')
  console.log('2. 引导失败: 修复引导记录')
  console.log('3. 蓝屏/黑屏: 进入安全模式')
  console.log('4. 启动慢: 检查启动项、换SSD')
}
