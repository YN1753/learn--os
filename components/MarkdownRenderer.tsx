'use client'

import React from 'react'

function parseMarkdown(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => {
      return `<ul>${m}</ul>`
    })
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\n{2,}/g, '</p><p>')

  html = '<p>' + html + '</p>'
  html = html.replace(/<p><(h[1-3]|ul|blockquote)/g, '<$1')
    .replace(/<\/(h[1-3]|ul|blockquote)><\/p>/g, '</$1>')

  return html
}

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  )
}
