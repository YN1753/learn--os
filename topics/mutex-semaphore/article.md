# 互斥锁与信号量

## 概念解释

**互斥锁（Mutex）** 和 **信号量（Semaphore）** 是两种常用的同步原语，用于解决并发程序中的竞态条件。

- **互斥锁**：像一把钥匙，一次只能一个人持有
- **信号量**：像停车场的计数器，允许多个线程同时访问

## 为什么重要

- **防止竞态条件**：确保共享资源的正确访问
- **实现同步**：协调多个线程的执行顺序
- **并发编程基础**：几乎所有并发程序都需要

## 互斥锁（Mutex）

### 基本操作

```c
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

pthread_mutex_lock(&mutex);    // 获取锁（阻塞）
// 临界区代码
pthread_mutex_unlock(&mutex);  // 释放锁
```

### 特点

- **互斥**：一次只有一个线程能持有锁
- **所有权**：只有持有锁的线程才能释放
- **阻塞**：获取不到锁时线程会阻塞

### 死锁风险

```c
// 线程1
lock(A);
lock(B);  // 等待线程2释放B

// 线程2
lock(B);
lock(A);  // 等待线程1释放A
// 死锁！
```

## 信号量（Semaphore）

### 基本操作

```c
sem_t sem;
sem_init(&sem, 0, 3);  // 初始值为3

sem_wait(&sem);    // P操作：值减1，如果为0则阻塞
// 临界区代码
sem_post(&sem);    // V操作：值加1
```

### 类型

- **二进制信号量**：值只能是 0 或 1，类似互斥锁
- **计数信号量**：值可以是任意非负整数

### 与互斥锁的区别

| 特性 | 互斥锁 | 信号量 |
|------|--------|--------|
| 所有权 | 有 | 无 |
| 值范围 | 0 或 1 | 0 到 N |
| 用途 | 互斥 | 同步和计数 |

## 经典同步问题

### 1. 读者-写者问题

多个读者可以同时读，但写者必须独占：

```c
sem_t rw_mutex;      // 读写互斥
sem_t mutex;         // reader_count 互斥
int reader_count = 0;

// 读者
sem_wait(&mutex);
reader_count++;
if (reader_count == 1) sem_wait(&rw_mutex);
sem_post(&mutex);
// 读操作
sem_wait(&mutex);
reader_count--;
if (reader_count == 0) sem_post(&rw_mutex);
sem_post(&mutex);

// 写者
sem_wait(&rw_mutex);
// 写操作
sem_post(&rw_mutex);
```

### 2. 哲学家就餐问题

5 个哲学家围坐，每人需要两根筷子才能吃饭：

```c
sem_t chopstick[5];

// 哲学家 i
sem_wait(&chopstick[i]);
sem_wait(&chopstick[(i+1)%5]);
// 吃饭
sem_post(&chopstick[i]);
sem_post(&chopstick[(i+1)%5]);
```

## 可视化说明

在可视化中，你可以：
- 观察互斥锁的获取和释放过程
- 理解信号量的计数机制
- 模拟死锁的产生

## 常见错误

1. **忘记释放锁**：导致死锁
2. **优先级反转**：低优先级线程持有高优先级需要的锁
3. **竞态条件**：检查-then-执行不是原子的

## 实际应用

- **数据库连接池**：信号量限制并发连接数
- **线程池**：互斥锁保护任务队列
- **生产者消费者**：信号量同步生产和消费

## 总结

互斥锁用于互斥访问，信号量用于同步和计数。理解它们的区别和使用场景，是并发编程的基础。
