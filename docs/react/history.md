# React 发展历史

现在，React 的最新官方稳定版本已经到了`v18.2.0`，从 18 以后，多了许多新的特性，像默认开启`并发模式`，可能每隔一段时间，又会出现一些版本的升级，加入一些新的特性等。如果不了解 React 的变迁历史，面对这些不断更新的特性时，自然也无法知道 React 团队新增这些特性的真实原因，也无法真正做到正确地用好`React`。本文简短介绍下`React16`以来的一些重大更新，帮助更深层次了解好 React。主要参考 [React 官方博客](https://reactjs.org/blog/all.html)。

## 2017-9-26

`React v16.0`发布

## 2018-3-1

**Async Rendering 要来了！！！**

`react`团队公开提到关于`react`已在准备异步渲染相关功能的改进。[Beyond React 16](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html)这篇博客简单介绍了`Dan`老师在`JSConf 2018`上关于在用户设备计算能力和网络速度不同情况下，如何尽可能提高用户体验的探讨。

- 1.针对用户设备计算能力的差别，`react`致力于设计一种方案，确保高优先级的更新不会被低优先级任务打断，称之为`time slicing时间切片`。同时浏览器提供的`requestIdleCallback`Api，在主线程空闲时执行回调，能够实现较好的用户体验。
- 2.而针对用户网络情况的差异，`react`提出了在异步请求数据时的`suspend rendering`。

## 2018-3-29

`React v16.3.0`发布

#### 新的 Context API

#### 新的 createRef API

#### 新的 forwardRef API

#### 不安全的生命周期

由于`Async Rendering`在渲染过程中可能会出现多次中断，传统三个生命周期函数的执行可能会出现很多意想不到的结果。

- `componentWillMount`
- `componentWillReceiveProps`
- `componentWillUpdate`

`React v17`会将这些生命周期加上前缀`UNSAFE_`

#### 两个新的生命周期

```js
static getDerivedStateFromProps(props, state) {
  // ...
}

getSnapshotBeforeUpdate(prevProps, prevState) {
  // ...
}
```
