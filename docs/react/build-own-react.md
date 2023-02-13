## 手写一个简易 react

### 极简版

`react`极简形式可以用三行代码来表示

```js
const jsx = <div title='hello'>hello</div>;
const container = document.getElementById('root');
ReactDom.render(jsx, container);
```

一，在`react`环境中，使用`babel`的`react`相关插件，会将`jsx`对象转化成

```js
const element = React.createElement('div', { title: 'hello' }, 'hello');
```

二，`React.createElement`简易实现

```js
const React = {
  createElement: (tag, props, children) => {
    return {
      type: tag,
      props: {
        ...props,
        children,
      },
    };
  },
};
```

三，`ReactDom.render`简易实现

```js
const ReactDom = {
  render: (element, container) => {
    const node = document.createElement(element.type)
    node["title"] = element.props.title
    ​
    const text = document.createTextNode("")
    text["nodeValue"] = element.props.children
    ​
    node.appendChild(text)
    container.appendChild(node)
  },
};
```

### 轻量版

```js
const jsx = (
  <div id='foo'>
    <a>bar</a>
    <b />
  </div>
);
```

一，配置`babel`，使得`jsx`转化使用`React.createElement`方法

```js
/** @jsx easyReact.createElement */
const element = React.createElement(
  'div',
  { id: 'foo' },
  React.createElement('a', null, 'bar'),
  React.createElement('b')
);
```

二，`React.createElement`简易实现

```js
const React = {
  createElement: (tag, props, ...children) => {
    return {
      type: tag,
      props: {
        ...props,
        children: children.map((child) => {
          return typeof child === 'object' ? child : createElement(child);
        }),
      },
    };
  },
};

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
```

三，`render`实现

```js

  function render(element, container) => {
    const dom =
        element.type == "TEXT_ELEMENT"
          ? document.createTextNode("")
          : document.createElement(element.type)

    const isProperty = key => key !== "children";
    Object.keys(element.props)
      .filter(isProperty)
      .forEach(name => {
        dom[name] = element.props[name]
      })

    element.props.children.forEach((child) => {
      render(child, dom)
    })
    ​
    container.appendChild(dom)
  }

```

### 引入并发模式

可以看见，上面`render`方法是递归创建 dom 元素，并将其渲染在页面上，当数据量比较大，dom 节点比较多，加上如此递归渲染中途是不能被打断的，
主线程将会被阻塞，如果有高优先级任务，像用户输入或动画，用户就会感知到页面非常卡顿。

简单说来，`react`引入`fiber`架构，将元素渲染拆分至很多很多细粒度很小的单元，且**递归渲染**方式改为**循环渲染**，每次完成一个小单元渲染后就停止继续渲染，查看是否有更高优先级任务需要执行，如果有，先执行完更高优先级任务，然后回到被打断的地方继续执行渲染。

`requestIdleCallback`是浏览器提供一个方法，该方法会在主线程空闲时执行回调，但由于一些兼容性问题，`react`团队自己 polyfill 了一个类似功能，就是
`schedule`，现已作为一个不依赖`react`而独立发布的包，使用优先级机制，调度协调页面元素的渲染逻辑

```js
let nextUnitOfWork = null
function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
​
requestIdleCallback(workLoop)
​
function performUnitOfWork(nextUnitOfWork) {
  // TODO
}

```
