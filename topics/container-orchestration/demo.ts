export function runDemo() {
  console.log('=== 容器编排(Kubernetes)演示 ===\n')

  console.log('1. Kubernetes核心概念:')
  const concepts = [
    { concept: 'Pod', desc: '最小部署单元，包含一个或多个容器' },
    { concept: 'Service', desc: '服务抽象，提供负载均衡' },
    { concept: 'Deployment', desc: '声明式部署管理' },
    { concept: 'Namespace', desc: '资源隔离' },
    { concept: 'ConfigMap', desc: '配置管理' },
    { concept: 'Secret', desc: '敏感信息管理' },
  ]
  concepts.forEach(c => {
    console.log(`   ${c.concept.padEnd(12)} # ${c.desc}`)
  })

  console.log('\n2. kubectl常用命令:')
  const commands = [
    { cmd: 'kubectl get pods', desc: '查看Pod列表' },
    { cmd: 'kubectl get services', desc: '查看Service列表' },
    { cmd: 'kubectl apply -f file.yml', desc: '创建/更新资源' },
    { cmd: 'kubectl delete pod name', desc: '删除Pod' },
    { cmd: 'kubectl logs pod-name', desc: '查看Pod日志' },
    { cmd: 'kubectl exec -it pod -- bash', desc: '进入Pod' },
    { cmd: 'kubectl scale deploy app --replicas=3', desc: '扩容' },
  ]
  commands.forEach(c => {
    console.log(`   $ ${c.cmd.padEnd(40)} # ${c.desc}`)
  })

  console.log('\n3. Deployment示例:')
  console.log('   apiVersion: apps/v1')
  console.log('   kind: Deployment')
  console.log('   metadata:')
  console.log('     name: nginx-deployment')
  console.log('   spec:')
  console.log('     replicas: 3')
  console.log('     selector:')
  console.log('       matchLabels:')
  console.log('         app: nginx')

  console.log('\n4. Kubernetes架构:')
  console.log('   Master: API Server + Scheduler + Controller Manager + etcd')
  console.log('   Worker: Kubelet + Kube-proxy + Container Runtime')

  console.log('\n5. 最佳实践:')
  console.log('   - 设置资源限制 (requests/limits)')
  console.log('   - 配置健康检查 (liveness/readiness)')
  console.log('   - 使用Namespace隔离环境')
  console.log('   - 使用ConfigMap和Secret管理配置')
}
