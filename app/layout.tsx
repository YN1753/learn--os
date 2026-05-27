import type { Metadata } from 'next'
import './globals.css'
import { getTopicsByCategory } from '@/lib/topics'
import { Sidebar } from '@/components/Sidebar'

export const metadata: Metadata = {
  title: '操作系统知识库',
  description: '零基础可视化学习操作系统',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const topicsByCategory = await getTopicsByCategory()

  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        <div className="flex">
          <Sidebar topicsByCategory={topicsByCategory} />
          <main className="flex-1 min-w-0 lg:ml-0">
            <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
