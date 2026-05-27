# PROJECT_RULES.md

> Database Systems Interactive Learning Platform -- Project Rules
> This document defines the subject-specific rules, visualization focus, and pedagogical constraints for the database systems learning project.

---

# 1. Project Identity

This project teaches:

- Relational database systems
- SQL fundamentals
- Query execution
- Index structures
- Transactions and concurrency
- Database internals
- Distributed database concepts

The project is NOT:

- A SQL playground website
- A CRUD admin panel
- A documentation viewer
- A LeetCode clone

The core objective is:

> Make invisible database internals visible through interactive simulation.

Users should understand:

- HOW a database works internally
- WHY database systems make certain tradeoffs
- WHAT happens when queries execute
- HOW indexes, buffers, locks, and transactions interact

---

# 2. Visualization Philosophy

Database concepts are highly abstract.

Every topic MUST answer:

1. What data structures exist internally?
2. How does data move?
3. What changes over time?
4. What tradeoffs are occurring?

Visualizations should prioritize:

- State transitions
- Data flow
- Tree transformations
- Query execution stages
- Lock ownership
- Disk vs memory behavior
- Step-by-step execution

---

# 3. Subject-Specific Visualization Rules

## SQL Topics

SQL visualizations MUST:

- Show table transformations visually
- Highlight selected rows
- Show filtering step-by-step
- Visualize joins as matching processes
- Show aggregation grouping behavior

NEVER:

- Only display SQL text
- Only display final output tables
- Treat SQL as static syntax memorization

GOOD:

```txt
SELECT → FILTER → JOIN → GROUP → SORT
```

BAD:

```txt
SQL text + explanation only
```

---

## Index Topics

Index visualizations MUST:

- Show tree/node structures visually
- Animate search paths
- Show node splits
- Highlight disk page access
- Compare indexed vs non-indexed lookup

Preferred structures:

- B+ Trees
- Hash indexes
- Clustered indexes
- Composite indexes

Every index topic SHOULD include:

- Lookup simulation
- Insert simulation
- Complexity comparison

---

## Query Execution Topics

Query execution visualizations MUST:

- Be step-by-step
- Show operator pipelines
- Highlight intermediate results
- Show memory usage conceptually
- Visualize execution order

Preferred pipeline:

```txt
Parser → Optimizer → Executor → Result
```

Execution plans SHOULD be rendered as:

- Node graphs
- Operator trees
- Data flow pipelines

---

## Transaction Topics

Transaction visualizations MUST:

- Show concurrent users/processes
- Show lock ownership
- Show waiting/blocking
- Show rollback/recovery
- Show timeline progression

Topics include:

- ACID
- Isolation levels
- MVCC
- Locking
- Deadlocks
- WAL

These topics MUST use:

- State-machine visualizations
- Timeline visualizations
- Event-driven simulations

---

## Storage Engine Topics

Storage topics MUST visualize:

- Disk pages
- Buffer pool behavior
- Cache hits/misses
- Sequential vs random I/O
- Memory hierarchy

Preferred interaction:

- User triggers reads/writes
- System updates cache state visually
- Performance differences become visible

---

# 4. Topic Difficulty Philosophy

The project should teach progressively.

## Beginner Topics

Focus on:

- Intuition
- Visual structure
- Real-world analogy
- Simple SQL operations

Avoid:

- Formal proofs
- Heavy theory
- Database implementation details

---

## Intermediate Topics

Focus on:

- Query planning
- Index structures
- Normalization
- Transactions
- Optimization

Introduce:

- Internal execution behavior
- Performance tradeoffs

---

## Advanced Topics

Focus on:

- Distributed databases
- Consensus basics
- Replication
- Sharding
- Recovery systems
- Query optimizers

These topics MUST still remain:

- Highly visual
- Interactive
- Simulation-first

---

# 5. Subject-Specific Color Semantics

| Color | Meaning |
|---|---|
| Blue | Active query/operator |
| Green | Successful lookup / committed transaction |
| Red | Rollback / deadlock / conflict |
| Amber | Waiting / lock contention / pending state |
| Purple | Disk write / WAL / persistence |
| Gray | Inactive data / unloaded pages |

---

# 6. Database Visualization Categories

## Category A -- Query Pipeline

Examples:

- SQL execution
- Query planning
- Aggregation
- Sorting

Pattern:

```txt
SQL Input → Parse → Optimize → Execute → Result
```

---

## Category B -- Tree Structure Explorer

Examples:

- B+ Tree
- Index pages
- Hash buckets

Pattern:

```txt
Tree structure → Search path → Insert/split simulation
```

---

## Category C -- Timeline Simulator

Examples:

- Transactions
- Isolation levels
- MVCC
- Deadlocks

Pattern:

```txt
Transaction timeline → Events → Locks → Final state
```

---

## Category D -- Storage Simulator

Examples:

- Buffer pool
- Page replacement
- WAL
- Disk access

Pattern:

```txt
Memory state ↔ Disk state
```

---

# 7. SQL Rendering Rules

SQL snippets MUST:

- Use monospace formatting
- Be syntax-grouped visually
- Remain short and readable

GOOD:

```sql
SELECT name
FROM users
WHERE age > 18
```

BAD:

```sql
SELECT users.name FROM users WHERE users.age > 18 ORDER BY users.name ASC LIMIT 100;
```

Visualization should explain:

- Which rows are selected
- Which rows are filtered
- Which indexes are used
- What execution order occurs

---

# 8. Performance Visualization Rules

Database performance topics MUST visually compare:

| Comparison | Required |
|---|---|
| Indexed vs full scan | Yes |
| Sequential vs random I/O | Yes |
| Cached vs uncached | Yes |
| Different join strategies | Yes |
| Different isolation levels | Yes |

Performance SHOULD be visualized through:

- Operation counts
- Access highlights
- Disk page animations
- Time/cost indicators

NEVER:

- Only show Big-O notation
- Only show benchmark tables

---

# 9. Pedagogical Constraints

The project prioritizes:

```txt
Understanding > Formalism
Visualization > Memorization
Interaction > Static explanation
```

The user should finish each topic with:

- Mental models
- Internal system intuition
- Cause/effect understanding

NOT:

- Pure syntax memorization
- Interview trivia
- Vendor-specific details

---

# 10. Technical Constraints

Additional rules for this project:

- No actual database server required
- No backend required for visualizations
- Simulations are deterministic and client-side
- Use mock data only
- Focus on concepts, not production deployment

All database behavior should be:

- Visually simplified
- Educationally accurate
- Computationally lightweight

---

# 11. Future Expansion

Potential future modules:

- Distributed SQL
- Raft consensus
- Columnar databases
- OLAP systems
- Vector databases
- Query optimizer internals
- LSM Trees
- Time-series databases

These should still follow:

```txt
Article → Visualization → Quiz
Simulation-first
Zero external UI dependencies
```

---

