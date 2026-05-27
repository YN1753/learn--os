// 可加载内核模块演示

interface KernelModule {
  name: string
  description: string
  loaded: boolean
  dependencies: string[]
}

export function runDemo() {
  console.log('可加载内核模块演示')
  console.log('---')

  const modules: KernelModule[] = [
    { name: 'ext4', description: 'ext4文件系统', loaded: true, dependencies: ['mbcache', 'jbd2'] },
    { name: 'usb_storage', description: 'USB存储驱动', loaded: true, dependencies: ['scsi_mod', 'usbcore'] },
    { name: 'nvidia', description: 'NVIDIA显卡驱动', loaded: false, dependencies: ['drm', 'i2c_core'] },
    { name: 'vboxdrv', description: 'VirtualBox模块', loaded: false, dependencies: [] },
  ]

  console.log('已加载模块:')
  for (const m of modules.filter(m => m.loaded)) {
    console.log(`  ${m.name}: ${m.description}`)
    if (m.dependencies.length > 0) {
      console.log(`    依赖: ${m.dependencies.join(', ')}`)
    }
  }

  console.log()
  console.log('可用模块:')
  for (const m of modules.filter(m => !m.loaded)) {
    console.log(`  ${m.name}: ${m.description}`)
  }

  console.log()
  console.log('模块操作命令:')
  console.log('  insmod <module>: 加载模块')
  console.log('  rmmod <module>: 卸载模块')
  console.log('  modprobe <module>: 加载模块（自动处理依赖）')
  console.log('  modprobe -r <module>: 卸载模块')
  console.log('  lsmod: 列出已加载模块')
  console.log('  modinfo <module>: 查看模块信息')
}
