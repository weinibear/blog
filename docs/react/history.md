# React 发展历史

现在，React 的最新官方稳定版本已经到了`v18.2.0`，从 18 以后，多了许多新的特性，像默认开启`并发模式`，可能每隔一段时间，又会出现一些版本的升级，加入一些新的特性等。如果不了解 React 的变迁历史，面对这些不断更新的特性时，自然也无法知道 React 团队新增这些特性的真实原因，也无法真正做到正确地用好`React`。本文简短介绍下`React16`以来的一些重大更新，帮助更深层次了解好 React。主要参考 [React 官方博客](https://reactjs.org/blog/all.html)。

## 2

### 源码

```js
function dispatchAction(queue, action) {
  // 创建update
  const update = {
    action,
    next: null
  }

  // 环状单向链表操作
  if (queue.pending === null) {
      0 -> 0
    update.next = update;
  } else {
       3 -> 0 -> 1 -> 2 -> 3
 	   4 -> 0 -> 1 -> 2 -> 3 -> 4
    update.next = queue.pending.next; // queue.pending始终指向最后一个插入的update。queue.pending.next指向第一个插入的update。
    queue.pending.next = update;
  }
  queue.pending = update;

  // 模拟React开始调度更新-->
  schedule();
}

```

### 源码 2

```js
function dispatchAction(queue, action) {
  // 创建update
  const update = {
    action,
    next: null
  }

  // 环状单向链表操作
  if (queue.pending === null) {
      0 -> 0
    update.next = update;
  } else {
       3 -> 0 -> 1 -> 2 -> 3
 	   4 -> 0 -> 1 -> 2 -> 3 -> 4
    update.next = queue.pending.next; // queue.pending始终指向最后一个插入的update。queue.pending.next指向第一个插入的update。
    queue.pending.next = update;
  }
  queue.pending = update;

  // 模拟React开始调度更新
  schedule();
}

```
