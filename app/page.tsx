import { getTopics, getTopicsByCategory } from '@/lib/topics'

const difficultyConfig: Record<string, { label: string; color: string }> = {
  '初级': { label: '初级', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
  '中级': { label: '中级', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
  '高级': { label: '高级', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
}

const categoryIcons: Record<string, string> = {
  '操作系统基础': '💻',
  '进程与线程': '⚙️',
  '内存管理': '🧠',
  '文件系统': '📁',
  'IO管理': '🔌',
  '系统类型': '🖥️',
  '系统架构': '🏗️',
  '安全': '🔒',
  '网络基础': '🌐',
  '系统管理': '🛠️',
  '虚拟化与容器': '📦',
  '分布式系统': '🌍',
  '存储': '💾',
  '高级主题': '🎓',
  '开发工具': '🔧',
  '性能优化': '⚡',
  '调试与优化': '🔍',
  '系统应用': '📊',
}

export default async function Home() {
  const topics = await getTopics()
  const topicsByCategory = await getTopicsByCategory()
  const categories = Object.keys(topicsByCategory)

  return (
    <div>
      {/* Hero */}
      <section className="mb-10">
        <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          操作系统知识库
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
          从零开始，用可视化和交互式演示理解操作系统核心概念
        </p>
        <div className="flex gap-6">
          <div className="px-4 py-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{topics.length}</div>
            <div className="text-sm text-blue-500 dark:text-blue-500">学习主题</div>
          </div>
          <div className="px-4 py-3 bg-green-50 dark:bg-green-950 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{categories.length}</div>
            <div className="text-sm text-green-500 dark:text-green-500">知识分类</div>
          </div>
          <div className="px-4 py-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{topics.length}</div>
            <div className="text-sm text-purple-500 dark:text-purple-500">可视化演示</div>
          </div>
        </div>
      </section>

      {/* Topics by category */}
      {categories.map(cat => (
        <section key={cat} className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">{categoryIcons[cat] || '📄'}</span>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{cat}</h2>
            <span className="text-sm text-gray-400 ml-1">{topicsByCategory[cat].length} 个主题</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topicsByCategory[cat].map((topic, idx) => {
              const diff = difficultyConfig[topic.difficulty] || { label: topic.difficulty, color: 'bg-gray-100 text-gray-600' }
              return (
                <a
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="group block p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {topic.title}
                    </h3>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ml-2 ${diff.color}`}>
                      {diff.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                    {topic.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {topic.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
