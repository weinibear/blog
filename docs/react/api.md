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

## hooks 简易实现

```js
let componentHooks = [];
let currentHookIndex = 0;

// How useState works inside React (simplified).
function useState(initialState) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
    // This is not the first render,
    // so the state pair already exists.
    // Return it and prepare for next Hook call.
    currentHookIndex++;
    return pair;
  }

  // This is the first time we're rendering,
  // so create a state pair and store it.
  pair = [initialState, setState];

  function setState(nextState) {
    // When the user requests a state change,
    // put the new value into the pair.
    pair[0] = nextState;
    updateDOM();
  }

  // Store the pair for future renders
  // and prepare for the next Hook call.
  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}

function Gallery() {
  // Each useState() call will get the next pair.
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  // This example doesn't use React, so
  // return an output object instead of JSX.
  return {
    onNextClick: handleNextClick,
    onMoreClick: handleMoreClick,
    header: `${sculpture.name} by ${sculpture.artist}`,
    counter: `${index + 1} of ${sculptureList.length}`,
    more: `${showMore ? 'Hide' : 'Show'} details`,
    description: showMore ? sculpture.description : null,
    imageSrc: sculpture.url,
    imageAlt: sculpture.alt,
  };
}

function updateDOM() {
  // Reset the current Hook index
  // before rendering the component.
  currentHookIndex = 0;
  let output = Gallery();

  // Update the DOM to match the output.
  // This is the part React does for you.
  nextButton.onclick = output.onNextClick;
  header.textContent = output.header;
  moreButton.onclick = output.onMoreClick;
  moreButton.textContent = output.more;
  image.src = output.imageSrc;
  image.alt = output.imageAlt;
  if (output.description !== null) {
    description.textContent = output.description;
    description.style.display = '';
  } else {
    description.style.display = 'none';
  }
}

let nextButton = document.getElementById('nextButton');
let header = document.getElementById('header');
let moreButton = document.getElementById('moreButton');
let description = document.getElementById('description');
let image = document.getElementById('image');
let sculptureList = [
  {
    name: 'Homenaje a la Neurocirugía',
    artist: 'Marta Colvin Andrade',
    description:
      'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
    url: 'https://i.imgur.com/Mx7dA2Y.jpg',
    alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.',
  },
];

// Make UI match the initial state.
updateDOM();
```
