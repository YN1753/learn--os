# TASKS.md

> Active Development Task Queue

---

# CURRENT PRIORITY

Current focus:

```txt
Build core reusable infrastructure first.
Do NOT implement advanced topics before the shared architecture is stable.
```

---

# HIGH PRIORITY TASKS

## Core Infrastructure

- [ ] Setup Next.js 16 project
- [ ] Configure Tailwind CSS 4
- [ ] Configure TypeScript strict mode
- [ ] Create globals.css theme tokens
- [ ] Create ThemeProvider
- [ ] Create AppShell
- [ ] Create Header
- [ ] Create Sidebar
- [ ] Create VisualizationWrapper
- [ ] Create QuizRenderer
- [ ] Implement responsive layout
- [ ] Implement dark mode
- [ ] Verify npm run build passes

---

## Homepage

- [ ] Create homepage topic grid
- [ ] Add all 20 topic metadata entries
- [ ] Add topic cards with concept tags
- [ ] Add responsive layout
- [ ] Verify sidebar synchronization

---

# BEGINNER TOPIC IMPLEMENTATION

## 01-relational-model

- [ ] Create page.tsx
- [ ] Create RelationalModelVisualization.tsx
- [ ] Create QuizSection.tsx
- [ ] Create quiz.json
- [ ] Register homepage metadata
- [ ] Register sidebar metadata
- [ ] Verify build
- [ ] Commit

---

## 02-sql-basics

- [ ] Create page.tsx
- [ ] Create SqlBasicsVisualization.tsx
- [ ] Create QuizSection.tsx
- [ ] Create quiz.json
- [ ] Implement query pipeline simulation
- [ ] Implement row filtering interaction
- [ ] Verify build
- [ ] Commit

---

## 03-joins

- [ ] Create page.tsx
- [ ] Create JoinsVisualization.tsx
- [ ] Create QuizSection.tsx
- [ ] Create quiz.json
- [ ] Implement row matching simulation
- [ ] Implement join type switching
- [ ] Verify build
- [ ] Commit

---

## 04-aggregation

- [ ] Create page.tsx
- [ ] Create AggregationVisualization.tsx
- [ ] Create QuizSection.tsx
- [ ] Create quiz.json
- [ ] Implement grouping simulation
- [ ] Implement aggregation animation
- [ ] Verify build
- [ ] Commit

---

## 05-normalization

- [ ] Create page.tsx
- [ ] Create NormalizationVisualization.tsx
- [ ] Create QuizSection.tsx
- [ ] Create quiz.json
- [ ] Implement decomposition simulator
- [ ] Verify build
- [ ] Commit

---

# INTERMEDIATE TOPICS

## Index & Storage Topics

- [ ] Implement 06-indexes
- [ ] Implement 07-b-plus-tree
- [ ] Implement 08-query-execution
- [ ] Implement 09-query-optimizer
- [ ] Implement 10-buffer-pool

---

## Transaction Topics

- [ ] Implement 11-acid
- [ ] Implement 12-locking
- [ ] Implement 13-isolation-levels
- [ ] Implement 14-deadlocks
- [ ] Implement 15-mvcc
- [ ] Implement 16-wal-recovery

---

# ADVANCED TOPICS

## Distributed Database Topics

- [ ] Implement 17-replication
- [ ] Implement 18-sharding
- [ ] Implement 19-distributed-transactions
- [ ] Implement 20-consensus-basics

---

# QUALITY IMPROVEMENT TASKS

## Visualization Quality

- [ ] Improve step transitions
- [ ] Improve interaction feedback
- [ ] Improve mobile usability
- [ ] Improve dark mode contrast
- [ ] Improve animation smoothness

---

## Educational Quality

- [ ] Review all quizzes
- [ ] Improve conceptual explanations
- [ ] Improve analogies
- [ ] Reduce text density
- [ ] Improve beginner friendliness

---

## Technical Quality

- [ ] Eliminate TypeScript warnings
- [ ] Improve component reuse
- [ ] Optimize rendering performance
- [ ] Verify timer cleanup everywhere
- [ ] Final architecture compliance audit

---

# AUTONOMOUS EXECUTION RULES

When working autonomously:

1. Read CLAUDE.md first
2. Read TASKS.md
3. Pick the highest priority unfinished task
4. Implement incrementally
5. Verify architecture compliance
6. Run npm run build
7. Commit changes
8. Update TASKS.md
9. Continue automatically

---

# IMPORTANT CONSTRAINTS

NEVER:

- Add external UI libraries
- Use canvas/WebGL
- Break VisualizationWrapper API
- Skip dark mode
- Leave timers uncleared
- Convert page.tsx into client components
- Introduce unnecessary complexity

ALWAYS:

- Prefer simulation over decoration
- Keep interactions intuitive
- Keep visualizations educational
- Verify builds before commit
- Preserve architectural consistency

