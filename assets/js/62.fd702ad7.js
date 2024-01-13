(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{344:function(t,s,a){"use strict";a.r(s);var r=a(14),n=Object(r.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"基础"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基础"}},[t._v("#")]),t._v(" 基础")]),t._v(" "),s("h2",{attrs:{id:"深拷贝和浅拷贝"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#深拷贝和浅拷贝"}},[t._v("#")]),t._v(" 深拷贝和浅拷贝")]),t._v(" "),s("h3",{attrs:{id:"深拷贝"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#深拷贝"}},[t._v("#")]),t._v(" 深拷贝")]),t._v(" "),s("p",[t._v("深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象（新旧对象不共享同一块内存）,且修改新对象不会影响原对象（深拷贝采用了在堆内存中申请新的空间来存储数据，这样每个可以避免指针悬挂")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("// 拷贝对象和数组\nJSON.parse(JSON.stringify())\n")])])]),s("p",[t._v("使用 JSON.stringfify 几个问题")]),t._v(" "),s("p",[t._v("1、会忽略 "),s("code",[t._v("undefined")])]),t._v(" "),s("p",[t._v("2、会忽略 "),s("code",[t._v("symbol")])]),t._v(" "),s("p",[t._v("3、不能序列化函数")]),t._v(" "),s("p",[t._v("4、不能解决循环引用的对象")]),t._v(" "),s("p",[t._v("5、不能正确处理"),s("code",[t._v("new Date()")])]),t._v(" "),s("p",[t._v("6、不能处理正则")]),t._v(" "),s("h3",{attrs:{id:"浅拷贝"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浅拷贝"}},[t._v("#")]),t._v(" 浅拷贝")]),t._v(" "),s("p",[t._v("如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址（新旧对象共享同一块内存），所以如果其中一个对象改变了这个地址，就会影响到另一个对象（只是拷贝了指针，使得两个指针指向同一个地址)")]),t._v(" "),s("h5",{attrs:{id:"浅拷贝和赋值"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浅拷贝和赋值"}},[t._v("#")]),t._v(" 浅拷贝和赋值")]),t._v(" "),s("p",[t._v("当我们把一个对象"),s("strong",[t._v("赋值")]),t._v("给一个新的变量时，赋的其实是该对象的在栈中的地址，而不是堆中的数据。也就是两个对象指向的是同一个存储空间，无论哪个对象发生改变，其实都是改变的存储空间的内容，因此，两个对象是联动的")]),t._v(" "),s("p",[t._v("浅拷贝是"),s("strong",[t._v("按位拷贝对象")]),t._v("，它会创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址 ，因此如果其中一个对象改变了这个地址，就会影响到另一个对象。即默认拷贝构造函数只是对对象进行浅拷贝复制("),s("strong",[t._v("逐个成员依次拷贝)")]),t._v("，即只复制对象空间而不复制资源。")]),t._v(" "),s("p",[t._v("简单来说可以理解为浅拷贝只解决了第一层的问题，拷贝第一层的"),s("strong",[t._v("基本类型值")]),t._v("，以及第一层的"),s("strong",[t._v("引用类型地址")]),t._v("。")]),t._v(" "),s("h5",{attrs:{id:"浅拷贝实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浅拷贝实现"}},[t._v("#")]),t._v(" 浅拷贝实现")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" obj1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Chen'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("hobby")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'see a film'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'write the code'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'play basketball'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'tourism'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" arr1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Chen'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'see a film'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'write the code'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'play basketball'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'tourism'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("ul",[s("li",[t._v("展开运算符")]),t._v(" "),s("li",[t._v("Object.assign")]),t._v(" "),s("li",[t._v("Array.prototype.concat()")]),t._v(" "),s("li",[t._v("Array.prototype.slice()")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("// 展开运算符\nconst obj2 = {...obj1}\n")])])]),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("// Object.assign\nconst obj3 = Object.assign({}, obj1)\n")])])]),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("// Array.prototype.concat()\nconst arr2 = arr1.concat([]);\n")])])]),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("// Array.prototype.slice()\nconst arr2 = arr1.slice()\n")])])]),s("h5",{attrs:{id:"_2-object-assign"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-object-assign"}},[t._v("#")]),t._v(" 2.Object.assign()")]),t._v(" "),s("p",[t._v("Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。但是 Object.assign() 进行的是浅拷贝，拷贝的是对象的属性的引用，而不是对象本身。")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("Object.assign(target, ...sources)\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);