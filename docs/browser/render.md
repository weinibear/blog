##### async 和 defer

- 相同点: **异步加载 (fetch)**
- 不同点:
  - async 加载(fetch)完成后立即执行 (execution)；
  - defer 加载(fetch)完成后延迟到 DOM 解析完成后才会执行(execution)\*\*，但会在事件 `DomContentLoaded` 之前

##### 渲染过程

- JavaScript 的加载、解析与执行会阻塞 DOM 的构建，也就是说，在构建 DOM 时，HTML 解析器若遇到了 JavaScript，那么它会暂停构建 DOM，将控制权移交给 JavaScript 引擎，等 JavaScript 引擎运行完毕，浏览器再从中断的地方恢复 DOM 构建。

- JS 文件不只是阻塞 DOM 的构建，它会导致 CSSOM 也阻塞 DOM 的构建。

  因为 JavaScript 不只是可以改 DOM，它还可以更改样式，也就是它可以更改 CSSOM。不完整的 CSSOM 是无法使用的，但 JavaScript 中想访问 CSSOM 并更改它，那么在执行 JavaScript 时，必须要能拿到完整的 CSSOM.所以就导致了一个现象，如果浏览器尚未完成 CSSOM 的下载和构建，而我们却想在此时运行脚本，那么浏览器将延迟脚本执行和 DOM 构建，直至其完成 CSSOM 的下载和构建

  **这种情况下，浏览器会先下载和构建 CSSOM，然后再执行 JavaScript，最后在继续构建 DOM**。

```
CSSOM会阻塞渲染，只有当CSSOM构建完毕后才会进入下一个阶段构建渲染树。

通常情况下DOM和CSSOM是并行构建的，但是当浏览器遇到一个script标签时，DOM构建将暂停，直至脚本完成执行。但由于JavaScript可以修改CSSOM，所以需要等CSSOM构建完毕后再执行JS。
```

- `HTML`,`SVG`,`XHTML`，解析生成`DOM`树。
  - `CSS`解析生成`CSS`规则树。
- `JavaScript`用来操作`DOM API`和`CSSOM API`，生成`DOM Tree`和`CSSOM API`。

解析完成后，浏览器会通过已经解析好的`DOM Tree` 和 `CSS`规则树来构造 `Rendering` `Tree`。

- `Rendering Tree` 渲染树并不等同于`DOM`树，因为一些像`Header`或`display:none`的东西就没必要放在渲染树中了。

- `CSS` 的 `Rule Tree`主要是为了完成匹配并把`CSS Rule`附加上`Rendering`。

- `Tree`上的每个`Element`。也就是`DOM`结点，即`Frame`。然后，计算每个`Frame`（也就是每个`Element`）的位置，这又叫`layout`和`reflow`过程。

- 最后通过调用操作系统`Native GUI`的`API`绘制。

##### 回流（`Reflow`）

当`Render Tree`中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。

会导致回流的操作：

- 页面首次渲染
- 浏览器窗口大小发生改变
- 元素尺寸或位置发生改变
- 元素内容变化（文字数量或图片大小等等）
- 元素字体大小变化
- 添加或者删除**可见**的`DOM`元素
- 激活`CSS`伪类（例如：`:hover`）
- 查询某些属性或调用某些方法

一些常用且会导致回流的属性和方法：

- `clientWidth`、`clientHeight`、`clientTop`、`clientLeft`

- `offsetWidth`、`offsetHeight`、`offsetTop`、`offsetLeft`

- `scrollWidth`、`scrollHeight`、`scrollTop`、`scrollLeft`

- `scrollIntoView()`、`scrollIntoViewIfNeeded()`

- `getComputedStyle()`

- `getBoundingClientRect()`

- `scrollTo()`

**重排**意味着元件的几何尺寸变了，我们需要重新验证并计算`Render Tree`。是`Render Tree`的一部分或全部发生了变化。这就是`Reflow`，或是`Layout`。

##### 重绘 (Repaint)

当页面中元素样式的改变并不影响它在文档流中的位置时（例如：`color`、`background-color`、`visibility`等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

```

var bstyle = document.body.style; // cache

bstyle.padding = "20px"; // reflow, repaint
bstyle.border = "10px solid red"; //  再一次的 reflow 和 repaint

bstyle.color = "blue"; // repaint
bstyle.backgroundColor = "#fad"; // repaint

bstyle.fontSize = "2em"; // reflow, repaint

// new DOM element - reflow, repaint
document.body.appendChild(document.createTextNode('dude!'));
```

##### 浏览器的优化机制

现代的浏览器都是很聪明的，由于每次重排都会造成额外的计算消耗，因此大多数浏览器都会通过队列化修改并批量执行来优化重排过程。浏览器会将修改操作放入到队列里，直到过了一段时间或者操作达到了一个阈值，才清空队列。但是！**当你获取布局信息的操作的时候，会强制队列刷新**，强制重排，比如当你访问以下属性或者使用以下方法：

- offsetTop、offsetLeft、offsetWidth、offsetHeight
- scrollTop, scrollLeft, scrollWidth, scrollHeight
- clientTop, clientLeft, clientWidth, clientHeight
- getComputedStyle()等

以上属性和方法都需要返回最新的布局信息，因此浏览器不得不清空队列，触发回流重绘来返回正确的值。因此，我们在修改样式的时候，**最好避免使用上面列出的属性，他们都会刷新渲染队列。**如果要使用它们，最好将值缓存起来。

##### 性能影响

**回流比重绘的代价要更高。**

有时即使仅仅回流一个单一的元素，它的父元素以及任何跟随它的元素也会产生回流。

现代浏览器会对频繁的回流或重绘操作进行优化：

浏览器会维护一个队列，把所有引起回流和重绘的操作放入队列中，如果队列中的任务数量或者时间间隔达到一个阈值的，浏览器就会将队列清空，进行一次批处理，这样可以把多次回流和重绘变成一次。

##### 如何避免

###### CSS

- 避免使用`table`布局。
- 尽可能在`DOM`树的最末端改变`class`。
- 避免设置多层内联样式。
- 将动画效果应用到`position`属性为`absolute`或`fixed`的元素上。
- 避免使用`CSS`表达式（例如：`calc()`）。

###### JavaScript

- 避免频繁操作样式，最好一次性重写`style`属性，或者将样式列表定义为`class`并一次性更改`class`属性。
- 避免频繁操作`DOM`，创建一个`documentFragment`，在它上面应用所有`DOM操作`，最后再把它添加到文档中。
- 也可以先为元素设置`display: none`，操作结束后再把它显示出来。因为在`display`属性为`none`的元素上进行的`DOM`操作不会引发回流和重绘。
- 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
- 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

```
const el = document.getElementById('test');
el.style.padding = '5px';
el.style.borderLeft = '1px';
el.style.borderRight = '2px';
```

- 使用 cssText

```
const el = document.getElementById('test');
el.style.cssText += 'border-left: 1px; border-right: 2px; padding: 5px;';
```

- 修改 CSS 的 class

```
const el = document.getElementById('test');
el.className += ' active';
```

- 批量修改 DOM

```
使元素脱离文档流
对其进行多次修改
将元素带回到文档中
```

- 缓存布局信息

```
// bad 强制刷新 触发两次重排
div.style.left = div.offsetLeft + 1 + 'px';
div.style.top = div.offsetTop + 1 + 'px';

// good 缓存布局信息 相当于读写分离
var curLeft = div.offsetLeft;
var curTop = div.offsetTop;
div.style.left = curLeft + 1 + 'px';
div.style.top = curTop + 1 + 'px';
```
