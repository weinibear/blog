为了协调事件，用户交互，脚本，渲染，网络任务等，

我们知道，JS 引擎只知道执行 JS，渲染引擎只知道渲染，它们两个并不知道彼此，该怎么配合呢？

答案就是 event loop。

#### 宿主环境

JS 引擎并不提供 event loop（可能很多同学以为 event loop 是 JS 引擎提供的，其实不是），它是宿主环境为了集合渲染和 JS 执行，也为了处理 JS 执行时的高优先级任务而设计的机制。

宿主环境有浏览器、node、跨端引擎等，不同的宿主环境有一些区别：

##### 任务队列

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为 Event Loop（事件循环）。

（1）所有同步任务都在主线程上执行，形成一个[执行栈](http://www.ruanyifeng.com/blog/2013/11/stack.html)（execution context stack）。

（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。

##### 宏任务与微任务

不同的异步任务被分为：宏任务和微任务
宏任务：

- script(整体代码)
- setTimeout()
- setInterval()
- postMessage
- UI 渲染
- I/O
- UI 交互事件

微任务:

- new Promise().then(回调)
- MutationObserver(html5 新特性)

在一个事件循环中，异步事件返回结果后会被放到一个任务队列中．这个事件实际上会被对应的宏任务队列或者微任务队列中去。

**当当前执行栈执行完毕时会立刻先处理所有微任务队列中的事件，然后再去宏任务队列中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行**。

##### 关于执行中的线程：

- 主线程：也就是 js 引擎执行的线程，这个线程只有一个，页面渲染、函数处理都在这个主线程上执行。
- 工作线程：也称幕后线程，这个线程可能存在于浏览器或 js 引擎内，与主线程是分开的，处理文件读取、网络请求等异步事件

在执行代码过程中，如果遇到一些异步代码(比如 setTimeout,ajax,promise.then 以及用户点击等操作),那么浏览器就会将这些代码放到另一个线程(在这里我们叫做幕后线程)中去执行，在前端由浏览器底层执行，在 node 端由 libuv 执行，这个线程的执行不阻塞主线程的执行，主线程继续执行栈中剩余的代码。

当幕后线程（background thread）里的代码执行完成后(比如 setTimeout 时间到了，ajax 请求得到响应),该线程就会将它的回调函数放到任务队列（又称作事件队列、消息队列）中等待执行。而当主线程执行完栈中的所有代码后，它就会检查任务队列是否有任务要执行，如果有任务要执行的话，那么就将该任务放到执行栈中执行。如果当前任务队列为空的话，它就会一直循环等待任务到来。因此，这叫做事件循环。

setTimeout(fn,0)的含义是，指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。

#### eventloop 与浏览器渲染，帧动画，空间回调

- 每一轮 eventloop 都伴随着渲染吗
- requestAnimationFrame 在哪个阶段执行，渲染前，后？
- requestIdleCallback 在哪个阶段执行，渲染前，后？

事件循环：浏览器任务调度的基础，协调事件，用户交互，脚本，渲染，网络任务等

##### 正常流程：

- 宏任务队列取出任务执行

- 当前宏任务的微任务队列清空

- 渲染

  - 是否渲染还要看 rendering opportunity 如,

    - 浏览器会尽可能的保持帧率稳定,无法保持 60fps(没 16.66ms 渲染一次), 选择 30fps 更新速率,而不会偶尔丢帧
    - 浏览器判断更新渲染不会带来视觉上的改变
    - `map of animation frame callbacks` 为空，也就是帧动画回调为空，可以通过 `requestAnimationFrame` 来请求帧动画。

    这些情况下本轮就不会渲染

##### event loop has one or more task queues.

1. 鼠标和键盘事件
2. 其他的一些 Task

   浏览器会在保持任务顺序的前提下，可能分配四分之三的优先权给鼠标和键盘事件，保证用户的输入得到最高优先级的响应，而剩下的优先级交给其他 `Task`，并且保证不会“饿死”它们。

##### requestAnimationFrame

1. 在重新渲染前调用。
2. 很可能在宏任务之后不调用。

`rAF`在浏览器决定渲染之前给你最后一个机会去改变 DOM 属性，然后很快在接下来的绘制中帮你呈现出来，所以这是做流畅动画的不二选择。

```
setTimeout(() => {
  document.body.style.background = "red"
  setTimeout(() => {
    document.body.style.background = "blue"
  })
})
// 两个宏任务之间不一定伴随着更新渲染，时间过短，一般是合并
```

```
let i = 10
let req = () => {
  i--
  requestAnimationFrame(() => {
    document.body.style.background = "red"
    requestAnimationFrame(() => {
      document.body.style.background = "blue"
      if (i > 0) {
        req()
      }
    })
  })
}

req()
// red blue会在渲染前变化并最终渲染，交替变化，
```

##### 浏览器合并两个 setTimeout

```
setTimeout(() => {
  console.log("sto")
  requestAnimationFrame(() => console.log("rAF"))
})
setTimeout(() => {
  console.log("sto")
  requestAnimationFrame(() => console.log("rAF"))
})

queueMicrotask(() => console.log("mic"))
queueMicrotask(() => console.log("mic"))
// 直觉来看顺序　
mic
mic
sto
rAF
sto
rAF

// 实际顺序　浏览器会合并这两个定时器任务：
mic
mic
sto
sto
rAF
rAF
```

##### requestIdleCallback

`requestIdleCallback` 是浏览器提供给我们的空闲调度算法，意图是让我们把一些计算量较大但是又没那么紧急的任务放到空闲时间去执行。不要去影响浏览器中优先级较高的任务，比如动画绘制、用户输入等等

- api 用法示意图

![img](https://user-gold-cdn.xitu.io/2020/5/21/172362067212340f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 浏览器长期空闲时

  ![img](https://user-gold-cdn.xitu.io/2020/5/21/17236209c86c248f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

可能在几帧的时间内浏览器都是空闲的，并没有发生任何影响视图的操作，它也就不需要去绘制页面.

即使有再多空闲,deadline 最多也只会是 50ms, 最多只会分配 50ms 给 requestIdleCallback

是因为浏览器为了提前应对一些可能会突发的用户交互操作，比如用户输入文字。如果给的时间太长了，你的任务把主线程卡住了，那么用户的交互就得不到回应了。50ms 可以确保用户在无感知的延迟下得到回应。

```
如果浏览器的工作比较繁忙的时候，不能保证它会提供空闲时间去执行 rIC 的回调，而且可能会长期的推迟下去。所以如果你需要保证你的任务在一定时间内一定要执行掉，那么你可以给 rIC 传入第二个参数 timeout。
这会强制浏览器不管多忙，都在超过这个时间之后去执行 rIC 的回调函数。所以要谨慎使用，因为它会打断浏览器本身优先级更高的工作。
```

requestIdleCallback((deadline) => {console.log(deadline.timeRemaining())}) // 页面不做什么交互, 时间一般在 49.\*\* ms

如果页面一直滚动交互操作, 时间会变小许多,且极不稳定

```js
var start = null;
var element = document.getElementById('SomeElementYouWantToAnimate');
element.style.position = 'absolute';

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.left = Math.min(progress / 10, 200) + 'px';
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}
// 动画
window.requestAnimationFrame(step);

// 空闲调度
window.requestIdleCallback(() => {
  alert('rIC');
});

// alert 在最开始的时候就执行了,我们每一帧仅仅是把 left 的值移动了一下，做了这一个简单的渲染，没有占满空闲时间，所以可能在最开始的时候，浏览器就找到机会去调用 rIC 的回调函数了。
```

```
function step(timestamp) {
  if (!start) start = timestamp
  var progress = timestamp - start
  element.style.left = Math.min(progress / 10, 200) + "px"
  let i = 1000
  while (i > 0) {
    console.log("i", i)
    i--
  }
  if (progress < 2000) {
    window.requestAnimationFrame(step)
  }
}
// 其实和我们预期的一样，由于浏览器的每一帧都"太忙了",导致它真的就无视我们的 rIC 函数了。alert不会执行
```

```
// 空闲调度
window.requestIdleCallback(
  () => {
    alert("rID")
  },
  { timeout: 500 },
)
// rIC 函数加一个 timeout 500ms后会强制执行
```

##### 总结

- 事件循环**不一定**每轮都伴随着重渲染，但是如果有微任务，一定会伴随着**微任务执行**。

- 决定浏览器视图是否渲染的因素很多，浏览器是非常聪明的。

- `requestAnimationFrame`在重新渲染屏幕**之前**执行，非常适合用来做动画。

- `requestIdleCallback`在渲染屏幕**之后**执行，并且是否有空执行要看浏览器的调度，如果你一定要它在某个时间内执行，请使用 `timeout`参数。

- `resize`和`scroll`事件其实自带节流，它只在 Event Loop 的渲染阶段去派发事件到 `EventTarget` 上。
