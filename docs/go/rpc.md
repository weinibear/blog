## 介绍

RPC 是远程过程调用的简称，是分布式系统中不同节点间流行的通信方式。

## 启一个 rpc

```go
type HelloService struct {}

func (p *HelloService) Hello(request string, reply *string) error {
    *reply = "hello:" + request
    return nil
}

// 注册一个RPC服务
func main() {
    rpc.RegisterName("HelloService", new(HelloService))

    listener, err := net.Listen("tcp", ":1234")
    if err != nil {
        log.Fatal("ListenTCP error:", err)
    }

    conn, err := listener.Accept()
    if err != nil {
        log.Fatal("Accept error:", err)
    }

    rpc.ServeConn(conn)
}

```

**客户端调用**

```go
func main() {
    client, err := rpc.Dial("tcp", "localhost:1234")
    if err != nil {
        log.Fatal("dialing:", err)
    }

    var reply string
    err = client.Call("HelloService.Hello", "hello", &reply)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(reply)
}


```

## 改进版

1. 需要明确服务的名字和接口

```go
const HelloServiceName = "path/to/pkg.HelloService"

type HelloServiceInterface interface {
  Hello(request string, reply *string) error
}

func RegisterHelloService(svc HelloServiceInterface) error {
  return rpc.RegisterName(HelloServiceName, svc)
}
```
