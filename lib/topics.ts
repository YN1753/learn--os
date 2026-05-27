import fs from 'fs'
import path from 'path'

export interface TopicMeta {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  difficulty: string
  order: number
}

const TOPICS_DIR = path.join(process.cwd(), 'topics')

export async function getTopics(): Promise<TopicMeta[]> {
  if (!fs.existsSync(TOPICS_DIR)) return []

  const dirs = fs.readdirSync(TOPICS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  const topics: TopicMeta[] = []

  for (const slug of dirs) {
    const metaPath = path.join(TOPICS_DIR, slug, 'metadata.json')
    if (fs.existsSync(metaPath)) {
      const raw = fs.readFileSync(metaPath, 'utf-8')
      const meta = JSON.parse(raw)
      topics.push({ ...meta, slug })
    }
  }

  return topics.sort((a, b) => a.order - b.order)
}

export async function getTopicsByCategory(): Promise<Record<string, TopicMeta[]>> {
  const topics = await getTopics()
  const grouped: Record<string, TopicMeta[]> = {}
  for (const t of topics) {
    if (!grouped[t.category]) grouped[t.category] = []
    grouped[t.category].push(t)
  }
  return grouped
}

export async function getTopic(slug: string) {
  const topicDir = path.join(TOPICS_DIR, slug)
  if (!fs.existsSync(topicDir)) return null

  const metaPath = path.join(topicDir, 'metadata.json')
  const articlePath = path.join(topicDir, 'article.md')
  const quizPath = path.join(topicDir, 'quiz.json')

  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
  const article = fs.readFileSync(articlePath, 'utf-8')
  const quiz = JSON.parse(fs.readFileSync(quizPath, 'utf-8'))

  return { ...meta, slug, article, quiz }
}
