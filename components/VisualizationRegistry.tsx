'use client'

import React, { useState, useEffect, ComponentType } from 'react'

const visualizationMap: Record<string, () => Promise<{ default: ComponentType }>> = {
  'what-is-os': () => import('@/topics/what-is-os/visualization'),
  'os-types': () => import('@/topics/os-types/visualization'),
  'boot-process': () => import('@/topics/boot-process/visualization'),
  'user-mode-kernel-mode': () => import('@/topics/user-mode-kernel-mode/visualization'),
  'kernel-architecture': () => import('@/topics/kernel-architecture/visualization'),
  'system-calls': () => import('@/topics/system-calls/visualization'),
  'process-thread': () => import('@/topics/process-thread/visualization'),
  'process-creation': () => import('@/topics/process-creation/visualization'),
  'process-groups': () => import('@/topics/process-groups/visualization'),
  'context-switch': () => import('@/topics/context-switch/visualization'),
  'cpu-scheduling': () => import('@/topics/cpu-scheduling/visualization'),
  'scheduling-algorithms': () => import('@/topics/scheduling-algorithms/visualization'),
  'ipc': () => import('@/topics/ipc/visualization'),
  'signal-handling': () => import('@/topics/signal-handling/visualization'),
  'mutex-semaphore': () => import('@/topics/mutex-semaphore/visualization'),
  'deadlock': () => import('@/topics/deadlock/visualization'),
  'producer-consumer': () => import('@/topics/producer-consumer/visualization'),
  'synchronization': () => import('@/topics/synchronization/visualization'),
  'concurrency-models': () => import('@/topics/concurrency-models/visualization'),
  'interrupts': () => import('@/topics/interrupts/visualization'),
  'memory-management': () => import('@/topics/memory-management/visualization'),
  'virtual-memory': () => import('@/topics/virtual-memory/visualization'),
  'page-replacement': () => import('@/topics/page-replacement/visualization'),
  'memory-allocation': () => import('@/topics/memory-allocation/visualization'),
  'memory-mapped-io': () => import('@/topics/memory-mapped-io/visualization'),
  'file-system': () => import('@/topics/file-system/visualization'),
  'file-allocation': () => import('@/topics/file-allocation/visualization'),
  'file-permissions': () => import('@/topics/file-permissions/visualization'),
  'directory-structure': () => import('@/topics/directory-structure/visualization'),
  'disk-management': () => import('@/topics/disk-management/visualization'),
  'disk-scheduling': () => import('@/topics/disk-scheduling/visualization'),
  'raid': () => import('@/topics/raid/visualization'),
  'io-management': () => import('@/topics/io-management/visualization'),
  'device-drivers': () => import('@/topics/device-drivers/visualization'),
  'storage': () => import('@/topics/storage/visualization'),
  'virtualization': () => import('@/topics/virtualization/visualization'),
  'distributed-systems': () => import('@/topics/distributed-systems/visualization'),
  'security-models': () => import('@/topics/security-models/visualization'),
  'os-security': () => import('@/topics/os-security/visualization'),
  'loadable-modules': () => import('@/topics/loadable-modules/visualization'),
  'performance-monitoring': () => import('@/topics/performance-monitoring/visualization'),
  'log-management': () => import('@/topics/log-management/visualization'),
  'shell': () => import('@/topics/shell/visualization'),
  'network-basics': () => import('@/topics/network-basics/visualization'),
  'networking-stack': () => import('@/topics/networking-stack/visualization'),
  'firewall': () => import('@/topics/firewall/visualization'),
  'dns': () => import('@/topics/dns/visualization'),
  'dhcp': () => import('@/topics/dhcp/visualization'),
  'nfs': () => import('@/topics/nfs/visualization'),
  'real-time-systems': () => import('@/topics/real-time-systems/visualization'),
  'power-management': () => import('@/topics/power-management/visualization'),
  'system-monitoring': () => import('@/topics/system-monitoring/visualization'),
  'embedded-systems': () => import('@/topics/embedded-systems/visualization'),
  'shell-scripting': () => import('@/topics/shell-scripting/visualization'),
  'network-protocols': () => import('@/topics/network-protocols/visualization'),
  'http-protocols': () => import('@/topics/http-protocols/visualization'),
  'debugging': () => import('@/topics/debugging/visualization'),
  'performance-tuning': () => import('@/topics/performance-tuning/visualization'),
  'posix-standards': () => import('@/topics/posix-standards/visualization'),
  'text-processing': () => import('@/topics/text-processing/visualization'),
  'build-systems': () => import('@/topics/build-systems/visualization'),
  'version-control': () => import('@/topics/version-control/visualization'),
  'automation-tools': () => import('@/topics/automation-tools/visualization'),
  'container-orchestration': () => import('@/topics/container-orchestration/visualization'),
  'compiler-basics': () => import('@/topics/compiler-basics/visualization'),
  'database-systems': () => import('@/topics/database-systems/visualization'),
  'memory-leak-detection': () => import('@/topics/memory-leak-detection/visualization'),
  'system-security-hardening': () => import('@/topics/system-security-hardening/visualization'),
  'network-security': () => import('@/topics/network-security/visualization'),
  'distributed-algorithms': () => import('@/topics/distributed-algorithms/visualization'),
  'load-balancing': () => import('@/topics/load-balancing/visualization'),
  'caching-strategies': () => import('@/topics/caching-strategies/visualization'),
  'message-queue': () => import('@/topics/message-queue/visualization'),
  'microservices': () => import('@/topics/microservices/visualization'),
}

interface VisualizationLoaderProps {
  slug: string
}

export function VisualizationLoader({ slug }: VisualizationLoaderProps) {
  const [Component, setComponent] = useState<ComponentType | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loader = visualizationMap[slug]
    if (!loader) {
      setError(true)
      return
    }
    loader().then(mod => {
      setComponent(() => mod.default)
    }).catch(() => {
      setError(true)
    })
  }, [slug])

  if (error) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg text-sm text-yellow-700 dark:text-yellow-300">
        该主题暂无可视化内容
      </div>
    )
  }

  if (!Component) {
    return (
      <div className="p-8 text-center text-gray-400 text-sm">
        加载可视化中...
      </div>
    )
  }

  return <Component />
}
