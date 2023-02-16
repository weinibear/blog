# 基础

## 深拷贝和浅拷贝

### 深拷贝

深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象（新旧对象不共享同一块内存）,且修改新对象不会影响原对象（深拷贝采用了在堆内存中申请新的空间来存储数据，这样每个可以避免指针悬挂

```
// 拷贝对象和数组
JSON.parse(JSON.stringify())
```

使用 JSON.stringfify 几个问题

1、会忽略 `undefined`

2、会忽略 `symbol`

3、不能序列化函数

4、不能解决循环引用的对象

5、不能正确处理`new Date()`

6、不能处理正则

### 浅拷贝

如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址（新旧对象共享同一块内存），所以如果其中一个对象改变了这个地址，就会影响到另一个对象（只是拷贝了指针，使得两个指针指向同一个地址)

##### 浅拷贝和赋值

当我们把一个对象**赋值**给一个新的变量时，赋的其实是该对象的在栈中的地址，而不是堆中的数据。也就是两个对象指向的是同一个存储空间，无论哪个对象发生改变，其实都是改变的存储空间的内容，因此，两个对象是联动的

浅拷贝是**按位拷贝对象**，它会创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址 ，因此如果其中一个对象改变了这个地址，就会影响到另一个对象。即默认拷贝构造函数只是对对象进行浅拷贝复制(**逐个成员依次拷贝)**，即只复制对象空间而不复制资源。

简单来说可以理解为浅拷贝只解决了第一层的问题，拷贝第一层的**基本类型值**，以及第一层的**引用类型地址**。

##### 浅拷贝实现

```js
const obj1 = {
  name: 'Chen',
  hobby: ['see a film', 'write the code', 'play basketball', 'tourism'],
};

const arr1 = [
  {
    name: 'Chen',
  },
  'see a film',
  'write the code',
  'play basketball',
  'tourism',
];
```

- 展开运算符
- Object.assign
- Array.prototype.concat()
- Array.prototype.slice()

```
// 展开运算符
const obj2 = {...obj1}
```

```
// Object.assign
const obj3 = Object.assign({}, obj1)
```

```
// Array.prototype.concat()
const arr2 = arr1.concat([]);
```

```
// Array.prototype.slice()
const arr2 = arr1.slice()
```

##### 2.Object.assign()

Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。但是 Object.assign() 进行的是浅拷贝，拷贝的是对象的属性的引用，而不是对象本身。

```
Object.assign(target, ...sources)
```
