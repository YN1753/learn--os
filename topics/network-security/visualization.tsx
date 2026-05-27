'use client'

import React, { useState } from 'react'

export default function NetworkSecurityVisualization() {
  const [selectedAttack, setSelectedAttack] = useState<string | null>(null)

  const attacks: Record<string, { name: string; desc: string; defense: string; color: string }> = {
    ddos: { name: 'DDoS攻击', desc: '大量请求淹没服务器', defense: '流量清洗、CDN、限流', color: '#ef4444' },
    mitm: { name: '中间人攻击', desc: '窃听和篡改通信', defense: 'HTTPS、VPN、证书验证', color: '#f59e0b' },
    sqli: { name: 'SQL注入', desc: '恶意SQL语句执行', defense: '参数化查询、输入验证', color: '#8b5cf6' },
    xss: { name: 'XSS攻击', desc: '注入恶意脚本', defense: '输入过滤、CSP、转义输出', color: '#3b82f6' },
    brute: { name: '暴力破解', desc: '密码穷举猜测', defense: '限流、验证码、强密码', color: '#10b981' },
  }

  const protocols = [
    { name: 'SSL/TLS', use: '加密通信', port: '443' },
    { name: 'SSH', use: '安全登录', port: '22' },
    { name: 'IPSec', use: 'VPN加密', port: '500/4500' },
    { name: 'HTTPS', use: '安全Web', port: '443' },
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">网络安全可视化</h3>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">常见攻击类型</div>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(attacks).map(([key, attack]) => (
            <button
              key={key}
              onClick={() => setSelectedAttack(key === selectedAttack ? null : key)}
              className={`p-3 rounded-lg text-sm transition-all ${selectedAttack === key
                ? 'text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              style={selectedAttack === key ? { backgroundColor: attack.color } : undefined}
            >
              {attack.name}
            </button>
          ))}
        </div>
      </div>

      {selectedAttack && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-1">攻击描述</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {attacks[selectedAttack].desc}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">防御方法</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {attacks[selectedAttack].defense}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">安全协议</div>
        <div className="grid grid-cols-4 gap-2">
          {protocols.map(p => (
            <div key={p.name} className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
              <div className="font-medium text-blue-700 dark:text-blue-300">{p.name}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">{p.use}</div>
              <div className="text-xs text-blue-500">端口: {p.port}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg text-sm">
        <div className="font-medium text-green-700 dark:text-green-300 mb-1">安全建议</div>
        <div className="text-green-600 dark:text-green-400">
          使用HTTPS加密通信 | 配置防火墙 | 定期更新补丁 | 使用强密码 | 启用双因素认证
        </div>
      </div>
    </div>
  )
}
