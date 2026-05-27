# ROADMAP.md

> Database Systems Interactive Learning Platform -- Development Roadmap

---

# Phase 1 -- Core Infrastructure

## Goal

Establish the reusable architecture and shared learning framework.

## Tasks

- [ ] Setup Next.js 16 + Tailwind 4 + TypeScript strict mode
- [ ] Implement ThemeProvider
- [ ] Implement AppShell
- [ ] Implement responsive Sidebar
- [ ] Implement Header
- [ ] Implement VisualizationWrapper
- [ ] Implement QuizRenderer
- [ ] Configure globals.css design system
- [ ] Configure dark mode
- [ ] Setup homepage topic grid
- [ ] Setup sidebar topic navigation
- [ ] Verify architecture compliance
- [ ] Verify mobile responsiveness
- [ ] Verify npm run build passes

## Deliverable

Reusable simulation-first learning framework.

---

# Phase 2 -- Beginner Database Fundamentals

## Goal

Teach foundational relational database concepts.

## Topics

### 01-relational-model

- Tables
- Rows
- Columns
- Primary keys
- Relationships

Visualization:

- Interactive table explorer
- Relationship visualization

---

### 02-sql-basics

- SELECT
- WHERE
- ORDER BY
- LIMIT

Visualization:

- Query execution pipeline
- Row filtering animation

---

### 03-joins

- INNER JOIN
- LEFT JOIN
- RIGHT JOIN

Visualization:

- Row matching simulation
- Join pipeline animation

---

### 04-aggregation

- GROUP BY
- COUNT
- AVG
- HAVING

Visualization:

- Grouping buckets
- Aggregation step-by-step

---

### 05-normalization

- 1NF
- 2NF
- 3NF
- Redundancy

Visualization:

- Table decomposition simulator

---

## Deliverable

Users can understand and write basic relational queries.

---

# Phase 3 -- Database Internals

## Goal

Expose the internal execution model of databases.

## Topics

### 06-indexes

- Full scan vs index lookup
- Clustered indexes
- Composite indexes

Visualization:

- Search path animation
- Cost comparison

---

### 07-b-plus-tree

- Node structure
- Splits
- Search
- Insert

Visualization:

- Interactive B+ tree simulation

---

### 08-query-execution

- Parser
- Optimizer
- Executor

Visualization:

- Query pipeline explorer

---

### 09-query-optimizer

- Cost estimation
- Plan selection
- Join order

Visualization:

- Execution plan comparison

---

### 10-buffer-pool

- Cache hits
- Cache misses
- Page replacement

Visualization:

- Memory vs disk simulator

---

## Deliverable

Users understand how databases execute queries internally.

---

# Phase 4 -- Transactions & Concurrency

## Goal

Teach concurrency control and recovery.

## Topics

### 11-acid

- Atomicity
- Consistency
- Isolation
- Durability

Visualization:

- Transaction lifecycle simulator

---

### 12-locking

- Shared locks
- Exclusive locks
- Blocking

Visualization:

- Lock ownership timeline

---

### 13-isolation-levels

- Read committed
- Repeatable read
- Serializable

Visualization:

- Concurrent transaction simulator

---

### 14-deadlocks

- Circular waiting
- Detection
- Prevention

Visualization:

- Wait-for graph simulation

---

### 15-mvcc

- Snapshot reads
- Version chains
- Visibility rules

Visualization:

- Version timeline explorer

---

### 16-wal-recovery

- Write-ahead logging
- Crash recovery

Visualization:

- Recovery replay simulator

---

## Deliverable

Users understand transactional consistency and concurrency control.

---

# Phase 5 -- Distributed Databases

## Goal

Introduce modern distributed database concepts.

## Topics

### 17-replication

- Leader/follower
- Sync vs async replication

Visualization:

- Replication lag simulator

---

### 18-sharding

- Horizontal partitioning
- Routing
- Rebalancing

Visualization:

- Data distribution explorer

---

### 19-distributed-transactions

- Two-phase commit
- Coordinator failures

Visualization:

- Distributed commit timeline

---

### 20-consensus-basics

- Consensus intuition
- Quorum
- Fault tolerance

Visualization:

- Node voting simulation

---

## Deliverable

Users understand the fundamentals of distributed databases.

---

# Phase 6 -- Polish & Optimization

## Goal

Improve quality and usability.

## Tasks

- [ ] Improve mobile visualization layouts
- [ ] Improve accessibility
- [ ] Add keyboard shortcuts
- [ ] Improve animation smoothness
- [ ] Improve article typography
- [ ] Add topic completion progress
- [ ] Improve quiz feedback UX
- [ ] Optimize rendering performance
- [ ] Final architecture review
- [ ] Final build verification

---

# Final Vision

The finished project should feel like:

```txt
A visual operating system for understanding databases.
```

Users should be able to:

- See queries execute visually
- Understand index traversal intuitively
- Watch transactions interact in real time
- Understand WHY databases behave the way they do

---

