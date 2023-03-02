#### package

- 一个 package 是相同文件夹下的所有文件的集合
- 一个 package 下，一个文件中的函数、变量等对其他文件可见

#### module

- 一个仓库/项目可以包含一个或多个 module, 但一般是仅仅包含一个 module
- 一个 module 是一系列 package 的集合
- go.mod 文件声明了 module 路径， 它同时也是 module 下所有 package 导入路径的前缀
- 就算 module 不打算发布，但使 module 路径是一个便于下载获取的路径是一个好习惯，如 github.com/weinibear/go-learn

#### 注释

- 每一个 package 都应该有一个 package comment, 如果 package 中含有多个文件，只需要在其中任意一个文件中写明就好，注释写在包声明文件之前

#### 基础

##### 函数多值返回

```go
func swap(x, y string) (string, string) {
	return y, x
}
// x, y string => x string, y string简写

func main() {
	a, b := swap("hello", "world")
	fmt.Println(a, b)
}
```

##### 函数命名返回值

```go
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

func main() {
	fmt.Println(split(17))
}
```

**没有参数的 `return` 语句返回已命名的返回值。也就是 `直接` 返回。**

##### 短变量声明

```go
func main() {
	var i, j int = 1, 2
	k := 3
	c, python, java := true, false, "no!"

	fmt.Println(i, j, k, c, python, java)
}
```

在函数中，简洁赋值语句 `:=` 可在类型明确的地方代替 `var` 声明。

函数外的每个语句都必须以关键字开始（`var`, `func` 等等），因此 `:=` 结构不能在函数外使用。

##### 变量声明分组

```go
var (
	ToBe   bool       = false
	MaxInt uint64     = 1<<64 - 1
	z      complex128 = cmplx.Sqrt(-5 + 12i)
)
```

##### 零值

没有明确初始值的变量声明会被赋予它们的 **零值**。

零值是：

- 数值类型为 `0`，
- 布尔类型为 `false`，
- 字符串为 `""`（空字符串）。

##### 类型转换 T(v)

```
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)
```

##### for 循环

```go
func main() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
    fmt.Println(i) // error
	fmt.Println(sum)
}
// for 循环初始化变量只能在循环语句中可见
```

##### if 简短语句

```go
func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	}
	return lim
}
```

同 `for` 一样， `if` 语句可以在条件表达式前执行一个简单的语句。

该语句声明的变量作用域仅在 `if` 之内。

##### switch case

```
func main() {
	fmt.Print("Go runs on ")
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("OS X.")
	case "linux":
		fmt.Println("Linux.")
	default:
		// freebsd, openbsd,
		// plan9, windows...
		fmt.Printf("%s.\n", os)
	}
}
```

Go 自动提供了在这些语言中每个 case 后面所需的 `break` 语句。除非以 `fallthrough` 语句结束，否则分支会自动终止。

```go
func main() {
	t := time.Now()
	switch {  // 相当于switch true
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}
}
// 这种形式能将一长串 if-then-else 写得更加清晰。
```

##### defer

defer 语句会将函数推迟到外层函数返回之后执行。函数的参数会先计算求值，但函数不会执行

```
func main() {
	fmt.Println("counting")

	for i := 0; i < 10; i++ {
		defer fmt.Println(i)  // 9 8 7 ...
	}

	fmt.Println("done")
}
```

推迟的函数调用会被压入一个栈中。当外层函数返回时，被推迟的函数会按照后进先出的顺序调用。

##### 指针

指针保存了值的内存地址。

```go
var p *int

i := 42
p = &i  // & 操作符会生成一个指向其操作数的指针。 0xc000018038

*p  // * 操作符表示指针指向的底层值。42
*p = 21 // 通过指针 p 设置 i
```

##### 结构体

**一个结构体（`struct`）就是一组字段（field）。**

```go
type Vertex struct {
	X int
	Y int
}
func main() {
	fmt.Println(Vertex{1, 2})  // {1 2}

    v := Vertex{1, 2}
	v.X = 4
	fmt.Println(v.X)
}
```

##### 结构体指针

```go
func main() {
	v := Vertex{1, 2}

	p := &v
	p.X = 1e9 // (*p).X的简写形式
}
```

如果我们有一个指向结构体的指针 `p`，那么可以通过 `(*p).X` 来访问其字段 `X`。不过这么写太啰嗦了，所以语言也允许我们使用隐式间接引用，直接写 `p.X` 就可以

