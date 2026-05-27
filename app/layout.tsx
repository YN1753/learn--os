import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '操作系统知识库',
  description: '零基础可视化学习操作系统',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="text-lg font-bold text-gray-900 dark:text-gray-100">
              OS 知识库
            </a>
            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="/" className="hover:text-gray-900 dark:hover:text-gray-100">首页</a>
              <a href="/topics" className="hover:text-gray-900 dark:hover:text-gray-100">全部主题</a>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
