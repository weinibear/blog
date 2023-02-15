# React 版本历史

现在，React 的最新官方稳定版本已经到了`v18.2.0`，从 18 以后，多了许多新的特性，像`concurrency`，可能每隔一段时间，又会出现一些版本的升级，加入一些新的特性等。如果不了解 React 的变迁历史，面对这些不断更新的特性时，自然也无法知道 React 团队新增这些特性的真实原因，也无法真正做到正确地用好`React`。本文简短介绍下`React16`以来的一些重大更新，帮助更深层次理解 React。

主要参考：  
[React 官方历史博客](https://reactjs.org/blog/all.html)  
[React v18.0](https://reactjs.org/blog/2022/03/29/react-v18.html)  
[React18 新特性解读](https://juejin.cn/post/7094037148088664078#heading-23)  
[React 18 不再依赖 Concurrent Mode...](https://mp.weixin.qq.com/s/tC2VF_uIZf4RfBWdlpaKUA)

## 2017-9-26[v16.0]

引入`fiber`，重写底层架构，为将来实现可中断的循环遍历更新方式添加支持

## 2018-3-1

**Async Rendering 要来了！！！**

`react`团队公开提到关于`react`已在准备异步渲染相关功能的改进。[Beyond React 16](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html)这篇博客简单介绍了`Dan`老师在`JSConf 2018`上关于在用户设备计算能力和网络速度不同情况下，如何尽可能提高用户体验的探讨

- 针对用户设备计算能力的差别，`react`致力于设计一种方案，确保高优先级的更新不会被低优先级任务打断，称之为`time slicing时间切片`。同时浏览器提供的`requestIdleCallback`Api，在主线程空闲时执行回调，能够实现较好的用户体验。
- 而针对用户网络情况的差异，`react`提出了在异步请求数据时的`suspend rendering`。

::: tip
可以看到，早在 2017 年`react16`时，`react`团队就已经开始`Async Rendering`的设计了，相关探讨可能更早。这样再来看近 5 年`react`的版本迭代历史，很多重要特性的发布，可以说就是在为更好过渡，完善到后来的`concurrency`来做准备的。
:::

## 2018-3-29[v16.3.0]

### 新的 Context API

### 新的 createRef API

### 新的 forwardRef API

### 不安全的生命周期

由于`Async Rendering`在渲染过程中可能会出现多次中断，传统三个生命周期函数的执行可能会出现很多意想不到的结果。

- `componentWillMount`
- `componentWillReceiveProps`
- `componentWillUpdate`

`React v17`会将这些生命周期加上前缀`UNSAFE_`

### 两个新的生命周期

```js
static getDerivedStateFromProps(props, state) {
  // ...
}

getSnapshotBeforeUpdate(prevProps, prevState) {
  // ...
}
```

## 2018-10-23[v16.6.0]

### React.memo

`Class component`解决子组件重复渲染问题，可以使用`PureComponent`和`shouldComponentUpdate`。

对于`Function component`现在可以使用`React.memo`

### React.lazy && Suspense

[Code-Splitting](https://reactjs.org/docs/code-splitting.html#reactlazy) with Suspense

```js
import React, { lazy, Suspense } from 'react';
const OtherComponent = lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  );
}
```

::: tip
`Code-Splitting`仅仅是`Suspense`的第一步，以后版本`Suspense`还会有更多功能，像`data fetching`等
:::

### static contextType

用于`Class Component`中

```js
class MyClass extends React.Component {
  static contextType = MyContext;
  componentDidMount() {
    let value = this.context;
    /* perform a side-effect at mount using the value of MyContext */
  }
}
```

### static getDerivedStateFromError

## 2018-10-25[React Conf]

**discuss the latest in UI engineering.**

- Hooks
- Suspense
- Concurrent Rendering

## 2019-2-6[v16.8] Hooks 发布

## 2020-8-10[v17.0]

`React v17.0`过渡版本

**“In particular, React 17 is a “stepping stone” release that makes it safer to embed a tree managed by one version of React inside a tree managed by a different version of React.”**

### 更改了事件委托机制

![](https://reactjs.org/static/bb4b10114882a50090b8ff61b3c4d0fd/1e088/react_17_delegation.png)

### `New JSX Transform`

项目中不需要引入 React 就可以使用 JSX

**Old**

```js
import React from 'react';
function App() {
  return <h1>Hello World</h1>;
}

// -->
function App() {
  return React.createElement('h1', null, 'Hello world');
}
```

**New**

```js
// Inserted by a compiler (don't import it yourself!)
import { jsx as _jsx } from 'react/jsx-runtime';

function App() {
  return <h1>Hello World</h1>;
}

// -->
function App() {
  return _jsx('h1', { children: 'Hello world' });
}
```

### `useEffect`清理函数变为异步执行

```js
useEffect(() => {
  // effect
  return () => {
    // Cleanup.
  };
});
```

## 2022-3-29[v18.0]

毫无疑问，`react v18`是`React`版本中无比重要的一个，但可能对于普通开发者开发方式并没有很明显的感觉，就像`react`团队所说，  
These updates are primarily aimed at maintainers of third-party libraries。  
When we design APIs, we try to hide implementation details from developers. As a React developer, you focus on what you want the user experience to look like, and React handles how to deliver that experience. So we don’t expect React developers to know how concurrency works under the hood。

`Concurrency`不算是一个特性，它是`react`底层实现的一个机制，其实从`react v16`开始，`react`团队就一直在为`Concurrency`做准备，像引入`fiber`, 重写整个架构，让可中断的循环更新代替不可中断的递归更新成为可能。

### 自动批量更新

```js
// React17时，只有在React合成事件中，才会被批量更新，其它像原生事件、setTimeout中都不会被批量处理

function handleClick() {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React will only re-render once at the end (that's batching!)
}

setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React will render twice, once for each state update (no batching)
}, 1000);
```

`React v18`后，`createRoot`入口开始。不论是在`setTimeout`、`promises`、`native`、`event handlers`，还是其它
任何事件中，都会自动开启批量更新

可以使用`flushSync`关闭批量更新

```js
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCounter((c) => c + 1);
  });
  // React has updated the DOM by now
  flushSync(() => {
    setFlag((f) => !f);
  });
  // React has updated the DOM by now
}
```

### 并发特性 Transitions

`transition`是`react`来区分紧急更新和非紧急更新的概念  
**Urgent updates**，像用户的一些交互，输入、点击等  
**Transition updates** 像一个页面向另一个页面视图的过渡

```js
import { startTransition } from 'react';

// 紧急更新，用户输入框输入
setInputValue(input);

// 标记更新为一个transitions，非紧急更新
startTransition(() => {
  // Transition: Show the results
  setSearchQuery(input);
});
```

```js
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setCount(count + 1);
});
```

### 并发特性 useDeferredValue

**和 Transitions 思想类似，她是返回一个延迟响应的值，可以让一个 state 延迟生效，只有当前没有紧急更新时，该值才会变为最新值**

```tsx
import React, { useState, useEffect, useDeferredValue } from 'react';

const App: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    setList(new Array(10000).fill(null));
  }, []);

  // 使用了并发特性，开启并发更新
  const deferredList = useDeferredValue(list);
  return (
    <>
      {deferredList.map((_, i) => (
        <div key={i}>{i}</div>
      ))}
    </>
  );
};

export default App;
```

开启并发特性后 js 调用栈图示

![](./assets/concurrency-js-stack.png)

我们的任务被拆分到每一帧不同的 task 中，JS 脚本执行时间大体在 5ms 左右，这样浏览器就有剩余时间执行样式布局和样式绘制，减少掉帧的可能性。  
这种将长任务分拆到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为`时间切片（time slice）`

如果不开启并发特性，此时由于组件数量繁多（10000 个），JS 执行时间为 500ms，也就是意味着，在没有并发特性的情况下：一次性渲染 10000 个标签的时候，页面会阻塞大约 0.5 秒，造成卡顿。

### New Suspense Features

```js
<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>
```

### New Hooks

- `useId`
- `useTransition`
- `useDeferredValue`
- `useSyncExternalStore`
- `useInsertionEffect`

### New Client and Server Rendering APIs

```js
// render --> createRoot
// React 17
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root')!;
ReactDOM.render(<App />, root);

// React 18
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(<App />);

```

```js
// React 17
ReactDOM.unmountComponentAtNode(root);

// React 18
root.unmount();
```

```js

// React 17 render方法第三个参数回调函数
const root = document.getElementById('root')!;
ReactDOM.render(<App />, root, () => {
  console.log('渲染完成');
});

// React 18 删除回调函数,可换成在useEffect中执行写法
const NewApp: React.FC = () => {
  useEffect(() => {
    console.log('渲染完成');
  }, []);
  return <App />;
};
const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(<NewApp />);

```

```ts
// 在 React 17 的 FC 中，默认携带了 children 属性
interface MyComponentProps {
  color: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default MyComponent;

// React 18 需要手动添加children属性声明
interface MyComponentProps {
  color: string;
  children?: React.ReactNode;
}

const MyComponent: React.FC<MyComponentProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default MyComponent;
```

**那在 react18 就是默认开启了并发特性吗，所有 react 开发者升级到 react18 就可以直接使用并发吗，答案是否定的，虽然 react18 使用 createRoot 入口函数，但是需要使用并发特性才能开启并发更新！！！**

::: tip  
关于普通开发者应怎样使用并发特性？  
`react`团队的建议是，通过使用引入了并发特性的三方库或框架的形式，而不是直接使用像`startTransition`可以开启并发特性的 API

However, long term, we expect the main way you’ll add concurrency to your app is by using a concurrent-enabled library or framework. In most cases, you won’t interact with concurrent APIs directly. For example, instead of developers calling startTransition whenever they navigate to a new screen, router libraries will automatically wrap navigations in startTransition.
:::

## 版本历史总结

### v15 及以前的老架构 Stack Reconciler

采用不可中断的递归方式更新

### v16 及之后的新架构 Fiber Reconciler

`react16`开始，引入`fiber`，重写底层架构，更新是支持可中断的循环遍历更新方式，同时引入根据任务优先级调度更新的概念。但默认未开启并发更新，只是实现了底层机制。`react16`,`react17`

### 未开启并发更新,但添加新功能的 v18

v18 默认启用了一些新功能，像`Automatic Batching`等，但不使用并发特性，就没有开启并发更新

### 开启了并发更新的 v18

使用像`useTransition`，`useDeferredValue`API 开启了并发特性，js 执行栈可以看到时间切片