##### 结构体文体

```go
var (
	v1 = Vertex{1, 2}  // 创建一个 Vertex 类型的结构体
	v2 = Vertex{X: 1}  // Y:0 被隐式地赋予
	v3 = Vertex{}      // X:0 Y:0

	p  = &Vertex{1, 2} // 创建一个 *Vertex 类型的结构体（指针）
)
```

##### 数组

- 数组是值，将一个数组传递给另一个数组，会复制所有元素
- 数组作为参数传递给函数，接受的是数组的值拷贝，而不是指针

类型 `[n]T` 表示拥有 `n` 个 `T` 类型的值的数组。

```
var a [10]int

primes := [6]int{2, 3, 5, 2, 11, 13} // 每一个元素都是同一类型
```

1. 会将变量 a 声明为拥有 10 个整数的数组。
2. 数组的长度是其类型的一部分，因此数组不能改变大小

##### 切片

Go 中的大多数数组编程都是使用切片而不是简单数组完成的。

类型 `[]T` 表示一个元素类型为 `T` 的切片。

类似于没有长度的数组

```go
a[low : high]

func main() {
	primes := [6]int{2, 3, 5, 7, 11, 13}

	var s []int = primes[1:4]
	fmt.Println(s) // [3, 5, 7]
}
```

**切片就像数组的引用**

切片并不存储任何数据，它只是描述了底层数组中的一段。

更改切片的元素会修改其底层数组中对应的元素。

与它共享底层数组的切片都会观测到这些修改。

```go
结构体切片
s := []struct {
		i int
		b bool
	}{
		{2, true},
		{3, false},
		{5, true},
		{7, true},
		{11, false},
		{13, true},
	}
[{2 true} {3 false} {5 true} {7 true} {11 false} {13 true}]
```

```go
func main() {
	s := []int{2, 3, 5, 7, 11, 13}

	s = s[1:4]
	fmt.Println(s)

	s = s[:2]
	fmt.Println(s)

	s = s[1:]
	fmt.Println(s)
}
可以利用它的默认行为来忽略上下界。
```

##### 切片的长度和容量

切片的长度就是它所包含的元素个数。

切片的容量是从它的第一个元素开始数，到其底层数组元素末尾的个数。

```go
func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s) // len=6 cap=6 [2 3 5 7 11 13]

	// 截取切片使其长度为 0
	s = s[:0]
	printSlice(s) // len=0 cap=6 []

	// 拓展其长度
	s = s[:4]
	printSlice(s) // len=4 cap=6 [2 3 5 7]

	// 舍弃前两个值
	s = s[2:]
	printSlice(s) // len=2 cap=4 [5 7]

}
```

##### 切片 nil

```go
func main() {
	var s []int
	s == nil // true
}
// nil 切片的长度和容量为 0 且没有底层数组。
```

##### 使用 make 创建切片

指定长度和容量

```
b := make([]int, 0, 5) // len(b)=0, cap(b)=5

a := make([]int, 5)
printSlice("a", a) // len=5 cap=5 [0 0 0 0 0]

b := make([]int, 0, 5)
printSlice("b", b) //b len=0 cap=5 []s
```

##### append 向切片追加元素

`append` 的第一个参数 `s` 是一个元素类型为 `T` 的切片，其余类型为 `T` 的值将会追加到该切片的末尾。

`append` 的结果是一个包含原切片所有元素加上新添加元素的切片。

```go
func main() {
	var s []int
	printSlice(s) // len=0 cap=0 []

	// 添加一个空切片
	s = append(s, 0)
	printSlice(s) //len=1 cap=1 [0]

	// 这个切片会按需增长
	s = append(s, 1)
	printSlice(s) // len=2 cap=2 [0 1]

	// 可以一次性添加多个元素
	s = append(s, 2, 3, 4)
	printSlice(s) // len=5 cap=6 [0 1 2 3 4]
}
```

##### for range

```go
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
	for i, v := range pow {
		fmt.Printf("2**%d = %d\n", i, v)
	}
}

// _表示忽略值
for i, _ := range pow
for _, value := range pow
```

##### new

分配内存，但不会初始化

##### make

只用来创建 slice, maps, channels, 并返回已初始化的值

##### maps

