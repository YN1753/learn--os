# 生产者消费者问题

## 概念解释

**生产者消费者问题**是经典的并发同步问题：生产者生成数据放入缓冲区，消费者从缓冲区取出数据。两者需要协调，避免：
- 生产者在缓冲区满时继续生产
- 消费者在缓冲区空时继续消费

就像工厂的传送带：工人放产品（生产者），机器取产品（消费者），传送带容量有限。

## 为什么重要

- **并发编程经典模型**：很多实际问题都是生产者消费者模式
- **同步机制练习**：练习使用互斥锁和信号量
- **理解缓冲区管理**：有界缓冲区的并发访问

## 问题描述

```
生产者 → [缓冲区] → 消费者

约束：
1. 缓冲区大小有限（如 N 个槽位）
2. 生产者不能在缓冲区满时添加
3. 消费者不能在缓冲区空时取出
4. 同一时刻只能有一个线程访问缓冲区
```

## 解决方案

### 方案1：使用信号量

```c
#define N 10  // 缓冲区大小

sem_t mutex;    // 互斥访问缓冲区
sem_t empty;    // 空槽数量
sem_t full;     // 满槽数量

sem_init(&mutex, 0, 1);
sem_init(&empty, 0, N);
sem_init(&full, 0, 0);

// 生产者
void producer() {
    while (1) {
        produce_item();
        sem_wait(&empty);    // 等待空槽
        sem_wait(&mutex);    // 进入临界区
        put_item();
        sem_post(&mutex);    // 离开临界区
        sem_post(&full);     // 增加满槽
    }
}

// 消费者
void consumer() {
    while (1) {
        sem_wait(&full);     // 等待满槽
        sem_wait(&mutex);    // 进入临界区
        get_item();
        sem_post(&mutex);    // 离开临界区
        sem_post(&empty);    // 增加空槽
        consume_item();
    }
}
```

### 方案2：使用条件变量

```c
pthread_mutex_t mutex;
pthread_cond_t not_full;
pthread_cond_t not_empty;
int buffer[N], count = 0;

// 生产者
void producer() {
    while (1) {
        produce_item();
        pthread_mutex_lock(&mutex);
        while (count == N)
            pthread_cond_wait(&not_full, &mutex);
        put_item();
        count++;
        pthread_cond_signal(&not_empty);
        pthread_mutex_unlock(&mutex);
    }
}

// 消费者
void consumer() {
    while (1) {
        pthread_mutex_lock(&mutex);
        while (count == 0)
            pthread_cond_wait(&not_empty, &mutex);
        get_item();
        count--;
        pthread_cond_signal(&not_full);
        pthread_mutex_unlock(&mutex);
        consume_item();
    }
}
```

## 可视化说明

在可视化中，你可以：
- 观察生产者和消费者的并发执行
- 理解缓冲区的状态变化
- 看到信号量如何同步两者

## 常见错误

1. **信号量顺序错误**：可能导致死锁
2. **忘记检查条件**：使用 while 而不是 if
3. **缓冲区溢出**：没有正确限制生产速度

## 实际应用

- **消息队列**：生产者发送消息，消费者处理
- **线程池**：任务队列是生产者消费者模式
- **IO 缓冲**：写入缓冲区，异步刷盘
- **管道**：`ls | grep` 就是生产者消费者

## 总结

生产者消费者问题是并发编程的基础模型。通过信号量或条件变量可以实现正确的同步。理解这个问题有助于解决实际的并发编程问题。
