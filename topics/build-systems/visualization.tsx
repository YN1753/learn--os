'use client'

import React, { useState } from 'react'

export default function BuildSystemsVisualization() {
  const [step, setStep] = useState(0)
  const [buildTool, setBuildTool] = useState<'make' | 'cmake'>('make')

  const makeSteps = [
    { desc: '检查Makefile', detail: '读取依赖关系' },
    { desc: '检查时间戳', detail: '比较文件修改时间' },
    { desc: '编译修改的文件', detail: 'gcc -c main.c -o main.o' },
    { desc: '链接目标文件', detail: 'gcc main.o utils.o -o myapp' },
    { desc: '生成可执行文件', detail: 'myapp' },
  ]

  const cmakeSteps = [
    { desc: '读取CMakeLists.txt', detail: '解析项目配置' },
    { desc: '生成构建文件', detail: '生成Makefile或VS项目' },
    { desc: '执行构建', detail: '调用底层构建工具' },
    { desc: '链接库文件', detail: '链接第三方库' },
    { desc: '生成可执行文件', detail: 'myapp' },
  ]

  const steps = buildTool === 'make' ? makeSteps : cmakeSteps

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">构建系统可视化</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setBuildTool('make'); setStep(0) }}
          className={`px-4 py-2 rounded-lg text-sm ${buildTool === 'make' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          Make
        </button>
        <button
          onClick={() => { setBuildTool('cmake'); setStep(0) }}
          className={`px-4 py-2 rounded-lg text-sm ${buildTool === 'cmake' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          CMake
        </button>
      </div>

      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium mb-2">{buildTool === 'make' ? 'Make' : 'CMake'}构建流程</div>
        <div className="space-y-2">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-sm transition-all ${step >= idx
                ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                : 'bg-gray-100 dark:bg-gray-700 opacity-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-medium">{s.desc}</span>
              </div>
              {step >= idx && (
                <div className="mt-1 ml-8 text-xs text-gray-500 font-mono">{s.detail}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-900 rounded-lg font-mono text-sm">
        {buildTool === 'make' ? (
          <>
            <div className="text-gray-400"># Makefile</div>
            <div className="text-white">CC = gcc</div>
            <div className="text-white">myapp: main.o utils.o</div>
            <div className="text-green-400">	$(CC) main.o utils.o -o myapp</div>
          </>
        ) : (
          <>
            <div className="text-gray-400"># CMakeLists.txt</div>
            <div className="text-white">cmake_minimum_required(VERSION 3.10)</div>
            <div className="text-white">project(MyApp)</div>
            <div className="text-green-400">add_executable(myapp main.cpp)</div>
          </>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          下一步
        </button>
        <button
          onClick={() => setStep(0)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
        >
          重置
        </button>
      </div>
    </div>
  )
}