```
type Vertex struct {
	Lat, Long float64
}

var m map[string]Vertex
func main() {
	m = make(map[string]Vertex)
	m["Bell Labs"] = Vertex{
		40.68433, -74.39967,
	}
	fmt.Println(m["Bell Labs"])
}
```

##### 修改映射

```
func main() {
	m := make(map[string]int)

	m["Answer"] = 42
	m["Answer"] = 48

	delete(m, "Answer")
	fmt.Println("The value:", m["Answer"]) // 删除后再读取为该映射元素类型的零值

	v, ok := m["Answer"]
	fmt.Println(v)  // 0
	fmt.Println(ok) // false
}
```

##### 函数值用作函数的参数或返回值

```go
func compute(fn func(float64, float64) float64) float64 {
	return fn(3, 4)
}

func main() {
	hypot := func(x, y float64) float64 {
		return math.Sqrt(x*x + y*y)
	}
	fmt.Println(hypot(5, 12))

	fmt.Println(compute(hypot))
	fmt.Println(compute(math.Pow))
}
```

##### 函数的闭包

```
func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}
```

#### 方法和接口

##### 方法

**一类带特殊的 **接收者 参数的函数

方法接收者在它自己的参数列表内，位于 `func` 关键字和方法名之间。

在此例中，`Abs` 方法拥有一个名为 `v`，类型为 `Vertex` 的接收者。

```go
// v上挂载一个Abs方法
type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
}
```

##### 为非结构体类型声明方法。

```go
type MyFloat float64  // var MyFloat float64 error
// 你只能为在同一包内定义的类型的接收者声明方法，而不能为其它包内定义的类型（包括 int 之类的内建类型）的接收者声明方法。
// 就是接收者的类型定义和方法声明必须在同一包内；
func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

func main() {
	f := MyFloat(-math.Sqrt2)
	fmt.Println(f.Abs())
}
```

##### 指针接收者

```go
type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	v.Scale(10) // 指针接受者, 会改变原始值
	fmt.Println(v.Abs()) // 50
}
// 指针接受者更常用
```

#####　指针和函数

```go
// 把方法重写成函数
func Abs(v Vertex) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func Scale(v *Vertex, f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	Scale(&v, 10)
	fmt.Println(Abs(v)) // 50
}
```

```go
type Vertex struct {
	X, Y float64
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func ScaleFunc(v *Vertex, f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	v.Scale(2)  // 指针调用者，即便接收者为值　ＧO语言也会将v.Scale(2) 解释为 (&v).Scale(2)。
	ScaleFunc(&v, 10)

	p := &Vertex{4, 3}
	p.Scale(3)　// // 指针调用者，　接收者为指针
	ScaleFunc(p, 8)

	fmt.Println(v, p)
}
```

- 带指针参数的函数必须接受一个指针
- 而以指针为接收者的方法被调用时，接收者既能为值又能为指针

```go
type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func AbsFunc(v Vertex) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
	fmt.Println(AbsFunc(v))

	p := &Vertex{4, 3}
	fmt.Println(p.Abs()) // 方法调用 p.Abs() 会被解释为 (*p).Abs()。
	fmt.Println(AbsFunc(*p))
}
```

- 接受一个值作为参数的函数必须接受一个指定类型的值
- 而以值为接收者的方法被调用时，接收者既能为值又能为指针

##### 使用指针接收者的原因

1. 方法能够修改其接收者指向的值。
2. 这样可以避免在每次调用方法时复制该值。若值的类型为大型结构体时，这样做会更加高效。

##### 接口

**接口类型** 是由一组方法签名定义的集合。

接口类型的变量可以保存任何实现了这些方法的值。

```go
type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

type Abser interface {
	Abs() float64
}

func main() {
	var a Abser
	f := MyFloat(-math.Sqrt2)
	v := Vertex{3, 4}

	a = f  // a MyFloat 实现了 Abser
	a = &v // a *Vertex 实现了 Abser
	fmt.Println(a.Abs())
}
```

##### 接口与隐士实现

**类型通过实现一个接口的所有方法来实现该接口。既然无需专门显式声明，也就没有“implements”关键字。**

```go
type I interface {
	M()
}

type T struct {
	S string
}

// 此方法表示类型 T 实现了接口 I，但我们无需显式声明此事。
func (t T) M() {
	fmt.Println(t.S)
}

func main() {
	var i I = T{"hello"}
	i.M()
}
```

