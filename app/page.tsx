import { getTopics } from '@/lib/topics'

export default async function Home() {
  const topics = await getTopics()

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-3">操作系统知识库</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          从零开始，用可视化和交互式演示理解操作系统核心概念
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6">学习主题</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <a
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="block p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                {topic.category}
              </div>
              <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {topic.description}
              </p>
              <div className="mt-4 flex gap-2">
                {topic.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
