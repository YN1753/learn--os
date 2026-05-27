import { getTopics, getTopic } from '@/lib/topics'
import { notFound } from 'next/navigation'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { Quiz } from '@/components/Quiz'

export async function generateStaticParams() {
  const topics = await getTopics()
  return topics.map((t) => ({ slug: t.slug }))
}

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const topic = await getTopic(params.slug)
  if (!topic) notFound()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">{topic.category}</div>
        <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{topic.description}</p>
        <div className="mt-3 flex gap-2">
          {topic.tags?.map((tag: string) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
              {tag}
            </span>
          ))}
          <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
            {topic.difficulty}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2 prose dark:prose-invert max-w-none">
          <MarkdownRenderer content={topic.article} />
        </article>

        <aside className="space-y-6">
          <div className="sticky top-20">
            <h2 className="text-lg font-semibold mb-4">测验</h2>
            <Quiz questions={topic.quiz} />
          </div>
        </aside>
      </div>
    </div>
  )
}