##### 接口值

接口也是值。它们可以像其它值一样传递。

接口值可以用作函数的参数或返回值。

在内部，接口值可以看做包含值和具体类型的元组： (value, type)

接口值保存了一个具体底层类型的具体值。

接口值调用方法时会执行其底层类型的同名方法。

```go
type T struct {
	S string
}
func (t *T) M() {
	fmt.Println(t.S)
}

type F float64
func (f F) M() {
	fmt.Println(f)
}

// 定义接口
type I interface {
	M()
}

func describe(i I) {
	fmt.Printf("(%v, %T)\n", i, i)
}
func main() {
	var i I

	i = &T{"Hello"}
	describe(i)
	i.M()

	i = F(math.Pi)
	describe(i)
	i.M()
}
```

##### 底层值为 nil 的接口值

##### **nil 接口值**

##### 空接口

指定了零个方法的接口值被称为 _空接口：_

空接口可保存任何类型的值。（因为每个类型都至少实现了零个方法。）

空接口被用来处理未知类型的值。例如，`fmt.Print` 可接受类型为 `interface{}` 的任意数量的参数。

```go
func main() {
	var i interface{}
	describe(i)

	i = 42
	describe(i)

	i = "hello"
	describe(i)
}
```

##### 类型断言

**类型断言 提供了访问接口值底层具体值的方式。**

```go
t := i.(T)
t, ok := i.(T)

func main() {
	var i interface{} = "hello"

	s := i.(string)
	fmt.Println(s)　// hello

	s, ok := i.(string)
	fmt.Println(s, ok) // hello true

	f, ok := i.(float64)
	fmt.Println(f, ok) // 0 false

	f = i.(float64) // 报错(panic)
	fmt.Println(f)
}
```

##### 类型选择

**类型选择 是一种按顺序从几个类型断言中选择分支的结构。**

```go
func do(i interface{}) {
	switch v := i.(type) {
	case int:
		fmt.Printf("Twice %v is %v\n", v, v*2)
	case string:
		fmt.Printf("%q is %v bytes long\n", v, len(v))
	default:
		fmt.Printf("I don't know about type %T!\n", v)
	}
}

func main() {
	do(21)
	do("hello")
	do(true)
}
```

##### Stringer

