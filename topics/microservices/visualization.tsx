'use client'

import React, { useState } from 'react'

export default function MicroservicesVisualization() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const services = [
    { name: 'API网关', color: '#3b82f6', desc: '统一入口，路由请求' },
    { name: '用户服务', color: '#10b981', desc: '用户注册、登录、信息管理' },
    { name: '订单服务', color: '#f59e0b', desc: '订单创建、查询、状态管理' },
    { name: '支付服务', color: '#ef4444', desc: '支付处理、退款' },
    { name: '库存服务', color: '#8b5cf6', desc: '库存查询、扣减' },
    { name: '消息队列', color: '#6366f1', desc: '异步消息通信' },
  ]

  const connections = [
    { from: 'API网关', to: '用户服务' },
    { from: 'API网关', to: '订单服务' },
    { from: '订单服务', to: '支付服务' },
    { from: '订单服务', to: '库存服务' },
    { from: '订单服务', to: '消息队列' },
    { from: '消息队列', to: '支付服务' },
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">微服务架构可视化</h3>

      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium mb-2">服务架构</div>
        <div className="grid grid-cols-3 gap-3">
          {services.map(service => (
            <div
              key={service.name}
              onClick={() => setSelectedService(service.name === selectedService ? null : service.name)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${selectedService === service.name ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'}`}
              style={{ backgroundColor: `${service.color}20`, borderLeft: `4px solid ${service.color}` }}
            >
              <div className="font-medium text-sm" style={{ color: service.color }}>{service.name}</div>
              <div className="text-xs text-gray-500 mt-1">{service.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium mb-2">服务间通信</div>
        <div className="space-y-1 text-xs">
          {connections.map((conn, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="font-medium">{conn.from}</span>
              <span className="text-gray-400">→</span>
              <span className="font-medium">{conn.to}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
        <div className="font-medium text-blue-700 dark:text-blue-300 mb-1">核心组件</div>
        <div className="text-blue-600 dark:text-blue-400 text-xs">
          API网关 | 服务注册 | 配置中心 | 负载均衡 | 熔断器 | 链路追踪
        </div>
      </div>
    </div>
  )
}
