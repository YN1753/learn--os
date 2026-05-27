'use client'

import React, { useState } from 'react'

interface Question {
  question: string
  options: string[]
  answer: number
  explanation: string
}

export function Quiz({ questions }: { questions: Question[] }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = questions[current]

  function handleSelect(idx: number) {
    if (showAnswer) return
    setSelected(idx)
    setShowAnswer(true)
    if (idx === q.answer) setScore(s => s + 1)
  }

  function handleNext() {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
      setShowAnswer(false)
    } else {
      setFinished(true)
    }
  }

  if (finished) {
    return (
      <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-lg font-semibold mb-2">测验完成！</p>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          {score} / {questions.length}
        </p>
        <button
          onClick={() => { setCurrent(0); setSelected(null); setShowAnswer(false); setScore(0); setFinished(false) }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          重新开始
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <p className="text-xs text-gray-500 mb-2">第 {current + 1} / {questions.length} 题</p>
      <p className="font-medium mb-4">{q.question}</p>
      <div className="space-y-2 mb-4">
        {q.options.map((opt, idx) => {
          let cls = 'p-3 rounded-lg border cursor-pointer transition-colors text-sm '
          if (showAnswer) {
            if (idx === q.answer) cls += 'border-green-500 bg-green-50 dark:bg-green-950'
            else if (idx === selected) cls += 'border-red-500 bg-red-50 dark:bg-red-950'
            else cls += 'border-gray-200 dark:border-gray-700 opacity-50'
          } else {
            cls += 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
          }
          return (
            <div key={idx} className={cls} onClick={() => handleSelect(idx)}>
              {String.fromCharCode(65 + idx)}. {opt}
            </div>
          )
        })}
      </div>
      {showAnswer && (
        <div className="mb-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-950 text-sm">
          <p className="font-medium mb-1">{selected === q.answer ? '✓ 正确！' : '✗ 错误'}</p>
          <p className="text-gray-600 dark:text-gray-400">{q.explanation}</p>
        </div>
      )}
      {showAnswer && (
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          {current < questions.length - 1 ? '下一题' : '查看结果'}
        </button>
      )}
    </div>
  )
}