[`fmt`](https://go-zh.org/pkg/fmt/) 包中定义的 [`Stringer`](https://go-zh.org/pkg/fmt/#Stringer) 是最普遍的接口之一。

```go
type Stringer interface {
    String() string
}
```

`Stringer` 是一个可以用字符串描述自己的类型。`fmt` 包（还有很多包）都通过此接口来打印值。

##### Errors

Go 程序使用 `error` 值来表示错误状态。

与 `fmt.Stringer` 类似，`error` 类型是一个内建接口：

```go
type error interface {
    Error() string
}
```

```go
type MyError struct {
	When time.Time
	What string
}

func (e *MyError) Error() string {
	return fmt.Sprintf("at %v, %s",
		e.When, e.What)
}

func run() error {
	return &MyError{
		time.Now(),
		"it didn't work",
	}
}

func main() {
	if err := run(); err != nil {
		fmt.Println(err)
	}
}
```

##### Reader

`io` 包指定了 `io.Reader` 接口，它表示从数据流的末尾进行读取。

Go 标准库包含了该接口的[许多实现](https://go-zh.org/search?q=Read#Global)，包括文件、网络连接、压缩和加密等等。

`io.Reader` 接口有一个 `Read` 方法

```go
func (T) Read(b []byte) (n int, err error)
```

```go
func main() {
	r := strings.NewReader("Hello, Reader!")

	b := make([]byte, 8)
	for {
		n, err := r.Read(b)
		fmt.Printf("n = %v err = %v b = %v\n", n, err, b)
		fmt.Printf("b[:n] = %q\n", b[:n])
		if err == io.EOF {
			break
		}
	}
}
```

##### Image

[`image`](https://go-zh.org/pkg/image/#Image) 包定义了 `Image` 接口：

```
package image

type Image interface {
    ColorModel() color.Model
    Bounds() Rectangle
    At(x, y int) color.Color
}
```

```go
func main() {
	m := image.NewRGBA(image.Rect(0, 0, 100, 100))
	fmt.Println(m.Bounds())
	fmt.Println(m.At(0, 0).RGBA())
}
```

#### 并发

##### go 程

Go 程（goroutine）是由 Go 运行时管理的轻量级线程。

```go
go f(x, y, z) // 会启动一个新的 Go 程并执行
```

`f`, `x`, `y` 和 `z` 的求值发生在当前的 Go 程中，而 `f` 的执行发生在新的 Go 程中。

###### return

**返回当前函数**

###### exit

**os.Exit(-1) 退出程序**

###### runtime.GoExit()

**退出当前 go 程**

##### Channels

当涉及到多 go 程时，　 c 语言使用互斥量，上锁来保持资源同步，避免资源竞争的问题

而 go 语言更好的解决方案是使用管道，通道 channel

使用通道不需要我们去进行加解锁操作

如 A 往通道里写数据, B 往里读数据，go 会自动帮我们做好数据同步

管道是带有类型的管道，你可以通过它用信道操作符 `<-` 来发送或者接收值。

```go
ch <- v    // 将 v 发送至信道 ch。
v := <-ch  // 从 ch 接收值并赋予 v。
```

**和映射与切片一样，信道在使用前必须用 make 创建：**

```go
ch := make(chan int)
```

默认情况下，发送和接收操作在另一端准备好之前都会阻塞。这使得 Go 程可以在没有显式的锁或竞态变量的情况下进行同步。

##### 带缓冲的信道

信道可以是 _带缓冲的_。将缓冲长度作为第二个参数提供给 `make` 来初始化一个带缓冲的信道：

```go
ch := make(chan int, 100)
```

仅当信道的缓冲区填满后，向其发送数据时才会阻塞。当缓冲区为空时，接受方会阻塞。

**向管道中读写数据的次数需要对等,　在多个 go 程中,会出现资源泄露,在主 go 程中,会出现 deadlock**

##### range 和 close

发送者可通过 `close` 关闭一个信道来表示没有需要发送的值了。接收者可以通过为接收表达式分配第二个参数来测试信道是否被关闭：若没有值可以接收且信道已被关闭，那么在执行完

```go
v, ok := <-ch
```

close 和循环 `for i := range c`配合使用, 会不断从信道接收值，直到它被关闭。

close 操作应是在写数据之中

> 管道总结

- 当管道写满了,会写阻塞
- 当管道读满了,会读阻塞

```go
func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}
	close(c)
}

func main() {
	c := make(chan int, 10)
	go fibonacci(cap(c), c)
	for i := range c {
		fmt.Println(i)
	}
}
```

###### 单向管道

```go
func main() {
	var numChan <- chan int // 单向读
	var numChan chan <- int // 单向写
}

func main() {
	numChan:= make(chan int, 10)
	go producer(numChan)
	go consumr(numChan)

	time.Sleep(2 * time.Second)
	fmt.Println("over")

}

// 生产者,单向写管道
func producer(out chan <- int) {
	for i:=0;i<10;i++{
		out <- i
		fmt.Println("向管道中写数据", i)
	}
}

// 消费者, 单向读管道
func consumr(in <- chan int) {
	for v := range in {
		fmt.Println("从管道中读数据", v)
	}
}
```

##### select 语句

`select` 语句使一个 Go 程可以等待多个通信操作。

`select` 会阻塞到某个分支可以继续执行为止，这时就会执行该分支。当多个分支都准备好时会随机选择一个执行。

##### default select

当 `select` 中的其它分支都没有准备好时，`default` 分支就会执行。

为了在尝试发送或者接收时不发生阻塞，可使用 `default` 分支：

```go
select {
case i := <-c:
    // 使用 i
default:
    // 从 c 中接收会阻塞时执行
}
```

##### sync.Mutex

我们已经看到信道非常适合在各个 Go 程间进行通信。

但是如果我们并不需要通信呢？比如说，若我们只是想保证每次只有一个 Go 程能够访问一个共享的变量，从而避免冲突？

这里涉及的概念叫做 *互斥（mutual*exclusion）* ，我们通常使用 *互斥锁（Mutex）\* 这一数据结构来提供这种机制。

- `Lock`
- `Unlock`

#### http

原生 client / server

web 框架 gin 框架

#### json

#### problem

- 切片长度和容量
- go 语言中方法和函数区别，以及各自适用场景
