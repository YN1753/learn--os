'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface TopicMeta {
  slug: string
  title: string
  category: string
  difficulty: string
}

interface SidebarProps {
  topicsByCategory: Record<string, TopicMeta[]>
}

export function Sidebar({ topicsByCategory }: SidebarProps) {
  const pathname = usePathname()
  const currentSlug = pathname.startsWith('/topics/') ? pathname.split('/topics/')[1] : undefined
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggle = (cat: string) => {
    setCollapsed(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  const categories = Object.keys(topicsByCategory)

  const difficultyColor: Record<string, string> = {
    '初级': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    '中级': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    '高级': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  }

  const content = (
    <nav className="text-sm">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <a href="/" className="font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
          OS 知识库
        </a>
        <div className="text-xs text-gray-500 mt-0.5">操作系统可视化学习</div>
      </div>
      <div className="py-2">
        {categories.map(cat => (
          <div key={cat} className="mb-1">
            <button
              onClick={() => toggle(cat)}
              className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="font-medium text-gray-700 dark:text-gray-300">{cat}</span>
              <span className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{topicsByCategory[cat].length}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${collapsed[cat] ? '' : 'rotate-90'}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
            {!collapsed[cat] && (
              <div className="ml-2 border-l border-gray-200 dark:border-gray-800">
                {topicsByCategory[cat].map(topic => (
                  <a
                    key={topic.slug}
                    href={`/topics/${topic.slug}`}
                    className={`flex items-center justify-between px-4 py-1.5 transition-colors ${
                      currentSlug === topic.slug
                        ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-l-2 border-blue-500 -ml-[2px]'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <span className="truncate">{topic.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${difficultyColor[topic.difficulty] || 'bg-gray-100 text-gray-500'}`}>
                      {topic.difficulty}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800
        overflow-y-auto z-40 transition-transform duration-200
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:sticky lg:top-0
      `}>
        {content}
      </aside>
    </>
  )
}
