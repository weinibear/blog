# api

## React.lazy

## React.startTransition

## State as a snapshot

Unlike regular JavaScript variables, React state behaves more like a snapshot. Setting it does not change the state variable you already have, but instead triggers a re-render. This can be surprising at first!

```js
console.log(count); // 0
setCount(count + 1); // Request a re-render with 1
console.log(count); // Still 0!
```

```js
import { useState } from 'react';

export default function Counter() {
  const [score, setScore] = useState(0);

  return (
    <>
      //点击一次，每次只是+1
      <button
        onClick={() => {
          setScore(score + 1);
          setScore(score + 1);
          setScore(score + 1);
        }}
      >
        +3
      </button>
      <h1>Score: {score}</h1>
    </>
  );
}

// 执行情况
console.log(score); // 0
setScore(score + 1); // setScore(0 + 1);
console.log(score); // 0
setScore(score + 1); // setScore(0 + 1);
console.log(score); // 0
setScore(score + 1); // setScore(0 + 1);
console.l;
```

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 5);
          alert(number); // 弹出0
        }}
      >
        +5
      </button>
    </>
  );
}

// 加入setTimeout
<button
  onClick={() => {
    setNumber(number + 5);
    setTimeout(() => {
      alert(number); //弹出还是0
    }, 3000);
  }}
>
  +5
</button>;

// 执行时快照
setNumber(0 + 5);
setTimeout(() => {
  alert(0);
}, 3000);
```

**react 中的 state，在 3000ms 后 alert 执行时可能已经改变，但是 react 仍是会使用在用户点击交互那个时候的状态快照来调度**

```js
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber((n) => n + 1);
          setNumber((n) => n + 1);
          setNumber((n) => n + 1);
        }}
      >
        +3
      </button>
    </>
  );
}
```

| queued update |  n  |   returns |
| ------------- | :-: | --------: |
| n => n + 1    |  0  | 0 + 1 = 1 |
| n => n + 1    |  1  | 1 + 1 = 2 |
| n => n + 1    |  2  | 2 + 1 = 3 |

## react 中 change state（保持数据不可变）

```js
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  console.log('re-rendering');
  return (
    <div
      // 直接改变position,并不会引起组件重新渲染
      onPointerMove={(e) => {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
    >
      block
    </div>
  );
}
// 正确使用
 onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```

```js
export default function App() {
  const [list, setList] = useState(['a', 'b', 'c']);
  return (
    <div>
      <button
        onClick={() => {
          setList((prev) => {
            prev.push('d'); // 直接改变prev了, 不会引起组件重新render
            console.log(prev);
            return prev;
          });
          // 正确写法
          // setList((prev) => {
          //   const newList = [...prev];
          //   newList.push('d');
          //   console.log(newList);
          //   return newList;
          // });
        }}
      >
        add list
      </button>
      <List list={list} />
    </div>
  );
}
```

::: tip
对`react`中嵌套对象（特别是深层结构中仍存在引用类型的对象）进行改变时，一定要注意！很容易就改变了原始 state，
这样会影响到其它用到这个原始 state 的地方

:::

demo

```js
const [info, setInfo] = useState({
  name: 'Yao',
  city: {
    name: '城市',
    address: '陆家嘴',
  },
});

return (
  <div>
    <button
      onClick={() => {
        setInfo((prev) => {
          const next = { ...prev }; // 浅拷贝，里层还有引用值
          next.city.address = 'outside';
          console.log(prev); // 注意，这里prev也被改变了
          return next;
        });
      }}
    >
      change info
    </button>
  </div>
);
```

```js
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(initialList);
  const [count, setCount] = useState(0);

  function handleToggleMyList(artworkId, nextSeen) {
    const myNextList = [...myList];
    const artwork = myNextList.find((a) => a.id === artworkId);
    artwork.seen = nextSeen; // 尽管浅拷贝出一个myNextList，但是这里会直接改变myList中的值，会影响到其它用到这个值的地方
    // setCount((prev) => prev + 1);
    setMyList(myNextList);
  }

  function handleToggleYourList(artworkId, nextSeen) {
    const yourNextList = [...yourList];
    const artwork = yourNextList.find((a) => a.id === artworkId);
    artwork.seen = nextSeen;
    setYourList(yourNextList);
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList artworks={myList} onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList artworks={yourList} onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map((artwork) => (
        <li key={artwork.id}>
          <label>
            <input
              type='checkbox'
              checked={artwork.seen}
              onChange={(e) => {
                onToggle(artwork.id, e.target.checked);
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

**使用`Immer`**

## 组件卸载 state 的保留和重置

文章参考：  
[Preserving and Resetting State](https://beta.reactjs.org/learn/preserving-and-resetting-state)

- 1.组件移除时状态重置

```js
<div>
<Counter />;
{
  showB && <Counter />;
}
</div>
```

- 2.组件在 UI 树上处于同一位置的卸载会保留状态

```js
{
  isFancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />;
}
```

- 3.同一位置组件卸载时如何重置状态  
  **加 key**

* 4.组件卸载时如何保存之前状态
  - 1.使用 css 隐藏和显现组件（不适用复杂组件）
  - 2.将组件状态提升至上一级
  - 3.使用缓存存储状态

## 如何正确使用 context

- 1.如果数据都是由`props`向下传入的，代码看起来数据流逻辑其实会相对清除
- 2.如果你有将数据嵌套很多层，传到深层次组件中，应该手写考虑你的组件拆分是不是有问题，如

```js
<Layout posts={posts} />

// 可以尝试先提取组件，把JSX当作children
 <Layout><Posts posts={posts} /></Layout>
```

## context-reducer 示例

## Refs

```js
import { forwardRef, useRef, useImperativeHandle } from 'react';

const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);

  // 使用useImperativeHandle，选择只暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    // Only expose focus and nothing else
    focus() {
      realInputRef.current.focus();
    },
  }));
  return <input {...props} ref={realInputRef} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      // 绑定到子组件ref，需要子组件使用forwardRef做转发
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
```

**refs 绑定阶段**

`ref.current`是在`commit`阶段 DOM 更新后被赋值，初始时，DOM 更新前，`ref.current`被设置成 null，DOM 被更新后，`react`会立即将`ref`绑定为对应的 DOM nodes。

## Effect

**怎么判断应该使用 useMemo**

```js
console.time('filter array');
const visibleTodos = getFilteredTodos(todos, filter);
console.timeEnd('filter array');
```

如果花费时间太长，如超过 1ms，就说明可以使用 useMemo 避免不必要的计算

**如何判断是该使用事件函数还是 effect**

站在用户的视角，如果这个逻辑是由某个特定交互导致，那就写在事件处理函数中；如果是由于屏幕上用户能看到的组件引起，就写在 effect 中
